import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Expenses from '../views/Expenses.vue'
import Category from '../views/Category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dodaj',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/kategoria',
      name: 'category',
      component: Category
    }
  ]
})

export default router
