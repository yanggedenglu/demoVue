<template>
  <div>
    <h1>第一个组件</h1>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div>
        <div v-for="item in title" :key="item.value" class="left" @click="changeContext(item.value)">
          <!-- 过滤器两个方法 -->
          {{ item.name | twoArgs(item.value) }}
        </div>
        <div class="right">
          <!-- 过滤器串行 -->
          {{ showText | Upper | Lower }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 过滤器
  filters: {
    Upper: function(value) {
      value = value.toString()
      // slice() 方法可从已有的数组中返回选定的元素。
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    Lower: function(value) {
      value = value.toString()
      return value.slice(0, 1) + value.charAt(1).toUpperCase() + value.slice(2)
    },
    // 过滤器两个参数
    twoArgs: function(args1, value) {
      if (value === 1) {
        return args1 + 'first'
      } else {
        return args1 + 'second'
      }
    }
  },
  data() {
    return {
      name: '第一个组件',
      title: [
        {
          name: '目录1',
          value: 1
        },
        {
          name: '目录2',
          value: 2
        }
      ],
      context: [
        { id: 1, text: 'fir第一' },
        { id: 2, text: 'sec第二' }
      ],
      showText: ''
    }
  },
  methods: {
    changeContext(value) {
      this.showText = this.context[value - 1].text
    }
  }
}
</script>

<style>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .left{
    width: auto;
    height: auto;
    line-height: 50px;
    display: inline-block;
    margin-left: 20px;
  }
  .right{
    width: auto;
    height: auto;
    line-height: 50px;
    display: block;
  }
</style>
