<template>
  <div id="app">
    <slot>子组件插槽</slot>
    <slot name="first">子组件1</slot>
    <slot name="second">子组件2</slot>
    <!-- child 自定义名字 -->
    <slot name="yu" :child="data"></slot>
    <slot name="yuyu" :childhh="hh"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        name: 'liu'
      },
      hh: {
        hhh: 'hhh'
      }
    }
  }
}
</script>

<style>

</style>
