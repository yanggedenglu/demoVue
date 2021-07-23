<template>
  <el-dropdown v-if="menuList && menuList.length > 0">
    <el-button type="primary" size="mini">{{ $t('global.operation') }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in menuList" :key="item.title" @click.native="item.click(data)">{{ item.title }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  <el-tag v-else size="mini">{{ $t('global.noAuth') }}</el-tag>
</template>

<script>
export default {
  name: 'AuthDropdown',
  props: {
    menus: { type: Object, default() { return {} } },
    data: { type: Object, default() { return {} } }
  },
  computed: {
    menuList: function() {
      const menuArray = []
      if (this.menus.edit && this.menus.edit.show) {
        menuArray.push({ show: true, title: this.$t('global.edit'), click: this.menus.edit.click })
      }
      if (this.menus.delete && this.menus.delete.show) {
        menuArray.push({ show: true, title: this.$t('global.delete'), click: this.menus.delete.click })
      }
      if (this.menus.extra && this.menus.extra.length > 0) {
        this.menus.extra.forEach(item => {
          if (item.show) {
            menuArray.push(item)
          }
        })
      }
      return menuArray
    }
  }
}
</script>
