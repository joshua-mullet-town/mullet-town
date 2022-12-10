<script>
export default {
  name: 'ProNav',
  data() {
    return {
      seeLogo: false,
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    },
    user () {
      return this.$store.state.user
    },
    navEle () {
      return document.querySelector('.pro-nav-main')
    },
    loginButtonCopy () {
      return {
        USER: {
          LOGIN: 'Login',
          FORGOT: 'Send reset email',
        },
        SYSTEM: {
          LOGIN: 'Logging in...',
          FORGOT: 'Sending...',
        },
        ERROR: {
          LOGIN: 'Login failed. Try again.',
          FORGOT: 'Send failed. Try again.',
        },
        SUCCESS: {
          FORGOT: 'Success! Check email.',
        },
      }[this.stage][this.mode]
    },
    largeButtonCopy () {
      return {
        LOGIN: 'Login',
        FORGOT: 'Send reset email',
      }[this.mode]
    },
    smallButtonCopy () {
      return {
        LOGIN: 'Forgot password?',
        FORGOT: 'Sign in',
      }[this.mode]
    },
    largeButtonAction () {
      return {
        LOGIN: this.onLogin,
        FORGOT: this.onForgot,
      }[this.mode]
    },
    isLandingPage () {
      return this.$route.name === 'PublicMain'
    },
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      if (this.$route.name === 'PublicMain') return 
      this.$router.push({name: 'PublicMain'})
    },
    showLogin () {
      setTimeout(() => {
        this.seeLogin = true
      }, 5)
    },
    onLinkClick (link) {
      this.seeMobileNav = false

      if (link.route === this.$route.name) return
      this.$router.push({name: link.route})
    },
    onScroll () {
      const scrollTop = (document.documentElement || document.body.parentNode || document.body).scrollTop
      if (scrollTop > 500) {
        this.navEle.style.backgroundColor = 'white'
        this.navEle.style.boxShadow = '0px 0px 5px 0 rgba(0, 0, 0, .4)'
        this.seeLogo = true
      } else {
        this.navEle.style.backgroundColor = 'transparent'
        this.navEle.style.boxShadow = 'none'
        this.seeLogo = true
      }
    },
    onClick (e) {
      const clickOnLogin = this.$checkEventForEle(e, '.floating-login-container')
      this.seeLogin = clickOnLogin
    },
    onSignUp () {
      if (this.$route.name !== 'SignUp') this.$router.push({name: "SignUp"})
    },
    async onLogin () {
      this.stage = 'SYSTEM'

      try {
        await this.$auth.signInWithEmailAndPassword(this.form.email, this.form.password)
      } catch (err) {
        this.stage = 'ERROR'
        let message = err.message
        if (err.code === 'auth/wrong-password') {
          message = 'The password is invalid or the user does not have an account.'
        }
        this.$toast({copy: message, time: 4000})
        return console.error(err)
      }
    },
    async onForgot () {
      this.stage = 'SYSTEM'

      try {
        await this.$auth.sendPasswordResetEmail(this.form.email)
      } catch (err) {
        this.stage = 'ERROR'
        this.$toast({copy: err.message, time: 4000})
        return console.error(err)
      }

      this.stage = 'SUCCESS'
    },
    onSmallButton () {
      this.mode = this.mode === 'FORGOT' ? 'LOGIN' : 'FORGOT'
      this.stage = 'USER'
    },
  },
}
</script>

<template lang="pug">
.pro-nav-main
  .pro-nav-container
    .title-holder(
      @click='$route.name !== "AssessmentApply" && $router.push({name: "PublicMain"})'
    )
      transition(
        name='fade'
      )
        .title
          .copy.font-2 Mullet Town
          //img(
            src='@/assets/img/common/logo.png'
            )
    .actions
      //.pro-button.login(
        @click='$router.push({name: "PublicMain"})'
        v-if='$route.name !== "PublicMain" || true'
        ) Home
      .pro-button.skills(
        @click='$modals.show({name: "skills"})'
      ) Skills
      .pro-button.projects(
        @click='$modals.show({name: "projects"})'
      ) Projects
      a(
        href='mailto:jormullet@gmail.com?subject=Howdy, Joshua!&body=So, I\'ve got an idea...'
      )
        i.material-icons email


</template>

<style lang="sass" scoped>

.font-2
  
.pro-nav-main
  position: fixed
  z-index: 2
  background-color: transparent
  width: 100%
  transition: .25s all
  .mobile-nav
    display: none
  .pro-nav-container
    display: grid
    grid-template-columns: auto auto
    align-items: center
    padding: 1.5rem 3rem
    box-sizing: border-box
    .title-holder
      width: fit-content
      cursor: pointer
      .title
        .copy
          font-size: 48px
        > img
          height: 25px
    .actions
      justify-self: end
      display: flex
      > *
        font-size: 24px
        padding: .25rem
        margin-left: .5rem
      > a
        > i
          color: white
    .mobile-nav-button
      display: none
@media (max-width: 700px)
  .pro-nav-main
    .pro-nav-container
      padding: 1rem 1.5rem
      .title-holder
        .title
          .copy
            font-size: 36px
      .actions
        > *
          font-size: 16px
        > a
          > i
            font-size: 16px
          .footer
            position: absolute
            padding: 32px
            bottom: 0
            .link
              cursor: pointer
              color: #777
    .pro-nav-container
      grid-template-columns: auto max-content
      .title-holder
        .title
          > img
            display: none
      .actions
        //display: none
      .mobile-nav-button
        display: block
        color: white
        text-align: right
        cursor: pointer
</style>
