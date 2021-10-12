<template>
  <!--
    vue对象复制（深拷贝，多层对象拷贝方式在后面）
  https://blog.csdn.net/liusa825983081/article/details/118723285?ops_request_misc=&request_id=&biz_id=102
  &utm_term=vue%E4%B8%AD%E5%A4%8D%E5%88%B6%E5%9B%BE%E7%89%87%E5%AF%B9%E8%B1%A1&utm_medium=distribute.pc_search_result
  .none-task-blog-2~all~sobaiduweb~default-2-118723285.pc_search_result_hbase_insert&spm=1018.2226.3001.4187
 -->
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
