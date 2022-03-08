<script setup>
import { EditPen, CopyDocument, User } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import MonthBudgetSpend from '../components/MonthBudgetSpend.vue'
import ExpensesList from '../components/ExpensesList.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

const props = defineProps({
    id: String
})
const router = useRouter()
const { months, selectActualMonth, findCurrentMonth, expenses } = useExpensesStore()
const monthExpensesSpendFilter = expenses.filter(e => e.month == props.id)
const monthId = months.find(e => e.id == props.id)
const title = computed(() => months[props.id].name)

</script>

<template>
  <LayoutHeader :title="title">
    <el-row :gutter="10" class="no-padding">  
      <MonthBudgetSpend :query="monthId" />            
    </el-row>
  </LayoutHeader>
  <section>
    <div v-if="monthExpensesSpendFilter.length === 0" class="text-center">
        <h3>Brak wydatków w danym miesiącu</h3>
    </div> 
    <ExpensesList v-else :query="monthExpensesSpendFilter" /> 
   
  </section>
  <LayoutFooter>
    <el-button @click="router.push({name: 'expenses'})" size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
  </LayoutFooter>
</template>
<style lang="scss">

</style>