<script setup>
import { EditPen } from '@element-plus/icons-vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { useExpensesStore } from '../stores/expenses'
import { useRouter } from  'vue-router'
import { storeToRefs } from 'pinia';
import firebase from '../firebase/firebase'
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'


const { months, categories } = useExpensesStore()
const { selectActualMonth } = storeToRefs(useExpensesStore())

selectActualMonth.value

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
  <LayoutFooter>
    <el-button @click="router.push({name: 'expenses'})" size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
  </LayoutFooter>    
</template>
<style></style>