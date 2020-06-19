import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    user: null,
    lesson: null,
    lessonDetails: null,
    lessonRecords: false,
    lessons: null,
    students: null,
  },
  mutations: {
    update (state, update) {
      Object.keys(update).forEach(key => state[key] = update[key])
    },
    logout (state) {
      state.auth = null
      /**
       * Should unsubscribe to listeners in here if any were instantiated
       */
      const that = require('../src/main').ThisVue
      that.$auth.signOut()
      const homeRoute = 'PublicMain'
      if (that.$route.name === homeRoute) return
      that.$router.push({
        name: homeRoute,
      })
    },
  },
})
