<!-- 搜索列表组件 -->
<template>
  <div class="search-list-wrapper">
    <cube-scroll
      ref="scrollwrapper"
      class="scroll-wrapper"
      v-if="songs.length && !this.loading"
      @pulling-up="onPullingUp"
      :options="options"
      :class="{hasBottom:playlist.length}"
    >
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
      <song-item :songs="songs" :hasIndex="false" @selectItem="add"></song-item>
    </cube-scroll>
    <loading v-if="this.loading"></loading>
    <no-result v-if="!this.result && !this.loading"></no-result>
  </div>
</template>

<script>
import songItem from "base/songItem/songItem";
import loading from "base/load/load";
import noResult from "base/noResult/noResult";
import { mapActions, mapGetters } from "vuex";
import { ERR_OK } from "common/js/config";
import { createSearchSong } from "common/js/song";
import { queryWord } from "api/search";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      songs: [],
      loading: false,
      page: 0,
      query: "",
      pullUpLoad: true,
      pullUpLoadThreshold: 30,
      result: true
    };
  },
  components: { songItem, loading, noResult },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj
      };
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    },
    ...mapGetters(["playlist", "fullScreen"])
  },
  watch: {
    fullScreen(boolean) {
      if (!boolean) this.refresh();
    }
  },
  methods: {
    ...mapActions(["selectPlay", "insertSong", "saveSearchList"]),
    add(id) {
      let song = this.songs[id];
      this.insertSong({ song });
    },
    playAll() {
      let songs = this.songs;
      this.selectPlay({ list: songs, index: 0 });
    },
    onPullingUp() {
      queryWord(this.query, ++this.page).then(res => {
        this.songs = this.songs.concat(
          res.data.result.songs.map(item => createSearchSong(item))
        );
        this.refresh();
      });
    },
    refresh() {
      setTimeout(() => {
        this.$refs.scrollwrapper.refresh();
        this.$refs.scrollwrapper.forceUpdate();
      }, 20);
    },
    search(query) {
      this.loading = true;
      if (query == "") {
        this.loading = false;
        return;
      }
      queryWord(query).then(res => {
        setTimeout(() => {
          this.saveSearchList(query);
          this.query = query;
          if (res.data.code === ERR_OK) {
            if (!res.data.result.songs) {
              this.result = false;
              this.loading = false;
            } else {
              this.songs = res.data.result.songs.map(item =>
                createSearchSong(item)
              );
              this.result = true;
            }
          }
          this.loading = false;
        }, 1500);
      });
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.scroll-wrapper {
  height: 95vh;
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
  }
}
.iconfont {
  font-size: 6vw;
}
.hasBottom {
  height: 87vh;
}
</style>