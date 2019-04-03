import { HOST } from '../common/js/config'
import axios from 'axios'; // 

export function getLyric(id) {
    const url = HOST + `/lyric?id=${id}`
    return axios.get(url)
}

export function getSong(id) {
    const url = HOST + `/song/detail?ids=${id}`
    return axios.get(url)
}

export function getAudio(id) {
    const url = HOST + `/song/url?id=${id}`
    return axios.get(url)
}