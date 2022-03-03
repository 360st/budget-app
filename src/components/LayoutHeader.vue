<script setup>

const props = defineProps({
    title: {
        type: String,
    }
})

</script>
<template>
    <header>
      <el-row>
        <el-col>
            <h1>{{props.title}}</h1>
            <slot></slot>
        </el-col>
      </el-row>          
    </header>
</template>
<style lang="scss" scoped>
  header {
    background: var(--vt-c-green);
    margin-bottom: 0.5rem;

    h1 {
      color: #fff;
      font-size: 40px;
      padding:1rem 0;
    }
    .info-box {
      background: #fff;
      border-radius: 3px;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
      .title {
        font-size: 12px;
        color: var(--vt-c-blue);
      }
    }
  }
</style>