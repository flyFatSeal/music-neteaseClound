<!--  -->
<template>
  <div class="song-wrapper" v-if="this.songs.length" @click.stop="selectItem">
    <div
      class="song-item"
      :style="setHeight"
      v-for="(item,index) in this.songs"
      :key="index"
      :data-id="index"
    >
      <span class="song-rank" v-if="hasIndex">{{index+1}}</span>
      <div class="song-info-wrapper" :style="setWrapper">
        <div class="song-info">
          <p class="song-name">{{item.name}}</p>
          <p class="song-singer">{{item.singer}}</p>
        </div>
        <div class="icon-wrapper">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    songs: {
      type: Array,
      default: null
    },
    height: {
      type: Number,
      default: 14
    },
    hasIndex: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    setHeight() {
      return `height:${this.height}vw`;
    },
    setWrapper() {
      return this.hasIndex ? "" : "width:90%";
    }
  },
  methods: {
    ...mapActions(["setSingleSong", "setSingleSongInfo"]),
    selectItem(e) {
      let num;
      if (e.target.className !== "song-item")
        for (let node of e.path) {
          if (node.className === "song-item") {
            num = Number(node.attributes["data-id"].value);
            if (
              e.target.className === "icon-wrapper" ||
              e.target.nodeName === "I"
            ) {
              this.setSingleSongInfo(this.songs[num]);
              this.setSingleSong(true);
            } else this.$emit("selectItem", num);
            return;
          }
        }
    },
    closed() {
      this.showSingleSongInfo = false;
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.song-item {
  @include center;
  justify-content: space-between;
  .song-rank {
    margin-left: 5%;
    font-size: $font-size-medium-x;
    color: $color-text-g;
  }
  .song-info-wrapper {
    width: 85%;
    height: 100%;
    margin-left: 5%;
    @include center;
    justify-content: space-between;
    border-bottom: 1px solid #e4e4e4;
    .song-info {
      width: 76vw;
    }
    .song-name {
      font-size: $font-size-medium;
      margin-bottom: 8px;
      color: $color-text;
      @include singleline-ellipsis();
    }
    .song-singer {
      color: $color-text-g;
      padding-top: 3px;
      margin-right: 0;
      @include singleline-ellipsis(10);
    }
    .icon-wrapper {
      height: 100%;
      @include center;
    }
  }
  .iconfont {
    font-size: 6vw;
    color: $color-text-g;
  }
}
</style>