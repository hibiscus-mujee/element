<template>
  <el-table-column v-bind="column" :selectable="selectable" >
    <ef-table-column
      v-for="child in column.children"
      :data="data"
      :column="child"
      :key="child.prop"
      :fields="fields"
      :selectable="selectable"
    >
      <template v-for="field in fields" #[field.prop]="{ row }">
        <slot :name="field.prop" :row="row">
          {{ field.format ? field.format(row, data) : row[field.prop] }}
        </slot>
      </template>
      <template v-for="field in fields" #[addHeader(field.prop)]="{ column }">
        <slot :name="addHeader(field.prop)" :column="column">{{ column.label }}</slot>
      </template>
    </ef-table-column>

    <template v-slot="{ row, column }">
      <slot :name="column.property" :row="row">{{ row[column.property] }}</slot>
    </template>
    <template v-slot:header="{ column }">
      <slot :name="addHeader(column.property)" :column="column">{{ column.label }}</slot>
    </template>
  </el-table-column>
</template>

<script>
  import ElTableColumn from 'packages/table-column';

  export default {
    name: 'EfTableColumn',
    components: { ElTableColumn },
    props: {
      data: {
        type: Array,
        default: function() {
          return [];
        }
      },
      column: {
        type: Object,
        default: function() {
          return {};
        }
      },
      fields: {
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
      }
    },
    methods: {
      addHeader(prop) {
        return prop + '-header';
      }
    }
  };
</script>
