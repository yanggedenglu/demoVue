<template>
  <div style="padding:20px">
    <el-select
      v-model="value"
      placeholder="请选择"
      clearable
      @change="change"
      @visible-change="visiblechange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <hr>
    <el-select
      v-model="valueList"
      placeholder="请选择"
      clearable
      multiple
      filterable:true
      reserve-keyword:true
      @remove-tag="removeTag"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <hr>
    <el-date-picker
      v-model="datetime"
      type="datetime"
      placeholder="选择日期时间"
      time-arrow-control:true
      format="yyyy-MM-dd hh:mm:ss"
      default-value="2021-7-1"
      default-time="13:00:00"
    />
    <hr>
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{ value: '选项1', label: '黄金糕' },
        { value: '选项2', label: '双皮奶' },
        { value: '选项3', label: '蚵仔煎' },
        { value: '选项4', label: '龙须面' },
        { value: '选项5', label: '北京烤鸭' }],
      value: '',
      valueList: [],
      datetime: '',
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules: []
    }
  },
  methods: {
    // 选中值发生变化时触发
    change(value) {
      console.log(value)
    },
    // 下拉框出现/隐藏时触发
    visiblechange(value) {
      console.log(value)
    },
    // 移除
    removeTag(value) {
      console.log(value)
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
.el-select{
  width: 300px;
}
</style>
