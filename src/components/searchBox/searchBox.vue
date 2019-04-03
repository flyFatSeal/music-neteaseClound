<!--  -->
<template>
  <div class="search-box-wrapper">
    <div class="search-singer-wrapper">
      <span class="search-type singer">按歌手搜索</span>
      <div class="singer-avatar-wrapper">
        <div class="singer-avatar-circle one"></div>
        <div class="singer-avatar-circle two"></div>
        <div class="singer-avatar-circle three"></div>
      </div>
    </div>
    <div class="search-hot-wrapper">
      <p class="search-type">热门搜索</p>
      <div class="search-hot-word-wrapper" @click.stop="search">
        <div class="hot-search-word" v-for="(item,index) in hotWords " :key="index">{{item}}</div>
      </div>
    </div>
    <div class="search-hot-wrapper">
      <div class="search-history-top">
        <p class="search-type">历史记录</p>
        <i class="iconfont icon-delete" @click.stop="deleteSearchList"></i>
      </div>
      <div class="search-hot-word-wrapper">
        <div
          class="hot-search-word"
          v-for="(item,index) in this.searchHistory"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    hotWords: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  components: {},
  methods: {
    search(e) {
      if (e.target.innerText.length > 1)
        this.$emit("selectQuery", e.target.innerText);
    },
    ...mapActions(["deleteSearchList"])
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.search-box-wrapper {
  width: 100vw;
  background: $color-background;
}
.icon-wrapper {
  margin-left: 3vw;
  .iconfont {
    font-size: 7vw;
    color: $color-background;
  }
}
.search-singer-wrapper {
  height: 10vw;
  width: 100vw;
  border-bottom-style: solid;
  border-bottom-color: $color-dialog-background;
  border-bottom-width: 1px;
  @include left-center;
  justify-content: space-between;
  .singer {
    font-size: $font-size-medium;
    color: $color-text;
    font-weight: 700;
    margin-left: 3vw;
    margin-top: 0;
  }
  .singer-avatar-wrapper {
    height: 100%;
    @include left-center;
    width: 18vw;
    position: relative;
    .singer-avatar-circle {
      position: absolute;
      width: 6vw;
      height: 6vw;
      border-radius: 50%;
      background: black;
    }
    .one {
      left: 0vw;
    }
    .two {
      left: 5vw;
    }
    .three {
      left: 10vw;
    }
  }
}
.search-type {
  font-size: $font-size-small-x;
  color: $color-text;
  font-weight: 700;
  margin-left: 3vw;
  margin-top: 5vw;
}
.search-hot-wrapper {
  width: 100vw;
  .search-hot-word-wrapper {
    width: 100%;
    @include left-center;

    .hot-search-word {
      height: 5vw;
      border-radius: 12px;
      background: $color-text-lm;
      min-width: 5vw;
      @include center;
      flex-wrap: wrap;
      padding: 6px;
      margin: 2vw;
    }
  }
  .search-history-top {
    width: 100%;
    @include center;
    justify-content: space-between;
    .iconfont {
      margin-top: 5vw;
      margin-right: 3vw;
    }
  }
}
</style>