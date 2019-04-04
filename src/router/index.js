import Vue from 'vue'
import Router from 'vue-router'
import Index from 'views/index.vue'
import sheetList from 'views/sheetList.vue'
import rank from 'views/rank'
import search from 'views/search'

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
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
        }
    ]
})