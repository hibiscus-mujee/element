<template>
  <div style="margin: 20px;">
    <ef-table
      ref="multipleTable"
      :rows="tableData"
      :cols="columns"
      need-merge
      children-prop="subjects"
      :table-events="{
        // 'select': handleSelect,
        // 'select-all': handleSelectAll,
        // selectionChange: handleSelectionChange,
        // cellMouseEnter: handleCellMouseEnter,
        // 'cell-dblclick': handleDblCellClick,
        // 'row-click': handleRowClick,
        // 'row-contextmenu': handleRowContextMenu,
        // 'row-dblclick': handleRowDblClick,
        // 'header-click': handleHeaderClick,
        // 'header-contextmenu': handleHeaderContextMenu,
        // 'sort-change': handleSortChange,
        // 'filter-change': handleFilterChange,
        // 'current-change': handleCurrentChange,
        // 'header-dragend': handleHeaderDragend,
        // 'expand-change': handleExpandChange
      }"
    ></ef-table>
  </div>
</template>

<script>
  import ElButton from 'element-ui/packages/button';
  import ElTag from 'element-ui/packages/tag';

  export default {
    components: { ElButton, ElTag },
    data() {
      return {
        input: 'Hello Element UI!',
        attach: {
          username: ''
        },
        conditions: [
          {
            field: "username",
            label: "用户名"
          }
        ],
        mergeSpanList: [
        ],
        columns: [
          {prop: 'id', label: 'ID', width: '150px'},
          {prop: 'name', label: '姓名'},
          {prop: 'subject', label: '科目'},
          {
            prop: 'examination',
            label: '考试',
            align: 'center',
            children: [
              {prop: 'exam1', label: '考试1'},
              {prop: 'exam2', label: '考试2'},
              {prop: 'exam3', label: '考试3'},
              {prop: 'exam4', label: '考试4'},
            ]
          },
          {prop: 'operate', label: '操作', denyMerge: true}
        ],
        tableData:  [
          {
            id: '10001',
            name: '王小虎',
            subjects: [
              {
                subject: '语文',
                exam1: 101.1,
                exam2: 101.2,
                exam3: 101.3,
                exam4: 101.4,
              },
              {
                subject: '数学',
                exam1: 102.1,
                exam2: 102.2,
                exam3: 102.3,
                exam4: 102.4,
              },
              {
                subject: '英语',
                exam1: 103.1,
                exam2: 103.2,
                exam3: 103.3,
                exam4: 103.4,
              },
            ]
          },
          {
            id: '10002',
            name: '王小美',
            subjects: [
              {
                subject: '语文',
                exam1: 111.1,
                exam2: 111.2,
                exam3: 111.3,
                exam4: 111.4,
              },
              {
                subject: '数学',
                exam1: 112.1,
                exam2: 112.2,
                exam3: 112.3,
                exam4: 112.4,
              },
              {
                subject: '英语',
                exam1: 113.1,
                exam2: 113.2,
                exam3: 113.3,
                exam4: 113.4,
              },
            ]
          },
          {
            id: '10003',
            name: '王小龙',
            subjects: [
              {
                subject: '语文',
                exam1: 121.1,
                exam2: 121.2,
                exam3: 121.3,
                exam4: 121.4,
              },
              {
                subject: '数学',
                exam1: 122.1,
                exam2: 122.2,
                exam3: 122.3,
                exam4: 122.4,
              },
              {
                subject: '英语',
                exam1: 123.1,
                exam2: 123.2,
                exam3: 123.3,
                exam4: 123.4,
              },
            ]
          },
        ],
      };
    },
    mounted() {
    },
    methods: {
      onLoad(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      },

      onSelect(index) {
        this.$refs.multipleTable.setCurrentRow(index);
      },
      toggleSelection(selections) {
        selections && this.$refs.multipleTable.toggleRowSelection(selections);
        !selections && this.$refs.multipleTable.clearSelection()
      },

      onSelectAll() {
        this.$refs.multipleTable.toggleAllSelection();
      },

      handleSelect(selection, row) {
        // console.log('select test', {selection, row});  // checked
      },

      handleSelectAll(val) {
        // console.log('select-all test', val);  // checked
      },

      handleSelectionChange(val) {
        // console.log('selection-change', val);  // checked
        // this.currentRow = val;
      },

      handleCellMouseEnter(row, column, cell, event) {
        // console.log('cell-mouse-enter test', {row, column, cell, event});  // checked
      },

      handleDblCellClick(row, column, cell, event) {
        // console.log('cell-dblclick test', {row, column, cell, event});  // checked
      },

      handleRowClick(row, column, event) {
        // console.log('row-click test', {row, column, event});  // checked
      },

      handleRowContextMenu(row, column, event) {
        // console.log('row-contextmenu test', {row, column, event});  // checked
      },

      handleRowDblClick(row, column, event) {
        // console.log('row-dblclick test', {row, column, event});  // checked
      },

      handleHeaderClick(column, event) {
        // console.log('header-click test', {column, event});  // checked
      },

      handleHeaderContextMenu(column, event) {
        // console.log('header-contextmenu test', {column, event});  // checked
      },

      handleSortChange({column, prop, order}) {
        // console.log('sort-change test', {column, prop, order});  // checked
      },

      handleFilterChange(filters) {
        // console.log('filter-change test', filters);  // checked
      },
      filterTag(value, row) {
        return row.tag === value;
      },

      handleCurrentChange(currentRow, oldCurrentRow) {
        console.log('current-change test', {currentRow, oldCurrentRow});  // checked
      },

      handleHeaderDragend(newWidth, oldWidth, column, event) {
        // console.log('header-dragend test', {newWidth, oldWidth, column, event});  // checked
      },

      handleExpandChange(row, expand) {
        // console.log('expand-change test', {row, expand});  // checked
      },
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
</style>
