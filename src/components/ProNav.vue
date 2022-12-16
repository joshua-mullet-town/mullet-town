<script>
export default {
  name: 'ProNav',
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
    .actions
      .pro-button.skills(
        @click='emitter.emit("show-modal", {name: "skills"})'
      ) Skills
      .pro-button.projects(
        @click='emitter.emit("show-modal", {name: "projects"})'
      ) Projects
      a(
        href='mailto:jormullet@gmail.com?subject=Howdy, Joshua!&body=So, I\'ve got an idea...'
      )
        i.material-icons email


</template>

<style lang="sass" scoped>

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
