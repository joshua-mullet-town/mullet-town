<script>
export default {
  name: 'ProNav',
  data () {
    return {
      wow: '<div>wow</div>',
      emailCopied: false
    }
  },
  methods: {
    async copyEmail() {
      try {
        await navigator.clipboard.writeText('joshua@mullet.town')
        this.emailCopied = true
        setTimeout(() => {
          this.emailCopied = false
        }, 2000)
      } catch (err) {
        console.error('Failed to copy email: ', err)
      }
    }
  },  
  mounted () {
    this.emitter.emit('event', 'poopz')
  },
}
</script>

<template lang="pug">
.pro-nav-main
  .pro-nav-container
    .title-holder
      .title
        .copy.font-2 Mullet Town
        .subtitle population: 1 guy with AI
    .actions
      .pro-button.skills(
        @click='emitter.emit("show-modal", {name: "skills"})'
      ) Skills
      .pro-button.projects(
        @click='emitter.emit("show-modal", {name: "project-timeline"})'
      ) Projects
      .email-button(
        @click='copyEmail'
      )
        i.material-icons email
        .email-notification(
          v-if='emailCopied'
        ) ✨ email copied!


</template>

<style lang="sass" scoped>

@keyframes fadeInOut
  0%
    opacity: 0
    transform: translateY(-10px)
  15%
    opacity: 1
    transform: translateY(0)
  85%
    opacity: 1
    transform: translateY(0)
  100%
    opacity: 0
    transform: translateY(-10px)

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
        display: flex
        align-items: baseline
        gap: 1rem
        .copy
          font-size: 48px
        .subtitle
          font-size: 24px
          color: rgba(255, 255, 255, 0.9)
          white-space: nowrap
        > img
          height: 25px
    .actions
      justify-self: end
      display: flex
      > *
        font-size: 24px
        padding: .25rem
        margin-left: .5rem
      .email-button
        cursor: pointer
        position: relative
        > i
          color: white
        .email-notification
          position: absolute
          top: 100%
          right: 0
          background-color: rgba(0, 0, 0, 0.8)
          color: white
          padding: 0.5rem
          border-radius: 4px
          font-size: 14px
          white-space: nowrap
          margin-top: 0.25rem
          animation: fadeInOut 2s ease-in-out
    .mobile-nav-button
      display: none
@media (max-width: 700px)
  .pro-nav-main
    .pro-nav-container
      padding: 1rem 1.5rem
      .title-holder
        .title
          flex-direction: column
          align-items: flex-start
          gap: 0
          .copy
            font-size: 36px
          .subtitle
            font-size: 18px
            margin-top: -0.25rem
      .actions
        > *
          font-size: 16px
        .email-button
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
