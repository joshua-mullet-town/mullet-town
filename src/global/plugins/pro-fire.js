export default {
  install: function (Vue) {
    Vue.prototype.$fire = {
      qs: {
        toJSON (qs) {
          return qs.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data()
            acc[doc.id].id = doc.id
            return acc
          }, {})
        },
        toArray (qs) {
          return qs.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
          })
        },
      },
    }
  },
}