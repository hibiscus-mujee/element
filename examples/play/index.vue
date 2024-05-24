<template>
  <div style="margin: 20px;">
    <ef-table
      rowKey="id"
      :rows="tableData" :cols="columns"
      @expand-change="onExpand"
    ></ef-table>
  </div>
</template>

<script>
  import ElButton from 'element-ui/packages/button';
  import ElTag from 'element-ui/packages/tag';
  import { getTestData } from "../../test/unit/util";

  export default {
    components: { ElButton, ElTag },
    data() {
      return {
        columns: [
          { type: 'expand', cellClassName: row => {
              if (row._index === 0) {
                return false;
              }
              if (row._index === 1) {
                return 1;
              }
              if (row._index === 2) {
                return 'expand-custom';
              }
            } },
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' }
        ],
        tableData: getTestData()
      }
    },
    methods: {
      onExpand(row, expanded) {
        console.log("=>(index.vue:31) expanded", expanded);
      }
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
</style>
