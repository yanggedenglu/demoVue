<template>
  <div class="admin-three-child">
    <li>
      <label @dblclick="dbClick">{{ todo.text }}</label>
      <input
        v-show="rewirte"
        :value="todo.text"
        @keyup.enter="updateTodo"
        @keyup.esc="cancelTodo"
        @blur="updateTodo"
      >
    </li>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rewirte: false
    }
  },
  methods: {
    // 双击显示
    dbClick() {
      this.rewirte = true
    },
    // 回调父组件更新方法
    updateTodo(e) {
      this.$emit('updateTodo', { todo: this.todo, value: e.target.value })
      this.rewirte = false
    },
    cancelTodo(e) {
      e.target.value = ''
      this.rewirte = false
    }
  }
}
</script>

<style scoped>
li{
  list-style: none;
}
</style>
