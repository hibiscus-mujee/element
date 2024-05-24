<template>
  <el-table
    ref="table"
    :data="tableData"
    :style="{ width: '100%' }"
    v-bind="Object.assign({}, tableOptions, $attrs)"
    :default-expand-all="defaultExpandAll"
    :expand-row-keys="expandRowKeys"
    :row-key="rowKey"
    v-on="tableListeners"
    :span-method="spanMethod"
    :cell-class-name="cellClassName || onCellClassName"
    @current-change="onCurrentChange"
  >
    <template #empty>
      <slot name="empty">
        <div class="ef-table--empty">暂无数据...</div>
      </slot>
    </template>

    <template #append>
      <slot name="append"></slot>
    </template>

    <template v-for="column in cols">
      <ef-column-select
        v-if="column._show!==false"
        ref="efColumnSelect"
        :column="column"
        :fields="validFields"
        :selectable="selectable"
        :key="column.prop || column.type"
      >
        <template #expand="{ row, column }">
          <slot name="expand" :row="row" :column="column"></slot>
        </template>
        <template v-for="field in validFields" #[field.prop]="{ row }">
          <slot :name="field.prop" :row="row">
            {{ field.format ? field.format(row, tableData) : row[field.prop] }}
          </slot>
        </template>
        <template v-for="field in validFields" #[addHeader(field.prop)]="{ column }">
          <slot :name="addHeader(field.prop)" :column="column">{{ column.label }}</slot>
        </template>
      </ef-column-select>
    </template>
  </el-table>
</template>

<script>
  import EfColumnSelect from './ef-column-select';

  export default {
    name: 'EfTable',
    components: { EfColumnSelect },
    props: {
      rows: {
        type: Array,
        default: function() {
          return [];
        }
      },
      cols: {
        type: [Array, Object],
        default: function() {
          return [];
        }
      },
      tableOptions: {
        type: Object,
        default: function() {
          return {};
        }
      },
      childrenProp: {
        type: String,
        default: 'children'
      },
      needMerge: Boolean,
      mergeSpanList: {
        type: Array,
        default: function() {
          return [];
        }
      },
      selectable: {
        // 选择框情况下，禁止选中判断方法（row）
        type: Function,
        default: () => {
          return true;
        }
      },
      selected: {
        type: Function,
        default: () => {
          return false;
        }
      },
      radioByRowClick: Boolean,
      defaultExpandAll: Boolean,
      expandRowKeys: Array,
      rowKey: [String, Function],
      cellClassName: [String, Function]
    },
    data() {
      return {
        childrenKeys: [],
        selections: []
      };
    },
    watch: {
      rows: {
        immediate: true,
        handler: function() {
          if (this.hasCheckbox) {
            this.setDefaultSelectedRow();
          }
        }
      }
    },
    computed: {
      tableData() {
        const tables = [];
        this.rows.forEach((row, idx) => {
          row._index = idx;
          if (
            // 需要合并并且存在子项的预处理
            this.needMerge &&
            row.hasOwnProperty(this.childrenProp) &&
            row[this.childrenProp] instanceof Array &&
            row[this.childrenProp].length > 0
          ) {
            let spanFlag = true;
            row[this.childrenProp].forEach(child => {
              if (row[this.childrenProp].length === 1) {
                tables.push(Object.assign({}, row, child));
              } else if (spanFlag) {
                this.childrenKeys = this.childrenKeys.length > 0 ? this.childrenKeys : Object.keys(child);
                tables.push(Object.assign({}, row, child, {
                  _needMerge: true,
                  _mergeLength: row[this.childrenProp].length
                }));
                spanFlag = false;
              } else {
                tables.push(Object.assign({}, row, child, {
                  _needMerge: true,
                  _mergeLength: 0
                }));
              }
            });
          } else {
            // 不需要合并的情况
            tables.push(row);
          }
        });
        return this.needMerge ? tables : this.rows;
      },

      validFields() {
        const ret = [];
        const keys = [];
        this.recursion(this.cols).forEach(item => {
          item.denyMerge && this.childrenKeys.push(item.prop); // 使用 denyMerge 避免被合并
          // 剔除重复属性
          if (!keys.includes(item.prop)) {
            ret.push(item);
            keys.push(item.prop);
          }
        });
        return ret;
      },

      hasRadio() {
        return !!this.cols.find(t => t.type === 'radio');
      },
      hasCheckbox() {
        return !!this.cols.find(t => ['selection', 'radio'].includes(t.type));
      },
      tableListeners() {
        const evts = {};
        if (this.hasRadio) {
          evts['row-click'] = this.onRowClick.bind(this);
        } else if (this.hasCheckbox) {
          evts['selection-change'] = this.onSelectionChange.bind(this);
        }
        return Object.assign({}, this.$listeners, evts);
      }
    },
    mounted() {
      this.setDefaultSelectedRow();
    },
    methods: {
      setDefaultSelectedRow() {
        if (this.selected) {
          this.$nextTick(() => {
            this.tableData.forEach(row => {
              if (this.selected(row)) {
                this.$refs.table.toggleRowSelection(row, true);
              }
            });
          });
        }
        if (this.hasRadio) {
          const radioCol = this.cols.find(col => col.type === 'radio');
          if (!radioCol) return;

          this.$nextTick(() => {
            // 当页面数据发生改动时需要先重置单选状态
            this._syncCurRadio(null);

            this.tableData.forEach(row => {
              this._setDefaultRadio(row, radioCol);
            });
          });
        }
      },

      addHeader(prop) {
        return prop + '-header';
      },

      getEveryOffset(offset) {
        let left = 0;
        let right = 0;
        if (typeof offset === 'number') {
          left = 0;
          right = offset;
        } else if (offset instanceof Array) {
          switch (offset.length) {
            case 1:
              left = 0;
              right = offset[0];
              break;
            case 2:
              left = offset[0];
              right = offset[1];
              break;
            default:
              console.error('偏移量 offset 为数组类型时长度只允许为 1 和 2。');
              break;
          }
        } else if (offset && offset instanceof Object) {
          left = offset.left || left;
          right = offset.right || right;
        }
        if (left + right < Math.abs(left) + Math.abs(right)) {
          left = 0;
          right = 0;
          console.error('偏移量 offset 每个方向上的数值必须为非负数。');
        }
        return { left, right };
      },

      recursion(columns) {
        let res = [];
        for (let column of columns) {
          res.push(column);
          if (Array.isArray(column.children)) {
            res.push(...this.recursion(column.children));
          } else {
            res.push(column);
          }
        }
        return res;
      },

      onCellClassName(props) {
        const { columnIndex } = props;
        const col = this.cols[columnIndex] || {};
        if (col.type === 'expand') {
          return this._showExpand(props);
        }
      },

      _showExpand(props) {
        const { row, rowIndex, columnIndex } = props;
        let rowKey = this.rowKey;
        if (typeof this.rowKey === 'function') {
          rowKey = this.rowKey(row);
        }
        const hasRowKey = rowKey && Object.keys(row).includes(rowKey);
        // 存在默认展开时此功能失效，因为这里只是隐藏了展开按钮，实际中展开节点还是存在
        if (this.defaultExpandAll || (hasRowKey && (this.expandRowKeys || []).length > 0)) {
          return;
        }
        const col = this.cols[columnIndex] || {};
        if (typeof col.cellClassName === 'function') {
          const isExpand = col.cellClassName(row);
          if (typeof isExpand === 'boolean') {
            return isExpand ? '' : 'ef-table-expand_none';
          }
          if (typeof isExpand === 'number') {
            return rowIndex === isExpand ? '' : 'ef-table-expand_none';
          }
          return isExpand;
        }
      },

      _setDefaultRadio(row, col) {
        if (typeof col.radioCheck === 'function' && col.radioCheck(row)) {
          this._syncCurRadio(row);
          this.$refs.table.setCurrentRow(row);
        }
      },

      spanMethod({ row, column, rowIndex, columnIndex }) {
        if (this.needMerge && !this.childrenKeys.includes(column.property)) {
          if (row.hasOwnProperty('_mergeLength')) {
            return row._needMerge && row._mergeLength ? [row._mergeLength, 1] : [0, 0];
          }
        }
        if (this.needMerge && this.mergeSpanList.length > 0) {
          const spanInfo = this.mergeSpanList.find(info => {
            const { spanPosition } = info;
            return rowIndex === spanPosition[0];
          });
          if (spanInfo) {
            const { spanPosition, offset } = spanInfo;
            let { left, right } = this.getEveryOffset(offset);
            if (columnIndex === spanPosition[1]) {
              if (
                spanPosition[1] - left < 0 ||
                (row._needMerge && !this.childrenKeys.includes(this.cols[spanPosition[1] - left].prop))
              ) {
                left = 0;
              }
              return {
                rowspan: 1,
                colspan: 1 + left + right
              };
            } else if (spanPosition[1] - left <= columnIndex && columnIndex <= spanPosition[1] + right) {
              return [0, 0];
            }
          }
        }
      },

      getSelection() {
        return this.selections;
      },

      onRowClick(row) {
        this.$emit('on-row-click', row);
      },

      onCurrentChange(row) {
        // 单选时才需要触发 on-selection
        this.hasRadio && this.$emit('on-selection', row);
        this.$nextTick(() => {
          this._syncCurRadio(row);
        });
      },

      onSelectionChange(rows) {
        this.selections = rows;
        this.$emit('on-selection', this.selections);
        this.$emit('selection-change', this.selections);
      },

      refresh() {
        this.$refs.table.doLayout();
      },

      _syncCurRadio(row) {
        const radioRef = this.$refs.efColumnSelect.find(ref => ref.$refs.radio);
        const curRadio = row ? row._index : null;
        radioRef && radioRef.setCurRadio(curRadio);
      },

      // 对外暴露 ElTable 的方法
      clearSelection() {
        this.$refs.table.clearSelection();
      },
      toggleRowSelection(row, selected) {
        let currentRow = null;
        if (row || row === 0) {
          if (typeof row === 'number') {
            currentRow = this.tableData.find(item => item._index === row);
          } else if (row.constructor === Object) {
            currentRow = row;
          } else {
            console.error('[EfTable Error]toggleRowSelection 参数必须为行对象或行索引');
            return;
          }
        }
        currentRow && this.$refs.table.toggleRowSelection(currentRow, selected);
      },
      toggleAllSelection() {
        this.$refs.table.toggleAllSelection();
      },
      toggleRowExpansion(row, expanded) {
        this.$refs.table.toggleRowExpansion(row, expanded);
      },
      setCurrentRow(row) {
        let currentRow = null;
        if (row || row === 0) {
          if (typeof row === 'number') {
            currentRow = this.tableData.find(item => item._index === row);
          } else if (row.constructor === Object) {
            currentRow = row;
          } else {
            console.error('[EfTable Error]setCurrentRow 参数必须为行对象或行索引');
            return;
          }
        }
        this._syncCurRadio(currentRow); // 同步单选按钮状态
        this.$refs.table.setCurrentRow(currentRow);
      },
      clearSort() {
        this.$refs.table.clearSort();
      },
      clearFilter(columnKey) {
        this.$refs.table.clearFilter(columnKey);
      },
      doLayout() {
        this.$refs.table.doLayout();
      },
      sort(prop, order) {
        this.$refs.table.sort(prop, order);
      }
    }
  };
</script>
