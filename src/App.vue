<script setup>
import { useExpensesStore } from './stores/expenses'
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { onSnapshot, getFirestore, doc, collection, orderBy, query, where } from "firebase/firestore"; 
import { useRouter } from 'vue-router'

const { updateMonthsFirebase, updateCategoriesFirebase, updateExpensesFirebase, updateStart } =  useExpensesStore()
const db = getFirestore()
const router = useRouter()
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    onSnapshot(doc(db, "users", user.uid, "months", user.uid), (doc) => {
      updateMonthsFirebase(doc.data().months)
    })
    onSnapshot(doc(db, "users", user.uid, "categories", user.uid), (doc) => {
      updateCategoriesFirebase(doc.data().categories)
    })     
    onSnapshot(doc(db, "startWeek", "1"), (doc) => {
      updateStart(doc.data().startWeek)
    })
    let q = query(collection(db, "users", user.uid, "expenses"), orderBy("day"), orderBy("category"))
    onSnapshot(q, (querySnapshot) => {
      let data = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
      updateExpensesFirebase(data)
    })
  } else {
    console.log('wylogowano')
    router.replace({name: 'login'})    
  }
});
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
