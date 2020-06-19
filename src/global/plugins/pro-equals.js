export default {
  install: function (Vue) {
    Vue.prototype.$proEquals = (a, b) => {
      const isEqual = (a, b) => {
        const [aType, bType] = [a,b].map(ele => typeof ele)
        if (aType !== bType) return false
  
        if (['number', 'string', 'boolean', 'bigint', 'symbol'].includes(aType) || ([a, b].findIndex(ele => [undefined, null].includes(ele)) !== -1)) return a === b
        if (Array.isArray(a)) {
          if (a.length !== b.length) return false
          const [aSorted, bSorted] = [a, b].map(arr => arr.sort())
          return a.every((_, idx) => isEqual(aSorted[idx], bSorted[idx]))
        }
        try {
          if (aType === 'object') {
            const [aSize, bSize] = [a, b].map(obj => Object.keys(obj).length)
            if (aSize !== bSize) return false
  
            return Object.keys(a).every(key => isEqual(a[key], b[key]))
          }
        } catch (err) {
          console.error('Bad news in Pro Equal: ', err)
          console.log('Values: ', a, b)
          return false
        }
        console.error('Could not find this type!:', aType)
      }
      return isEqual(a, b)
    }
  },
}