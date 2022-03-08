<script setup>
import { computed } from 'vue'
import { useExpensesStore } from '../stores/expenses'

const props = defineProps({
  query: Object
})

const { findCurrentMonth, currentDaySpend } = useExpensesStore()

const orangeRedClassesMonth = computed(() => ({
  orange: currentDaySpend > findCurrentMonth.monthBudget * 0.7,
  red: currentDaySpend > findCurrentMonth.monthBudget
}))

</script>
<template>
    <el-col :xs="12" :sm="12">
      <div class="info-box padding">
        <p class="title">Miesięczny budżet</p>
        <p v-if="!props.query"><span class="big green" :class="orangeRedClassesMonth">{{findCurrentMonth.spend}}</span> / {{findCurrentMonth.monthBudget}}<span></span> <span class="small">PLN</span></p>
        <p v-else><span class="big green" :class="orangeRedClassesMonth">{{props.query.spend}}</span> / {{props.query.monthBudget}}<span></span> <span class="small">PLN</span></p>
      </div>
    </el-col>     
</template>