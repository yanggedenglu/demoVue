<template>
  <div id="app">
    <!-- gutter：栏间隔   offset：分栏偏移  span:分栏-->
    <el-row>
      <el-col :span="24"><div class="bg-purple-dark" /></el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="4"><div class="bg-purple" /></el-col>
      <el-col :span="4"><div class="bg-purple-light" /></el-col>
      <el-col :span="4"><div class="bg-purple" /></el-col>
      <el-col :span="4"><div class="bg-purple-light" /></el-col>
      <el-col :span="4"><div class="bg-purple" /></el-col>
      <el-col :span="4"><div class="bg-purple-light" /></el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="6"><div class="bg-purple" /></el-col>
      <el-col :span="6"><div class="bg-purple" /></el-col>
      <el-col :span="6"><div class="bg-purple" /></el-col>
      <el-col :span="6"><div class="bg-purple" /></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childData: {
        name: 'child',
        age: 20
      }
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark{
  background: #99a9bf;
  width: 100%;
  height: 20px;
}
.bg-purple-light{
  background: #e5e9f2;
  width: 100%;
  height: 20px;
}
.bg-purple{
  background: #d3dce6;
  width: 100%;
  height: 20px;
}

</style>
