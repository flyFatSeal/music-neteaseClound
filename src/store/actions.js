import * as types from './mutations-types'
import { saveSearch, clearSearch, clearFavorite, clearPlayHistory, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'
export const selectPlay = function ({ commit }, { list, index }) {
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYLIST, list.slice())
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const setPlaying = function ({ commit }, boolean) {
    commit(types.SET_PLAYING_STATE, boolean)
}

export const setCurrentIndex = function ({ commit, state }, index) {
    let playlist = state.playlist
    let setIndex
    setIndex = index < 0 ? playlist.length - 1 : index === playlist.length ? 0 : index
    commit(types.SET_CURRENT_INDEX, setIndex)
}

export const setFullScreen = function ({ commit }, boolean) {
    commit(types.SET_FULL_SCREEN, boolean)
}

export const setPlayMode = function ({ commit }, mode) {
    let type = 0
    if (typeof mode === 'number')
        type = mode
    else if (mode.toLowerCase() === 'loop')
        type = 1
    else if (mode.toLowerCase() === 'random')
        type = 2
    commit(types.SET_PLAY_MODE, type)
}
export const deleteOneSong = function ({ commit, state }, index) {
    let playlist = state.playlist
    let currentIndex = state.currentIndex
    playlist.splice(index, 1)
    if (playlist.length === 0)
        commit(types.SET_PLAYING_STATE, false)
    if (currentIndex > index) {
        commit(types.SET_CURRENT_INDEX, currentIndex - 1)
    }
    commit(types.SET_PLAYLIST, playlist)
}

export const deleteAll = function ({ commit }) {
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_PLAYLIST, [])
}


export const insertSong = function ({ commit }, { song, type = 'insert' }) {
    commit(types.INSERT_SONG, { type, song })
}

export const setSongImage = function ({ commit }, { id, image }) {
    commit(types.SET_CURRENT_IMAGE, { id, image })
}

export const setSingleSong = function ({ commit }, boolean) {
    commit(types.SET_SINGLE_SONG, boolean)
}

export const setSingleSongInfo = function ({ commit }, song) {
    commit(types.SET_SINGLE_SONG_INFO, song)
}

export const savePlayHistory = function ({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteSongs = function ({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const saveSearchList = function ({ commit }, song) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(song))
}

export const deleteSearchList = function ({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteFavoriteList = function ({ commit }, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

export const clearFavoriteList = function ({ commit }) {
    commit(types.SET_FAVORITE_LIST, clearFavorite())
}

export const clearPlayHistoryAll = function ({ commit }) {
    commit(types.SET_PLAY_HISTORY, clearPlayHistory())
}

export const setLoading = function ({ commit }, boolean) {
    commit(types.SET_LOADING, boolean)
}