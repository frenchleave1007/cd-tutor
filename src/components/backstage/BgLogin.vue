<template>
  <div class="login">
    <el-row class="login-content">
      <el-col :span="12">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554374631183&di=5736021b2110c1f84ac705b989d247db&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fmw690%2F003sJslDzy7j2Y2eSwCee%26690"
          alt
        >
      </el-col>
      <el-col :span="12">
        <p class="login-title">后台登录</p>
        <el-form
          :model="bgLoginForm"
          status-icon
          :rules="rules"
          ref="bgLoginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              type="text"
              placeholder="请输入11位手机号"
              v-model="bgLoginForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="bgLoginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <p class="forget">忘记密码？</p>
          <el-form-item>
            <el-button type="primary" @click="submitForm('bgLoginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (value.length != 11) {
        callback(new Error("请输入11位手机号"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error("密码长度4-16"));
      } else {
        callback();
      }
    };
    return {
      bgLoginForm: {
        phone: "",
        password: ""
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this;//this保留起来
          // 收集用户名和密码发送给后端
          this.axios.post('/api/bglogin',{
              phone:self.bgLoginForm.phone,
              password:self.bgLoginForm.password
          }).then(response => {
            console.log("接收后端响应登录请求的数据：",response.data)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/login.scss";
</style>