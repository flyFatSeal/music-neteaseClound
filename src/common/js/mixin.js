import { mapActions } from "vuex";

export const scorllRefreshMixin = {
    activated() {
        this.$refs.scrollwrapper.refresh();
    }
}

export const loadingMixin = {
    beforeRouteLeave(to, from, next) {
        this.setLoading(true)
        next()
    },
    activated() {
        console.info('adctive in')
        this.setLoading(false)
    },
    methods: {
        ...mapActions(["setLoading"])
    }
}