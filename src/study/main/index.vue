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
  </div>
</template>

<script>
import testslot from '../slot/slot.vue'
import first from '../component/first.vue'
import second from '../component/second.vue'

export default {
  components: {
    testslot,
    first: first,
    second: second
  },
  data() {
    return {
      currentComponent: 'first',
      fileList: []
    }
  },
  methods: {
    // 选择当前组件
    change(value) {
      this.currentComponent = value
    },
    selectFile() {
      console.log(this.$refs.file.files)
    }
  }
}
</script>

<style>

</style>
