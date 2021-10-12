<template>
  <!-- 自定义指令 -->
  <div style="margin:20px;">
    <hr>
    <el-input v-model="message" v-force:blue="message" type="text" />
    <el-button type="success" size="mini">自定义指令</el-button>
    <br>
  </div>
</template>

<script>
export default {
  directives: {
    // 自定义指令
    force: {
      bind: function() {
        // alert('hhh')
      },
      update: function(el, binding, vnode) {
        console.log(binding.name)
        el.style.backgroundColor = binding.value
        el.style.color = binding.arg
      },
      inserted(el) {
        el.focus()
      }
    }
  },
  data() {
    return {
      message: 'red'
    }
  },
  method: {
  }
}
</script>

<style>

</style>
