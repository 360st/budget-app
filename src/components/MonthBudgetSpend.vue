<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useExpensesStore } from '../stores/expenses'

const props = defineProps({
  query: Object
})

const { findCurrentMonth, currentDaySpend } = storeToRefs(useExpensesStore())

const orangeRedClassesMonth = computed(() => ({
  orange: currentDaySpend.value > findCurrentMonth.value.monthBudget * 0.7,
  red: currentDaySpend.value > findCurrentMonth.value.monthBudget
}))

</script>
<template>
    <el-col :span="8">
      <div class="info-box padding">
        <p class="title">W tym miesiącu</p>
        <p v-if="!props.query"><span class="green" :class="orangeRedClassesMonth"><strong>{{findCurrentMonth.spend}}</strong></span> / {{findCurrentMonth.monthBudget}}<span></span> <span class="small">PLN</span></p>
        <p v-else><span class="green" :class="orangeRedClassesMonth">{{props.query.spend}}</span> / {{props.query.monthBudget}}<span></span> <span class="small">PLN</span></p>
      </div>
    </el-col>     
</template>