<template>
  <el-pagination
    v-if="pageSum > pageSize"
    :current-page="pageSet.pageNum"
    :page-size="pageSet.pageSize"
    :total="pageSum"
    v-bind="$attrs"
    @size-change="onSizeChange"
    @current-change="onPageChange"
  ></el-pagination>
</template>

<script>
  export default {
    name: 'EfPagination',
    props: {
      pageSet: {
        type: Object,
        default: function() {
          return {
            pageNum: 1,
            pageSize: 10
          };
        }
      },
      pageSum: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        pageSize: this.pageSet.pageSize
      };
    },
    methods: {
      onSizeChange(pageSize) {
        this.pageSet.pageSize = pageSize;
        this.pageSet.pageNum = 1;
        this.$emit('change', this.pageSet);
      },
      onPageChange(pageNum) {
        this.pageSet.pageNum = pageNum;
        this.$emit('change', this.pageSet);
      }
    }
  };
</script>
