<!-- 歌曲搜索页面 -->
<template>
  <div class="search-wrapper" v-show="!fullScreen">
    <div class="search-top-wrapper">
      <div class="icon-wrapper" @click.stop="back">
        <i class="iconfont icon-back"></i>
      </div>
      <input type="text" class="search-input" v-model="query">
    </div>
    <search-box
      v-show="!isSearch && this.hotWords.length"
      :hotWords="hotWords"
      @selectQuery="selectQuery"
    ></search-box>
    <search-list ref="searchlist" v-show="isSearch"></search-list>
  </div>
</template>

<script>
import searchBox from "components/searchBox/searchBox";
import searchList from "components/searchList/searchList";
import { getHotWords } from "api/search";
import { mapGetters } from "vuex";
import { ERR_OK } from "common/js/config";
import { debounce } from "common/js/util";
import { loadingMixin } from "common/js/mixin";
export default {
  mixins: [loadingMixin],
  data() {
    return {
      hotWords: [],
      isSearch: false,
      query: ""
    };
  },
  components: {
    searchBox,
    searchList
  },
  watch: {
    query: debounce(function(newQuery) {
      this.search(newQuery);
    }, 500)
  },
  created() {
    this._getHotWords();
  },
  computed: {
    ...mapGetters(["fullScreen"])
  },
  methods: {
    _getHotWords() {
      getHotWords().then(res => {
        if (res.data.code === ERR_OK) {
          this.hotWords = res.data.result.hots.map(item => item.first);
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    search(newQuery) {
      this.isSearch = true;
      this.$refs.searchlist.search(newQuery);
    },
    selectQuery(newQuery) {
      this.query = newQuery;
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/common/scss/index.scss";
.search-wrapper {
  width: 100vw;
  height: 100vh;
}
.search-top-wrapper {
  height: 10vw;
  width: 100%;
  background: $color-theme;
  @include center;
  justify-content: flex-start;
}
.icon-wrapper {
  margin-left: 3vw;
  .iconfont {
    font-size: 7vw;
    color: $color-background;
  }
}
.search-input {
  width: 88vw;
  height: 7vw;
  font-size: $font-size-medium-x;
  color: $color-text-lm;
  border-bottom-width: 1px;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  border-bottom-style: solid;
  border-bottom-color: $color-background;
  background: $color-theme;
  outline: none;
}
</style>