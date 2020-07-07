<script>
import Typer from './typer.js'
export default {
  name: 'Joshua',
  data() {
    return {
      copy: '',
      showCursor: false,
      typer: null,
      images: [
        {
          img: '',
        }
      ],
      visibleProjectIdx: null,
    }
  },
  methods: {
    startCursor () {
      const timeoutFunc = () => {
        setTimeout(() => {
          this.showCursor = !this.showCursor
          timeoutFunc()
        }, this.showCursor ? 500 : 500)
      }
      timeoutFunc()
    },
  },
  mounted () {
    this.startCursor()
    this.typer = new Typer(this, 'copy')
    this.typer
      .wait(1000)
      .type('Hello.')
      .wait(1000)
      .clear()
      .type('My name is Joshua Mullet and this town is me.')
      .wait(1000)
      .clear()
      .type('This town will only help you with one thing, getting you to where you want to go.')
      .wait(1000)
      .clear()
      .type('Like this town, you can expect no frills.')
      .clear()
      .type('There is no mall or fancy restraunts to make it seem more impressive than it is.')
      .wait(1000)
      .clear()
      .type('It only wants to offer the resources that keep you moving.')
      .wait(500)
      .clear()
      .type('I\'m a web developer.')
      .wait(500)
      .type(' That\'s it.')
      .clear()
      .type('I can design and build some snazzy websites.')
      .wait(1000)
      .type(' But I\'m not here to get in your way.')
      .clear()
      .type('All I want is to take your idea, your direction, your input and make it real.')
      .wait(2000)
      .clear()
      .type('So, feel free to look at my skills, previous projects, and maybe even reach out.')
      .go()
  },
}
</script>

<template lang="pug">
  .joshua-main
    .joshua-container
      .content
        .auto-type-box
          span.copy(
            ref='copy'
          ) {{copy}}
            span(
              :class='showCursor ? "cursor" : ""'
            )
</template>

<style lang="sass" scoped>
  .joshua-main
    .joshua-container
      .content
        display: grid
        height: 100vh
        background-image: url('../../../../assets/img/landing/main.png')
        background-size: cover
        background-position: 50% right
        .auto-type-box
          padding: 6rem 3rem
          max-width: 800px
          .copy
            font-size: 32px
            font-family: $font-2
            .cursor
              border-right: thick solid black
              padding-left: .25rem
</style>