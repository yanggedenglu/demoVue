<template>
  <div>
    <br>
    拷贝对象，看控制台
    <el-button @click="objectInObject">深拷贝</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.obejctCopy()
  },
  methods: {
    // 对象深拷贝
    obejctCopy() {
      // 源对象小李
      const source = { name: '小李', age: 18, gender: '男', school: '清华大学' }
      // 拷贝小李
      const copy1 = { ...source }
      // 拷贝小李，并修改名字为小张
      const copy2 = { ...source, name: '小张' }
      // 修改源对象
      source.age = 19
      // 查看结果
      console.log(source)
      console.log(copy1)
      console.log(copy2)
    },
    // 对象中的对象深拷贝
    objectInObject() {
      // 源对象小李
      const source = { name: '小李', age: 18, gender: '男', school: '清华大学', more: { a: 'test', b: 2, c: {}}}
      // 拷贝小李
      const copy1 = { ...source }

      console.log(source === copy1) // false
      console.log(source.more === copy1.more) // true

      //
      const copy2 = { ...source, more: { ...source.more }}
      console.log(source.more === copy2.more) // false
    }
  }
}
</script>

<style>

</style>
