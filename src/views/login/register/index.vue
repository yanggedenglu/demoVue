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
      <el-form-item label="code" prop="code">
        <el-col :span="12">
          <el-input v-model="ruleForm.code" />
        </el-col>
        <el-col :span="12">
          <el-button type="primary" style="margin-left:0px" @click="sendEmail('ruleForm')">发送</el-button>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button @click="RegisterForm">注册</el-button>
        <router-link to="./login">
          <el-link type="primary" class="return">登录</el-link>
        </router-link>
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
        email: '786112390@qq.com',
        sessionId: '',
        code: ''
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
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        code: [{ required: true }]
      }
    }
  },
  methods: {
    // 注册方法
    RegisterForm() {
      // localStorage中的sessionId
      this.ruleForm.sessionId = localStorage.getItem('sessionId') == null ? '' : localStorage.getItem('sessionId')
      if (this.ruleForm.sessionId === '') {
        this.$message.error('请先发送验证码')
        return
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.ruleForm).then((response) => {
            console.log(response.data)
            if (response.data === -2) {
              this.$message.error('验证码错误')
            } else if (response.data === -1) {
              this.$message.error('用户名已存在')
            } else {
              this.$router.push('/login')
              this.$message.success('注册成功，请登录')
              localStorage.removeItem('sessionId')
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          this.$message.error('校验信息失败')
          return false
        }
      })
    },
    sendEmail(ruleForm) {
      // 	Function(props: array | string, callback: Function(errorMessage: string)) errorMessage为空，验证成功
      this.$refs.ruleForm.validateField('email', (email) => {
        //
        if (!email) {
          this.$store.dispatch('user/email', this.ruleForm).then((response) => {
            this.$message.success('验证码已发送')
            this.ruleForm.sessionId = response.data
            localStorage.setItem('sessionId', response.data)
          }).catch(() => {
            this.$message.error('验证码发送失败')
          })
        } else {
          this.$message.error('邮箱未输入')
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
.return{
  margin-left: 20px;
}
</style>
