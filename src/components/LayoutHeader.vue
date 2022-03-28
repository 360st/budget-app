<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useExpensesStore } from '../stores/expenses'
import UsersLogOut from '../components/UsersLogOut.vue'

const props = defineProps({
    title: {
        type: String,
    }
})
const route = useRoute()

const { findCurrentMonth } = storeToRefs(useExpensesStore())

const orangeRedClassesMonth = computed(() => ({
  orangeBq: findCurrentMonth.value.spend > findCurrentMonth.value.monthBudget * 0.8,
  redBq: findCurrentMonth.value.spend > findCurrentMonth.value.monthBudget
}))
</script>
<template>
    <header :class="orangeRedClassesMonth">
      <el-row v-if="route.name !== 'login'">
        <el-col>
          <UsersLogOut />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <h1>{{props.title}}</h1>  
            <slot></slot>
        </el-col>
      </el-row>          
    </header>
</template>
<style lang="scss">
  header {
    background: var(--vt-c-green);
    margin-bottom: 0.5rem;

    h1 {
      color: #fff;
      font-size: 40px;
      padding:1rem 0 1rem 0;
      text-align: center;
    }
    .current-month {
      color: #fff;
      margin:-2rem 0 0.5rem 0;
      font-size: 25px;
      width: 100%;
      p, span {
        font-weight: 300;
      }
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