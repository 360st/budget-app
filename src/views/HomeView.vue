<script setup>
import { useExpensesStore } from '../stores/expenses'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import ExpensesWrapper from '../components/ExpensesWrapper.vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import MonthBudgetSpend from '../components/MonthBudgetSpend.vue'
import LayoutFooterMain from '../components/LayoutFooterMain.vue'

const store = useExpensesStore()
const { selectActualMonth, findCurrentMonth, currentDaySpend, weeklyExpenses } = storeToRefs(store)

selectActualMonth.value
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
    <el-row :gutter="10" class="no-padding">
      <el-col :span="8">
        <div class="info-box padding">
          <p class="title">Dziś</p> 
            <p><span class="green" :class="orangeRedClassesDay"><strong>{{currentDaySpend}}</strong></span> / <span>{{Math.floor(findCurrentMonth.monthBudget / 30)}}</span> <span class="small">PLN</span></p>
        </div>
      </el-col>  
      <el-col :span="8">
        <div class="info-box padding">
          <p class="title">Od niedzieli</p> 
            <p><span class="green" :class="orangeRedClassesWeek"><strong>{{weeklyExpenses}}</strong></span> / <span>{{Math.floor(findCurrentMonth.monthBudget / 4)}}</span> <span class="small">PLN</span></p>
        </div>        
      </el-col>
      <MonthBudgetSpend />            
    </el-row>
  </LayoutHeader>
  <ExpensesWrapper />
  <LayoutFooterMain />
</template>
<style lang="scss">

</style>