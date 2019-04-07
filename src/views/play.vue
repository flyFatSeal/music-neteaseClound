<!-- 歌曲播放组件 -->
<template>
  <div class="play-wrapper" v-if="playlist.length">
    <transition
      name="normal"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      class="normal-player-wrapper"
    >
      <div class="animation-wrapper animated" v-show="fullScreen">
        <div class="background">
          <div class="filter"></div>
          <img :src="currentSong.image" width="100%" height="100%">
        </div>
        <div class="player-top">
          <div class="header-top-wrapper">
            <div class="icon-wrapper">
              <i class="iconfont icon-back" @click="back"></i>
            </div>
            <div class="sheet-description">
              <p class="title">{{currentSong.name}}</p>
              <p class="recommend-reason">{{currentSong.singer}}</p>
            </div>
            <div class="icon-wrapper">
              <i class="iconfont icon-share"></i>
            </div>
          </div>
          <div class="volume-wrapper" v-if="pageState !== 'cd'">
            <i class="iconfont icon-laba"></i>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="volumePercent"
                :btnStyle="this.btnStyle"
                @percentChangeEnd="volumePercentChangeEnd"
                @percentChange="volumePercentChange"
              ></progress-bar>
            </div>
          </div>
        </div>
        <transition name="cd" enter-active-class="fadeIn" leave-active-class="fadeOut">
          <div class="player-middle-cd animated faster" v-show="pageState === 'cd'">
            <div class="player-bg"></div>
            <!-- <div class="needle"></div> -->
            <div class="cd-wrapper" :class="isRunning" @click.stop="pageStateChange">
              <div class="cd-cover"></div>
              <div class="cd-img-wrapper">
                <img :src="currentSong.image">
              </div>
            </div>
            <div class="function-bars">
              <i class="iconfont icon-favorite" :class="islike" @click.stop="favoriteSong"></i>
              <i class="iconfont icon-download"></i>
              <i class="iconfont icon-comments"></i>
              <i class="iconfont icon-liebiao" @click.stop="showSingleInfo"></i>
            </div>
          </div>
        </transition>
        <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
          <cube-scroll
            ref="lyricList"
            class="scroll-wrapper animated faster"
            v-show="pageState !== 'cd'"
          >
            <div class="lyric-wrapper" @click.stop="pageStateChange">
              <div class="currentLyric" v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  :class="{'current': currentLineNum === index}"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.key"
                >{{line.txt}}</p>
              </div>
              <p class="no-lyric" v-if="currentLyric === null">{{upDatecurrentLyric}}</p>
            </div>
          </cube-scroll>
        </transition>
        <div class="player-bottom">
          <div class="play-progress-bar-control">
            <span class="time current">{{format(currentTime)}}</span>
            <div class="plaer-progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                :Color="progressColor"
                @percentChange="percentChange"
              ></progress-bar>
            </div>
            <span class="time duration">{{format(duration)}}</span>
          </div>
          <div class="play-control">
            <div class="play-icon" @click.stop="switchMode">
              <i class="iconfont" :class="modeStyle.mode"></i>
            </div>
            <div class="play-icon" @click.stop="prev">
              <i class="iconfont icon-prev"></i>
            </div>
            <div class="play-icon" @click.stop="playChange">
              <i class="iconfont" :class="{ 'icon-play': playing, 'icon-pause':!playing }"></i>
            </div>
            <div class="play-icon" @click.stop="next">
              <i class="iconfont icon-next"></i>
            </div>
            <div class="play-icon">
              <i class="iconfont icon-list" @click.stop="open"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini" class="mini-wrapper">
      <div class="mini-player" v-show="!fullScreen" @click.stop="fullPlayerScreen">
        <div class="icon-wrapper-mini">
          <img :class="currentSong.image" width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="singer">{{miniBottom}}</p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i @click.stop="playChange" class="iconfont" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="iconfont icon-list" @click.stop="open"></i>
        </div>
      </div>
    </transition>
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown">
      <play-list
        @close="closed"
        :activePlayList="activePlayList"
        :songNumber="playlist.length"
        @closeAll="closeAll"
        class="animated faster"
        v-if="activePlayList"
      ></play-list>
    </transition>
    <audio ref="audio" id="ad" @timeupdate="updateTime" @ended="audioPlayEnd"></audio>
    <cube-button @click="showClose" v-show="false"></cube-button>
  </div>
</template>

<script>
import { getLyric, getAudio, getSong } from "api/song.js";
import { mapGetters, mapActions } from "vuex";
import Lyric from "lyric-parser";
import { ERR_OK, playMode } from "common/js/config";
import progressBar from "base/progress-bar/progress-bar";
import playList from "components/playList/playList.vue";
import progressCircle from "base/progress-circle/progress-circle";
import { getRandomInt, throttle } from "common/js/util";
import { setInterval, clearInterval, setTimeout } from "timers";
export default {
  data() {
    return {
      percent: 0,
      volumePercent: 0.5,
      btnStyle: "10px",
      progressColor: "rgb(212, 68, 57)",
      pageState: "cd",
      currentLyric: null,
      currentLineNum: 0,
      noLyric: false,
      duration: 0,
      currentTime: 0,
      url: "",
      radius: 32,
      activePlayList: false,
      playingLyric: null
    };
  },
  components: { progressBar, progressCircle, playList },
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
    islike() {
      return this.favoriteList.some(item => {
        return item.id === this.currentSong.id;
      })
        ? "like"
        : "dislike";
    },
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "playing",
      "currentIndex",
      "mode",
      "sequenceList",
      "favoriteList"
    ]),
    miniBottom() {
      return this.fullScreen ? this.currentSong.singer : this.playingLyric;
    },
    isRunning() {
      return this.playing ? "running" : "pause";
    },
    upDatecurrentLyric() {
      return "暂无歌词";
    },
    miniIcon() {
      return this.playing ? "icon-mini-pause mini " : "icon-mini-play mini";
    }
  },
  mounted() {
    if (this.fullScreen) this._getAudio(this.playlist[this.currentIndex]);
  },
  methods: {
    switchMode() {
      let type = (this.mode + 1) % 3;
      this.setPlayMode(type);
    },
    audioPlayEnd() {
      if (this.mode === playMode.sequence)
        this.setCurrentIndex(this.currentIndex + 1);
      else if (this.mode === playMode.loop) {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      } else {
        let random = getRandomInt(0, this.playlist.length);
        if (random === this.currentIndex)
          random = getRandomInt(0, this.playlist.length);
        this.setCurrentIndex(random);
      }
    },
    open() {
      this.activePlayList = true;
    },
    closed() {
      this.activePlayList = false;
    },
    closeAll() {
      this.activePlayList = false;
      this.setFullScreen(false);
      this.deleteAll();
    },
    back() {
      this.setFullScreen(false);
    },
    next() {
      if (this.mode === playMode.sequence)
        this.setThrottleCurrentIndex(this.currentIndex + 1);
      else if (this.mode === playMode.loop) {
        this.setThrottleCurrentIndex(this.currentIndex + 1);
      } else {
        let random = getRandomInt(0, this.playlist.length);
        if (random === this.currentIndex)
          random = getRandomInt(0, this.playlist.length);
        this.setThrottleCurrentIndex(random);
      }
    },
    prev() {
      this.setThrottleCurrentIndex(this.currentIndex - 1);
    },
    setThrottleCurrentIndex: throttle(function(idx) {
      this.setCurrentIndex(idx);
    }, 1500),
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    _getAudio(id) {
      getAudio(id)
        .then(res => {
          const data = res.data;
          if (data.code === ERR_OK) this.url = data.data[0]["url"];
          if (!this.url) this.showClose();
        })
        .catch(() => {
          this.showClose();
        });
    },
    _getLyric(id) {
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
        this.currentLineNum = 0;
      }
      this.noLyric = false;
      getLyric(id)
        .then(res => {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
            this.currentLineNum = 0;
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          }
        })
        .catch(() => {
          this.currentLineNum = 0;
          this.currentLyric = null;
          this.noLyric = true;
        });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 4];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    volumePercentChangeEnd() {},
    volumePercentChange(percent) {
      this.$refs.audio.volume = percent;
    },
    percentChangeEnd(percent) {
      this.move = false;
      const currentTime = this.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.$refs.audio.play();
        this.setPlayingState(true);
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    percentChange(percent) {
      this.move = true;
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      this.$refs.audio.currentTime = currentTime;
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    fullPlayerScreen() {
      this.setFullScreen(true);
    },
    playChange() {
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
      if (this.playing) {
        this.setPlaying(false);
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
        this.setPlaying(true);
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    pageStateChange() {
      this.pageState = this.pageState === "cd" ? "lyric" : "cd";
      if (this.pageState === "lyric")
        setTimeout(() => {
          this.$refs.lyricList.refresh();
        }, 10);
    },
    _getSongImg(id) {
      getSong(id).then(res => {
        if (res.data.code === ERR_OK)
          this.setSongImage({
            id: this.currentIndex,
            image: res.data.songs[0].al.picUrl
          });
      });
    },
    favoriteSong() {
      if (this.islike === "dislike") {
        this.saveFavoriteSongs(this.currentSong);
      } else this.deleteFavoriteList(this.currentSong);
    },
    showSingleInfo() {
      this.setSingleSongInfo(this.currentSong);
      this.setSingleSong(true);
    },
    getDuration() {
      let count = 50;
      this.duration = 0;
      let stop = setInterval(() => {
        if (this.duration > 0 || --count === 0) clearInterval(stop);
        this.duration = this.$refs.audio.duration;
      }, 200);
    },
    showClose() {
      this.$refs.audio.src = null;
      this.duration = 0;
      this.$createDialog({
        type: "alert",
        showClose: true,
        title: "抱歉，版权问题，歌曲已下架"
      }).show();
    },
    ...mapActions([
      "setPlaying",
      "setPlayMode",
      "setCurrentIndex",
      "setFullScreen",
      "deleteAll",
      "setSongImage",
      "savePlayHistory",
      "saveFavoriteSongs",
      "deleteFavoriteList",
      "setSingleSong",
      "setSingleSongInfo"
    ])
  },
  watch: {
    url(newUrl) {
      if (!newUrl) {
        this.showClose();
        return;
      }
      this.$refs.audio.src = newUrl;
      this.$refs.audio.play();
      this.getDuration();
    },
    currentTime() {
      this.percent = this.currentTime / this.duration;
    },
    currentSong(newSong) {
      if (!newSong.id) return;
      if (!newSong.image) this._getSongImg(newSong.id);
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
        this.playingLyric = null;
      }
      this.savePlayHistory(newSong);
      this._getAudio(newSong.id);
      this._getLyric(this.currentSong.id);
      this.setPlaying(true);
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.normal-player-wrapper {
  width: 100%;
  height: 100%;
  @include center;
  flex-direction: column;
  justify-content: flex-start;
  color: $color-background-player;
}
.animation-wrapper {
  height: 100vh;
  color: $color-background;
}
.player-bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: -1;
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
.player-top {
  width: 100vw;
  height: 8vh;
  @include center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(228, 228, 228, 0.1);
  .header-top-wrapper {
    width: 100vw;
    @include no-wrap(1);
    @include center;
    justify-content: space-between;
    .icon-wrapper {
      width: 10vw;
      height: 10vw;
    }
    .sheet-description {
      margin-left: -8%;
      width: 58vw;
      height: 10vw;
      .title {
        font-size: $font-size-medium-x;
        margin-bottom: 3%;
        @include singleline-ellipsis(2);
      }
      .recommend-reason {
        @include singleline-ellipsis(10);
      }
    }
  }
  .volume-wrapper {
    @include center;
    position: absolute;
    top: 8vh;
    z-index: 99;
    justify-content: space-around;
    width: 100%;
    .icon-laba {
      font-size: 4.5vw;
      margin-left: 2vw;
      margin-bottom: 0.6vw;
    }
    .progress-bar-wrapper {
      width: 80%;
      margin-right: 2vw;
    }
  }
}
.player-middle-cd {
  width: 100%;
  height: 72vh;
  @include center;
  justify-content: space-around;
  flex-direction: column;
  position: relative;
  .function-bars {
    width: 100%;
    @include center;
    justify-content: space-around;
    height: 0vw;
    .icon-seq {
      font-size: 4vw;
    }
  }
  .needle {
    position: absolute;
    width: 110px;
    height: 157px;
    top: 0;
    left: 195px;
    @include bg-image("../common/image/needle.png");
    z-index: 99;
  }
  .cd-wrapper {
    position: relative;
    width: 85vw;
    height: 85vw;
    @include center;
    position: relative;
    animation: rotate-disk 20s infinite normal linear;
    .cd-img-wrapper {
      width: 53.5vw;
      height: 53.5vw;
      z-index: 3;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .running {
    animation-play-state: running;
  }
  .pause {
    animation-play-state: paused;
  }
  .cd-bg {
    width: 67vw;
    height: 67vw;
    position: absolute;
    border-radius: 50%;
  }
  .cd-cover {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 100%;
    background-image: url("../common/image/cd-cover.png");
    background-size: contain;
    @include center;
  }
}
.scroll-wrapper {
  position: absolute;
  top: 18vw;
  max-height: 65vh;
  width: 100vw;
  .lyric-wrapper {
    width: 80%;
    min-height: 65vh;
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    .text {
      line-height: 40px;
      color: $color-text-ggg;
      font-size: $font-size-medium;
      &.current {
        color: #fff;
      }
    }
    .no-lyric {
      line-height: 40px;
      margin-top: 60%;
      color: $color-text-ggg;
      font-size: $font-size-medium;
    }
  }
}

.player-bottom {
  width: 100%;
  height: 20vh;
  bottom: 0;
  position: absolute;
  .play-progress-bar-control {
    margin-top: 15px;
    @include center;
    .plaer-progress-bar-wrapper {
      width: 65%;
      margin-left: 2%;
      margin-right: 2%;
    }
  }
  .play-control {
    margin-top: 15px;
    @include center;
    justify-content: space-around;
  }
}
.play-icon {
  width: 7vw;
  height: 7vw;
  @include center;
}
.iconfont {
  font-size: 7vw;
}
.icon-seq,
.icon-list,
.icon-loop {
  font-size: 6vw;
}
.icon-prev,
.icon-next {
  font-size: 8vw;
}
.icon-play,
.icon-pause {
  font-size: 11vw;
}
.like {
  color: $color-theme;
}
.dislike {
}
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 45px;
  border-top: 1px solid #e4e4e4;
  z-index: 99;
  background-color: $color-theme-l;
  display: flex;
  align-items: center;
  .icon-wrapper-mini {
    height: 10vw;
    width: 10vw;
    clip-path: inset(0 0 round 5%);
    img {
      width: 100%;
      height: 100%;
    }
    margin-left: 2vw;
  }
  .text {
    width: 65%;
    height: 70%;
    margin-left: 2vw;
    @include center;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .name {
      font-size: $font-size-small-x;
      color: $color-text;
      margin-bottom: 1vw;
      @include singleline-ellipsis();
    }
    .singer {
      height: 10px;
      padding-top: 2px;
      font-size: $font-size-small-s;
      color: $color-text-g;
      @include singleline-ellipsis();
    }
  }
  .control {
    width: 8vw;
    height: 8vw;
    .icon-list {
      font-size: 8vw;
      margin-left: 2vw;
    }
  }
}
.mini {
  font-size: 5vw;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include center;
}
@keyframes rotate-disk {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  25% {
    -webkit-transform: rotateZ(90deg);
  }
  50% {
    -webkit-transform: rotateZ(180deg);
  }
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
@keyframes isLike {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>