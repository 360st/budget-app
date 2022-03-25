import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Expenses from '../views/Expenses.vue'
import Category from '../views/Category.vue'
import OtherMonth from '../views/OtherMonth.vue'
import UsersLogin from '../views/UsersLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dodaj',
      name: 'expenses',
      component: Expenses,  
    },
    {
      path: '/kategoria',
      name: 'category',
      component: Category,    
    },
    {
      path: '/:id',
      name: 'more',
      component: OtherMonth, 
      props: true,  
    },
    {
      path: '/login',
      name: 'login',
      component: UsersLogin
    }
  ]
})

export default router

