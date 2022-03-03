<script setup>
import { computed } from 'vue'

const orangeRedClassesMonth = computed(() => ({
  orange: currentDaySpent > currentMonth.monthBudget * 0.7,
  red: currentDaySpent > currentMonth.monthBudget
}))

</script>
<template>
    <el-col :xs="12" :sm="12">
      <div class="info-box padding">
        <p class="title">Miesięczny budżet</p>
        <p><span class="big green" :class="orangeRedClassesMonth">{{currentMonth.spent}}</span> / {{currentMonth.monthBudget}}<span></span> <span class="small">PLN</span></p>
      </div>
    </el-col>     
</template>