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
    <!-- dialog -->
    <el-dialog
      title="提示"
      :visible.sync="dialogUpload"
      width="40%"
      @close="clearList"
    >
      <upload-and-progress ref="and" :per="list.length" @fileChange="fileChange" @clearChange="clearChange" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpload = false">取 消</el-button>
        <el-button type="primary" @click="uploadAndProgress">确 定</el-button>
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
  data() {
    return {
      currentComponent: 'first',
      fileList: [],
      list: [],
      dialogUpload: false
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
    // upload-and-progress
    uploadAndProgress() {
      if (this.list.length === 0) {
        this.$message.error('选择图片')
        return
      }
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
        console.log('promise')
        setTimeout(() => {
          this.list = []
          this.dialogUpload = false
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
    }
  }
}
</script>

<style>
</style>
