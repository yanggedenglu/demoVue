<template>
  <div id="app">
    <!-- gutter：栏间隔   offset：分栏偏移  span:分栏-->
    <el-row>
      <el-col :span="24"><div class="bg-purple-dark"></div></el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="12"><div class="bg-purple-light"></div></el-col>
      <el-col :span="12"><div class="bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="4">
      <el-col :span="8"><div class="bg-purple-light"></div></el-col>
      <el-col :span="8"><div class="bg-purple"></div></el-col>
      <el-col :span="8"><div class="bg-purple-light"></div></el-col>
    </el-row>
    <el-row :gutter="6">
      <el-col :span="6" :offset="6"><div class="bg-purple-light"></div></el-col>
      <el-col :span="6" :offset="6"><div class="bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :span="4"><div class="bg-purple"></div></el-col>
      <el-col :span="4"><div class="bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="bg-purple"></div></el-col>
      <el-col :span="4"><div class="bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="bg-purple"></div></el-col>
      <el-col :span="4"><div class="bg-purple-light"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

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