<template>
  <div class="group">
    <el-button-group>
      <el-button
        v-for="(item, index) in list"
        :key="index"
        :class="index === click_index ? 'click_button' : 'modify_button'"
        type="medium"
        @click="changeButton(index)">
        {{ item.name }}
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array, default: function() { return [] } },
    modify: { type: Number, default: 0 }
  },
  data() {
    return {
      is_init: false,
      click_index: 0
    }
  },
  /**
   * 挂载父组件自定义数据
   */
  mounted() {
    this.init()
  },
  /**
   * 1.组件中data数据被改变时执行
   * 2.父组件数据更新，子组件随之更新
   */
  updated() {
    this.init()
    // 确保结束初始化
    this.is_init = true
  },
  methods: {
    init() {
      if (!this.is_init) {
        if (this.list.length > 0) {
          // mounted挂载时成功 -> 初始化成功
          this.is_init = true
        }

        this.click_index = this.modify
      }
    },
    changeButton(index) {
      if (index !== '' && index >= 0) {
        this.click_index = index
        this.$emit('returnIndex', index)
      }
    },
    clear() {
      this.click_index = ''
    }
  }
}
</script>

<style scoped>
.group{
  display: inline-block;
  position: relative;
}
/* button */
.click_button{
  background: #409EFF;
  color: #fff;
}
</style>
