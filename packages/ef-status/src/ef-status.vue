<template>
  <span class="ef-status" style="width: fit-content;" :key="status">
    <i v-if="iconSelect.isEleIcon" :class="{
      [curStatus.icon]: true,
      [curStatus.className]: true
    }"></i>
    <!-- svg -->
    <svg v-else :class="{
      'ef-svg-icon': true,
      [curStatus.className]: true
    }">
      <use :xlink:href="'#' + curStatus.icon"></use>
    </svg>
    <span
      :class="{ [curStatus.className]: !needSetLabelColor }"
      :style="needSetLabelColor ? { color: labelColor, display: 'contents' } : { display: 'contents' }"
    >
      <slot name="label" :status="curStatus">{{ curStatus.label }}</slot>
    </span>
  </span>
</template>

<script>
  import { ALL_STATUS } from '../require-status';

  export default {
    name: 'EfStatus',
    props: {
      status: [Number, String],
      type: String,
      labelColor: String
    },
    data() {
      return {
        ALL_STATUS
      };
    },
    computed: {
      curStatus() {
        let statusTemp = {
          icon: '',
          label: '',
          theme: '',
          className: ''
        };
        const [type, subType] = this.type.split('.');
        const status = subType
          ? this.ALL_STATUS[type][subType][this.status]
          : this.ALL_STATUS[type][this.status];
        status.theme = this.getTheme(status);
        statusTemp = Object.assign({}, statusTemp, status);
        statusTemp.className = statusTemp.className || `status-level_${statusTemp.theme}`;
        return statusTemp;
      },
      iconSelect() {
        return {
          isEleIcon: this.curStatus.icon.indexOf('el-icon-') === 0,
          isEfIcon: this.curStatus.icon.indexOf('ef-icon-') === 0
        };
      },
      needSetLabelColor() {
        return !!this.labelColor;
      }
    },
    methods: {
      getTheme(curStatus) {
        const allThemes = ['info', 'success', 'warning', 'error', 'loading'];
        // 兼容写入完整图标字符串
        const iconName = (curStatus.icon || 'info').replace('el-icon-', '');
        if (allThemes.includes(iconName)) {
          curStatus.icon = 'el-icon-' + iconName;
          return iconName;
        }
        if ([
          'status-level_info',
          'status-level_success',
          'status-level_warning',
          'status-level_error',
          'status-level_loading',
          'info',
          'success',
          'warning',
          'error',
          'loading'
        ].includes(curStatus.className)) {
          return curStatus.className.replace('status-level_', '');
        }
      }
    }
  };
</script>
