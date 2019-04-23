<template>
  <div class="add-admin">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="300px"
      class="demo-ruleForm"
      v-show="addForm"
    >
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="管理员编号" prop="adminNum">
        <el-input v-model="ruleForm.adminNum"></el-input>
        <span class="errTips" v-if="adminNumUn">管理员编号已存在</span>
      </el-form-item>
      <el-form-item label="管理员电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
        <span class="errTips" v-if="phoneUn">手机号已存在</span>
      </el-form-item>
      <el-form-item label="管理员密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="ruleForm.repassword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="success" v-if="choose">
      <p>管理员添加成功！！！</p>
      <div class="btn">
        <router-link to="adminManage">
          <el-button type="success">立即查看</el-button>
        </router-link>
        <el-button type="info" @click="addAgain">继续添加</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员名称"));
      } else if (value.length < 2 || value.length > 16) {
        callback(new Error("管理员名称长度4-16"));
      } else {
        callback();
      }
    };
    var checkAdminNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员编号"));
      } else if (value.length != 5) {
        callback(new Error("管理员编号长度5"));
      } else {
        callback();
      }
    };
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
    var checkRePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error("密码长度4-16"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      adminNumUn: false,
      phoneUn: false,
      addForm: true,
      choose: false,
      ruleForm: {
        name: "",
        adminNum: "",
        phone: "",
        password: "",
        repassword: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        adminNum: [{ validator: checkAdminNum, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        repassword: [{ validator: checkRePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.adminNumUn = false;
      this.phoneUn = false;
      // console.log(sessionStorage.adminName)
      // console.log(sessionStorage.adminNum)
      // console.log(this.getNowDate())
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          this.axios
            .post("/api/insertAdmin", {
              name: self.ruleForm.name,
              adminNum: self.ruleForm.adminNum,
              phone: self.ruleForm.phone,
              password: self.ruleForm.password,
              createrName:sessionStorage.adminName,
              createrNum:sessionStorage.adminNum,
              createTime:self.getNowDate()
            })
            .then(response => {
              console.log(response.data);
              if (response.data.status == "ok") {
                this.addForm = false;
                this.choose = true;
              } else {
                if (response.data.message == "phoneUn") {
                  this.phoneUn = true;
                } else if (response.data.message == "adminNumUn") {
                  this.adminNumUn = true;
                }
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addAgain() {
      this.choose = false;
      this.addForm = true;
      this.resetForm("ruleForm");
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
@import "@/assets/css/backstage/addAdmin.scss";
</style>
