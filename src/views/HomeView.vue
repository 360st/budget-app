<script setup>
import { useExpensesStore } from '../stores/expenses'
import { computed, ref } from 'vue'
import ExpensesWrapper from '../components/ExpensesWrapper.vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import MonthBudgetSpend from '../components/MonthBudgetSpend.vue'
import LayoutFooterMain from '../components/LayoutFooterMain.vue'

const { months, selectActualMonth, findCurrentMonth, currentDaySpend } = useExpensesStore()

const orangeRedClassesDay = computed(() => ({
  orange: currentDaySpend > Math.floor(findCurrentMonth.monthBudget / 30) * 0.7,
  red: currentDaySpend > Math.floor(findCurrentMonth.monthBudget / 30)
}))

</script>

<template>
  <LayoutHeader :title="findCurrentMonth.name">
    <el-row :gutter="10" class="no-padding">
      <el-col :xs="12" :sm="12">
        <div class="info-box padding">
          <p class="title">Dziś</p> 
            <p><span class="big green" :class="orangeRedClassesDay">{{currentDaySpend}}</span> / <span>{{Math.floor(findCurrentMonth.monthBudget / 30)}}</span> <span class="small">PLN</span></p>
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