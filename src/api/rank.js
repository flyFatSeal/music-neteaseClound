import { HOST } from '../common/js/config'
import axios from 'axios'; // 引入axios

export function getRank(i) {
    const url = HOST + `/top/list?idx=${i}`
    return axios.get(url)
}

export function getRankAll() {
    const url = HOST + '/toplist/detail'
    return axios.get(url)
}

export function getRecommendRank() {
    const url = HOST + '/top/list?idx=15'
    return axios.get(url)
}

export function getGlobalRank() {
    const url = HOST + '/top/list?idx=6'
    return axios.get(url)
}