<template>
  <div class="recommend-container">
    <cube-scroll
      ref="scrollwrapper"
      :options="options"
      @pulling-down="onPullingDown"
      class="scroll-wrapper"
      :class="{hasBottom:playlist.length}"
    >
      <div class="slide-bg"></div>
      <div class="slide-wrapper">
        <div ref="slideWrapper" class="slide-container" v-if="this.banners.length">
          <cube-slide
            ref="slide"
            :data="this.banners"
            :initial-index="initialIndex"
            :loop="loop"
            :auto-play="autoPlay"
            :interval="interval"
            :threshold="threshold"
            :stopPropagation="true"
          >
            <cube-slide-item v-for="(item, index) in this.banners" :key="index">
              <a :href="item.url" class="slide-a">
                <div class="slide-img-container">
                  <img :src="item.imageUrl" class="slide-img">
                </div>
              </a>
            </cube-slide-item>
            <template v-if="dotsSlot" slot="dots" slot-scope="props">
              <span
                class="my-dot"
                :class="{active: props.current === index}"
                v-for="(item, index) in props.dots"
                :key="index"
              >{{index + 1}}</span>
            </template>
          </cube-slide>
        </div>
      </div>
      <div class="labels-wrapper">
        <div class="label">
          <div class="label-circle">
            <i class="iconfont icon-Radio"></i>
          </div>
          <span>私人FM</span>
        </div>
        <div class="label">
          <div class="label-circle">
            <i class="iconfont icon-recommend"></i>
          </div>
          <span>每日推荐</span>
        </div>
        <div class="label">
          <div class="label-circle">
            <i class="iconfont icon-u"></i>
          </div>
          <span>歌单</span>
        </div>
        <div class="label" @click.stop="goRank">
          <div class="label-circle">
            <i class="iconfont icon-rank"></i>
          </div>
          <span>排行榜</span>
        </div>
      </div>
      <List :title="title" :data="songSheet" @getDisc="selectItem"></List>
      <List :title="titleTwo" :data="songs" :isSong="true" @getDisc="add"></List>
    </cube-scroll>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { createNewSong } from "common/js/song";
import List from "base/list/list.vue";
import { getBanners, getRecommendSheets, getNewSongs } from "api/recommend";
import { ERR_OK } from "common/js/config";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      banners: [],
      loop: true,
      autoPlay: true,
      interval: 4000,
      threshold: 0.3,
      speed: 400,
      allowVertical: false,
      initialIndex: 1,
      dotsSlot: false,
      addItem3: false,
      title: "推荐歌单",
      titleTwo: "最新音乐",
      songSheet: [],
      songs: [],
      pullDownRefresh: true,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: "已推荐个性化内容"
    };
  },
  props: {
    initPage: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    this._getRecommend();
    this._getRecommendSheet();
  },
  components: { List },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj
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
    ...mapGetters(["playlist", "fullScreen"])
  },
  watch: {
    fullScreen() {
      this.$refs.slide.refresh();
      this.$refs.scrollwrapper.refresh();
    }
  },
  activated() {
    setTimeout(() => {
      this.$refs.slide.refresh();
    }, 0);
  },
  methods: {
    goRank() {
      this.$router.push({
        path: `/rank`
      });
    },
    _getRecommend() {
      getBanners().then(res => {
        const data = res.data;
        if (data.code === ERR_OK) {
          this.banners = data.banners.map(item => {
            item.imageUrl +=
              "?imageView&thumbnail=600x0&quality=80&tostatic=0&type=jpg";
            return item;
          });
        }
      });
      getNewSongs().then(res => {
        const data = res.data;
        if (data.code === ERR_OK) {
          this.songs = data.result.slice(0, 6).map(item => {
            return createNewSong(item.song);
          });
        }
      });
    },
    _getRecommendSheet() {
      getRecommendSheets().then(res => {
        const data = res.data;
        if (data.code === ERR_OK) {
          //let start = Math.floor(Math.random() * 6);
          this.songSheet = data.result.slice(0, 6).map(item => {
            item.picUrl +=
              "?imageView&thumbnail=253x0&quality=75&tostatic=0&type=jpg";
            return item;
          });
        }
      });
    },
    async onPullingDown() {
      await this._getRecommendSheet();
      this.$refs.scrollwrapper.forceUpdate();
    },
    selectItem(ids) {
      this.$router.push({
        path: `/sheetList/${ids.disc}`
      });
    },
    refresh() {
      this.$refs.scrollwrapper.refresh();
    },
    ...mapActions(["selectPlay", "insertSong"]),
    add(ids) {
      if (this.playlist.length) {
        let song = this.songs[ids.id];
        this.insertSong({ song });
      } else {
        let songs = this.songs;
        this.selectPlay({ list: songs, index: ids.id });
      }
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.recommend-container {
  width: 100%;
  margin-top: -2px;
  flex-direction: column;
  .slide-bg {
    height: 16vh;
    width: 100%;
    background: $color-theme;
    position: absolute;
  }
  .scroll-wrapper {
    width: 100%;
    max-height: 88vh;
    .slide-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slide-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .cube-slide {
          position: relative;
          height: 100%;
          overflow: hidden;
          .slide-a {
            @include center;
            .slide-img-container {
              height: 90%;
              width: 94%;
              clip-path: inset(0 0 round 10px 10px 10px 10px);
              .slide-img {
                height: 100%;
                width: 100%;
              }
            }
          }
        }
        .cube-slide-dots {
          top: -10px;
          .my-dot {
            height: auto;
            font-size: 12px;
            background: none;
            color: #fc9153;
          }
        }
      }
    }
    .labels-wrapper {
      @include center;
      justify-content: space-around;
      width: 100%;
      height: 15vh;
      .label {
        width: 16vw;
        height: 21vw;
        text-align: center;
        font-size: 11px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .label-circle {
          height: 14vw;
          width: 14vw;
          border-radius: 50%;
          box-shadow: #d44439 0px 0px 3px;
          background: $color-theme;
          @include center;
          .iconfont {
            color: $color-background;
            font-size: 8vw;
          }
        }
      }
    }
  }
}
.hasBottom {
  height: 83vh;
}
</style>