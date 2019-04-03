import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/recommend.vue'
import sheetList from 'views/sheetList.vue'
import rank from 'views/rank'
import search from 'views/search'
import user from 'views/user'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend,
        },
        {
            path: '/sheetList/:id',
            component: sheetList
        },
        {
            path: '/rank',
            component: rank
        },
        {
            path: '/search',
            component: search
        },
        {
            path: '/user',
            component: user
        }
    ]
})