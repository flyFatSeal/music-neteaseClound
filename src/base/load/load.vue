<!-- loading组件 -->
<template>
  <div class="load-outer-wrapper">
    <div class="loading-wrapper">
      <div class="square one"></div>
      <div class="square two"></div>
      <div class="square three"></div>
      <div class="square four"></div>
      <span>努力加载中...</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.load-outer-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  @include center;
  align-items: flex-start;
  background: #fff;
  z-index: 101;
}
.loading-wrapper {
  margin-top: 35vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
}
.square {
  width: 5px;
  margin-left: 2px;
  background: $color-theme;
  height: 10px;
  position: relative;
}
span {
  margin-left: 3px;
}
.one {
  @include loading-animation(2px, yi, 0.3s);
}
.two {
  @include loading-animation(10px, er, 0s);
}
.three {
  @include loading-animation(2px, san, 0.6s);
}
.four {
  @include loading-animation(5px, four, 0.4s);
}
</style>