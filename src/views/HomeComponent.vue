<template>
  <div class="home">
    <div class="home__title">Курсы валют</div>
    <p class="home__subtitle">Выберите валюту для конвертации</p>
    <div class="rates-container">
      <div v-for="(rate, currency) in rates" :key="currency" class="rate-card" @click="navigateToConvert(currency)">
        <span class="currency">{{ formatCurrencyPair(currency) }}</span>
        <span class="rate">{{ rate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useCurrencyStore } from '@/store/useCurrencyStore'
  import { useRouter } from 'vue-router'

  const currencyStore = useCurrencyStore()
  const rates = computed(() => currencyStore.rates)
  const router = useRouter()

  onMounted(() => {
    currencyStore.fetchRates()
  })

  const navigateToConvert = (currency) => {
    const [from, to] = currency.split('-')
    router.push({
      path: '/convert',
      query: {
        from: from.toUpperCase(),
        to: to.toUpperCase()
      }
    })
  }

  const formatCurrencyPair = (currency) => {
    return currency.toUpperCase().replace('-', '/')
  }
</script>

<style scoped>
  .home {
    padding: 20px;
  }
  .home__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .home__subtitle {
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }

  .rates-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .rate-card {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
  }

  .rate-card:hover {
    transform: translateY(-5px);
  }

  .currency {
    display: block;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .rate {
    display: block;
    font-size: 16px;
    color: #42b983;
  }
</style>
