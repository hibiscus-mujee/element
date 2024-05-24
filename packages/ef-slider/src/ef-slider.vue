<template>
  <div
    ref="EfSlider"
    class="el-slider"
    :class="{ 'is-vertical': vertical, 'el-slider--with-input': showInput }"
    role="slider"
    :aria-valuemin="realMin"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical': 'horizontal'"
    :aria-disabled="sliderDisabled"
  >
    <el-input-number
      v-model="firstValue"
      v-if="showInput && !range"
      class="el-slider__input"
      ref="input"
      @change="emitChange"
      :step="step"
      :disabled="sliderDisabled"
      :controls="showInputControls"
      :min="realMin"
      :max="max"
      :debounce="debounce"
      :size="inputSize">
    </el-input-number>
    <div :style="{ display: 'flex', flexDirection: vertical ? 'column' : '' }">
      <div v-if="hasMinLimit && !vertical" class="el-slider__runway" :style="minLimitStyle"></div>
      <div
        class="el-slider__runway"
        :class="{ 'show-input': showInput, 'disabled': sliderDisabled}"
        :style="runwayStyle"
        @click="onSliderClick"
        ref="slider">
        <div
          class="el-slider__bar"
          :style="barStyle">
        </div>
        <ef-slider-button
          :vertical="vertical"
          v-model="firstValue"
          :tooltip-class="tooltipClass"
          ref="button1">
        </ef-slider-button>
        <ef-slider-button
          :vertical="vertical"
          v-model="secondValue"
          :tooltip-class="tooltipClass"
          ref="button2"
          v-if="range">
        </ef-slider-button>
        <div
          class="el-slider__stop"
          v-for="(item, key) in stops"
          :key="key"
          :style="getStopStyle(item)"
          v-if="showStops">
        </div>
        <template v-if="markList.length > 0">
          <div>
            <div
              v-for="(item, key) in markList"
              :style="getStopStyle(item.position)"
              class="el-slider__stop el-slider__marks-stop"
              :key="key">
            </div>
          </div>
          <div class="el-slider__marks">
            <slider-marker
              :mark="item.mark" v-for="(item, key) in markList"
              :key="key"
              :style="getStopStyle(item.position)">
            </slider-marker>
          </div>
        </template>
      </div>
      <div
        v-if="hasMinLimit && vertical"
        class="el-slider__runway"
        :style="{ height: `${minLimitHeight}px`, cursor: 'auto' }">
      </div>
    </div>
  </div>
</template>

<script>
  import ElSlider from '../../slider/src/main';
  import EfSliderButton from './ef-slider-button.vue';
  import SliderMaker from './ef-maker';

  export default {
    name: 'EfSlider',
    extends: ElSlider,
    components: {EfSliderButton, SliderMaker},
    props: {
      minLimit: [Number, String],
      limitStyle: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data() {
      return {
        sliderRunwayWidth: '100%'
      };
    },
    computed: {
      stops() {
        if (!this.showStops || this.realMin > this.max) return [];
        if (this.step === 0) {
          process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Slider]step should not be 0.');
          return [];
        }
        const stopCount = (this.max - this.realMin) / this.step;
        const stepWidth = 100 * this.step / (this.max - this.realMin);
        const result = [];
        for (let i = 1; i < stopCount; i++) {
          result.push(i * stepWidth);
        }
        if (this.range) {
          return result.filter(step => {
            return step < 100 * (this.minValue - this.realMin) / (this.max - this.realMin) ||
              step > 100 * (this.maxValue - this.realMin) / (this.max - this.realMin);
          });
        } else {
          return result.filter(step => step > 100 * (this.firstValue - this.realMin) / (this.max - this.realMin));
        }
      },

      markList() {
        if (!this.marks) {
          return [];
        }

        const marksKeys = Object.keys(this.marks);
        return marksKeys.map(parseFloat)
          .sort((a, b) => a - b)
          .filter(point => point <= this.max)
          .map(point => ({
            point,
            position: point > 0 ? (point - this.realMin) * 100 / (this.max - this.realMin) : -this.minLimit / this.max * 100,
            mark: this.marks[point]
          }));
      },

      hasMinLimit() {
        return typeof this.minLimit !== 'undefined';
      },

      minLimitHeight() {
        const heightRate = this.realMin / 100;
        return (this.height ? parseInt(this.height, 10) : 0) * heightRate;
      },

      barSize() {
        return this.range
          ? `${100 * (this.maxValue - this.minValue) / (this.max - this.realMin)}%`
          : `${100 * (this.firstValue - this.realMin) / (this.max - this.realMin)}%`;
      },

      barStart() {
        return this.range
          ? `${100 * (this.minValue - this.realMin) / (this.max - this.realMin)}%`
          : '0%';
      },

      barStyle() {
        return this.vertical
          ? {
            height: this.barSize,
            bottom: this.barStart
          } : {
            width: this.barSize,
            left: this.barStart
          };
      },

      runwayStyle() {
        return this.vertical ? {height: this.height} : {
          marginRight: this.showInput ? '10px' : '0',
          width: this.sliderRunwayWidth
        };
      },

      realMin() {
        return this.hasMinLimit ? parseInt(this.minLimit, 10) : this.min;
      },

      minLimitStyle() {
        return Object.assign({
          width: `${this.minLimit / this.max * 100}%`,
          cursor: 'auto',
          backgroundColor: '#409EFF'
        }, this.limitStyle);
      }
    },
    watch: {
      firstValue(val) {
        if (this.range) {
          this.$emit('input', [this.minValue, this.maxValue]);
        } else {
          this.$emit('input', val);
        }
      }
    },
    mounted() {
      if (this.showInput) {
        this.sliderRunwayWidth = `${this.$refs.EfSlider.offsetWidth - this.$refs.input.$el.clientWidth}px`;
      }
      let valuetext;
      if (this.range) {
        if (Array.isArray(this.value)) {
          this.firstValue = Math.max(this.min, this.value[0]);
          this.secondValue = Math.min(this.max, this.value[1]);
        } else {
          this.firstValue = this.min;
          this.secondValue = this.max;
        }
        this.oldValue = [this.firstValue, this.secondValue];
        valuetext = `${this.firstValue}-${this.secondValue}`;
      } else {
        if (typeof this.value !== 'number' || isNaN(this.value)) {
          this.firstValue = this.realMin;
        } else {
          this.firstValue = Math.min(this.max, Math.max(this.realMin, this.value));
        }
        this.oldValue = this.firstValue;
        valuetext = this.firstValue;
      }
      this.$el.setAttribute('aria-valuetext', valuetext);

      // label screen reader
      this.$el.setAttribute('aria-label', this.label ? this.label : `slider between ${this.min} and ${this.max}`);

      this.resetSize();
      window.addEventListener('resize', this.resetSize);

    },
    methods: {
      getStopStyle(position) {
        return this.vertical ? {'bottom': position + '%'} : {'left': position + '%'};
      }
    }
  };
</script>
