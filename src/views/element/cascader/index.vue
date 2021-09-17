<template>
  <div class="block">
    <span class="demonstration">级联选择器</span>
    <br>
    <el-cascader
      v-model="value"
      :options="options"
      :show-all-levels="true"
      clearable
      filterable
      collapse-tags
      :props="{expandTrigger:'hover', multiple:true }"
      @change="handleChange"
    />
    <hr>
    <span class="demonstration">颜色选择器</span>
    <br>
    <el-color-picker
      v-model="color"
      :predefine="predefines"
      show-alpha
      @change="changeColor"
    />
    <hr>
    <span class="demonstration">表格-合并单元格（行列）</span>
    <br>
    <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="amount1" sortable label="数值 1" />
      <el-table-column prop="amount2" sortable label="数值 2" />
      <el-table-column prop="amount3" sortable label="数值 3" />
    </el-table>
    <hr>
    <span class="demonstration" />
    <br>

  </div>
</template>

<script>

export default {
  name: 'Cascader',
  data() {
    return {
      value: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [
          {
            value: 'shejiyuanze', label: '设计原则',
            children: [
              { value: 'yizhi', label: '一致' },
              { value: 'fankui', label: '反馈' },
              { value: 'xiaolv', label: '效率' },
              { value: 'kekong', label: '可控' }]
          },
          {
            value: 'daohang', label: '导航',
            children: [
              { value: 'cexiangdaohang', label: '侧向导航' },
              { value: 'dingbudaohang', label: '顶部导航' }
            ]
          },
          {
            value: 'sousuo', label: '搜索',
            children: [
              { value: 'sousuo1', label: '搜索1' },
              { value: 'sousuo2', label: '搜索2' }
            ]
          }
        ]
      }],
      color: 'rgba(0, 0, 0, 0.6)',
      predefines: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],
      startVal: 0,
      endVal: 3000
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
    changeColor(value) {
      console.log(value)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2]
      //   } else if (columnIndex === 1) {
      //     return [0, 0]
      //   }
      // }
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style>
.block{
  margin: 10px;
}
</style>
