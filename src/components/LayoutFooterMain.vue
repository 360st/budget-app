<script setup>
import { EditPen, CopyDocument, User } from '@element-plus/icons-vue'
import { useExpensesStore } from '../stores/expenses'
import { storeToRefs } from 'pinia'

const { months, findCurrentMonth } = storeToRefs(useExpensesStore())
const { updateStartWeek, downloadFirebaseExpensesOtherMonths } = useExpensesStore()

</script>
<template>
  <footer>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-select :placeholder="findCurrentMonth.name" size="large">
          <el-option v-for="month in months" :key="month.id" :value="month.id" ><router-link @click="downloadFirebaseExpensesOtherMonths(month.id)" :to="{name: 'more', params: {id: month.id}}">{{month.name}} / {{month.spend}} zł</router-link></el-option>
        </el-select>
      </el-col>       
      <el-col :span="8">
        <router-link to="/kategoria"><el-button size="large"><span style="margin-right:5px">Kategorie</span> <el-icon :size="20"><copy-document /></el-icon></el-button></router-link>
      </el-col>
      <el-col :span="8">
        <router-link to="/dodaj" @click="updateStartWeek"><el-button size="large" type="success" color="#002a3a"><span style="margin-right:5px">Dodaj</span> <el-icon :size="20"><edit-pen  /></el-icon></el-button></router-link>
      </el-col>      
      <slot></slot>     
    </el-row>
  </footer>
</template>
<style>

</style>