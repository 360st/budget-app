<script setup>
import { ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'
import ExpensesList from '../components/ExpensesList.vue'
import Date from '../date'

const { expenses, categories } = useExpensesStore()
const { day, month } = Date

const showMore = ref(false)
const todayExpensesList = expenses.filter(e => e.day === day && e.month === month)
const otherExpensesList = expenses.filter(e => e.day !== day && e.month === month)


</script>
<template>
    <section>
    <el-row>
      <el-col>
        <h2 v-if="todayExpensesList.length !== 0">Wydatki z dnia dzisiejszego</h2>
        <h2 v-else>Brawo, dziś jeszcze nic nie wydałeś!</h2>
      </el-col>
    </el-row>  
   </section> 
   <section> 
     <ExpensesList :query="todayExpensesList" /> 
     <el-row>
       <el-col class="text-center">
         <el-button @click="showMore = true" round class="show-more">pozostałe dni</el-button>
       </el-col>
     </el-row>  
     <div v-if="showMore">
        <div v-if="otherExpensesList.length !== 0">
          <ExpensesList :query="otherExpensesList" />       
        </div> 
        <div v-else class="text-center">
            <h3>Brak danych</h3>
        </div>
     </div>
   </section>
</template>
<style lang="scss">
    .show-more {
      cursor: pointer;
      font-size: 12px;
    }
</style>