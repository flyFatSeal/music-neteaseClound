<!-- 用户列表组件 -->
<template>
  <div class="user-list-wrapper">
    <div class="user-list-header">
      <div class="sheet-description">
        <i class="iconfont icon-back" @click.stop="back"></i>
        <p class="title">{{title}}</p>
      </div>
      <span @click.stop="cleanAll">清空</span>
    </div>
    <cube-scroll ref="scroll" class="scroll-wrapper">
      <div class="list-top" @click.stop="playAll">
        <div class="playAll">
          <i class="iconfont icon-play"></i>
          <span>播放全部</span>
        </div>
        <div class="checkAll">
          <i class="iconfont icon-list"></i>
          <span>多选</span>
        </div>
      </div>
      <song-item v-if="this.songs.length" :hasIndex="false" :songs="songs" @selectItem="add"></song-item>
      <div class="no-music" v-else>暂无播放记录</div>
    </cube-scroll>
  </div>
</template>

<script>
import songItem from "base/songItem/songItem";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "最近播放"
    },
    songs: {
      type: Array,
      default: null
    }
  },
  components: { songItem },
  computed: {
    ...mapGetters(["playlist"])
  },
  methods: {
    playAll() {
      let songs = this.songs;
      this.selectPlay({ list: songs, index: 0 });
    },
    back() {
      this.$emit("close");
    },
    ...mapActions([
      "selectPlay",
      "insertSong",
      "clearFavoriteList",
      "clearPlayHistoryAll"
    ]),
    add(id) {
      if (this.playlist.length) {
        let song = this.songs[id];
        this.insertSong({ song });
      } else {
        let songs = this.songs;
        this.selectPlay({ list: songs, index: id });
      }
    },
    cleanAll() {
      this.title === "最近播放"
        ? this.clearPlayHistoryAll()
        : this.clearFavoriteList();
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.user-list-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 99;
  color: $color-theme-l;
  background-color: $color-background;
}
.list-top {
  height: 12vw;
  @include left-center;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
  .playAll {
    @include left-center;
    margin-left: 2vw;
    span {
      font-size: $font-size-medium;
      color: $color-text;
      font-weight: 700;
      margin-left: 2vw;
    }
  }
  .checkAll {
    @include left-center;
    margin-right: 5vw;
    span {
      font-size: $font-size-small-x;
      color: $color-text;
      margin-left: 2vw;
    }
  }
}
.user-list-header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  @include center;
  justify-content: space-between;
  background-color: $color-theme;
  height: 8vh;
  .sheet-description {
    margin-left: 2vw;
    @include left-center;
    width: 55vw;
    .title {
      font-size: $font-size-medium-x;
    }
  }
}
.scroll-wrapper {
  height: 92vh;
  margin-top: 8vh;
}
.iconfont {
  font-size: 8vw;
}
.icon-play,
.icon-list {
  color: $color-text;
  font-size: 6vw;
}

span {
  font-size: $font-size-medium;
  margin-right: 4vw;
}
.no-music {
  width: 100vw;
  height: 30vw;
  margin-top: 15vw;
  @include center;
  font-size: 5vw;
  color: $color-text-ggg;
}
</style>