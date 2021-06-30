<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>-->
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.delFlag == false ? 'success' : 'danger'">
            {{ scope.row.delFlag == false ? '正常' : '冻结' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="创建日期"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label=""
        width="200"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">修改信息</el-button>
          <el-button size="mini" @click="dialogPassVisible = true, handlePass(scope.row)">修改密码</el-button>
          <el-button
            size="mini"
            :type="scope.row.delFlag == false ? 'danger' : ''"
            @click="scope.row.delFlag == false ? handleDelete(scope.row.id): handleOpen(scope.row.id) "
          >
            {{ scope.row.delFlag == false ? '冻结' : '解冻' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改用户信息弹框 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="username">
          <el-input v-model="editForm.username" :disabled="true" />
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="editForm.email" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码弹框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPassVisible">
      <el-form
        ref="editPassForm"
        :rules="rules"
        :model="editPassForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="oldPass" prop="oldPass">
          <el-input v-model="editPassForm.oldPass" type="password" />
        </el-form-item>
        <el-form-item label="newPass" prop="newPass">
          <el-input v-model="editPassForm.newPass" type="password" />
        </el-form-item>
        <el-form-item label="rePass" prop="rePass">
          <el-input v-model="editPassForm.rePass" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPassVisible = false">取 消</el-button>
        <el-button type="primary" @click="editPass('editPassForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteUser, editUser, editPass } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    // 校验密码
    var newPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        // 校验重复新密码是否一致
        if (this.editPassForm.rePass !== '') {
          this.$refs.editPassForm.validateField('rePass')
        }
        callback()
      }
    }
    var rePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.editPassForm.newPass) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      dialogPassVisible: false,
      editForm: {
        id: null,
        username: '',
        email: ''
      },
      editPassForm: {
        id: null,
        oldPass: '',
        newPass: '',
        rePass: ''
      },
      rules: {
        oldPass: [{ required: true, trigger: 'blur' }],
        newPass: [{ required: true, validator: newPass, trigger: 'blur' }],
        rePass: [{ required: true, validator: rePass, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取表格列表信息
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      getList({ pageSize: 10, pageCount: 1 }).then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },

    // 冻结账户
    handleDelete(id) {
      this.$confirm('是否冻结账户？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: id, status: true }).then((response) => {
          if (response.data === -1) {
            this.$message.error('冻结失败')
          } else {
            this.$message.success('冻结成功')
          }
          this.fetchData()
        })
      })
    },
    // 解冻账户
    handleOpen(id) {
      this.$confirm('是否解冻账户？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: id, status: false }).then((response) => {
          if (response.data === -1) {
            this.$message.error('解冻失败')
          } else {
            this.$message.success('解冻成功')
          }
          this.fetchData()
        })
      }).catch(() => {
        // 取消调用catch
      })
    },

    // 修改信息弹框
    handleEdit(row) {
      this.dialogFormVisible = true
      // this.editForm.username = row.username;
      // this.editForm.email = row.email
      // this.editForm.id = row.id
      this.editForm = row
    },
    // 修改用户信息
    editUser() {
      editUser({
        id: this.editForm.id,
        username: this.editForm.username,
        email: this.editForm.email
      }).then((response) => {
        if (response.data === 1) {
          this.dialogFormVisible = false
          this.$message.success('修改信息成功')
          this.fetchData()
        } else {
          this.$message.error('修改信息失败,邮箱重复')
        }
      })
    },
    // 修改密码弹框
    handlePass(row) {
      this.editPassForm.id = row.id
      this.editPassForm.oldPass = ''
      this.editPassForm.newPass = ''
      this.editPassForm.rePass = ''
    },
    // 修改密码
    editPass(editPassForm) {
      this.$refs[editPassForm].validate((valid) => {
        if (valid) {
          editPass({
            id: this.editPassForm.id,
            oldPass: this.editPassForm.oldPass,
            newPass: this.editPassForm.newPass
          }).then((response) => {
            if (response.data === -1) {
              this.$message.error('修改密码失败,原密码不正确')
            } else {
              this.$message.success('修改密码成功')
              this.dialogPassVisible = false
            }
          })
        } else {
          this.$message.error('密码校验不正确')
        }
      })
    }
  }
}
</script>
