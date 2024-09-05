import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    baseCurrency: 'RUB',
    rates: {}
  }),
  actions: {
    async fetchRates() {
      try {
        const response = await fetch(`https://status.neuralgeneration.com/api/currency`)
        const data = await response.json()
        this.rates = { ...data }
        this.persistState()
      } catch (error) {
        console.error('Ошибка при получении курсов валют:', error)
      }
    },
    persistState() {
      sessionStorage.setItem('currencyStore', JSON.stringify(this.$state))
    },
    hydrate() {
      const storedState = sessionStorage.getItem('currencyStore')
      if (storedState) {
        this.$state = JSON.parse(storedState)
      }
    }
  }
})
