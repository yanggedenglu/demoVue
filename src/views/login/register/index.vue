<template>
  <div class="register">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="admin" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>

      <el-form-item>
        <el-button @click="RegisterForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'

export default {
  name: 'Register',
  data() {
    var checkEmail = (rule, value, callback) => {
      const check =
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (check.test(this.ruleForm.email)) {
        // this.$message.success("email ok");
        callback()
      } else {
        callback(new Error('邮箱格式不正确'))
        // this.$message.error("email no");
      }
    }
    return {
      ruleForm: {
        username: '3333',
        password: '3333',
        email: '33@qq.com'
      },
      rules: {
        username: [
          { required: true, messsage: 'username', trigger: 'blur' }
          // {
          //   min: 3,
          //   max: 6,
          //   message: "3-6",
          //   trigger: "blur",
          // },
        ],
        password: [
          { required: true, message: 'password', trigger: 'blur' },
          {
            min: 3,
            max: 6,
            message: '3-6',
            trigger: 'blur'
          }
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 注册方法
    RegisterForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.ruleForm).then(() => {
            this.$router.push('/login')
            this.$message.success('注册成功，请登录')
          }).catch(() => {
            this.$message.error('注册失败，用户名已存在')
          })
        } else {
          this.$message.error('校验信息失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.register {
  width: 30%;
  height: 100%;
  margin-top: 20px;
}
</style>
