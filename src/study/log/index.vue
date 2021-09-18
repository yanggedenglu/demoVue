<template>
  <div>
    <h1>1</h1>
    <div class="log-viewer">
      <br>
      <!-- 定义的table作为存放日志数据标签的父类 -->
      <table style="width:90%;margin-left:10px" />
    </div>
  </div>
</template>

<script>
import { getLog, Close } from '@/api/log'
export default {
  data() {
    return {
      myInterval: '',
      log: ''
    }
  },
  created() {
    // 后端重置读取位置
    Close()
    // 实现轮询读取日志
    this.myInterval = window.setInterval(() => {
      setTimeout(this.getLog(), 0)
    }, 1000)
  },
  destroyed() {
    // 关闭轮询
    clearInterval(this.myInterval)
  },
  methods: {
    // 读取日志
    getLog() {
      const vm = this
      getLog().then(res => {
        if (res.data !== '') {
          this.log = res.data
          const split = this.log.split('\n')
          split.forEach(item => {
            // const row = document.createElement('tr')
            // const col = document.createElement('td')
            const pre = document.createElement('pre')
            pre.innerHTML = item
            // col.appendChild(pre)
            // row.appendChild(col)
            vm.$el.querySelector('.log-viewer > table').appendChild(pre)
          })
        }
      })
    }
  }
}
</script>

<style  lang="scss">
html{
  line-height: 1
}

pre {
    word-wrap: break-word;
    white-space: pre-wrap;
    margin: 5px 0px ;
    font-size: 0.875em;
}
</style>
