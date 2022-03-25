<script setup>
import { EditPen, CopyDocument, User } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'
import { useRouter } from 'vue-router'
import { computed, watchEffect, ref } from 'vue'
import { storeToRefs } from 'pinia'
import LayoutHeader from '../components/LayoutHeader.vue'
import MonthBudgetSpend from '../components/MonthBudgetSpend.vue'
import ExpensesList from '../components/ExpensesList.vue'
import LayoutFooter from '../components/LayoutFooter.vue'


const props = defineProps({
    id: String
})
const { months, selectActualMonth, findCurrentMonth, expensesOthersMonths } = storeToRefs(useExpensesStore())
const router = useRouter()
const monthExpensesSpendFilter = ref(null)
const monthId = months.value.find(e => e.id == props.id)
const title = computed(() => months.value[props.id].name)

watchEffect(()=> {
  monthExpensesSpendFilter.value = expensesOthersMonths.value.filter(e => e.month == props.id)
})

</script>

<template>
  <LayoutHeader :title="title">
      <MonthBudgetSpend :query="monthId" />            
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