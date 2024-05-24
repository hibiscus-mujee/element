<template>
  <div style="margin: 20px;">
    <div style="margin: 10px 0">
      <span>高度：15px</span>
      <ef-search :attach="attach" :conditions="conditions" :height="15"></ef-search>
    </div>
    <div style="margin: 10px 0">
      <span>高度：20px</span>
      <ef-search :attach="attach" :conditions="conditions" :height="20"></ef-search>
    </div>
    <div style="margin: 10px 0">
      <span>高度：25px</span>
      <ef-search :attach="attach" :conditions="conditions" :height="25"></ef-search>
    </div>
    <div style="margin: 10px 0">
      <span>高度：30px</span>
      <ef-search :attach="attach" :conditions="conditions" :height="30"></ef-search>
    </div>
    <div style="margin: 10px 0">
      <span>高度：35px</span>
      <ef-search :attach="attach" :conditions="conditions" :height="35"></ef-search>
    </div>
    <div style="margin: 10px 0">
      <span>高度：40</span>
      <ef-search :attach="attach" :conditions="conditions" :height="40"></ef-search>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        attach: {
          username: ''
        },
        conditions: [
          {
            field: 'username',
            label: '用户名',
            closable: true
          }
        ],
      };
    },
    mounted() {
      // this.getTableData();
    },
    methods: {
      setCurrent(index) {
        this.$refs.singleTable.setCurrentRow(index);
      },
      handleCurrentChange(val) {
        console.log(val);
      },

      handleClose(tag) {
        console.log('custom close');
        this.ruleForm[tag.prop] = 'test';
      },

      submitForm() {
        this.$refs.EfForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.EfForm.resetFields();
      }
    },
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
