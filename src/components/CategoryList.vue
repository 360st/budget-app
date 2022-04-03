<script setup>
import { computed, ref } from '@vue/runtime-core'
import { useExpensesStore } from '../stores/expenses'
import { Edit, Delete } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const { editCategory, removeCategory } = useExpensesStore()
const { categories } = storeToRefs(useExpensesStore())

const budget = ref(null)
const clicedIndex = ref(null)
const parse = computed(() => budget.value !== null ?  parseInt(budget.value, 10) : null)

const hide = () => {
  budget.value = null
  clicedIndex.value = null
}
</script>
<template>
  <el-row class="small-pad-bottom-top" v-for="(categories, index) in categories" :key="index" >
    <el-row class="wrapper">
        <el-col @click="removeCategory(index)" :span="2" style="display:flex; cursor: pointer; ">
          <el-icon :size="18"><delete /></el-icon>
        </el-col>             
        <el-col :span="20">
          <p class="product-type"> {{categories.name}}<span v-if="categories.budget">:</span> {{categories.budget}} <span v-if="categories.budget">zł</span></p>
        </el-col>
        <el-col style="display:flex; cursor: pointer; justify-content: flex-end;" :span="2" @click="clicedIndex = index">
          <el-icon :size="18"><edit /></el-icon>
        </el-col>  
        <el-row class="no-padding price" :class="{active: index == clicedIndex}">
          <el-col :span="18">
            <el-input @input="editCategory(index, parse)" v-model="budget" size="small"><template #append>PLN</template></el-input>
          </el-col>     
          <el-col :span="5">
            <el-button @click="hide" size="small">Zapisz</el-button>
          </el-col>  
        </el-row>          
    </el-row>     
  </el-row> 
</template>
<style lang="scss" scoped>
  .el-row {
      display: flex;
      align-items: center;
      .price {
        display: flex;
        gap: 5px;
        align-items: center;
        display: none;
        opacity: 0;
        width: 100%;
        transition: all 0.3s ease-in;
        &.active {
          display: inherit;
          opacity: 1;
        }
        button {
          width: 100%;
        }
      }
  }
</style>