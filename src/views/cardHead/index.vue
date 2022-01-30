<template>
  <div>
    <cardHead
      :loading="false"
      :menus="[
        { title:'新增', show: true, click:clickInsert, type:'primary' },
        { title:'新增', show: true, click:clickInsert, type:'danger' }
      ]"
      title="test"
      @close="returnClose"
    >
      <div slot="body">
        1
      </div>
    </cardHead>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    clickInsert() {
      console.log('init')
    },
    returnClose() {
      console.log('close')
    }
  }
}
</script>

<style scoped>
.body{
  width: 100%;
  height: auto;
}
</style>
