<!-- 歌单列表组件 -->
<template>
  <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
    <div class="sheetList-wrapper animated" v-show="!fullScreen">
      <div class="sheet-header">
        <div class="icon-wrapper" @click.stop="back">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="sheet-description">
          <p class="title">歌单</p>
          <p class="recommend-reason">啊啊啊啊啊啊啊啊啊</p>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-search"></i>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
      <div class="background">
        <div class="filter"></div>
        <img :src="coverImageUrl" width="100%" height="100%">
      </div>
      <cube-scroll
        ref="scrollwrapper"
        class="scroll-wrapper"
        :options="options"
        :class="{hasBottom:playlist.length}"
      >
        <div class="sheet-top-wrapper">
          <div class="sheet-banner">
            <div class="cover-img-wrapper">
              <img :src="coverImageUrl">
            </div>
            <div class="cover-info">
              <h2 class="cover-title">{{title}}</h2>
              <div class="up-info">
                <div class="circle-img-wrapper">
                  <img :src="avatarUrl" alt>
                </div>
                <span class="up-name">{{authorName}}</span>
              </div>
            </div>
          </div>
          <div class="function-bar">
            <div class="bar-wrapper">
              <i class="iconfont icon-comments"></i>
              <span>{{this.commentsNum}}</span>
            </div>
            <div class="bar-wrapper">
              <i class="iconfont icon-share"></i>
              <span>1212</span>
            </div>
            <div class="bar-wrapper">
              <i class="iconfont icon-download"></i>
              <span>下载</span>
            </div>
            <div class="bar-wrapper">
              <i class="iconfont icon-checks"></i>
              <span>多选</span>
            </div>
          </div>
        </div>

        <song-list :songs="this.songs" v-if="this.songs.length"></song-list>
        <loading v-if="!this.songs.length"></loading>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import SongList from "components/songList/songList.vue";
import { getDisc } from "api/songList.js";
import { mapGetters } from "vuex";
import { ERR_OK } from "common/js/config";
import { createSong } from "common/js/song";
import loading from "base/load/load";
import { loadingMixin } from "common/js/mixin";
export default {
  mixins: [loadingMixin],
  name: "sheetList",
  data() {
    return {
      Disc: {},
      songs: [],
      commentsNum: 0
    };
  },
  created() {
    this.comments;
    this._getDisc();
  },
  watch: {
    fullScreen() {
      this.$refs.scrollwrapper.refresh();
    }
  },
  computed: {
    options() {
      return {
        bounce: {
          top: false,
          bottom: true,
          left: true,
          right: true
        }
      };
    },
    title() {
      return Object.keys(this.Disc).length ? this.Disc.name : "网易云音乐";
    },
    authorName() {
      return Object.keys(this.Disc).length ? this.Disc.creator.nickname : "";
    },
    avatarUrl() {
      return Object.keys(this.Disc).length ? this.Disc.creator.avatarUrl : "";
    },
    coverImageUrl() {
      return Object.keys(this.Disc).length
        ? this.Disc.coverImgUrl +
            "?imageView&thumbnail=253x0&quality=75&tostatic=0&type=jpg"
        : "";
    },
    ...mapGetters(["fullScreen", "playlist"])
  },
  components: { SongList, loading },
  methods: {
    back() {
      this.$router.go(-1);
    },
    normalizSong(song) {
      return createSong(song);
    },
    _getDisc() {
      const id = this.$route.params.id;
      if (!id) this.$router.back();
      else
        getDisc(id)
          .then(res => {
            if (res.code === ERR_OK) {
              this.Disc = res.playlist;
              this.comments = res.comments;
              this.commentsNum = res.comments.total;
              this.songs = this.Disc.tracks.map(item =>
                this.normalizSong(item)
              );
              this.setLoading(false);
            }
          })
          .catch(() => {
            console.info("errorList");
          });
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.sheetList-wrapper {
  width: 100vw;
  @include center;
  flex-direction: column;
  color: $color-text-lm;
}
.scroll-wrapper {
  width: 100%;
  margin-top: 8vh;
  max-height: 92vh;
}
.iconfont {
  font-size: 7vw;
}
.sheet-top-wrapper {
  width: 100vw;
  @include center;
  flex-direction: column;
  position: relative;
}
.background {
  position: absolute;
  left: -50%;
  top: -50%;
  width: 300%;
  height: 300%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(30px);
  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.6;
  }
}
.sheet-bg {
  width: 100vw;
  height: 39vh;
  position: absolute;
  z-index: -1;
  filter: blur(100px);
}
.sheet-header {
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  @include center;
  justify-content: space-around;
  height: 8vh;
  .icon-wrapper {
    width: 10vw;
    height: 10vw;
  }
  .sheet-description {
    margin-left: -10px;
    width: 55vw;
    height: 10vw;
    .title {
      font-size: $font-size-medium-x;
      margin-bottom: 3%;
    }
    .recommend-reason {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}
.sheet-banner {
  height: 23vh;
  width: 90%;
  @include center;
  justify-content: space-between;
  .cover-img-wrapper {
    height: 15vh;
    width: 15vh;
    clip-path: inset(0 0 round 5%);
    img {
      width: 100%;
    }
  }
  .cover-info {
    height: 12vh;
    width: 56vw;
    .cover-title {
      font-size: $font-size-large-s;
      line-height: 24px;
    }
    .up-info {
      margin-top: 4%;
      @include center;
      justify-content: flex-start;
    }
    .circle-img-wrapper {
      width: 5vw;
      height: 5vw;
      clip-path: inset(0 0 round 50%);

      margin-right: 6%;
      img {
        width: 100%;
      }
    }
    .up-name {
      margin-top: 1%;
    }
  }
}
.function-bar {
  width: 100%;
  height: 7.5vh;
  display: flex;
  justify-content: space-around;
  .bar-wrapper {
    height: 100%;
    width: 13%;
    @include center;
    flex-direction: column;
    span {
      padding-top: 15%;
    }
  }
}
.hasBottom {
  height: 85vh;
}
</style>