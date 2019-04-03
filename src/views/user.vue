<!-- 用户组件 -->
<template>
  <div class="user-wrapper">
    <Header></Header>
    <cube-scroll ref="scroll" class="scroll-wrapper">
      <div class="user-control-wrapper" @click.stop="selectUserList">
        <div class="control-item" data-type="music">
          <i class="iconfont icon-music"></i>
          <div class="icon-description">本地音乐（8888）</div>
        </div>
        <div class="control-item" data-type="playlist">
          <i class="iconfont icon-lately"></i>
          <div class="icon-description">最近播放</div>
        </div>
        <div class="control-item" data-type="favorite">
          <i class="iconfont icon-favorite"></i>
          <div class="icon-description">我喜欢的</div>
        </div>
        <div class="control-item" data-type="collection">
          <i class="iconfont icon-collection"></i>
          <div class="icon-description">我的收藏</div>
        </div>
      </div>
      <div class="songSheet">
        <div class="navHidden">
          <i class="iconfont icon-back"></i>
          <p class="nav-text">创建的歌单（）</p>
          <i class="iconfont icon-set"></i>
        </div>
      </div>
      <div class="songSheet">
        <div class="navHidden">
          <i class="iconfont icon-back"></i>
          <p class="nav-text">创建的歌单（）</p>
          <i class="iconfont icon-set"></i>
        </div>
      </div>
    </cube-scroll>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <user-list
        @close="closeList"
        :title="title"
        :songs="songs"
        v-show="activeList"
        class="animated faster"
      ></user-list>
    </transition>
  </div>
</template>

<script>
import userList from "components/userList/userList";
import Header from "components/header/Header.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeList: false,
      type: ""
    };
  },
  computed: {
    songs() {
      return this.type === "playlist" ? this.playHistory : this.favoriteList;
    },
    title() {
      return this.type === "playlist" ? "最近播放" : "我喜欢的";
    },
    ...mapGetters(["playHistory", "favoriteList"])
  },
  components: { Header, userList },
  methods: {
    selectUserList(e) {
      let type;
      if (e.target.className !== "control-item")
        for (let node of e.path) {
          if (node.className === "control-item") {
            type = node.attributes["data-type"].value;
            this.type = type;
            this.activeList = true;
          }
        }
    },
    closeList() {
      this.activeList = false;
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.user-wrapper {
  width: 100vw;
  height: 100vh;
}
.user-control-wrapper {
  width: 100vw;
  height: 52vw;
  .control-item {
    height: 13vw;
    width: 100%;
    @include left-center;
    .icon-description {
      padding-left: 2vw;
      @include left-center;
      width: 91.5vw;
      height: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid #e4e4e4;
      font-size: 3.6vw;
      color: $color-text;
    }
  }
}
.songSheet {
  width: 100vw;
  min-height: 7vw;
  background-color: $color-text-gg;
  .navHidden {
    height: 7vw;
    width: 95%;
    @include center;
    justify-content: space-between;
    .nav-text {
      width: 80%;
    }
  }
}
.iconfont {
  font-size: 6.5vw;
  color: $color-theme;
  margin-left: 2vw;
}
.icon-back,
.icon-set {
  font-size: 5vw;
  color: $color-text-g;
  transform: rotate(-90deg);
}
</style>