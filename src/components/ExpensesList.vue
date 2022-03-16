<script setup>
import { computed, ref } from 'vue'
import { useExpensesStore } from '../stores/expenses'

const props = defineProps({
    query: {
        type: [Object, Number],
        required: true
    },
})

const { categories } = useExpensesStore()

</script>
<template>
    <el-row class="small-pad-bottom-top" v-for="(expense, index) in props.query" :key="index">
       <el-row class="wrapper">
          <el-col :span="18">
              <p class="product-type"><span class="grey">{{expense.displayDay}}.{{expense.displayMonth}} </span> {{expense.category}}</p>
          </el-col>
          <el-col :span="6" style="text-align:right">
              <p class="price">{{expense.price}} <span class="small">PLN</span></p>
          </el-col>
          <el-col :span="24" v-for="(categories, index) in categories" :key="index">
            <div v-if="categories.name === expense.category">
              <p class="progress" v-if="categories.budget">
                <span class="progress-bar" :class="{green: categories.sum / categories.budget * 100 < 80, red: categories.sum / categories.budget * 100 > 100}" :style="`width:${categories.sum / categories.budget * 100}% `"></span>  
              </p>
            </div>
          </el-col>
       </el-row>  
    </el-row> 
</template>
<style lang="scss">
    .wrapper {
      width: 100%;
      background: #fff;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      width: 100%;
      border-radius: 4px;
      border-bottom: 1px solid rgb(230, 230, 230); 
        .progress {
          width: 100%;
          height: 2px;
          border-radius: 3px;
          margin-top: 3px;
          overflow: hidden;
          background: var(--vt-c-white-mute);
          .progress-bar {
            display: block;
            background: rgb(250, 180, 50);
            opacity: 0.5;
            height: 15px;
            &.green {
              background: var(--vt-c-green);
            }
            &.red {
              background: var(--vt-c-red);
              opacity: 0.5;
            }
          }
        }
        .price {
          font-weight: 700;
        }
        
    }
    .show-more {
      cursor: pointer;
      font-size: 12px;
    }
</style>
