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
      <!-- 父子组件间props  -->
      <el-col :span="6">{{ layout }}</el-col>
      <el-col :span="6">{{ likes }}</el-col>
      <el-col :span="6">{{ published }},{{ comment[0] }},{{ author.name }}</el-col>
    </el-row>
    <!-- v-solt 插槽 -->
    <el-row>
      <el-col>
        <slot name="keng">子组件萝卜坑</slot>
        <slot name="body">子组件body</slot>
        <slot>子组件匿名插槽</slot>
      </el-col>
      <el-col>
        <slot name="head" />
        <slot name="main" />
        <slot name="foot" />
      </el-col>
      <el-col>
        <slot name="value"  />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    layout: String,
    likes: Number,
    published : Boolean,
    comment: Array,
    author: Object
  },
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
