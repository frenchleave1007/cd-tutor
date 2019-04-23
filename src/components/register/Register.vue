<template>
  <div class="register">
    <el-row>
      <div class="register-top">
        <el-col :span="12">
          <router-link to="/">
            <img src="../../../static/images/logo.png" alt>
          </router-link>
        </el-col>
        <el-col :span="12">
          <div class="register-top-right">
            <span class="hasNum">已有账号？</span>
            <router-link :to="{name:'login'}">
              <el-button type="success">立即登录</el-button>
            </router-link>
          </div>
        </el-col>
      </div>
    </el-row>
    <el-row class="register-content">
      <el-form
        :model="regForm"
        status-icon
        :rules="regRules"
        ref="regForm"
        label-width="100px"
        class="demo-ruleForm"
        v-if="!regSuccess"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="regForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="regForm.phone"></el-input>
          <span class="errTips" v-if="phoneUn">手机号已存在</span>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="regForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="regForm.rePassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('regForm')">提交</el-button>
          <el-button @click="resetForm('regForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="regSuccess" v-if="regSuccess">
        <div class="wrapper">
          <p>
            <i class="el-icon-success"></i>注册成功！！！
          </p>
          <router-link to="/mainIndex">
            <el-button type="success">返回首页</el-button>
          </router-link>
          <router-link to="/login">
            <el-button type="success">立即登录</el-button>
          </router-link>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，汉字）
      var userNameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,16}$/;
      if (!userNameReg.test(value)) {
        callback(new Error("格式错误！请输入2-16位的汉字、字母或数字"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      //手机号正则
      var phoneReg = /^1[34578]\d{9}$/;
      if (!phoneReg.test(value)) {
        callback(new Error("格式错误！请输入正确的11位手机号"));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      //Email正则
      var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!emailReg.test(value)) {
        callback(new Error("格式错误！请输入正确邮箱"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      //密码正则，最少6位，数字字母下划线
      var pwdReg = /^[a-zA-Z0-9_]{6,16}$/;
      if (!pwdReg.test(value)) {
        callback(new Error("密码格式：6-16位的数字、字母或下划线"));
      } else {
        callback();
      }
    };
    var checkRePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      phoneUn: false,
      regSuccess: false,
      regForm: {
        userName: "",
        phone: "",
        email: "",
        password: "",
        rePassword: ""
      },
      regRules: {
        userName: [{ validator: checkUserName, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        rePassword: [{ validator: checkRePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.phoneUn = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          this.axios
            .post("/api/insertUser", {
              userName: self.regForm.userName,
              phone: self.regForm.phone,
              email: self.regForm.email,
              password: self.regForm.password,
              createTime: self.getNowDate()
            })
            .then(response => {
              console.log(response.data);
              if (response.data.status == "ok") {
                this.regSuccess = true;
              } else {
                if (response.data.message == "phoneUn") {
                  this.phoneUn = true;
                }
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getNowDate() {
      var date = new Date();
      var year, month, day, hours, minutes;
      year = date.getFullYear();
      month = ("0" + (date.getMonth() + 1)).slice(-2);
      day = ("0" + date.getDate()).slice(-2);
      hours = ("0" + date.getHours()).slice(-2);
      minutes = ("0" + date.getMinutes()).slice(-2);
      var str = year + "-" + month + "-" + day + "  " + hours + ":" + minutes;
      return str;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/register.scss";
</style>