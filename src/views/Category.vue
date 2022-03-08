<script setup>
import { EditPen } from '@element-plus/icons-vue' 
import { computed, ref } from 'vue'  
import { useExpensesStore } from '../stores/expenses'
import LayoutFooter from '../components/LayoutFooter.vue'
import LayoutHeader from '../components/LayoutHeader.vue'
import CategoryList from '../components/CategoryList.vue'
 
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
   <LayoutHeader title="Dodaj kategorię"></LayoutHeader>
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
     <CategoryList /> 
   </main>
   <LayoutFooter>
     <el-button size="large" type="success" color="#002a3a" @click="addCategory({name, budget: parse}), resetForm()"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button>
   </LayoutFooter>
</template>
<style scoped>

button a {
    text-decoration: none;
    color: inherit;
}

</style>