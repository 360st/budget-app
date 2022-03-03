<script setup>
import { computed, ref } from 'vue'
import { EditPen, Back } from '@element-plus/icons-vue'   
import { useExpensesStore } from '../stores/expenses'
 
const { addCategory, editCategory, categories } = useExpensesStore()
const name = ref()
const budget = ref(null)

const resetForm = () => { 
    name.value = ''
    budget.value = null
}

const parse = computed(() => budget.value !== null ?  parseInt(budget.value, 10) : null)


</script>
<template>
   <header>
     <el-row>
       <el-col>
         <h1>Dodaj kategorię</h1>
       </el-col>
     </el-row>
   </header>
   <main>    
     <el-row>
       <el-col class="m-05">
         <el-input size="large" v-model="name" placeholder="Kategoria">
         </el-input>
       </el-col>
       <el-col class="m-05">
         <el-input size="large" type="number" v-model="budget" placeholder="Ustal bużdzet">
           <template #append>PLN</template>
         </el-input>
       </el-col>    
     </el-row>   
     <el-row>
         <el-col>
             <ul>
                 <li v-for="(categories, index) in categories" :key="index" @click="editCategory(index, parse)">{{categories.name}} {{categories.budget}}</li>
             </ul>
         </el-col>
    </el-row> 
   </main>
   <footer>
     <el-row :gutter="10">
       <el-col :span="12">
         <router-link to="/"><el-button size="large"><span style="margin-right:5px"></span> <el-icon :size="20"><back /></el-icon></el-button></router-link>
       </el-col>    
       <el-col :span="12">
         <el-button size="large" type="success" color="#002a3a" @click="addCategory({name, budget: parse}), resetForm()"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
       </el-col>        
     </el-row>
   </footer>  
</template>
<style scoped>

button a {
    text-decoration: none;
    color: inherit;
}

</style>