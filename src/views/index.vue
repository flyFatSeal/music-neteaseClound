<template>
  <div class="recommend-container">
    <Header :active="activePage" @changePage="changePage"></Header>
    <div ref="slideWrapper" class="slide-container">
      <cube-slide
        ref="slide"
        class="cube-slide"
        :initial-index="initialIndex"
        :loop="loop"
        :auto-play="autoPlay"
        :interval="interval"
        :refreshResetCurrent="false"
        :threshold="threshold"
        @change="pageChange"
      >
        <cube-slide-item>
          <user :initPage="initialIndex"></user>
        </cube-slide-item>
        <cube-slide-item>
          <recommend :initPage="initialIndex"></recommend>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Header from "components/header/Header.vue";
import recommend from "components/recommend/recommend";
import user from "components/user/user";
import { loadingMixin } from "common/js/mixin";
import { mapGetters } from "vuex";
export default {
  mixins: [loadingMixin],
  data() {
    return {
      activePage: "index",
      loop: false,
      autoPlay: false,
      interval: 4000,
      threshold: 0.45,
      speed: 400,
      allowVertical: false,
      initialIndex: 1,
      dotsSlot: false,
      addItem3: false,
      pullDownRefresh: true,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: "已推荐个性化内容"
    };
  },
  watch: {
    fullScreen() {
      this.$refs.slide.refresh();
    }
  },
  activated() {
    this.$refs.slide.refresh();
  },
  components: { Header, recommend, user },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        scrollbar: false
      };
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            txt: this.pullDownRefreshTxt,
            stopTime: 300
          }
        : false;
    },
    ...mapGetters(["fullScreen"])
  },
  methods: {
    pageChange(e) {
      if (e === 1) this.activePage = "index";
      else this.activePage = "user";
    },
    changePage(e) {
      this.initialIndex = e;
      this.pageChange(e);
    }
  }
};
</script>
<style  scoped lang="scss">
.slide-container {
  position: absolute;
  top: 12vh;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.cube-slide-group {
  overflow: auto;
  width: 999px;
}
</style>