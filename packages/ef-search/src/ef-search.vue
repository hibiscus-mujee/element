<template>
  <div ref="EfSearch" class="ef-search" :style="styles.style1()" v-if="conditions.length">
    <div class="select-wrapper" :style="styles.style2()">
      <el-select
        v-model="field"
        slot="prepend"
        :placeholder="placeholder"
        :style="{ width: `${width}px` }"
        :disabled="disabled"
        :filterable="filterable"
        id="ef-search-left-input-id"
        @change="onConditionChange"
      >
        <el-option
          v-for="(item, index) in conditions"
          :key="index"
          :label="item.label"
          :value="item.field"
          :disabled="item.disabled"
        >
          <slot name="option" :option="item"></slot>
        </el-option>
      </el-select>
    </div>
    <div
      class="input-wrapper"
      :style="styles.style3()"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <ef-select-extends
        v-show="inputAttrs.type === 'select'"
        v-model="data[field]"
        :placeholder="inputHolder"
        :style="styles.style4()"
        id="ef-search-select-id"
        v-bind="inputAttrs"
        :clearable="clearable || inputAttrs.clearable"
        :icon-custom-style="{ lineHeight: `${this.inputHeight}px` }"
        @change="onFieldInput"
      >
        <el-option
          v-for="item in inputAttrs.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </ef-select-extends>
      <el-input
        v-show="inputAttrs.type !== 'select'"
        v-model="data[field]"
        :placeholder="inputHolder"
        :style="styles.style4()"
        v-bind="inputAttrs"
        :disabled="disabled || !field"
        :clearable="false"
        id="ef-search-input-id"
        @focus="focusColor = '#409eff'; focused = true"
        @blur="focusColor = '#d9d9d9'; focused = false"
        @input="onFieldInput"
      >
        <i
          v-if="showClear"
          class="el-input__icon el-icon-circle-close el-input__clear"
          slot="suffix"
          @click="clear"
        ></i>
        <template #append>
          <slot name="append"></slot>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
  import EfSelectExtends from './ef-select-extends';
  const kebabCase = function(str) {
    const hyphenateRE = /([^-])([A-Z])/g;
    return str
      .replace(hyphenateRE, '$1-$2')
      .replace(hyphenateRE, '$1-$2')
      .toLowerCase();
  };

  export default {
    name: 'EfSearch',
    components: { EfSelectExtends },
    props: {
      data: {
        required: false,
        default: function() {
          return {};
        }
      },
      conditions: {
        type: Array,
        default: function() {
          return [];
        }
      },
      attach: {
        type: Object,
        default: function() {
          return {};
        }
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      initField: {
        type: String,
        default: null
      },
      width: {
        type: [Number, String],
        default: 120
      },
      height: {
        type: [Number, String],
        default: 32
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      backgroundColor: {
        type: String,
        default: '#f5f7fa'
      }
    },
    model: {
      prop: 'data'
    },
    data() {
      return {
        field: null,
        fieldValue: null,
        inputWidth: 200,
        selected: {},
        isInit: true,
        focusColor: '#d9d9d9',
        hovering: false,
        focused: false,
        inputHeight: 32,
        needSetHeightNodes: []
      };
    },
    computed: {
      styles() {
        return {
          style1: () => {
            return this.inputAttrs.type === 'textarea' ? {} : {
              borderColor: this.focusColor
            };
          },
          style2: () => {
            return this.inputAttrs.type === 'textarea' ? {} : {
              lineHeight: `${this.inputHeight - 2}px`,
              height: `${this.inputHeight}px`
            };
          },
          style3: () => {
            return this.inputAttrs.type === 'textarea' ? {} : {
              lineHeight: `${this.inputHeight - 3}px`,
              height: `${this.inputHeight}px`
            };
          },
          style4: () => {
            return this.inputAttrs.type === 'textarea' ? {} : {
              width: `${this.inputWidth + 15}px`, // 15px 用来对齐 el-select 和 el-input
              lineHeight: `${this.inputHeight - 1}px`,
              height: `${this.inputHeight}px`
            };
          }
        };
      },
      inputItem() {
        return this.conditions.find(item => item.field === this.field) || {};
      },
      inputHolder() {
        if (this.selected) {
          return this.selected.placeholder ? this.selected.placeholder : `请输入${this.selected.label}`;
        }
        return '请先选择下拉选项';
      },
      inputAttrs() {
        const attrs = {};
        for (let key in this.inputItem) {
          if (!['label', 'field', 'width'].includes(key)) {
            attrs[key] = this.inputItem[key];
          }
        }
        return attrs;
      },
      showClear() {
        return (this.clearable || this.inputAttrs.clearable) &&
          !this.inputAttrs.disabled &&
          !!this.data[this.field] &&
          (this.hovering || this.focused);
      }
    },
    created() {
      if (Number(this.height) < 20) {
        this.inputHeight = 20;
      } else if (Number(this.height) > 40) {
        this.inputHeight = 40;
      } else {
        this.inputHeight = Number(this.height);
      }
      this.inputWidth = Object.prototype.hasOwnProperty.call(this.inputItem, 'width') ? this.inputItem.width : 200;
      let field = this.conditions.length > 0 ? this.conditions[0].field : null;
      const condition = this.conditions.find(t => {
        return this.initField ? t.field === this.initField : false;
      });
      if (condition) {
        field = condition.field;
      }

      this.field = field;
      this.fieldValue = this.attach[field];
      this.isInit = false;

      this.onConditionChange(this.field);
      this.onFieldInput(this.fieldValue);

      this.needSetHeightNodes = [
        {
          // 作用：设置左侧下拉框下边缘偏移
          selector: '.select-wrapper .el-input--suffix',
          style: { lineHeight: `${this.inputHeight}px` },
          node: null
        },
        {
          // 作用：设置左侧下拉框右箭头的偏移
          selector: '.select-wrapper .el-select__caret',
          style: { lineHeight: `${this.inputHeight}px` },
          node: null
        },
        {
          // 作用：设置右侧下拉框下边缘偏移
          selector: '.input-wrapper .el-input--suffix',
          style: { lineHeight: `${this.inputHeight - 1}px` },
          node: null
        },
        {
          // 作用：设置右侧下拉输入框下边缘偏移
          selector: '#ef-search-input-id',
          style: { lineHeight: `${this.inputHeight}px`, height: `${this.inputHeight}px` },
          node: null
        },
        {
          // 作用：设置右侧输入框 suffix 偏移
          selector: '.input-wrapper .el-input__icon',
          style: {
            lineHeight: `${this.inputHeight}px`
          },
          node: null
        },
        {
          // 作用：设置右侧下拉输入框下边缘偏移
          selector: '#ef-search-select-id',
          style: { lineHeight: `${this.inputHeight}px`, height: `${this.inputHeight}px` },
          node: null
        }
      ];
    },
    mounted() {
      const leftInput = this.$refs.EfSearch.querySelector('#ef-search-left-input-id');
      if (leftInput) {
        leftInput.style = this.objToStyleString({ backgroundColor: this.backgroundColor });
      }
      this._setAllHeightOffset();
    },
    updated() {
      this._setAllHeightOffset();
    },
    methods: {
      objToStyleString(obj) {
        return Object.keys(obj).map(i => `${kebabCase(i)}: ${obj[i]}`).join('; ');
      },
      _setAllHeightOffset() {
        this.needSetHeightNodes.forEach(item => {
          const { selector, style } = item;
          if (item.selector === '.input-wrapper .el-input__icon') {
            // 为所有图标进行样式计算
            const suffixCloseIcon = this.$refs.EfSearch.querySelectorAll(item.selector);
            suffixCloseIcon.forEach(node => {
              this.$nextTick(() => {
                node.style = this.objToStyleString(item.style);
              });
            });
          } else {
            item.node = this.$refs.EfSearch.querySelector(selector);
            item.node && this.$nextTick(() => {
              // 使用 nextTick 方法将 style 配置挂载到真实页面里
              item.node.style = this.objToStyleString(style);
            });
          }
        });
      },
      clear() {
        this.fieldValue = '';
        this.data[this.field] = '';
      },
      onConditionChange(val) {
        this.selected = this.conditions.find(t => t.field === val);

        this.conditions.forEach(item => {
          if (val !== item.field) {
            this.attach[item.field] = null;
          }
        });

        if (!this.isInit) {
          this.fieldValue = null;
        }
        this.onFieldInput(this.fieldValue);
        this.$emit('select-change', this.field);
      },
      onFieldInput(value) {
        this.attach[this.field] = value;
      }
    }
  };
</script>
