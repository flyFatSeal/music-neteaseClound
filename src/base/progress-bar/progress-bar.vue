<template>
  <div class="progress-bar" ref="progressBar" @click.prevent="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress" :style="progressColor"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn" :style="ProgressbtnStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from "common/js/dom";

const progressBtnWidth = 16;
const transform = prefixStyle("transform");

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    Color: {
      type: String,
      default: "rgb(228, 228, 228)"
    },
    btnStyle: {
      type: String,
      default: "16px"
    }
  },
  data() {
    return {
      touch: {}
    };
  },
  mounted() {
    let offsetWidth = this.getOffsetWidth(this.percent);
    this._offset(offsetWidth);
  },
  computed: {
    ProgressbtnStyle() {
      return `width:${this.btnStyle};height:${this.btnStyle}`;
    },
    progressColor() {
      return `background:${this.Color}`;
    }
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      this._triggerPercent();
    },
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(
        this.$refs.progressBar.clientWidth - progressBtnWidth,
        Math.max(0, this.touch.left + deltaX)
      );
      this._offset(offsetWidth);
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit("percentChange", percent);
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[
        transform
      ] = `translate3d(${offsetWidth}px, 0, 0)`;
    },
    getOffsetWidth(newPercent) {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      return newPercent * barWidth;
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        let offsetWidth = this.getOffsetWidth(newPercent);
        this._offset(offsetWidth);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/common/scss/variable.scss";
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    .progress {
      position: absolute;
      height: 100%;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .progress-btn {
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 6px solid rgba(255, 255, 255, 1);
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>