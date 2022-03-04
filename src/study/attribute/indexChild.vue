<template>
  <div>
    <son />
    <el-select v-model="value" @change="changeList">
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.title"
        :value="item.value"
      />
    </el-select>
    <slot name="one" />
    <p>--------</p>
    <slot name="two">submit</slot>
  </div>
</template>

<script>
import son from './indexGrandSon'
export default {
  components: { son },
  // 禁用非props的属性挂载在根目录上， 如id，class，style
  // inheritAttrs: false,
  data() {
    return {
      list: [
        { title: '1', value: 1 },
        { title: '2', value: 2 },
        { title: '3', value: 3 }
      ],
      value: ''
    }
  },
  emits: {
    submit() {
      console.log('子组件emits')
    }
  },
  inject: ['grandSon'],
  created() {
    console.log('子组件', this.$attrs, this.grandSon)
    // $attrs获取非props属性
  },
  methods: {
    changeList() {
      this.$emit('submit')
    }
  }
}
</script>

<style>

</style>
