<!-- 歌曲排行组件 -->
<template>
  <div class="rank-wrapper">
    <div class="rank-top">
      <div class="icon" @click.stop="back">
        <i class="iconfont icon-back"></i>
      </div>
      <p class="title">排行榜</p>
    </div>
    <cube-scroll
      ref="scrollwrapper"
      class="scroll-wrapper"
      v-if="!loading"
      :class="{hasBottom:playlist.length}"
    >
      <div class="vertical-rank">
        <h3 class="rank-name">官方榜</h3>
        <div
          class="single-rank-wrapper"
          v-for="(item,index) in this.verticalRanks"
          :key="index"
          @click.stop="goSheetList(item.id)"
        >
          <div class="img-wrapper">
            <img :src="item.coverImgUrl" alt>
          </div>
          <div class="top-songs-wrapper">
            <div class="top-songs" v-for="(song,songIndex) in item.tracks" :key="songIndex">
              <span>{{songIndex+1}}.</span>
              <span class="song-name">{{song.first+'-'+song.second}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flat-rank">
        <list
          v-for="(item,index) in this.equalRank"
          :key="index"
          :data="item"
          @getDisc="goSheetList"
        ></list>
      </div>
    </cube-scroll>
    <loading v-else></loading>
  </div>
</template>

<script>
import { getRankAll } from "api/rank";
import list from "base/list/list";
import { ERR_OK } from "common/js/config";
import loading from "base/load/load";
import { scorllRefreshMixin, loadingMixin } from "common/js/mixin";
export default {
  mixins: [scorllRefreshMixin, loadingMixin],
  data() {
    return {
      verticalRanks: [],
      equalRank: [],
      loading: true
    };
  },
  created() {
    this._getRank();
  },
  components: { list, loading },
  methods: {
    back() {
      this.$router.go(-1);
    },
    normalizSong(song) {
      let item = {};
      item.id = song.id;
      item.picUrl = song.coverImgUrl;
      item.name = song.name;
      return item;
    },
    _getRank() {
      getRankAll()
        .then(res => {
          if (res.data.code === ERR_OK) {
            this.verticalRanks = res.data.list.slice(0, 4);
            this.equalRank.push(
              res.data.list.slice(5, 11).map(item => this.normalizSong(item))
            );
            this.equalRank.push(
              res.data.list.slice(12, 18).map(item => this.normalizSong(item))
            );
          }
        })
        .then(() => {
          this.loading = false;
        });
    },
    goSheetList(idx) {
      let id;
      id = Object.keys(idx).length > 1 ? idx.disc : idx;
      this.$router.push({
        path: `/sheetList/${id}`
      });
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.rank-wrapper {
  width: 100vw;
}
.rank-top {
  @include center;
  justify-content: flex-start;
  height: 10vw;
  width: 100%;
  background: $color-theme;
  color: $color-background;
  .icon {
    height: 10vw;
    width: 10vw;
    @include center;
  }
  .title {
    font-size: 4vw;
  }
  .iconfont {
    font-size: 7vw;
  }
}
.scroll-wrapper {
  height: 100vh;
  .vertical-rank {
    width: 100vw;
    .rank-name {
      font-size: 4vw;
      margin-left: 2vw;
      color: $color-text;
      margin-top: 5vw;
      margin-bottom: 3vw;
    }
    .single-rank-wrapper {
      height: 31vw;
      width: 100vw;
      @include center;
      justify-content: flex-start;
      .img-wrapper {
        margin-left: 2vw;
        width: 29vw;
        height: 29vw;
        clip-path: inset(0 0 round 5%);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .top-songs-wrapper {
        width: 60vw;
        height: 80%;
        @include center;
        flex-direction: column;
        justify-content: space-around;
      }
      .top-songs {
        width: 100%;
        height: 5vw;
        margin-left: 15px;
        @include center;
        justify-content: flex-start;
      }
      .song-name {
      }
    }
  }
}
.hasBottom {
  height: 87vh;
}
</style>