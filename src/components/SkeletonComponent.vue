<script setup>
</script>
<template>
    <p></p>
</template>
<style scoped>
    p {
        width: 100%;
        height: 20px;
        background: rgb(241, 241, 241);
        border-radius: 3px;
        margin: 0.57rem 0;
        animation: skeleton 1s infinite;
    }
    @keyframes skeleton {
      from {background-color: rgb(241, 241, 241);}
      50% {background-color: rgb(231, 231, 231);}
      to {background-color: rgb(241, 241, 241);}
    }
</style>