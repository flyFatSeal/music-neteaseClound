import * as types from './mutations-types'
const mutations = {
    [types.SET_DISC](state, disc) {
        state.disc = disc
    },
    [types.SET_PLAYLIST](state, playlist) {
        state.playlist = playlist
    },
    [types.SET_CURRENT_INDEX](state, currentIndex) {
        state.currentIndex = currentIndex
    },
    [types.SET_FULL_SCREEN](state, boolean) {
        state.fullScreen = boolean
    },
    [types.SET_PLAYING_STATE](state, boolean) {
        state.playing = boolean
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },
    [types.INSERT_SONG](state, { type, song }) {
        let index = state.currentIndex
        for (let i = 0; i < state.playlist.length; i++) {
            if (state.playlist[i].id === song.id) {
                state.playlist.splice(i, 1)
                break
            }
        }
        type === 'next' ? state.playlist.splice(index + 1, 0, song) : state.playlist.splice(index, 0, song)
    },
    [types.SET_CURRENT_IMAGE](state, { id, image }) {
        state.playlist[id]['image'] = image
    },
    [types.SET_SINGLE_SONG](state, boolean) {
        state.showSingleSongInfo = boolean
    },
    [types.SET_SINGLE_SONG_INFO](state, song) {
        state.singleSongInfo = song
    },
    [types.SET_PLAY_HISTORY](state, song) {
        state.playHistory = song
    },
    [types.SET_FAVORITE_LIST](state, song) {
        state.favoriteList = song
    },
    [types.SET_SEARCH_HISTORY](state, song) {
        state.searchHistory = song
    },
    [types.SET_LOADING](state, boolean) {
        state.loading = boolean
    }
}

export default mutations