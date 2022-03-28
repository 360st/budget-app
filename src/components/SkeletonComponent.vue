<script setup>
</script>
<template>
    <p></p>
</template>
<style lang="scss" scoped>
    p {
        width: 100%;
        height: 20px;
        background: rgb(241, 241, 241);
        border-radius: 3px;
        margin: 0.57rem 0;
        animation: skeleton 1s infinite;
        overflow: hidden;
        &::before{
            content: "";
            position: absolute;
            left: 0;
            width: 100%;
            height: 20px;
            background: rgb(231,231,231);
            background: linear-gradient(90deg, rgba(231,231,231,0) 0%, rgba(231,231,231,1) 50%, rgba(231,231,231,0) 100%); 
            animation: animation 1s infinite;
        }
    }
    @keyframes animation {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(100%);
        }
    }
</style>