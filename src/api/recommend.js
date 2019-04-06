import { HOST } from '../common/js/config'
import axios from 'axios'; // 引入axios

export function getBanners() {
    const url = HOST + '/banner'
    return axios.get(url)
}

export function getRecommendSheets() {
    const url = HOST + '/personalized'
    return axios.get(url)
}

export function getNewSongs() {
    const url = HOST + '/personalized/newsong'
    return axios.get(url)
}