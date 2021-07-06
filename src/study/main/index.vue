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
      <template v-slot:yuyu="slothhh">
        <p>{{ slothhh.childhh.hhh }}</p>
      </template>
    </testslot>
  </div>
</template>

<script>
import testslot from '../slot/slot.vue'
export default {
  components: {
    testslot
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>

</style>
