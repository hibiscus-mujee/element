<template>
  <el-dropdown trigger="click" :hide-on-click="false" size="small" v-bind="$attrs">
    <el-button><i class="el-icon-setting"></i></el-button>
    <el-dropdown-menu v-slot="dropdown">
      <el-dropdown-item>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onCheckAll">
          全选
        </el-checkbox>
      </el-dropdown-item>
      <el-checkbox-group v-model="selection" @change="onChange">
        <el-dropdown-item v-for="col in columns" :key="col.prop">
          <el-checkbox :label="col.prop" :checked="col._show" :disabled="col.disabled">
            {{ col.label }}
          </el-checkbox>
        </el-dropdown-item>
      </el-checkbox-group>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'EfColumn',
    props: {
      cols: {
        type: Array,
        default: function() {
          return [];
        }
      },
      table: Object,
      index: String
    },
    data() {
      const columns = this.cols.filter(t => t.label && t.prop);
      columns.forEach(t => this.$set(t, '_show', t._show != null ? t._show : true));

      return {
        columns,
        checkAll: false,
        isIndeterminate: true,
        selection: []
      };
    },
    computed: {
      storeKey() {
        const canStore = window.localStorage;
        return canStore && (this.index || this.$route && (this.$route.name + '-table'));
      }
    },
    created() {
      const store = this.getStore();
      if (store && store.length) this.columns.forEach(t => this.$set(t, '_show', store.includes(t.prop)));
    },
    mounted() {
      this.selection = this.columns.filter(t => t._show).map(t => t.prop);
      this.onChange(false);
    },
    methods: {
      getStore() {
        const storeKey = this.storeKey;
        if (!storeKey) return null;
        const val = localStorage.getItem(storeKey);
        if (!val) return null;
        return JSON.parse(val);
      },
      setStore() {
        const storeKey = this.storeKey;
        if (!storeKey) return;
        const vals = this.columns.filter(t => t._show === true).map(t => t.prop);
        localStorage.setItem(storeKey, JSON.stringify(vals));
      },
      onChange(store) {
        let checkedCount = this.selection.length;
        this.checkAll = checkedCount === this.columns.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.columns.length;
        this.handleEvent(store);
      },
      onCheckAll(val) {
        const disabled_items = () => this.columns.filter(t => t.disabled).map(t => t.prop);
        this.selection = val ? this.columns.map(item => item.prop) : disabled_items();
        this.isIndeterminate = this.selection.length > 0 && this.selection.length < this.columns.length;
        this.handleEvent();
      },
      handleEvent(store) {
        this.columns.forEach(col => {
          col._show = this.selection.includes(col.prop);
        });

        if (store !== false) this.setStore();
        if (this.table) this.$nextTick(() => this.table.refresh());

        this.$emit('on-change');
      }
    }
  };
</script>
