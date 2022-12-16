export default {
  install: function (Vue, that) {
    
    Vue.$modals = {
      show (options) {
        that.$proEmit('showModal', options)
      },
      hide (modalName) {
        that.$proEmit('hideModal', modalName)
      }
    }
  },
}