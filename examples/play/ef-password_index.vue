<template>
  <div style="margin: 20px;">
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <ef-password v-model="formData.pwd"></ef-password>
      </el-form-item>
    </el-form>
    <el-button @click="onConfirm">提交</el-button>
  </div>
</template>

<script>
  import axios from 'axios';

  const getPage = (params) => axios.get('https://mock.apifox.cn/m1/1456597-0-default/test', { params })

  export default {
    data() {
      const columns = [
        {prop: 'date', label: '日期'},
        {prop: 'name', label: '姓名'},
        {prop: 'address', label: '地址'},
      ]
      return {
        formData: {
          pwd: null,
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 26, message: '长度在 8 到 26 个字符', trigger: 'blur' },
          ]
        },
      };
    },
    mounted() {
    },
    methods: {
      onConfirm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log('success')
          } else {
            console.log('error')
          }
        })
      },
    }
  };
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .ef-popover {
    margin-top: 0 !important;
  }
</style>
