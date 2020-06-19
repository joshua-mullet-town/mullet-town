import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const admin = {
  stats: () => import('@/components/routed/Admin/Stats.vue'),
}

const _public = {
  main: () => import('@/components/routed/Public/Main.vue'),
  landing: () => import('@/components/routed/Public/Landing/Shell.vue'),
  signUp: () => import('@/components/routed/Public/SignUp.vue'),
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: _public.main,
      children: [
        {
          path: '',
          name: 'PublicMain',
          component: _public.landing,
          meta: {
            transIndex: 10,
          },
        },
        {
          path: '/sign-up',
          name: 'SignUp',
          component: _public.signUp,
          meta: {
            transIndex: 20,
          },
        },
        {
          path: '/admin/stats',
          name: 'AdminStats',
          component: admin.stats,
          mega: {
            transIndex: 50,
            roles: ['ADMIN',],
          },
        },
      ],
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  // /* eslint-disable */
  // return next()

  const store = require('./store.js').default

  const getThat = _ => new Promise(resolve => {
    setTimeout(() => {
      that = require('./main').ThisVue
      resolve(that)
    }, 10)
  })

  let that
  try {
    that = await getThat()
  } catch (err) {
    //return // if we don't have access to the Vue object, no need to continue
  }
  
  const roles = to.meta.roles
  if (!roles) return next()

  const user = store.state.user
  if (!(user && roles.includes(user.role)) && that) {
    next({name: 'PublicMain'})
    return setTimeout(() => {
      that.$proEmit('show-login')
    }, 1000)
    //return that.$toast({copy: 'Please sign in if you would like to access that page.', time: 4000})
  }
  next()
})

export default router