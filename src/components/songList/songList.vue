<!-- 歌曲列表组件 -->
<template>
  <div class="songList-wrapper">
    <div class="songList-header">
      <div class="song-playAll" @click.stop="playAll">
        <i class="iconfont icon-video"></i>
        <p>
          播放全部
          <span>(共{{totalSongs}}首)</span>
        </p>
      </div>
      <div class="song-collect">+收藏(3865)</div>
    </div>
    <div class="songList-songs" v-if="this.songs.length">
      <songItem :songs="this.songs" @selectItem="add" @showSongList="showSongList"></songItem>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SongItem from "base/songItem/songItem.vue";
import { scorllRefreshMixin } from "common/js/mixin";
export default {
  mixins: [scorllRefreshMixin],
  data() {
    return {
      showSingleSongInfo: false,
      songInfo: null
    };
  },
  props: {
    songs: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    author: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(["playlist"]),
    totalSongs() {
      return this.songs.length;
    }
  },
  components: { SongItem },
  methods: {
    ...mapActions(["selectPlay", "insertSong"]),
    add(id) {
      if (this.playlist.length) {
        let song = this.songs[id];
        this.insertSong({ song });
      } else {
        let songs = this.songs;
        this.selectPlay({ list: songs, index: id });
      }
    },
    playAll() {
      let songs = this.songs;
      this.selectPlay({ list: songs, index: 0 });
    },
    showSongList(id) {
      this.showSingleSongInfo = true;
      this.songInfo = this.songs[id];
    },
    closed() {
      this.singleSongList = false;
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
span {
  color: $color-theme-g;
}
.songList-wrapper {
  margin-top: 2%;
  width: 100vw;
  min-height: 70vh;
  background: $color-background;
  clip-path: inset(0 0 round 15px 15px 0 0);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.songList-header {
  color: $color-text;
  width: 100%;
  height: 10vw;
  border-bottom: 1px solid #e4e4e4;
  @include center;
  justify-content: space-between;
  font-size: $font-size-medium;
  .song-playAll {
    height: 100%;
    @include center;
    justify-content: flex-start;
    width: 71%;
    p {
      margin-left: 5%;
      margin-top: 0.5%;
    }
    padding-left: 5%;
  }
  .song-collect {
    height: 100%;
    width: 29%;
    background-color: $color-theme;
    @include center;
    color: $color-background;
  }
}
.songList-songs {
  width: 100%;
}
</style>