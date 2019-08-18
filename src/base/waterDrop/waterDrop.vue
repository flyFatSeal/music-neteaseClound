<!-- 屏幕点击水滴扩展效果 -->
<template>
  <div class="water-drop-container">
    <div class="wave wave0"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    };
  },

  computed: {
    coordinate() {
      debugger;
      return { left: this.x.toFixed(1) + "px", top: this.y.toFixed(1) + "px" };
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.$destroy(true);
    //   this.$el.parentNode.removeChild(this.$el);
    // }, 1100);
  }
};
</script>
<style  scoped lang="scss">
.water-drop-container {
  width: 40%;
  height: 100%;
  position: relative;
}
.wave {
  position: absolute;
  border-radius: 40%;
  background-color: red;
}
.wave0 {
  z-index: 999;
  animation: w 5s forwards;
}

@keyframes w {
  0% {
    width: 0%;
    height: 0%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>