import EfTableColumn from './ef-table-column';

/**
 * 用来判断父组件是否使用作用域插槽，设置默认节点
 * @param {VueComponent} _this Vue 实例
 * @param {String} key 插槽名
 * @param {Object} props 作用域
 * @param {vNode} vNode 默认虚拟节点
 * @returns {vNode} 虚拟节点
 */
const defaultSlot = (_this, key, props, vNode = null) => {
  let ret = vNode;
  if (_this.$scopedSlots.hasOwnProperty(key)) {
    ret = _this.$scopedSlots[key](props);
  }
  return ret;
};

/**
 * 用来处理以下类型的插槽传递
 * eg:
 *  <template v-for="field in validFields" #[field.prop]="{ row }">
 *    <slot :name="field.prop" :row="row">
 *      {{ field.format ? field.format(row, tableData) : row[field.prop] }}
 *    </slot>
 *  </template>
 *
 * @param {VueComponent} _this Vue 实例
 * @param {Array} allKeys 所有具名插槽名
 * @param {vNode} vNode 默认虚拟节点
 * @returns {Object} 作用域插槽集合
 */
const setScopedSlotsFunc = (_this, allKeys, vNode = null) => {
  allKeys = allKeys || [];
  const ret = {};
  allKeys.forEach(key => {
    ret[key] = function(props) {
      return defaultSlot(_this, key, props, vNode);
    };
  });
  return ret;
};

// const CustomColumn = {
//   name: 'custom-column',
//   props: {
//     column: { type: Object, require: true }
//   },
//   render(h) {
//     return h(
//       'el-table-column',
//       {
//         scopedSlots: {
//           default: props => defaultSlot(this, this.column.prop, props)
//         },
//         props: { ...this.column }
//       },
//       []
//     );
//   }
// };

const RadioColumn = {
  name: 'radio-column',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Number, String],
    column: Object
  },
  render(h) {
    const _this = this;
    return h(
      'el-table-column',
      {
        props: {
          ..._this.column,
          width: _this.column.width || 35
        },
        scopedSlots: {
          default: ({ row }) => {
            return h(
              'el-radio',
              {
                // 这里必须给 label 属性绑定索引值才能实现双向绑定
                props: {
                  value: _this.value,
                  label: row._index
                },
                on: {
                  change(_) {
                    _this.curRadio = row._index;
                    _this.$emit('change', row._index);
                  }
                }
              },
              [
                h('span', { style: { display: 'none' } }) // 单选按钮默认去掉 label
              ]
            );
          }
        }
      },
      []
    );
  }
};

const IndexOrSelectionColumn = {
  name: 'index-or-selection-column',
  props: {
    column: { type: Object, require: true }
  },
  render(h) {
    let width = this.column.type === 'index' ? 35 : 45;
    return h(
      'el-table-column',
      {
        props: {
          ...this.column,
          width: this.column.width || width
        }
      },
      []
    );
  }
};

const ExpandColumn = {
  name: 'expand-column',
  props: {
    column: { type: Object, require: true }
  },
  data() {
    return {};
  },
  render(h) {
    return h(
      'el-table-column',
      {
        props: {
          ...this.column,
          width: this.column.width || 35
        },
        scopedSlots: {
          default: props => defaultSlot(this, 'expand', props)
        }
      },
      []
    );
  }
};

const DefaultColumn = {
  name: 'default-column',
  components: { EfTableColumn },
  props: {
    column: { type: Object, require: true },
    fields: {
      type: Array,
      default: function() { return []; }
    },
    selectable: {
      type: Function,
      default: () => { return true; }
    }
  },
  render(h) {
    const allKeys = [];
    const allHeaderKeys = [];
    this.fields.forEach(item => {
      if (item.prop) {
        allKeys.push(item.prop);
        allHeaderKeys.push(`${item.prop}-header`);
      }
    });
    return h(
      'ef-table-column',
      {
        props: {
          column: this.column,
          fields: this.fields,
          selectable: this.selectable
        },
        scopedSlots: {
          ...setScopedSlotsFunc(this, allKeys),
          ...setScopedSlotsFunc(this, allHeaderKeys)
        }
      }
    );
  }
};

export default {
  name: 'ef-column-select',
  props: {
    column: { type: Object, require: true },
    fields: {
      type: Array,
      default: function() { return []; }
    },
    selectable: {
      type: Function,
      default: () => { return true; }
    }
  },
  data() {
    return {
      curRadio: null
    };
  },
  methods: {
    setCurRadio(idx) {
      this.curRadio = idx;
    }
  },
  render(h) {
    const _this = this;
    function getComponent(type) {
      switch (type) {
        // case 'custom':
        //   return DefaultColumn;
        case 'radio':
          return RadioColumn;
        case 'index':
        case 'selection':
          return IndexOrSelectionColumn;
        case 'expand':
          return ExpandColumn;
        default:
          return DefaultColumn;
      }
    }
    const allKeys = Object.keys(_this.$scopedSlots).filter(key => key !== 'undefined');
    return h(
      getComponent(_this.column.type),
      {
        ref: _this.column.type,
        props: {
          value: _this.curRadio,
          column: _this.column,
          fields: _this.fields,
          selectable: _this.selectable
        },
        scopedSlots: {
          ...setScopedSlotsFunc(_this, allKeys)
        },
        on: {
          change(val) {
            _this.curRadio = val;
          }
        }
      },
      []
    );
  }
};
