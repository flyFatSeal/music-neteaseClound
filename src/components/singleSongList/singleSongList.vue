<!-- 单个歌曲信息列表 -->
<template>
  <transition name="single" enter-active-class="slideInUp" leave-active-class="slideOutDown">
    <div
      class="single-song-list-wrapper"
      @click.stop="close"
      v-if="showSingleSongInfo && singleSongInfo.name"
    >
      <div class="single-song-inner-wrapper">
        <div class="list-wrapper">
          <div class="singel-song-header">
            <h2 class="song-name">歌曲：{{singleSongInfo.name}}</h2>
            <div class="play-remind"></div>
          </div>
          <div class="single-checks-item" @click.stop="playNext">
            <i class="iconfont icon-play"></i>
            <div class="icon-description">下一首播放</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-collection"></i>
            <div class="icon-description">收藏到歌单</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-download"></i>
            <div class="icon-description">下载</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-comments"></i>
            <div class="icon-description">评论()</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-share"></i>
            <div class="icon-description">分享</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-singer"></i>
            <div class="icon-description">歌手：{{singleSongInfo.singer}}</div>
          </div>
          <div class="single-checks-item">
            <i class="iconfont icon-play"></i>
            <div class="icon-description">专辑：{{singleSongInfo.album}}</div>
          </div>
        </div>
      </div>
      <cube-popup type="my-popup" ref="nextPlay" class="popup">已添加到下一首播放</cube-popup>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["showSingleSongInfo", "singleSongInfo"])
  },
  methods: {
    close() {
      this.setSingleSong(false);
      this.setSingleSongInfo([]);
    },
    playNext() {
      this.showPopup("nextPlay").then(this.close);
      this.insertSong({ type: "next", song: this.singleSongInfo });
    },
    showPopup(refId) {
      return new Promise(res => {
        const component = this.$refs[refId];
        component.show();
        setTimeout(() => {
          component.hide();
          res();
        }, 1000);
      });
    },
    ...mapActions(["setSingleSong", "insertSong", "setSingleSongInfo"])
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.single-song-list-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 100;
  .single-song-inner-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .list-wrapper {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 55vh;
    background: #fff;
    clip-path: inset(0 0 round 15px 15px 0 0);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .singel-song-header {
      height: 12vw;
      width: 100%;
      @include left-center;
      .song-name {
        margin-left: 2vw;
      }
    }
    .single-checks-item {
      @include left-center;
      justify-content: flex-start;
      margin-left: 3vw;
      width: 100%;
      height: 12vw;
      font-weight: 400;
      font-size: $font-size-small-x;
      .icon-description {
        width: 80%;
        border-bottom: 1px solid #e4e4e4;
        height: 100%;
        @include left-center;
        margin-left: 5vw;
      }
    }
  }
  .iconfont {
    color: $color-theme;
    font-size: 6vw;
  }
}
.black {
  background: $color-theme-d;
}
.popup {
  height: 12vw;
  width: 40vw;
  clip-path: inset(0 0 round 30px);
  position: absolute;
  top: 80vh;
  left: 35vw;
  color: #fff;
}
</style>