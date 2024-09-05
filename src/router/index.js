import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeComponent.vue'
import Convert from '../views/Convert.vue'
const publicPath = '/currency_converter'

const routes = [
  { path: `${publicPath}/`, name: 'Home', component: Home },
  { path: `${publicPath}/convert`, name: 'Convert', component: Convert }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
