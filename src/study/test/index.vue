<template>
  <div>
    <div v-for="(widget, index) in widgetForm" :key="index">
      <el-form :inline="true" :model="widget" class="demo-form-inline">
        <el-form-item label="名字">
          <el-input v-model="widget.name" />
        </el-form-item>
        <el-form-item label="大小">
          <el-select v-model="widget.size" @change="changeStyle">
            <el-option
              v-for="item in size"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="widget.style">
            <el-option
              v-for="item in widgetStyle"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="字体">
          <el-select v-model="widget.font">
            <el-option
              v-for="item in font"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(index)">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="add">+</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      widgetStyle: [],
      widgetForm: [
        {
          name: '',
          fontColor: '',
          style: '',
          font: '',
          size: ''
        },
        {
          name: '',
          fontColor: '',
          style: '',
          font: '',
          size: ''
        }
      ],
      size: [
        { label: '小号', value: '0' },
        { label: '中号', value: '1' },
        { label: '大号', value: '2' }
      ],
      style: [
        {
          size: '0',
          widStyle: [
            { label: '类型1', value: '1' },
            { label: '类型2', value: '2' },
            { label: '类型3', value: '3' }
          ]
        },
        {
          size: '1',
          widStyle: [
            { label: '类型4', value: '4' },
            { label: '类型5', value: '5' },
            { label: '类型6', value: '6' }
          ]
        },
        {
          size: '2',
          widStyle: [
            { label: '类型7', value: '7' },
            { label: '类型8', value: '8' },
            { label: '类型9', value: '9' }
          ]
        }
      ],
      font: [
        { label: '字体一', value: '1111' },
        { label: '字体2', value: '2222' },
        { label: '字体3', value: '3333' }
      ]
    }
  },
  methods: {
    changeStyle(value) {
      this.style.forEach(item => {
        if (item.size === value) {
          this.widgetStyle = item.widStyle
          return
        }
      })
    },
    onSubmit(index) {
      console.log(this.widgetForm[index])
    },
    add() {
      this.widgetForm.push({
        name: '',
        fontColor: '',
        style: '',
        font: '',
        size: '' })
    }
  }
}
</script>

<style>

</style>
