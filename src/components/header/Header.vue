<template>
  <div class="head">
    <div class="top-icons">
      <div class="user-center">
        <i class="iconfont icon-list"></i>
      </div>
      <div class="nav-icons">
        <i class="iconfont icon-music" @click.stop="goUser"></i>
        <i class="iconfont icon-index" @click.stop="goIndex"></i>
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

  components: {},
  methods: {
    search() {
      this.$router.push({
        path: "/search"
      });
    },
    goUser() {
      this.$router.push({
        path: "/user"
      });
    },
    goIndex() {
      this.$router.push({
        path: "/"
      });
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
    }
    .user-center,
    .search {
      width: 10vw;
      @include center;
    }
  }
  .iconfont {
    font-size: 6vw;
    color: $color-theme-l;
  }
  .top-tab {
    display: flex;
    justify-content: space-around;
    color: $color-theme-l;
    margin-top: 1vh;
  }
}
</style>