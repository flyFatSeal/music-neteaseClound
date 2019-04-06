import { throttle, getClientHeight } from 'common/js/util'

export const lazyLoadMixin = {
    data() {
        return {
            isShow: false,
            _throttleFn: null
        }
    },
    methods: {
        inViewShow() {
            if (this.isShow) {
                document.removeEventListener('scroll', this._throttleFn, false)
                return
            }
            // 不支持IntersectionObserver api的情况下判断图片是否出现在可视区域内
            let { $el } = this
            const rect = $el.getBoundingClientRect()
            // 出现在视野的时候加载元素
            if (0 < rect.top && rect.top < getClientHeight()) {
                this.isShow = true
            }
        }
    },
    mounted() {
        // 支持IntersectionObserver的使用这个api 
        if ("IntersectionObserver" in window) {
            let lazyCompObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > 0) {
                        this.isShow = true
                        lazyCompObserver.unobserve(entry.target)
                        // 当元素可见时，如果需要回调，则执行
                        this.onVisible && this.onVisible()
                    }
                })
            })
            if (this.$el.nodeType === 1) {
                lazyCompObserver.observe(this.$el)
            }
        } else {
            // 不支持的使用getBoundingClientRect和scroll来判断
            this.inViewShow()
            this._throttleFn = throttle(this.inViewShow)
            document.addEventListener('scroll', this._throttleFn, false)
        }
    }

}