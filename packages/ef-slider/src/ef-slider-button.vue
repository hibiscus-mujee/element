<template>
  <div
    class="el-slider__button-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    :class="{ 'hover': hovering, 'dragging': dragging }"
    :style="wrapperStyle"
    ref="button"
    tabindex="0"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown.left="onLeftKeyDown"
    @keydown.right="onRightKeyDown"
    @keydown.down.prevent="onLeftKeyDown"
    @keydown.up.prevent="onRightKeyDown"
  >
    <el-tooltip
      placement="top"
      ref="tooltip"
      :popper-class="tooltipClass"
      :disabled="!showTooltip">
      <span slot="content">{{ formatValue }}</span>
      <div class="el-slider__button" :class="{ 'hover': hovering, 'dragging': dragging }"></div>
    </el-tooltip>
  </div>
</template>

<script>
  import ElSliderButton from '../../slider/src/button';

  export default {
    name: 'EfSliderButton',
    extends: ElSliderButton,
    computed: {
      min() {
        return this.$parent.realMin;
      }
    }
  };
</script>

<style scoped>

</style>
