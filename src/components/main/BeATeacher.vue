<template>
  <div class="beATeacher">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="教师名称" prop="name">
        <el-input disabled v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="教师电话" prop="phone">
        <el-input disabled v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="教师邮箱" prop="email">
        <el-input disabled v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="教师编号" prop="card">
        <el-input disabled v-model="ruleForm.card"></el-input>
      </el-form-item>
      <el-form-item label="教师性别">
        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="毕业院校" prop="graduated">
        <el-input v-model="ruleForm.graduated" placeholder="请输入毕业的学校"></el-input>
      </el-form-item>
      <el-form-item label="文化水平" prop="education">
        <el-input v-model="ruleForm.education" placeholder="例如：大学本科"></el-input>
      </el-form-item>
      <el-form-item label="教龄" prop="teachage">
        <el-input v-model="ruleForm.teachage" placeholder="例如：3年"></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="teacherjob">
        <el-select v-model="ruleForm.teacherjob" placeholder="请选择你的职业">
          <el-option v-for="item in searchList[2].value" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学科目" prop="teachlesson">
        <el-select v-model="ruleForm.teachlesson" multiple placeholder="请选择教学科目，可多选">
          <el-option v-for="item in searchList[1].value" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学时间" prop="teachtime">
        <el-select v-model="ruleForm.teachtime" multiple placeholder="请选择教学时间，可多选">
          <el-option v-for="item in searchList[3].value" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学时间详细说明" prop="teachtimedis">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.teachtimedis"
          placeholder="请输入教学时间的详细说明，例如：每天下午 15:00-19:00"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price" style="width:100px;margin-right:10px;"></el-input>/小时
      </el-form-item>
      <el-form-item label="教学地点" prop="teacharea">
        <el-select v-model="ruleForm.teacharea" multiple placeholder="请选择教学地点，可多选">
          <el-option v-for="item in searchList[0].value" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教学地点详细说明" prop="areadis">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.areadis"
          placeholder="请输入教学地点的详细说明，例如：郫都区成都工业学院附近"
        ></el-input>
      </el-form-item>
      <el-form-item label="自我描述" prop="description">
        <el-input
          type="textarea"
          resize="none"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="ruleForm.description"
          placeholder="请输入对自己的介绍"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/">
          <el-button type="primary">放弃并返回首页</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkGraduated = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 50) {
        return callback(new Error("最大长度50"));
      } else {
        callback();
      }
    };
    var checkEducation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 50) {
        return callback(new Error("最大长度50"));
      } else {
        callback();
      }
    };
    var checkTeachAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("信息过长，最大长度10"));
      } else {
        callback();
      }
    };
    var checkSelect = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var checkSelectGroup = (rule, value, callback) => {
      if (value.length == 0) {
        return callback(new Error("不能为空"));
      } else {
        callback();
      }
    };
    var checkTeachTimeDis = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      } else if (value.length > 128) {
        return callback(new Error("信息过长"));
      } else {
        callback();
      }
    };
    var checkPrice = (rule, value, callback) => {
      var priceReg = /^\d*\.?\d+$/;
      if (!priceReg.test(value)) {
        return callback(new Error("格式不正确，请输入正的整数或小数"));
      } else {
        callback();
      }
    };
    return {
      searchList: [],
      ruleForm: {
        name: "",
        phone: "",
        email: "",
        card: "",
        sex: "男",
        graduated: "",
        education: "",
        teachage: "",
        teacherjob: "",
        teachlesson: "",
        teachtime: "",
        teachtimedis: "",
        price: "",
        teacharea: "",
        areadis: "",
        description: ""
      },
      rules: {
        graduated: [{ validator: checkGraduated, trigger: "blur" }],
        education: [{ validator: checkEducation, trigger: "blur" }],
        teachage: [{ validator: checkTeachAge, trigger: "blur" }],
        teacherjob: [{ validator: checkSelect, trigger: "change" }],
        teachlesson: [{ validator: checkSelectGroup, trigger: "change" }],
        teachtime: [{ validator: checkSelectGroup, trigger: "change" }],
        teacharea: [{ validator: checkSelectGroup, trigger: "change" }],
        teachtimedis: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        areadis: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        description: [{ validator: checkTeachTimeDis, trigger: "blur" }],
        price: [{ validator: checkPrice, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var self = this; //this保留起来
          this.axios
            .post("/api/insertTeacherInfo", {
              name:self.ruleForm.name,
              phone:self.ruleForm.phone,
              email:self.ruleForm.email,
              card:self.ruleForm.card,
              pic_path:sessionStorage.userPic,
              sex:self.ruleForm.sex,
              graduated:self.ruleForm.graduated,
              education:self.ruleForm.education,
              teachage:self.ruleForm.teachage,
              teacherjob:self.ruleForm.teacherjob,
              teachlesson:self.ruleForm.teachlesson.join(','),
              teachtime:self.ruleForm.teachtime.join(','),
              teachtimedis:self.ruleForm.teachtimedis,
              price:self.ruleForm.price,
              teacharea:self.ruleForm.teacharea.join(','),
              areadis:self.ruleForm.areadis,
              description:self.ruleForm.description,
              createTime: self.getNowDate(),
              flag:"未通过"
            })
            .then(response => {
              // console.log(response.data);
              if (response.data.status == "ok") {
                this.insertSuccess()
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
    },
    insertSuccess() {
        this.$confirm('信息已经提交，请等待管理员审核通过', '信息提交成功', {
          confirmButtonText: '查看',
          cancelButtonText: '返回首页',
          type: 'success'
        }).then(() => {
          this.$router.replace("publish")      
        }).catch(() => {
          this.$router.replace("/index")      
        });
      }
  },
  created() {
    this.ruleForm.name = sessionStorage.userName;
    this.ruleForm.phone = sessionStorage.userPhone;
    this.ruleForm.email = sessionStorage.userEmail;
    this.ruleForm.card = ("00000" + sessionStorage.userId).slice(-5);
    var self = this;
    this.$store.state.searchList.forEach(function(value, index) {
      value.value.shift();
      // console.log(value);
      self.searchList.push(value);
    });
    // console.log(this.searchList);
  }
};
</script>

<style lang="scss">
@import "@/assets/css/main/beATeacher.scss";
</style>
