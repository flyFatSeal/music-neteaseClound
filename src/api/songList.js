import { HOST } from '../common/js/config'
//import axios from 'axios'; // 

function getDiscSongs(id) {
    const url = HOST + `/playlist/detail?id=${id}`
    return axios.get(url)
}

function getDiscComments(id) {
    const url = HOST + `/comment/playlist?id=${id}`
    return axios.get(url)
}

export function getDisc(id) {
    return axios.all([getDiscSongs(id), getDiscComments(id)])
        .then(axios.spread(function (acct, perms) {
            let code
            if (acct.data.code === 200 && perms.data.code === 200) code = 200
            let DiscData = { code, playlist: acct.data.playlist, comments: { comments: perms.data.comments, total: perms.data.total, hotComments: perms.data.hotComments } }
            return DiscData
        }));
}