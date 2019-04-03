<!-- 歌单榜单组件 -->
<template>
  <div class="list-wrapper">
    <h3 class="list-title">{{title}}</h3>
    <div class="songsheet-wrapper">
      <div
        class="sheet-item"
        v-for="(item,index) in data"
        :key="index"
        @click="selectItem(item.id)"
      >
        <div class="cover-wrapper">
          <img :src="item.picUrl" alt="封面">
          <p class="play-count">
            <i class="iconfont icon-headphone"></i>
            {{playCount(item.playCount || '')}}
          </p>
        </div>
        <p class="cover-info">{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "更多榜单"
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    selectItem(id) {
      this.$emit("getDisc", id);
    },
    playCount(playCount) {
      return playCount > 99999 ? `${Math.floor(playCount % 100)}万` : playCount;
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.list-wrapper {
  margin-top: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list-title {
  font-size: $font-size-medium;
  color: $color-text;
  font-weight: 700;
  padding-left: 1.5%;
}
.songsheet-wrapper {
  align-self: center;
  margin-top: 3.5%;
  width: 97%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .sheet-item {
    width: 31vw;
    min-height: 5vh;
    margin-bottom: 20px;
    .cover-wrapper {
      height: 31vw;
      width: 31vw;
      position: relative;
      clip-path: inset(0 0 round 4%);
      img {
        width: 100%;
      }
      .play-count {
        position: absolute;
        top: 5px;
        right: 8px;
        font-size: 10px;
        color: #f1f1f1;
      }
    }
    .cover-info {
      margin-top: 9px;
      letter-spacing: 1px;
      line-height: 15px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.iconfont {
  font-size: 3px;
}
</style>