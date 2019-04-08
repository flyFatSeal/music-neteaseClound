import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    mode: playMode.sequence,
    currentIndex: 0,
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    favoriteList: loadFavorite(),
    showSingleSongInfo: false,
    singleSongInfo: [],
    loading: false
}

export default state