<template>
  <div class="convert">
    <h1>Конвертация валют</h1>
    <div class="conversion-block">
      <div class="currency-input">
        <label for="fromCurrency">Из</label>
        <select id="fromCurrency" v-model="fromCurrency">
          <option v-for="currency in filteredFromCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input v-model.number="fromValue" type="number" @input="handleFromInput" />
      </div>
      <swap-icon class="icon" @click="swapCurrencies" />
      <div class="currency-input">
        <label for="toCurrency">В</label>
        <select id="toCurrency" v-model="toCurrency">
          <option v-for="currency in filteredToCurrencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
        <input v-model.number="toValue" type="number" @input="handleToInput" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useCurrencyStore } from '@/store/useCurrencyStore'
  import SwapIcon from '@/assets/icons/swapIcon.vue'

  const route = useRoute()
  const currencyStore = useCurrencyStore()

  const fromCurrency = ref(route.query.from || 'RUB')
  const toCurrency = ref(route.query.to || 'USD')
  const fromValue = ref(1)
  const toValue = ref(0)

  const availableCurrencies = ref([])

  const updateAvailableCurrencies = () => {
    const currencyPairs = Object.keys(currencyStore.rates)
    const currencies = new Set()

    currencyPairs.forEach((pair) => {
      const [from, to] = pair.toUpperCase().split('-')
      currencies.add(from)
      currencies.add(to)
    })

    availableCurrencies.value = Array.from(currencies)
  }

  onMounted(() => {
    currencyStore.hydrate()
    updateAvailableCurrencies()
    if (route.query.from && route.query.to) {
      convertToCurrency()
    }
  })

  const rates = computed(() => currencyStore.rates)

  let debounceTimer = null

  const filteredFromCurrencies = computed(() => {
    return availableCurrencies.value.filter((currency) => currency !== toCurrency.value)
  })

  const filteredToCurrencies = computed(() => {
    return availableCurrencies.value.filter((currency) => currency !== fromCurrency.value)
  })

  const getRateForCurrencyPair = () => {
    const currencyPair = `${fromCurrency.value.toLowerCase()}-${toCurrency.value.toLowerCase()}`

    if (rates.value[currencyPair]) {
      return rates.value[currencyPair]
    } else {
      console.error(`Курс для пары ${currencyPair} не найден`)
      return null
    }
  }

  const convertToCurrency = () => {
    const rate = getRateForCurrencyPair()
    if (rate) {
      toValue.value = +(fromValue.value * rate).toFixed(2)
    }
  }

  const convertFromCurrency = () => {
    const rate = getRateForCurrencyPair()
    if (rate) {
      fromValue.value = +(toValue.value * (1 / rate)).toFixed(2)
    }
  }

  const debounceConvertToCurrency = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(convertToCurrency, 300)
  }

  const debounceConvertFromCurrency = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(convertFromCurrency, 300)
  }

  const handleFromInput = () => {
    fromValue.value = +fromValue.value.toFixed(2)
    debounceConvertToCurrency()
  }

  const handleToInput = () => {
    toValue.value = +toValue.value.toFixed(2)
    debounceConvertFromCurrency()
  }

  const swapCurrencies = () => {
    const temp = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = temp
    debounceConvertToCurrency()
  }

  watch([fromCurrency, toCurrency], () => {
    debounceConvertToCurrency()
  })
</script>

<style scoped>
  .convert {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  .conversion-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .currency-input {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  label {
    margin-bottom: 10px;
    font-weight: bold;
    color: #555;
  }

  select,
  input[type='number'] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  select:focus,
  input:focus {
    outline: none;
    border-color: #42b983;
  }

  @media (max-width: 500px) {
    .conversion-block {
      flex-direction: column;
    }
  }

  .icon {
    cursor: pointer;
    width: 40px;
    height: 40px;
    color: #000;
    transition: all 0.3s ease;
  }

  .icon:hover {
    color: #119b5c;
  }
</style>
