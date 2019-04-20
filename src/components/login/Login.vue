<template>
  <div class="login">
    <el-row>
      <div class="login-top">
        <el-col :span="12">
          <router-link to="/">
            <img src="../../../static/images/logo.png" alt>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="login-top-right">
            <span class="hasNum">还没有账号？</span>
            <router-link :to="{name:'register'}">
              <el-button type="success">去注册</el-button>
            </router-link>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row class="login-content">
      <el-col :span="12">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554374631183&di=5736021b2110c1f84ac705b989d247db&imgtype=0&src=http%3A%2F%2Fs15.sinaimg.cn%2Fmw690%2F003sJslDzy7j2Y2eSwCee%26690" alt="">
      </el-col>
      <el-col :span="12">
          <p class="login-title">账号登录</p>
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input
              type="text"
              placeholder="请输入11位手机号"
              v-model="loginForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <p class="forget">忘记密码？</p>
          <el-form-item>
            <el-button class="loginbtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
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
      loginForm: {
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
          alert("submit!");
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