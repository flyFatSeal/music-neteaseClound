import { HOST } from '../common/js/config'
import axios from 'axios';

export function getHotWords() {
    const url = HOST + '/search/hot'
    return axios.get(url)
}

export function queryWord(word, offset = 0) {
    const url = HOST + `/search?keywords=${word}&limit=11&offset=${offset}`
    return axios.get(url)
}