import Vue from 'vue'
import Router from 'vue-router'
Vue.use(VueRouter)


// //normlize

// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
const sheetList = (resolve) => {
    import('views/sheetList.vue').then((module) => {
        resolve(module)
    })
}

const Index = (resolve) => {
    import('views/index').then((module) => {
        resolve(module)
    })
}

const rank = (resolve) => {
    import('views/rank').then((module) => {
        resolve(module)
    })
}

const search = (resolve) => {
    import('views/search').then((module) => {
        resolve(module)
    })
}

export default new Router({
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