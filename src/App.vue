<template>
  <div id="app">
    <keep-alive exclude="sheetList">
      <router-view v-show="!fullScreen" v-transition/>
    </keep-alive>
    <Loading v-show="loading"></Loading>
    <Player></Player>
    <single-song-list class="animated faster"></single-song-list>
  </div>
</template>

<script>
import Player from "views/play";
import { mapGetters } from "vuex";
import Loading from "base/load/load";
import singleSongList from "components/singleSongList/singleSongList";
export default {
  name: "app",
  components: {
    Player,
    singleSongList,
    Loading
  },
  computed: {
    ...mapGetters(["fullScreen", "loading"])
  }
};
</script>

<style lang="scss">
@import "@/common/scss/index.scss";
#app {
  position: fixed;
  top: 0;
  left: 0;
  font-size: $font-size-small;
  color: $color-text;
}
</style>
