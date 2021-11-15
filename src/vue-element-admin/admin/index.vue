<template>
  <div class="admin-page">
    <!-- 第一行标签 -->
    <one-rows />
  </div>
</template>

<script>
import oneRows from './rows/oneRow.vue'
export default {
  components: {
    oneRows
  }
}
</script>

<style scoped>
.admin-page{
  display: block;
  background-color: #f0f2f5;
  padding: 10px;
}
</style>
