<template>
  <div style="font-size: 12px; line-height: 18px">
    <i :class="{ 'el-icon-success': validRes, 'el-icon-error': !validRes }"
      :style="{ color: validRes ? '#27D68F' : '#FF4545' }"
    ></i>
    <span style="margin-left: 8px">{{ rule.message }}</span>
  </div>
</template>

<script>
  import AsyncValidator from 'async-validator';

  export default {
    name: 'ef-password-item',
    props: {
      value: String,
      rule: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        validRes: false
      };
    },
    watch: {
      value(value) {
        if (!value) {
          this.validRes = false;
          return;
        }
        this.validate(value);
      }
    },
    methods: {
      validate(value) {
        const descriptor = {value: this.rule};
        const model = {value};
        const validator = new AsyncValidator(descriptor);
        validator.validate(model, (errors) => {
          this.validRes = !errors;
        });
      }
    }
  };
</script>
