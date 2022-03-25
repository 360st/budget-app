<script setup>
import { useExpensesStore } from './stores/expenses'
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { useRouter } from 'vue-router'

const { downloadFirebaseData } = useExpensesStore()
const router = useRouter()
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if(user){
    downloadFirebaseData()
  } else {
    router.push({name: 'login'})
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
