<script setup>
import { EditPen, Back } from '@element-plus/icons-vue' 

</script>
<template>
   <footer>
     <el-row :gutter="10">
       <el-col :span="12">
         <router-link :to="{name: 'home'}"><el-button size="large"><span style="margin-right:5px"></span> <el-icon :size="20"><back /></el-icon></el-button></router-link>
       </el-col>    
       <el-col :span="12">
         <slot></slot>  
       </el-col>        
     </el-row>
   </footer> 
</template>
<style lang="scss">
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 500px;
    background: #fff;
    box-shadow: -2px -2px 5px rgba(0,0,0,0.1);
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
    a {
        text-decoration: none !important;
    }    
    button {
      width: 100%;
      font-size: 12px;
      border-radius: 3px !important;
    }
  }
  .el-select-dropdown {
    ul {
      li {
        a {
          text-decoration: none !important;
          color: inherit;
        }
      }
    }
  }
</style>