<template>
  <div style="margin: 20px;">
    <ef-table :rows="tableData" :cols="columns" @filter-change="onFilterChange">
      <template #tag="{ row }">
        <el-tag :type="row.tag === '家' ? 'primary' : 'success'">{{ row.tag }}</el-tag>
      </template>
    </ef-table>
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
          { prop: 'date', label: '日期', sortable: true },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' },
          {
            prop: 'tag',
            columnKey: 'tag',
            label: '标签',
            filters: [
              { text: '家', value: '家' },
              { text: '公司', value: '公司' }
            ],
            filterMethod: (value, row) => row.tag === value
          }
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            tag: '家'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            tag: '公司'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            tag: '家'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            tag: '公司'
          }
        ]
      }
    },
    methods: {
      onFilterChange(val) {
        console.log("=>(index.vue:65) val", val);
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
