import { mapActions, mapGetters } from "vuex";

export const scorllRefreshMixin = {
    computed: {
        ...mapGetters(["fullScreen", "playlist"])
    },
    watch: {
        fullScreen() {
            setTimeout(() => {
                this.$refs.scrollwrapper === void 0 ? '' :
                    this.$refs.scrollwrapper.refresh();
            }, 0);
        }
    },
    activated() {
        setTimeout(() => {
            this.$refs.scrollwrapper === void 0 ? '' :
                this.$refs.scrollwrapper.refresh();
        }, 0);
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