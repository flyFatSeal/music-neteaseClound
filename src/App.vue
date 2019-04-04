<template>
  <div id="app">
    <keep-alive exclude="sheetList">
      <router-view v-show="!fullScreen" v-transition/>
    </keep-alive>
    <Player></Player>
    <single-song-list class="animated"></single-song-list>
  </div>
</template>

<script>
import Player from "views/play";
import { mapGetters } from "vuex";
import singleSongList from "components/singleSongList/singleSongList";
export default {
  name: "app",
  components: {
    Player,
    singleSongList
  },
  computed: {
    ...mapGetters(["fullScreen"])
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
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
