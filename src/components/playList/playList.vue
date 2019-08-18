<!-- 播放列表组件 -->
<template>
  <div class="playList-wrapper" @click="closePlayList">
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="playList-background animated faster" v-if="activePlayList"></div>
    </transition>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <div class="list-wrapper animated faster" @click.stop v-if="activePlayList">
        <div class="playList-header">
          <div class="playList-mode" @click="switchMode">
            <i class="iconfont" :class="modeStyle.mode"></i>
            <p>
              {{modeStyle.txt}}
              <span>({{songNumber}})</span>
            </p>
          </div>
          <div class="song-collect">
            <i class="iconfont icon-collection"></i>
            收藏全部
          </div>
          <cube-button @click.stop="showBtn" class="deleteBtn">
            <i class="iconfont icon-delete"></i>
          </cube-button>
        </div>
        <cube-scroll ref="scrollPlaylist" class="scroll-wrapper" :stopPropagation="false">
          <div class="playList-songs-wrapper" @touchstart.stop="selectItem">
            <div
              class="playList-song-item"
              :class="{'selectSong':currentIndex === index }"
              v-for="(item,index) in playlist"
              :key="index"
              :data-id="index"
              ref="listItem"
            >
              <div class="song-info-wrapper">
                <i class="iconfont icon-laba" v-show="currentIndex === index"></i>
                <span class="songName">{{item.name}}</span>
                <p class="singer">- {{item.singer}}</p>
              </div>
              <i class="iconfont icon-x"></i>
            </div>
          </div>
        </cube-scroll>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      type: 0
    };
  },
  async mounted() {
    await this.$nextTick();
    this.scrollCurrent(this.currentIndex);
  },
  props: {
    activePlayList: {
      type: Boolean,
      default: false
    },
    songNumber: {
      type: Number,
      default: 0
    }
  },
  computed: {
    modeStyle() {
      let res = {};
      if (this.mode === 1) {
        res.mode = "icon-loop";
        res.txt = "单曲循环";
      } else if (this.mode === 0) {
        res.mode = "icon-seq";
        res.txt = "顺序播放";
      } else {
        res.mode = "icon-random";
        res.txt = "随机播放";
      }
      return res;
    },
    ...mapGetters(["playlist", "currentIndex", "mode"])
  },
  watch: {
    async currentIndex(newIndex) {
      if (newIndex > 0 && this.activePlayList) {
        await this.$nextTick();
        this.scrollCurrent(newIndex);
      }
    }
  },
  components: {},
  methods: {
    switchMode() {
      let type = (this.mode + 1) % 3;
      this.setPlayMode(type);
    },
    closePlayList() {
      this.$emit("close");
    },
    showBtn() {
      this.$createDialog({
        type: "confirm",
        content: "确定清空播放列表？",
        confirmBtn: {
          text: "确定",
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          this.deleteAllSongs();
        }
      }).show();
    },
    deleteAllSongs() {
      this.$emit("closeAll");
    },
    scrollCurrent(id) {
      this.$refs.scrollPlaylist.scrollToElement(this.$refs.listItem[id], 300);
    },
    selectItem(e) {
      console.dir(e);
      let [x, y] = [e.touches[0].pageX, e.touches[0].pageY];
      this.$WaterDrop(e.target, { x, y });
      let id;
      let count = 4;
      if (e.target.className !== "playList-song-item")
        for (let node of e.path) {
          if (--count === 0) return;
          if (
            node.className === "playList-song-item" ||
            node.className === "playList-song-item selectSong"
          ) {
            id = Number(node.attributes["data-id"].value);
            if (e.target.nodeName === "I") {
              this.deleteOneSong(id);
            } else {
              this.setCurrentIndex(id);
              this.scrollCurrent(id);
            }
            return;
          }
        }
    },
    ...mapActions(["setCurrentIndex", "deleteOneSong", "setPlayMode"])
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.playList-wrapper {
  position: absolute;
  top: 0;
  z-index: 99;
}
.playList-background {
  width: 100vw;
  height: 100vh;
  background: $color-list-backgroud;
}
.list-wrapper {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 61vh;
  background: $color-background;
  clip-path: inset(0 0 round 15px 15px 0 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.playList-header {
  width: 100%;
  height: 10vw;
  border-bottom: 1px solid #e4e4e4;
  @include center;
  justify-content: space-between;
  font-size: $font-size-medium;
  .playList-mode {
    display: flex;
    width: 48%;
    p {
      margin-left: 5%;
      margin-top: 0.5%;
    }
    padding-left: 15px;
  }
  .song-collect {
    height: 100%;
    width: 29%;
    @include center;
    .icon-collection {
      margin-right: 6px;
    }
  }
}
.scroll-wrapper {
  width: 100%;
  height: calc(65vh-10vw);
  .playList-song-item {
    width: 100%;
    height: 10vw;
    @include center;
    justify-content: space-between;
    border-bottom: 1px solid #e4e4e4;
    .song-info-wrapper {
      @include center;
      justify-content: flex-start;
      height: 100%;
      width: 85%;
      margin-left: 15px;
      position: relative;
      @include singleline-ellipsis(10);
      .songName {
        font-size: $font-size-medium;
      }
      .singer {
        margin-left: 5px;
        color: $color-theme-d;
        font-size: $font-size-small-s;
      }
    }
  }
}
.cube-btn {
  color: $color-theme-d;
  width: 7vw;
  height: 100%;
  @include center;
  background: $color-background;
  margin: 0;
  padding: 0;
}
.cube-dialog-content {
  .cube-dialog-content-def > p {
    margin: 0;
  }
}
.cube-dialog-btn_highlight {
  color: $color-theme;
}
.iconfont {
  font-size: 4vw;
}
.icon-delete {
  padding-right: 15px;
}
.selectSong {
  color: $color-theme;
}
.icon-laba {
  margin-right: 5px;
  margin-bottom: 3.5px;
}
.icon-x {
  margin-right: 4vw;
}
</style>