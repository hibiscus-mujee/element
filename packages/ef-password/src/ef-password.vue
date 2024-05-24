<template>
  <el-tooltip v-model="visible" manual placement="bottom" effect="light">
    <el-input
      :value="value"
      :placeholder="placeholder"
      :show-password="showPassword"
      show-password
      v-bind="$attrs"
      @blur="visible = false"
      @focus="visible = useRules.length > 0"
      @input="onInput"
    ></el-input>
    <div slot="content">
      <ef-password-item v-for="(rule, idx) in useRules" :value="value" :rule="rule"
                        :key="'rule-'+idx"></ef-password-item>
    </div>
  </el-tooltip>
</template>

<script>
  import EfPasswordItem from './ef-password-item.vue';
  import {noop} from 'element-ui/src/utils/util';
  import AsyncValidator from 'async-validator';
  import objectAssign from 'element-ui/src/utils/merge';

  const defaultRules = [
    {min: 8, max: 26, message: '长度在 8 到 26 个字符', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        const chains = [
          '1234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm', '!@#$%^&*()',
          '0987654321', 'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz', ')(*&^%$#@!'
        ];

        const chainInclude = (pwd) => {
          if (!pwd) return false;

          const nPice = 3;
          if (pwd.length < nPice) return false;

          pwd = pwd.toLowerCase();
          for (let i = 0, n = pwd.length; i <= n - 3; i++) {
            const pice = pwd.substring(i, i + 3);
            const chain = chains.find(t => t.includes(pice));
            if (chain) return true;
          }
          return false;
        };
        if (chainInclude(value)) {
          callback(new Error('密码不能使用连续3个及以上键位排序字符，如123，Qwe等'));
        } else {
          callback();
        }
      },
      message: '密码不能使用连续3个及以上键位排序字符，如123，Qwe等',
      trigger: 'blur'
    },
    {
      pattern: /^(?=.*[~!@#$%^&*()_+{}[\]|\\;:,.'"?/<>])(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d~!@#$%^&*()_+{}[\]|;:,.'"?/<>]{3,}$/,
      message: '须同时包含英文字母、数字和特殊字符',
      trigger: 'blur'
    }
  ];

  const uniqueFunc = (arr) => {
    // eslint-disable-next-line no-undef
    const res = new Map();
    return arr.filter((item) => !res.has(item.message) && res.set(item.message, 1));
  };

  export default {
    name: 'ef-password',
    components: {EfPasswordItem},
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      value: String,
      rules: Array,
      showPassword: Boolean,
      placeholder: {
        type: String,
        default() {
          return '请输入密码';
        }
      },
      // 规则覆盖
      ruleOverlay: Boolean
    },
    data() {
      return {
        pwd: null,
        visible: false
      };
    },
    computed: {
      formNode() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'ElForm') {
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      formItemNode() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'ElFormItem') {
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      prop() {
        return this.formItemNode.$props.prop;
      },
      formRules() {
        const formRules = this.formNode.$props.rules;
        if (formRules.hasOwnProperty(this.prop)) {
          return formRules[this.prop];
        } else {
          return [];
        }
      },
      useRules() {
        // 表单定义的规则，优先级最低
        const formRules = this.formRules;
        // 组件定义的规则，优先级最高
        const compRules = this.rules;

        let rules = [];

        if (this.ruleOverlay) {
          rules = compRules || defaultRules;
        } else {
          rules = formRules.concat(compRules || defaultRules).filter(rule => rule.message);
        }
        return uniqueFunc(rules);
      }
    },
    created() {
      this.pwd = this.value;
      this.formItemNode.validate = this.validate;
    },
    methods: {
      onInput(val) {
        this.$emit('input', val);
      },

      // 重载element-ui的validate方法，目的是将密码组件所使用的默认校验规则引入到实际的表单校验中
      validate(trigger, callback = noop) {
        // 重载部分
        const self = this.formItemNode;
        self.validateDisabled = false;
        const useRules = this.useRules.filter(rule => {
          if (!rule.trigger || trigger === '') return true;
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        }).map(rule => objectAssign({}, rule));
        let rules = self.getFilteredRule(trigger).concat(useRules);
        rules = uniqueFunc(rules);

        // element-ui的源码部分，如无必要，请勿调整修改
        if ((!rules || rules.length === 0) && self.required === undefined) {
          callback();
          return true;
        }
        self.validateState = 'validating';
        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger;
          });
        }
        descriptor[self.prop] = rules;
        const validator = new AsyncValidator(descriptor);
        const model = {};
        model[self.prop] = self.fieldValue;
        validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
          self.validateState = !errors ? 'success' : 'error';
          self.validateMessage = errors ? errors[0].message : '';

          callback(self.validateMessage, invalidFields);
          self.elForm && self.elForm.$emit('validate', self.prop, !errors, self.validateMessage || null);
        });
      }
    }
  };
</script>
