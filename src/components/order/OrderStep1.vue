<template>
<div>
    <div class="order">
              <div class="order-row">
                <span>教师姓名：</span>
                <span class="order-title">李老师</span>
              </div>
              <div class="order-row">
                <span>教师编号：</span>
                <span class="order-title">123123</span>
              </div>
              <div class="order-row">
                <span>联系人员：</span>
                <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
              </div>
              <div class="order-row">
                <span>联系电话：</span>
                <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
              </div>
              <div class="order-row">
                <span>授课区域：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="order-row">
                <span>详细地址：</span>
                <el-input placeholder="请输入内容" v-model="input10" clearable></el-input>
              </div>
              <div class="order-row">
                <span>授课时间：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="order-row">
                <span>授课科目：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              
            </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/css/order/orderStep1.scss'
</style>