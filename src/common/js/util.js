export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 截流函数
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
