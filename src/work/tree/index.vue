<template>
  <div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :props="defaultProps"
    />
    <div class="buttons">
      <el-button @click="updateKeyChildren">更改</el-button>
    </div>
  </div>
</template>
<script>
export default {

  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          disabled: true
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    updateKeyChildren() {
      // 获取节点数据
      const node = this.$refs.tree.getNode(2)
      // 子节点数据
      const children = node.data.children
      console.log(children)
      if (children.length <= 2) {
        const data = []
        children.forEach(item => {
          if (item.id === 5) {
            data.push({ id: item.id, label: item.label, disabled: true })
          } else {
            data.push({ id: item.id, label: item.label, disabled: false })
          }
        })
        // 更新节点数据
        this.$refs.tree.updateKeyChildren(2, data)
      }/*  */
    }
  }
}
</script>
