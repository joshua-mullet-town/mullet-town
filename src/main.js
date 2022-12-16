import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ProEmissions from './global/plugins/pro-emissions'
import modals from './global/plugins/modals'

export const ThisVue = createApp(App)
  .use(store)
  .use(router)

ThisVue.use(ProEmissions, ThisVue)

//ThisVue.use(ProEmissions, ThisVue)

ThisVue.mount('#app')

ThisVue.use(modals)