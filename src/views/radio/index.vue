<template>
  <div>
    <h2>radio</h2>
    <hr>
    <el-radio v-model="radio" label="1" border size="redium" @change="el_radio">备选项</el-radio>
    <el-radio v-model="radio" label="2" size="redium" @change="el_radio">备选项</el-radio>
    <hr>
    <el-radio-group v-model="radio" @change="el_radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
    <hr>
    <el-checkbox-group v-model="checkList">
      <el-checkbox label="复选框 A" checked />
      <el-checkbox label="复选框 B" />
      <el-checkbox label="复选框 C" />
      <el-checkbox label="禁用" disabled />
      <el-checkbox label="选中且禁用" disabled />
    </el-checkbox-group>
    <hr>
    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;" />
    <el-checkbox-group v-model="checkedCities" border fill="red" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
    </el-checkbox-group>
    <hr>

    <div class="demo-input-suffix">
      属性方式：
      <el-input v-model="input1" placeholder="请选择日期" suffix-icon="el-icon-date" disabled />
      <el-input v-model="input2" clearable @clear="clearList" />
      <el-input
        v-model="input3"
        placeholder="请输入内容"
        prefix-icon="el-icon-eleme"
        clearable
        readonly
      />
    </div>
    <hr>
    <el-input-number
      v-model="inputNumber"
      :min="1"
      :max="10"
      label="描述文字"
      :step="2"
      :precision="2"
      size="medium"
      controls-position="right"
      @change="handleChange"
    />
    <hr>
  </div>
</template>
<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data() {
    return {
      radio: '',
      checkList: [],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: false,
      input1: '',
      input2: '',
      input3: 'hhhhhhhh',
      inputNumber: 1
    }
  },
  methods: {
    // 单选
    el_radio() {
      console.log(this.radio)
    },
    // 全选
    handleCheckAllChange(val) {
      // console.log(val)
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      // console.log(value)
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    // 清空
    clearList() {
      this.input3 = ''
      this.$nextTick(() => {
        this.input3 = 'gggggg'
      }).setTimeout(() => {

      }, 500)
    },
    // 步数改变
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>
</style>
