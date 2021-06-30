<template>
  <div class="test">
    <el-button :plain="true" @click="ClickMe">click me</el-button>
  </div>
</template>

<script>

export default {
  name: 'Test',
  data() {
    return {

    }
  },
  methods: {
    ClickMe: function() {
      this.$message.success('click me')
      this.$message({
        type: 'warning',
        dangerouslyUseHTMLString: true,
        message: '<strong>这是 <i>HTML</i> 片段</strong>',
        duration: 3000,
        center: true,
        showClose: true,
        onClose: () => { this.$message.error('error') }
      })
    }

  }
}
</script>

<style  scoped>

</style>
