<script setup>
import { computed, ref, watchEffect } from  'vue'
import { EditPen } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'
import Date from '../date'
import LayoutHeader from '../components/LayoutHeader.vue'
import LayoutFooter from '../components/LayoutFooter.vue'

const {displayDay, displayMonth} = Date
const { addExpenses, categories, addMonthBudget, findCurrentMonth } = useExpensesStore()
const price = ref(null)
const indexOfElement = ref(null)
const monthBudget = ref(null)
const resetForm = () => { 
    price.value = null
    indexOfElement.value = null
}
const category = computed(() => categories[indexOfElement.value].name)
const parsePrice = computed(() => parseInt(price.value, 10))
const simpleValidation = computed(() => {
  return price.value !== null && indexOfElement.value !== null ? false : true
})
</script>

<template>
  <LayoutHeader :title="`Dodaj ${displayDay}.${displayMonth}`"></LayoutHeader>
  <main>    
    <el-row>
      <el-col class="m-05">
        <el-input size="large" v-model="price" placeholder="Kwota" type="number">
          <template #append>PLN</template>
        </el-input>
      </el-col>
      <el-col class="m-05">
        <el-select size="large" v-model="indexOfElement" placeholder="Kategoria">
          <el-option v-for="(loop, index) in categories" :key="index" :value="index" :label="loop.name"></el-option>
        </el-select>
      </el-col>      
    </el-row>
    <el-row class="no-padding-top-bot">
      <el-col>
        <h2>Budżet miesięczny na {{findCurrentMonth.name}}</h2>
      </el-col>
    </el-row> 
    <el-row class="no-padding"> 
      <el-col class="m-05">
        <el-form>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input size="large" v-model="monthBudget" placeholder="Kwota" type="number">
                <template #append>PLN</template>
              </el-input>
            </el-col>
            <el-col :span="8">
               <el-button @click="addMonthBudget(monthBudget)" size="large" type="default"><span style="margin-right:5px">Zapisz</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button> 
            </el-col>
          </el-row>
        </el-form>
      </el-col>      
    </el-row>     
  </main>
   <LayoutFooter>
     <el-button @click="addExpenses(parseInt(price,10), category), resetForm()" :disabled="simpleValidation" size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
   </LayoutFooter>   
</template>

<style lang="scss">
  .el-select {
    width: 100% !important;
  }
</style>
