<script setup>
import { useExpensesStore } from './stores/expenses'
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';

const { downloadFirebaseData, findIndexOfCurrentMonthFunction } = useExpensesStore()
const { selectActualMonth } = storeToRefs(useExpensesStore())
const router = useRouter()
const auth = getAuth();

if(localStorage.getItem('logged') === null){
  router.push({name: 'login'})
} 
selectActualMonth.value
findIndexOfCurrentMonthFunction()

onAuthStateChanged(auth, (user) => {
  if(user){
    downloadFirebaseData()
  }
})
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 500px;
  margin: 0 auto;
  font-weight: normal;
  padding-bottom: 63px;
}
</style>
