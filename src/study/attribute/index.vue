<template>
  <div>
    1
    <selectView id="dad_view" @change="showChange" @submit="child">
      <p slot="one" style="color:red;">插槽{{ parentValue }}</p>
      <!-- <p slot="two" style="color:red;">插槽2---{{ parentValue }}</p> -->
    </selectView>
  </div>
</template>

<script>
import selectView from './indexChild.vue'
export default {
  components: { selectView },
  data() {
    return {
      parentValue: 3333
    }
  },
  // 跨层级传递到下层组件
  provide: {
    grandSon: 'son---'
  },
  methods: {
    showChange(event) {
      console.log('父组件', event)
    },
    child() {
      console.log('child')
    }
  }
}
</script>

<style scoped>

</style>
