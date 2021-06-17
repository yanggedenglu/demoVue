<template>
  <div class="email">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="reForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Email",
  data() {
    //校验方法
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
        email: "",
      },

      rules: {
        email: [
          {
            required: true,
            validator: checkEmail,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
            this.$store.dispatch('user/email',this.ruleForm).then(()=>{
                this.$message.success("email-send-----ok")
                this.$router.push('/login')
            }).catch(()=>{
                console.log("email-send-----fail")
            })
        } else {
          this.$message.error("error");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.email {
  width: 30%;
  height: 100%;
  margin-top: 30px;
}
</style>
