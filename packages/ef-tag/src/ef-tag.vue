<template>
  <div>
    <el-tag
      v-for="tag in tags"
      :key="tag.prop"
      :type="tag.type || type"
      :closable="isClosable(tag)"
      :disable-transitions="tag.disableTransitions || disableTransitions"
      :hit="tag.hit || hit"
      :color="tag.color || color"
      :size="tag.size || size"
      :effect="tag.effect || effect"
      style="margin: 0 5px 5px 0"
      @close="handleClose(tag)"
    >
      <slot :name="tag.prop" :tag="tag">
        {{ tag | showTag }}
      </slot>
    </el-tag>
  </div>
</template>

<script>
  import { isEmpty, setEmpty } from '../utils/tools';
  import { cloneDeep } from 'lodash';

  export default {
    name: 'EfTag',
    props: {
      data: {
        type: Object,
        default: function() {
          return {};
        }
      },
      props: {
        type: Array,
        default: function() {
          return [];
        }
      },
      type: String,
      closable: {
        type: Boolean,
        default: false
      },
      disableTransitions: {
        type: Boolean,
        default: false
      },
      hit: {
        type: Boolean,
        default: false
      },
      color: String,
      size: String,
      effect: {
        type: String,
        default: 'light'
      }
    },
    data() {
      return {
        rawData: cloneDeep(this.data) // 深拷贝初始数据，提供重置数据处理
      };
    },

    computed: {
      tags() {
        const fields = [];
        const formNode = this.bst(this.$parent, '_efFormRefs', '$refs');
        for (let key in this.data) {
          const keyNode = this.bst(formNode, key);
          let prop = key;
          let label;
          if (keyNode) {
            prop = keyNode.prop;
            label = keyNode.label || this.nearHasLabelParent(keyNode);
          }
          // 数据非空且 bool = true
          if (!isEmpty(this.data[prop]) && this.data[prop]) {
            const tagProp = this.props.find(item => item.prop === prop) || {};
            fields.push(Object.assign(tagProp, { prop, label, value: this.data[prop] }));
          }
        }
        return fields;
      }
    },

    methods: {
      bst(vnode, target, prop = 'prop') {
        if (vnode[prop]) {
          if (prop === '$refs' && vnode[prop][target]) {
            return vnode[prop][target];
          }
          if (vnode[prop] === target) {
            return vnode;
          }
        }
        let ret = null;
        for (let node of vnode.$children) {
          ret = this.bst(node, target, prop);
          if (ret) {
            return ret;
          }
        }
        return null;
      },

      // 当 el-form-item 存在嵌套时，需要找到离该节点最近的 label
      nearHasLabelParent(vnode) {
        if (typeof vnode.label !== 'undefined') {
          return vnode.label;
        }
        return vnode.$parent ? this.nearHasLabelParent(vnode.$parent) : null;
      },

      isClosable(tag) {
        if (tag.hasOwnProperty('closable')) {
          // 当用户自定义了 closable 字段时，将关闭按钮交由用户处理
          return !!tag.closable;
        }
        return this.closable;
      },

      handleClose(tag) {
        if (typeof tag.closable === 'function') {
          tag.closable(tag);
        } else {
          // console.log('handle close', tag, this.rawData);
          // 如果初始数据非空则需进行置空操作，否则使用原本的数据类型
          this.data[tag.prop] = this.rawData[tag.prop] ? setEmpty(this.rawData[tag.prop]) : this.rawData[tag.prop];
        }
      }
    },

    filters: {
      showTag(tag) {
        const { label: tagLabel, value: tagValue } = tag;
        let label = '';
        let value = '';
        const empty = isEmpty(tagLabel);
        label = empty ? label : tagLabel;
        if (typeof tagValue !== 'boolean') {
          value = empty ? tagValue : `: ${tagValue}`;
        }
        return label + value;
      }
    },
    mounted() {
      // console.log('ef-tag mounted attrs', this.$attrs);
    }
  };
</script>
