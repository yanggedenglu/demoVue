<template>
  <div id="app">
    <!-- 定义@enlarge事件，执行时父组件会接收该事件并更新postFontSize值 -->
    <ButtonCom ref="ButtonCom" titles="prop传值--buttom1" @enlarge="postFontSize += 1" />
    <p :style="{ fontSize:postFontSize + 'em'}">{{ name }}</p>

    <!-- <ButtonCom2 ref="ButtonCom2" titles="prop传值" @enlargetwo="postFontSize -= $event" /> -->
    <ButtonCom2 ref="ButtonCom2" buttonw="prop传值--buttom2" @enlargetwo="reduce" />
    <!-- 调用子组件方法 -->
    <el-button @click.once="getTitle()">点击回调组件</el-button><br>

    <!-- 引入子组件 -->
    <layout />

  </div>
</template>

<script>
import ButtonCom from './component.vue'
import ButtonCom2 from './componenttwo.vue'
import layout from '../layout/index.vue'

export default {
  name: 'ComIndex',
  components: {
    ButtonCom,
    ButtonCom2,
    layout
  },
  data() {
    return {
      postFontSize: 1,
      name: 'what',
      layout: 'prop动态传值'
    }
  },
  methods: {
    getTitle() {
      this.$nextTick(() => {
        // this.$refs.ButtonCom这是个使用ref绑定的子组件，调用了子组件的getTitle方法
        this.$refs.ButtonCom.getTitle()
      })
    },
    // 缩小
    reduce(narrow) {
      this.postFontSize -= narrow
    }
  }
}
</script>

<style>

</style>
