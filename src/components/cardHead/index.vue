<template>
  <!-- card头部组件 -->
  <el-card v-loading="loading" class="box-card">
    <div slot="header" class="clearfix">
      <div class="theme-form-header-back"><svg-icon class="theme-form-header-back-icon" icon-class="theme-back" @click="cancelHandle" /></div>
      <span class="theme-form-header-title">{{ title }}</span>
      <div v-for="(item, index) in menus" :key="index" class="theme-form-header-menus">
        <el-button v-if="item.show" :type="item.type" size="medium" class="theme-form-header-button" @click="item.click">{{ item.title }}</el-button>
      </div>
    </div>
    <slot name="body" />
  </el-card>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, default() { return false } },
    title: { type: String, default() { return '' } },
    menus: { type: Array, default() {} }
  },

  data() {
    return {

    }
  },
  methods: {
    cancelHandle() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-card__header{
  padding: 15px 10px;
}
.box-card{
  width: 100%;
  height: auto;
}
.theme-form-header-back{
  width: 30px;
  float: left;
  margin-top: 10px;
}
.theme-form-header-title{
  margin-top: 10px;
  margin-right: 10px;
  float: left;
}
.theme-form-header-back-icon{
  cursor: pointer;
}
.theme-form-header-menus{
  float: left;
}
.theme-form-header-button{
  margin-left: 10px;
}
</style>
