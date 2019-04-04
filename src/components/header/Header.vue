<template>
  <div class="head">
    <div class="top-icons">
      <div class="user-center" @click.stop="goUser">
        <i class="iconfont icon-list"></i>
      </div>
      <div class="nav-icons">
        <i
          class="iconfont icon-music"
          @click.stop="goUser"
          :class="[active === 'user' ? 'active' : '']"
        ></i>
        <i
          class="iconfont icon-index"
          @click.stop="goIndex"
          :class="[active === 'index'? 'active' : '']"
        ></i>
      </div>
      <div class="search" @click.stop="search">
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <div class="top-tab">
      <!-- <span class="tab-name">推荐</span>
      <span class="tab-name">朋友</span>
      <span class="tab-name">电台</span>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    active: {
      type: String,
      default: "index"
    }
  },
  components: {},
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    },
    goUser() {
      this.$emit("changePage", 0);
    },
    goIndex() {
      this.$emit("changePage", 1);
      console.info(454);
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.head {
  height: 12vh;
  width: 100vw;
  background: $color-theme;
  position: relative;
  .top-icons {
    height: 6.5vh;
    display: flex;
    justify-content: space-between;
    .nav-icons {
      width: 35vw;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .active {
        color: $color-background;
      }
    }
    .user-center,
    .search {
      width: 10vw;
      @include center;
    }
  }
  .iconfont {
    font-size: 6vw;
    color: $color-text-ggg;
  }
  .top-tab {
    display: flex;
    justify-content: space-around;
    color: $color-theme-l;
    margin-top: 1vh;
  }
}
</style>