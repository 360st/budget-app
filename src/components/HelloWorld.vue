<script setup>


</script>

<template>
  <header>
    <el-row>
        <el-col>
          <h1>Marzec</h1>
          <el-row :gutter="10" class="no-padding">
            <el-col :xs="12" :sm="12">
              <div class="info-box padding">
                <p class="title">Dziś</p> 
                <p><span class="big orange" style="font-weight:700">120</span> / <span>132</span> <span class="small">PLN</span></p>
              </div>
            </el-col>            
            <el-col :xs="12" :sm="12">
              <div class="info-box padding">
                <p class="title">Miesiąc</p>
                <p><span class="big green" style="font-weight:700">1208</span> / <span>4000</span> <span class="small">PLN</span></p>
              </div>
            </el-col>
          </el-row>
        </el-col>
    </el-row>
  </header>
  <main>
         
  </main>
  <footer>

  </footer>
</template>

<style lang="scss">
  header {
    background: var(--vt-c-green);
    margin-bottom: 0.5rem;

    h1 {
      color: #fff;
      font-size: 40px;
      padding:1rem 0;
    }
    .info-box {
      background: #fff;
      border-radius: 3px;
      box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
      .title {
        font-size: 12px;
        color: var(--vt-c-blue);
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: -2px -2px 5px rgba(0,0,0,0.1);
    button {
      width: 100%;
      font-size: 12px;
      border-radius: 3px !important;
    }
  }
</style>
