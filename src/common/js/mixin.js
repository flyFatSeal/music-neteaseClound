import Velocity from "velocity-animate";
import "velocity-animate/velocity.ui.js";
export const animationMixin = {
  methods: {
    listbeforeEnter(el) {
      el.style.transform = 'translateY(0)';
      el.style.opacity = 1
    },
    listEnter(el, done) {
      Velocity(el, "slideInUp", { duration: 10000, complete: done });
    },
    listLeave(el, done) {
      Velocity(el, "slideOutDown", {
        duration: 500,
        complete: done
      })
    },
    cdEnter(el, done) {
      Velocity(el, "fadeInUp", { duration: 200, complete: done });
    },
    cdLeave(el, done) {
      Velocity(el, "fadeOut", {
        duration: 200,
        complete: done
      })
    },
    enter(el, done) {
      Velocity(el, "fadeInUp", { duration: 200, complete: done });
    },
    leave(el, done) {
      Velocity(el, "fadeOut", {
        duration: 200,
        complete: done
      })
    },
    singleEnter(el, done) {
      Velocity(el, "slideInDown", { duration: 1000, complete: done });
    },
    singleAfterEnter(el, done) {
      el.style.background = 'rgba(19, 19, 19, 0.6)'
      done()
    },
    singleLeave(el, done) {
      Velocity(el, "slideOutDown", {
        duration: 200,
        complete: done
      })
    },
    singleAfterLeave(el, done) {
      el.style.background = ''
      done()
    }
  }
}