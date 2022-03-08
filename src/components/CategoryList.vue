<script setup>
import { computed, ref } from '@vue/runtime-core'
import { useExpensesStore } from '../stores/expenses'
import { Edit, Delete } from '@element-plus/icons-vue'

const { categories, editCategory, removeCategory } = useExpensesStore()
const budget = ref(null)
const parse = computed(() => budget.value !== null ?  parseInt(budget.value, 10) : null)
const clicedIndex = ref(null)

</script>
<template>
  <el-row class="small-pad-bottom-top" v-for="(categories, index) in categories" :key="index" >
    <el-row class="wrapper">
        <el-col @click="removeCategory(index)" :span="2" style="display:flex; cursor: pointer">
          <el-icon :size="18"><delete /></el-icon>
        </el-col>
        <el-col :span="12">
          <p class="product-type"> {{categories.name}}: {{categories.budget}}</p>
        </el-col>
        <el-col :span="8" class="text-right">
          <p class="price" :class="{active: index == clicedIndex}"><el-input @input="editCategory(index, parse)" v-model="budget" size="small"><template #append>PLN</template></el-input></p>
        </el-col>
        <el-col style="display:flex; cursor: pointer; justify-content: flex-end;" :span="2" @click="clicedIndex = index">
          <el-icon :size="18"><edit /></el-icon>
        </el-col>
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
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease-in;
        &.active {
          visibility: inherit;
          opacity: 1;
        }
      }
  }
</style>