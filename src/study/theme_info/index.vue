<template>
  <div>
    <search-page-table v-loading="loading" v-if="!themeUploadVisible" ref="pageTable" :list="dataList" style="width: 100%" @select-change="handleSelectionChange">
      <el-row slot="customHeader">
        <el-button v-if="this.$rbac.p('theme.data.upload')" type="primary" @click="themeUpload">上传主题<i class="el-icon-upload el-icon--right"/></el-button>
        <el-button v-if="multipleSelection && multipleSelection.length > 0" type="primary" @click="batchPublishHandle" >一键上架<i class="el-icon-check el-icon--right"/></el-button>
        <el-button v-if="multipleSelection && multipleSelection.length > 0" type="danger" @click="batchOffShelfHandle">一键下架<i class="el-icon-close el-icon--right"/></el-button>
      </el-row>
      <el-table-column
        v-if="this.$rbac.p('theme.data.publish') || this.$rbac.p('theme.data.lower')"
        type="selection"
        width="40px"/>
      <el-table-column width="100px" label="ID" align="center" prop="id" sortable />
      <el-table-column :show-overflow-tooltip="true" label="主题名称" align="center" prop="name" sortable />
      <el-table-column label="预览图" align="center" prop="coverPath" sortable >
        <template slot-scope="scope">
          <el-popover
            placement="right"
            trigger="hover">
            <img :src="scope.row.previewImgUrl" class="preview-img-big" @click="openPreviewImgHandle(scope.row.previewImgUrl)">
            <img slot="reference" :src="scope.row.previewImgUrl" class="preview-img-small">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Icon数量" align="center" prop="iconCount" sortable />
      <el-table-column label="设计师" align="center" prop="authorName" sortable />
      <el-table-column label="状态" align="center" prop="status" sortable >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="info">未上架</el-tag>
          <el-tag v-if="scope.row.status === 100" type="success">上架</el-tag>
          <el-tag v-if="scope.row.status === -1" type="danger">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="置顶" align="center" prop="sequence" sortable >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sequence === 1000" type="primary">已置顶</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="time" sortable >
        <template slot-scope="scope">
          {{ $rbac.f(scope.row.time) }}
        </template>
      </el-table-column>
      <el-table-column label="上架时间" align="center" prop="time" sortable >
        <template slot-scope="scope">
          {{ scope.row.publishTime === 0 ? '' : $rbac.f(scope.row.publishTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" type="primary">
              操作<i class="el-icon-arrow-down el-icon--right"/>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="scope.row.status !== 100 && $rbac.p('theme.data.publish')" @click.native="publishHandle(scope.row)" >上架</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.status !== -1 && $rbac.p('theme.data.lower')" @click.native="offShelfHandle(scope.row)">下架</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.sequence !== 1000 && $rbac.p('theme.data.set.sequence')" @click.native="setSequenceHandle(scope.row, 1000)">置顶</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.sequence === 1000 && $rbac.p('theme.data.set.sequence')" @click.native="setSequenceHandle(scope.row, 0)">取消置顶</el-dropdown-item>
              <el-dropdown-item @click.native="addOrCheckHandle(scope.row, true)" >查看详情</el-dropdown-item>
              <el-dropdown-item @click.native="addOrCheckHandle(scope.row)" >编辑</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </search-page-table>
    <theme-upload v-else ref="themeUpload" @close="themeUploadVisible = false" @refresh="queryThemeList"/>
    <upload-zip v-if="uploadZipVisible" ref="uploadZip" @uploadFinished="uploadZipHandle" />
  </div>
</template>

<script>
import ThemeDataApi from '@/api/theme/theme_data'
import ThemeUpload from '../theme_upload'
import UploadZip from '../theme_upload/upload'
export default {
  name: 'ThemeInfo',
  components: { ThemeUpload, UploadZip },
  data() {
    return {
      uploadZipVisible: false,
      loading: false,
      themeUploadVisible: false,
      multipleSelection: [],
      dataList: []
    }
  },
  mounted() {
    this.queryThemeList()
  },
  methods: {
    // 上传主题
    themeUpload() {
      this.uploadZipVisible = true
      this.$nextTick(() => {
        this.$refs.uploadZip.init()
      })
    },
    // 主题信息解析
    uploadZipHandle(themeData) {
      this.themeUploadVisible = true
      this.$nextTick(() => {
        this.$refs.themeUpload.uploadZipHandle(themeData)
      })
    },
    addOrCheckHandle(row, readonly) {
      this.themeUploadVisible = true
      this.$nextTick(() => {
        this.$refs.themeUpload.init(row.id, readonly)
      })
    },
    handleSelectionChange(values) {
      this.multipleSelection = values
    },
    openPreviewImgHandle(url) {
      window.open(url)
    },
    setSequenceHandle(row, sequence) {
      let tip = '确定置顶此主题？'
      if (sequence === 0) {
        tip = '是否将此主题置顶取消？'
      }
      this.$confirm(tip, this.$t('global.tips'), {
        confirmButtonText: this.$t('global.confirm'),
        cancelButtonText: this.$t('global.cancel'),
        type: 'warning'
      }).then(() => {
        ThemeDataApi.setSequence({ id: row.id, sequence: sequence }).then((result) => {
          if (result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
              onClose: () => {
                this.queryThemeList()
              }
            })
          } else {
            this.$message.error(this.$t('global.fail'))
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error)
        })
      })
    },
    batchPublishHandle() {
      this.publishHandle()
    },
    publishHandle(row) {
      const themeIds = []
      if (row) {
        console.log(row)
        themeIds.push(row.id)
      } else {
        this.multipleSelection.forEach(item => {
          themeIds.push(item.id)
        })
      }
      this.$confirm('确定上架所选主题？', this.$t('global.tips'), {
        confirmButtonText: this.$t('global.confirm'),
        cancelButtonText: this.$t('global.cancel'),
        type: 'warning'
      }).then(() => {
        ThemeDataApi.publish(themeIds).then((result) => {
          if (result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
              onClose: () => {
                this.queryThemeList()
              }
            })
          } else {
            this.$message.error(this.$t('global.fail'))
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error)
        })
      })
    },
    batchOffShelfHandle() {
      this.offShelfHandle()
    },
    offShelfHandle(row) {
      const themeIds = []
      if (row) {
        themeIds.push(row.id)
      } else {
        this.multipleSelection.forEach(item => {
          themeIds.push(item.id)
        })
      }
      this.$confirm('确定下架所选主题？', this.$t('global.tips'), {
        confirmButtonText: this.$t('global.confirm'),
        cancelButtonText: this.$t('global.cancel'),
        type: 'warning'
      }).then(() => {
        ThemeDataApi.offShelf(themeIds).then((result) => {
          if (result) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
              onClose: () => {
                this.queryThemeList()
              }
            })
          } else {
            this.$message.error(this.$t('global.fail'))
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error)
        })
      })
    },
    queryThemeList() {
      ThemeDataApi.queryList().then(data => {
        this.dataList = data
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error)
      })
    }
  }
}

</script>

<style scoped>
.preview-img-small{
  height: 45px;
  width: auto;
}
.preview-img-big{
  width: 180px;
  height: auto;
  cursor: pointer;
}
</style>
