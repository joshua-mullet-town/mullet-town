<script>
export default {
  name: 'ProNav',
  data () {
    return {
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
    a.title-holder(href='/')
      .title
        .copy.font-2 Mullet Town
        .subtitle population: 1 guy with AI
    .actions
      .home-group
        .home-nav
          .nav-item.skills(
            @click='emitter.emit("show-modal", {name: "skills"})'
          ) Skills
          .nav-item.projects(
            @click='emitter.emit("show-modal", {name: "project-timeline"})'
          ) Projects
          .email-button(
            @click='copyEmail'
          )
            i.material-icons email
            .email-notification(
              v-if='emailCopied'
            ) email copied!
      a.whisper-village-link(href='/whisper-village') Whisper Village


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
  font-family: $font-2
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
      text-decoration: none
      color: inherit
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
      align-items: center
      gap: 1.5rem
      .home-group
        display: flex
        flex-direction: column
        align-items: flex-end
        .home-nav
          display: flex
          align-items: center
          gap: 0.5rem
          .nav-item
            font-size: 18px
            padding: 0.25rem 0.5rem
            cursor: pointer
            opacity: 0.85
            &:hover
              opacity: 1
          .email-button
            cursor: pointer
            position: relative
            opacity: 0.85
            &:hover
              opacity: 1
            > i
              color: white
              font-size: 20px
            .email-notification
              position: absolute
              top: 100%
              right: 0
              background-color: rgba(0, 0, 0, 0.8)
              color: white
              padding: 0.5rem
              border-radius: 4px
              font-size: 12px
              white-space: nowrap
              margin-top: 0.25rem
              animation: fadeInOut 2s ease-in-out
      .whisper-village-link
        font-size: 24px
        padding: 0.5rem 1rem
        cursor: pointer
        text-decoration: none
        color: inherit
        background: rgba(255, 255, 255, 0.15)
        border-radius: 6px
        transition: all 0.2s ease
        &:hover
          background: rgba(255, 255, 255, 0.25)
    .mobile-nav-button
      display: none
@media (max-width: 700px)
  .pro-nav-main
    .pro-nav-container
      padding: 1rem 1.5rem
      grid-template-columns: auto max-content
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
          > img
            display: none
      .actions
        flex-direction: column
        align-items: flex-end
        gap: 0.5rem
        .home-group
          .home-nav
            gap: 0.25rem
            .nav-item
              font-size: 14px
            .email-button
              > i
                font-size: 16px
        .whisper-village-link
          font-size: 16px
          padding: 0.4rem 0.75rem
</style>
