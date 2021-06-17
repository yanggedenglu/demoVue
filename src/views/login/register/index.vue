<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="admin" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
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
  name: "Register",
  data() {
    var checkEmail = (rule, value, callback) => {
      let check =
        /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (check.test(this.ruleForm.email)) {
        // this.$message.success("email ok");
        callback();
      } else {
        callback(new Error("email no"));
        // this.$message.error("email no");
      }
    };
    return {
      ruleForm: {
        username: "3333",
        password: "3333",
        email: "33@qq.com",
      },
      rules: {
        username: [
          { required: true, messsage: "username", trigger: "blur" },
          // {
          //   min: 3,
          //   max: 6,
          //   message: "3-6",
          //   trigger: "blur",
          // },
        ],
        password: [
          { required: true, message: "password", trigger: "blur" },
          {
            min: 3,
            max: 6,
            message: "3-6",
            trigger: "blur",
          },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    RegisterForm() {
      console.log(this.ruleForm)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.ruleForm).then(() => {
            console.log("register---ok")
            this.$router.push('/login')
            this.$message.success("register----ok")
          }).catch(() => {
             console.log("register---error")
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
  
    },
  },
};
</script>

<style scoped>
.register {
  width: 30%;
  height: 100%;
  margin-top: 20px;
}
</style>
