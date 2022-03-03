<script setup>
import { EditPen, Setting, User } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'
import { computed } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import CategoryList from '../components/CategoryList.vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import Date from '../date'


const { date, day } = Date
const { months, expenses } = useExpensesStore()

months.find(el => el.id === date.getMonth()).current = true
const currentMonth = months.find(month => month.current === true)
const currentDaySpent = new Array(expenses.filter(currDay => currDay.day === day).map(e => e.price)).flat().reduce((a,b) => a + b, 0)

const orangeRedClassesDay = computed(() => ({
  orange: currentDaySpent > Math.floor(currentMonth.monthBudget / 30) * 0.7,
  red: currentDaySpent > Math.floor(currentMonth.monthBudget / 30)
}))
const orangeRedClassesMonth = computed(() => ({
  orange: currentDaySpent > currentMonth.monthBudget * 0.7,
  red: currentDaySpent > currentMonth.monthBudget
}))

</script>

<template>
  <LayoutHeader :title="currentMonth.name">
    <el-row :gutter="10" class="no-padding">
      <el-col :xs="12" :sm="12">
        <div class="info-box padding">
          <p class="title">Dziś</p> 
            <p><span class="big green" :class="orangeRedClassesDay">{{currentDaySpent}}</span> / <span>{{Math.floor(currentMonth.monthBudget / 30)}}</span> <span class="small">PLN</span></p>
        </div>
      </el-col>  
      <el-col :xs="12" :sm="12">
        <div class="info-box padding">
          <p class="title">Miesięczny budżet</p>
            <p><span class="big green" :class="orangeRedClassesMonth">{{currentMonth.spent}}</span> / {{currentMonth.monthBudget}}<span></span> <span class="small">PLN</span></p>
        </div>
      </el-col>             
    </el-row>
  </LayoutHeader>
  <main><CategoryList /></main>
  <footer>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-select :placeholder="currentMonth.name" size="large">
          <el-option v-for="month in months" :key="month.id" :value="month.name">{{month.name}} / {{month.spent}} zł</el-option>
        </el-select>
      </el-col>       
      <el-col :span="8">
        <router-link to="/kategoria"><el-button size="large"><span style="margin-right:5px">Kategorie</span> <el-icon :size="20"><setting /></el-icon></el-button></router-link>
      </el-col>
      <el-col :span="8">
        <router-link to="/dodaj"><el-button size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button></router-link>
      </el-col>           
    </el-row>
  </footer>
</template>
<style lang="scss">
footer{
  ::placeholder {
  color: var(--el-button-hover-text-color) !important;
  opacity: 1; /* Firefox */
  }

  ::-moz-any { /* Internet Explorer 10-11 */
  color: var(--el-button-hover-text-color) !important;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
  color: var(--el-button-hover-text-color) !important;
  }
}

</style>