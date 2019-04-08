import { mapActions, mapGetters } from "vuex";

export const scorllRefreshMixin = {
    computed: {
        ...mapGetters(["fullScreen"])
    },
    watch: {
        fullScreen() {
            this.$refs.scrollwrapper.refresh();
        }
    },
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
        this.setLoading(false)
    },
    methods: {
        ...mapActions(["setLoading"])
    }
}