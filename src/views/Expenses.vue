<script setup>
import { computed, ref } from  'vue'
import { EditPen, Back } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'


const { addExpenses, categories, addMonthBudget } = useExpensesStore()
const price = ref(null)
const indexOfElement = ref(null)
const monthBudget = ref(null)
const resetForm = () => { 
    price.value = null
    indexOfElement.value = null
}
const category = computed(() => categories[indexOfElement.value].name)
const parsePrice = computed(() => parseInt(price.value, 10))


</script>

<template>
  <header>
    <el-row>
      <el-col>
        <h1>Wtorek - 25.02</h1>
      </el-col>
    </el-row>
  </header>
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
        <h2>Budżet na Marzec</h2>
      </el-col>
    </el-row> 
    <el-row>
      <el-col class="m-05">
        <el-form>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input size="large" v-model="monthBudget" placeholder="Kwota" type="number">
                <template #append>PLN</template>
              </el-input>
            </el-col>
            <el-col :span="8">
               <el-button @click="addMonthBudget(monthBudget)" size="large" type="default"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button> 
            </el-col>
          </el-row>
        </el-form>
      </el-col>      
    </el-row>     
  </main>
  <footer>
    <el-row :gutter="10">
      <el-col :span="12">
        <router-link to="/"><el-button size="large"><span style="margin-right:5px"></span> <el-icon :size="20"><back /></el-icon></el-button></router-link>
      </el-col>       
      <el-col :span="12">
        <el-button @click="addExpenses(parseInt(price,10), category), resetForm()" size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
      </el-col>    
    </el-row>
  </footer>  
</template>

<style lang="scss">
  .el-select {
    width: 100% !important;
  }
</style>
