<template>
  <div id="app">
    <!-- 定义@enlarge事件，执行时父组件会接收该事件并更新postFontSize值 -->
    <ButtonCom ref="ButtonCom" titles="prop传值--buttom1" @enlarge="postFontSize += 1" />
    <p :style="{ fontSize:postFontSize + 'em'}">{{ name }}</p>

    <!-- <ButtonCom2 ref="ButtonCom2" titles="prop传值" @enlargetwo="postFontSize -= $event" /> -->
    <ButtonCom2 ref="ButtonCom2" buttonw="prop传值--buttom2" @enlargetwo="reduce" />

    <el-button @click.once="getTitle()">点击回调组件</el-button><br>

    <layout
      ref="layout"
      :layout="layout"
      :likes="333"
      :published="true"
      :comment="[1,2,3,4,]"
      :author="{ name: 'valuning',age: 12 }"
    >
      <button slot="keng">父组件萝卜</button>
      <!-- 任何没有被包裹在带有 v-slot 的 template 中的内容都会被视为默认插槽的内容。 -->
      <p>父组件匿名插槽</p>
      <p slot="body">父组件body</p>
      <p slot="footer">父组件被丢弃插槽</p>

      <template v-slot:head>
        <h2>head</h2>
      </template>
      <template v-slot:main>
        <span>body</span>
      </template>
      <!-- 任何没有被包裹在带有 v-slot 的 template 中的内容都会被视为默认插槽的内容。 -->
      <template v-slot:default>
        默认插槽
      </template>
      <!-- 作用域插槽 -->
      <template v-slot:value="{ childValue = { name: '张三', age: 20 } }">
        <span>{{ childValue.name }},{{ childValue.age }}</span>
      </template>
    </layout>

  </div>
</template>

<script>
import ButtonCom from './component.vue'
import ButtonCom2 from './componenttwo.vue'
import layout from '../test2/index.vue'

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
