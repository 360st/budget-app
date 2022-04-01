<script setup>
import { useExpensesStore } from '../stores/expenses'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ExpensesWrapper from '../components/ExpensesWrapper.vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooterMain from '../components/LayoutFooterMain.vue'
import MonthBudgetSpend from '../components/MonthBudgetSpend.vue'
import SkeletonComponent from '../components/SkeletonComponent.vue'

const store = useExpensesStore()
const { findCurrentMonth, currentDaySpend, weeklyExpenses, userId } = storeToRefs(store)

const orangeRedClassesDay = computed(() => ({
  orange: currentDaySpend.value > Math.floor(findCurrentMonth.value.monthBudget / 30) * 0.7,
  red: currentDaySpend.value > Math.floor(findCurrentMonth.value.monthBudget / 30)
}))
const orangeRedClassesWeek = computed(() => ({
  orange: weeklyExpenses.value > Math.floor(findCurrentMonth.value.monthBudget / 4) * 0.7,
  red: weeklyExpenses.value > Math.floor(findCurrentMonth.value.monthBudget / 4)
}))
</script>

<template>
  <LayoutHeader :title="findCurrentMonth.name">
    <MonthBudgetSpend />  
    <el-row :gutter="10" class="no-padding">
      <el-col :span="12">
        <div class="info-box padding">
          <p class="title">Dziś</p> 
          <SkeletonComponent v-if="userId === null" />
          <p v-else><span  class="big green" :class="orangeRedClassesDay">{{ currentDaySpend }}</span> / <span>{{Math.floor(findCurrentMonth.monthBudget / 30)}}</span> PLN</p>
        </div>
      </el-col>  
      <el-col :span="12">
        <div class="info-box padding">
          <p class="title">Od niedzieli</p> 
          <SkeletonComponent  v-if="userId === null" />
          <p v-else><span class="big green" :class="orangeRedClassesWeek">{{  weeklyExpenses }}</span> / <span>{{Math.floor(findCurrentMonth.monthBudget / 4)}}</span> PLN</p>
        </div>        
      </el-col>          
    </el-row>
  </LayoutHeader>
  <ExpensesWrapper />
  <LayoutFooterMain />
</template>
<style lang="scss">

</style>