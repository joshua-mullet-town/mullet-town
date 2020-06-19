export default {
  install: function (Vue) {
    Vue.prototype.$clone = obj => JSON.parse(JSON.stringify(obj))
    Vue.prototype.$maybeFunc = something => typeof something === 'function' ? something() : something
    Vue.prototype.$to2 = num => Number.parseFloat(Number(num).toFixed(2))
    Vue.prototype.$to0 = num => Number.parseFloat(Number(num).toFixed(2))
  },
}