<template>
  <div class="login bgLogin">
    <el-row>
      <div class="login-top">
        <el-col :span="12">
          <router-link to="/">
            <img src="../../../static/images/logo.png" alt>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="login-top-right">
            <span class="hasNum"></span>
            <router-link :to="{name:'defaultPage'}">
              <el-button type="success">返回首页</el-button>
            </router-link>
          </div>
        </el-col>
      </div>
    </el-row>
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
          <div class="errMsg">
            <span v-if="errMsg">用户名或密码错误</span>
          </div>

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
            <el-button class="loginbtn" type="primary" @click="submitForm('bgLoginForm')">登录</el-button>
            <el-button v-if="hasCookie" class="loginbtn" type="primary" @click="loginByCookie">已经登陆过了，立即登录</el-button>
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
      errMsg: false,
      hasCookie:false,
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.errMsg = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          // 收集用户名和密码发送给后端
          this.axios
            .post("/api/adminLogin", {
              phone: self.bgLoginForm.phone,
              password: self.bgLoginForm.password
            })
            .then(response => {
              console.log("接收后端响应登录请求的数据：", response.data);
              if (response.data.status == 'ok') {
                sessionStorage.adminNum = response.data.adminNum;
                sessionStorage.adminName = response.data.adminName;
                // this.$store.commit("setAdminNum", response.data.adminNum);
                this.$router.push("/bgIndex");
              } else {
                self.errMsg = true;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginByCookie(){
      this.$router.push({ path: '/bgIndex' })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created:function(){
    // console.log(document.cookie.indexOf('admin_num')) 判断cookie中是否有admin_num这个字段
    // console.log(sessionStorage)
    if(sessionStorage.adminName){ // 判断时候含有这个session字段
      this.hasCookie = true;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/login.scss";
.bgLogin {
  width: 100%;
  height: 100%;
}
</style>