<template>
  <div class="admin-three">
    <el-row>
      <el-col :span="8" class="block_col">
        <div class="list-header">
          <!-- 全选 -->
          <input type="checkbox" @click="changeDoneAll">
          <!-- 添加 -->
          <input type="text" placeholder="input list" class="list-add" @keyup.enter="addDone">
        </div>
        <!-- 循环计划 -->
        <div v-for="(item,index) in list" :key="index" style="display:flew;height:auto;">
          <input type="checkbox" :checked="item.done" @click="changeDone(index)">
          <span :style="item.done ? 'text-decoration:line-through;color:#d9d9d9;' : ''">{{ item.text }}</span>
          <button class="list-body-button" @click="delDone(item)">X</button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { text: 'list one', done: false },
        { text: 'list 221', done: false },
        { text: 'list 333', done: true },
        { text: 'list 333', done: true },
        { text: 'list 333', done: true }
      ],
      done: true
    }
  },
  methods: {
    // 添加计划
    addDone(e) {
      this.list.push({ text: e.target.value, done: false })
      e.target.value = ''
    },
    // 完成计划
    changeDone(index) {
      const done = !this.list[index].done
      this.list[index].done = done
      console.log(this.list)
    },
    // 全选
    changeDoneAll() {
      this.list.forEach(item => {
        item.done = this.done
      })
      this.done = !this.done
    },
    // 删除计划
    delDone(item) {
      this.list.splice(this.list.indexOf(item), 1)
    }
  }
}
</script>

<style scoped>
.block_col{
  padding: 5px;
  background-color: #fff;
}
.list-add{
  margin: 0px 20px;
  border: none;
}
.list-body-button{
  color: red;
  background-color: #fff;
  border: none;
}
</style>
