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
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>-->
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.delFlag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="operate"
        width="200"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改弹框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form
            :model="editForm"
            label-width="100px"
            class="demo-ruleForm">
        <el-form-item label="username"  >
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, deleteUser, editUser } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      editForm: {
        id: null,
        username: "",
        email: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      getList({ pageSize: 10, pageCount: 1 }).then((response) => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

    //删除
    handleDelete(id) {
      deleteUser({ id: id }).then((response) => {
        if (response.data === -1) {
          this.$message.error("delete---fail")
        } else {
          this.$message.success("delete---success")
        }
        this.fetchData();
      });
    },
    // 修改信息
    handleEdit(row) {
      this.dialogFormVisible = true;
      // this.editForm.username = row.username;
      // this.editForm.email = row.email
      // this.editForm.id = row.id
      this.editForm = row
    },
    editUser(){
      editUser({ id: this.editForm.id, username: this.editForm.username, email: this.editForm.email }).then(response => {
        console.log(response.data)
        if (response.data === 1) {
          this.dialogFormVisible = false;
          this.$message.success("update----ok");
          this.fetchData();
        } else {
          this.$message.success("update----fail");
        }
      })
    }
  },
};
</script>
