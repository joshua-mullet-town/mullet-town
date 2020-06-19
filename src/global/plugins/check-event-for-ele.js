export default {
  install: function (Vue) {
    Vue.prototype.$checkEventForEle = function (event, eleQuery) {
      const ele = document.querySelector(eleQuery)
      if (!(event && ele)) return

      return (ele === event.target) || ele.contains(event.target)
    }
  },
}