<template>
  <div>1
    <el-transfer
      v-model="value"
      :data="data"
      filterable
      filter-placeholder="请输入筛选条件"
      @change="changeTransfer"
      @left-check-change="changeLeft"
      @right-check-change="changeRight"
    />
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1, 4]
    }
  },
  methods: {
    changeTransfer(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    changeLeft(value, selectValue) {
      console.log(value, selectValue)
    },
    changeRight(value, selectValue) {
      console.log(value, selectValue)
    }
  }
}
</script>

<style scoped>

</style>
