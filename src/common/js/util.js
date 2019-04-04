export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 防抖函数
export function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;

    clearTimeout(timeout)
    timeout = setTimeout(function () {
      func.apply(context, args)
    }, wait);
  }
}

//节流函数
export function throttle(func, wait) {
  var last = 0
  var context
  var args
  return function () {
    context = this
    args = arguments
    let now = +new Date()
    if (now - last > wait) {
      func.apply(context, args)
      last = now
    }
  }
}
