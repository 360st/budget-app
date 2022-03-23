<script setup>
import { signOut, getAuth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()
const logOut = () => {
    signOut(auth).then(()=> {
        router.push({name: 'login'})
    })
}

</script>
<template>
 <span @click="logOut">wyloguj</span>
</template>
<style scoped>
    span {
        position: absolute;
        color: #fff;
        right: 0px;
        top: 0px;
        cursor: pointer;
        font-weight: 300;
        z-index: 2
    }
</style>