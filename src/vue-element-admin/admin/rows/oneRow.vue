<template>
  <div class="one-row-page">
    <el-row>
      <el-col :span="6" class="block_col">
        <div class="block_item">
          <count-to ref="countTo" :start-val="0" :end-val="20000" :duration="2000" />
        </div>
      </el-col>
      <el-col :span="6" class="block_col">
        <div class="block_item">
          <count-to ref="countTo" :start-val="0" :end-val="20000" :duration="2000" />
        </div>
      </el-col>
      <el-col :span="6" class="block_col">
        <div class="block_item">
          <count-to ref="countTo" :start-val="0" :end-val="20000" :duration="2000" />
        </div>
      </el-col>
      <el-col :span="6" class="block_col">
        <div class="block_item">
          <count-to ref="countTo" :start-val="0" :end-val="20000" :duration="2000" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  }
}
</script>

<style scoped>
.block_col{
  padding: 5px;
}
.block_item{
  height: 100px;
  background-color: #fff;
}
</style>
