<script setup>
import { storeToRefs } from 'pinia'
import { useExpensesStore } from '../stores/expenses'

const props = defineProps({
  query: Object
})

const { findCurrentMonth } = storeToRefs(useExpensesStore())

</script>
<template>
  <el-row>
    <el-col :span="24">
      <div class="text-center current-month">
        <p v-if="!props.query">{{findCurrentMonth.spend}} / {{findCurrentMonth.monthBudget}} PLN</p>
        <p v-else>{{props.query.spend}} / {{props.query.monthBudget}} PLN</p>
      </div>
    </el-col>     
  </el-row>
</template>