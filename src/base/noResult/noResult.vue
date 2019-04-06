<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: "抱歉，目前没有收录该歌曲"
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/common/scss/index.scss";

.no-result {
  text-align: center;
  height: 80vh;
  @include center;
  flex-direction: column;
  .no-result-icon {
    width: 86px;
    height: 90px;
    margin: 0 auto;
    @include bg-image("../../common/image/default.jpg");
    background-size: 86px 90px;
  }

  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-gg;
  }
}
</style>