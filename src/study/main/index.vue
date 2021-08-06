<template>
  <div id="app">
    <h2>study</h2>
    <testslot>
      <span style="font-size: 20px">萝卜</span>
      <span slot="first">父组件1</span>
      <p>匿名</p>
      <template v-slot:second>
        <span>父组件2</span>
      </template>
      <!-- slotchild 自定义名字 -->
      <template v-slot:yu="slotchild">
        <p>{{ slotchild.child.name }}</p>
      </template>
      <template v-slot:yuyu="{ childhh }">
        <p>{{ childhh.hhh }}</p>
      </template>
    </testslot>
    <hr>
    <hr>
    <!-- 动态组件 -->
    <el-button type="primary" @click="change('first')">第一个组件</el-button>
    <el-button type="danger" @click="change('second')">第二个组件</el-button>
    <!--  <keep-alive>讲失活的组件缓存起来 -->
    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>
    <input ref="file" type="file" webkitdirectory @change.stop="selectFile">

    <hr>
    <el-button type="danger" @click="dialogUpload = true">上传+进度条</el-button>
    <el-button type="danger" @click="timer">timer</el-button>
    <!-- dialog -->
    <el-dialog
      title="提示"
      :visible.sync="dialogUpload"
      width="40%"
      @close="clearList"
    >
      <upload-and-progress
        ref="and"
        :loading="loading"
        :directory="false"
        :per="list.length"
        @fileChange="fileChange"
        @clearChange="clearChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button v-point="loading" type="primary" @click="uploadAndProgress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import testslot from '../slot/slot.vue'
import first from '../component/first.vue'
import second from '../component/second.vue'

import uploadProgress from '../upload/upload-progress.vue'
import { upload } from '@/api/upload'
import uploadAndProgress from '../upload/upload-and-progress.vue'
export default {
  components: {
    testslot,
    first: first,
    second: second,
    uploadProgress,
    uploadAndProgress
  },
  // directives: {
  //   // 自定义指令
  //   point: {
  //     update: function(el, binding, vnode) {
  //       console.log(el.class)
  //       // 监听点击事件
  //       el.addEventListener('click', () => {
  //         if (!el.disabled) {
  //           el.disabled = true
  //           if (binding.value === false) {
  //             setTimeout(() => {
  //               el.disabled = false
  //             }, 2000)
  //           }
  //         }
  //       })

  //       // console.log('el', el)
  //       // console.log('binding', binding.value)
  //       // console.log('vnode', vnode)
  //     }
  //   }
  // },
  data() {
    return {
      currentComponent: 'first',
      fileList: [],
      list: [],
      dialogUpload: false,
      loading: false
    }
  },
  methods: {
    // 选择当前组件
    change(value) {
      this.currentComponent = value
    },
    selectFile() {
      console.log(this.$refs.file.files)
    },
    clearList() {
      this.list = []
      this.$refs.and.clearFileList()
    },
    // upload-and-progress方法
    uploadAndProgress() {
      if (this.list.length === 0) {
        this.$message.error('选择图片')
        return
      }

      this.loading = true
      const promiseList = []
      // 循环上传
      this.list.forEach(item => {
        const form = new FormData()
        form.append('file', item.file)
        const pm = new Promise((res, rej) => {
          upload(form).then(result => {
            res({ result: result })
            this.$refs.and.getData(true)
          }).catch(() => {
            this.$refs.and.getData(false)
            res({ result: 'err' })
          })
        })
        promiseList.push(pm)
      })
      // 校验Promise结果
      Promise.all(promiseList).then(res => {
        setTimeout(() => {
          this.list = []
          this.dialogUpload = false
          this.loading = false
        }, 1000)
      })
    },
    // 上传文件
    fileChange(list) {
      this.list.push(list)
    },
    // 清空文件
    clearChange() {
      this.list = []
    },
    // time
    timer() {
      var myDate = new Date()// 获取的是本机时间
      console.log(myDate.getYear())
      // 在浏览器内 getYear 返回的是 "当前年份-1900" 的值，IE则是直接将1900加上了，返回的 2017。
      console.log('获取完整的年份(4位)---' + myDate.getFullYear()) // 可正确获取年份
      console.log('获取当前月份(0-11)---' + myDate.getMonth()) // 0代表1月
      console.log('获取当前日(1-31)---' + myDate.getDate())
      console.log('获取当前星期X(0-6---' + myDate.getDay()) // 0代表星期天
      console.log('获取当前时间(从1970.1.1开始的毫秒数)---' + myDate.getTime())
      console.log('获取当前小时数(0-23)---' + myDate.getHours())
      console.log('获取当前分钟数(0-59)---' + myDate.getMinutes())
      console.log('获取当前秒数(0-59)---' + myDate.getSeconds())
      console.log('获取当前毫秒数(0-999)---' + myDate.getMilliseconds())
      console.log('获取当前日期---' + myDate.toLocaleDateString())
      console.log('获取当前时间---' + myDate.toLocaleTimeString())
      console.log('获取日期与时间---' + myDate.toLocaleString())
    }
  }
}
</script>

<style>
</style>
