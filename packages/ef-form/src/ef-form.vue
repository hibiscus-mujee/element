<template>
  <el-popover :title="title" v-model="visible" v-bind="$attrs" v-on="$listeners">
    <el-form ref="_efFormRefs" :model="model" :rules="rules" v-bind="$attrs" v-on="$listeners" style="padding: 0 10px">
      <slot></slot>
    </el-form>
    <slot slot="reference" name="reference">
      <el-button slot="reference">高级搜索</el-button>
    </slot>
  </el-popover>
</template>

<script>
  import ElForm from 'element-ui/packages/form';

  export default {
    name: 'EfForm',
    components: { ElForm },
    props: {
      title: {
        type: String,
        default: '高级搜索'
      },
      model: {
        type: Object,
        default: function() {
          return {};
        }
      },
      rules: {
        type: Object,
        default: function() {
          return {};
        }
      },
      popoverClass: String
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
    },
    watch: {
    },
    created() {
      // console.log(this.$attrs);
    },
    mounted() {
      const popoverNode = document.getElementsByClassName('el-popover el-popper');
      popoverNode[0].className += this.popoverClass ? ` ${this.popoverClass}` : '';
    },
    methods: {
      validate(cb) {
        return this.$refs._efFormRefs.validate(cb);
      },
      validateField(cb) {
        return this.$refs._efFormRefs.validateField(cb);
      },
      resetFields() {
        return this.$refs._efFormRefs.resetFields();
      },
      clearValidate(cb) {
        return this.$refs._efFormRefs.clearValidate(cb);
      }
    }
  };
</script>
