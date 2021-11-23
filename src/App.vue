<template>
  <div class="container">
    <alertd />
    <el-row style="margin-top: 0">
      <el-col :span="24"><router-view /></el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import alertd from '@/components/AlertDialog.vue'
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  max-width: 960px;
  box-sizing: border-box;
  background: indigo;
  min-height: 100vh;
  border-radius: 4px;
  margin: 0 auto;
}
.el-row {
  margin: 10px;
}
.white {
  border-radius: 4px;
  background: white;
}

/* @media (max-width: 992px) {
  .container {
    max-width: 960px;
  }
}
@media (max-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media (max-width: 576px) {
  .container {
    max-width: 540px;
  }
} */
</style>
