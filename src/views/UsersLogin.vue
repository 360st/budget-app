<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { useExpensesStore } from '../stores/expenses'
import { useRouter } from  'vue-router'
import firebase from '../firebase/firebase'
import LayoutHeader from '../components/LayoutHeader.vue'


const { months, categories } = useExpensesStore()

const provider = new GoogleAuthProvider();
const db = getFirestore();
const auth = getAuth();
const router = useRouter()

const login = () => {
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    if(user.metadata.creationTime === user.metadata.lastSignInTime){
      setDoc(doc(db, "users", user.uid, "months", user.uid), {
        months
      });    
      setDoc(doc(db, "users", user.uid, "categories", user.uid), {
        categories
      })
    } 
    setTimeout(() => {
      router.push({name: 'home'})
    }, 1000);
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}


</script>
<template>
  <LayoutHeader title="Logowanie" />
  <img @click="login" src="../assets/btn_google_signin_light_focus_web.png" />   
</template>
<style></style>