<script>
import Typer from './typer.js'
export default {
  name: 'Joshua',
  data() {
    return {
      copy: '',
      showCursor: true,
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
      .wait(400)
      .type('Hello.')
      .skipLine()
      .wait(400)
      .type('My name is Josh Mu')
      .clear(3)
      .type('ua Mullet and this little town down below works just like I do.')
      .scroll()
      .wait(400)
      .skipLine()
      .type('For instance, this town offers one thing, fuel to get you where you want to go.')
      .scroll()
      .wait(400)
      .skipLine()
      .type('Similarly, my only goal is to build solutions to get you and your ideas to their destination.')
      .scroll()
      .wait(400)
      .skipLine()
      .type('Another way I am like this town is that, while it isn\'t large or fancy, it offers everything you need.')
      .scroll()
      .skipLine()
      .wait(400)
      .type('Likewise, I\'m just one guy with no frills or fancy technical terms I use to try and impress.')
      .scroll()
      .skipLine()
      .wait(400)
      .type('However, you can trust that the solution you\'re looking for can be found here in Mullet Town.')
      .scroll()
      .wait(400)
      .skipLine()
      .type('Lastly, while quite simple, this town has a natural beauty to it.')
      .scroll()
      .skipLine()
      .type('I love building tools and solutions that are both functional and beautiful in a way that doesn\'t overpower, but compliments, your goals.')
      .scroll()
      .skipLine()
      .wait(400)
      .type('My only goal is to beautifully support while otherwise staying out of the way.')
      .scroll()
      .skipLine()
      .wait(200)
      .type('Want to build something together?')
      .scroll()
      .wait(800)
      .type(' Feel free to look at my skills, previous projects, and reach out if you\'d like.')
      .go()
  },
}
</script>

<template lang="pug">
.joshua-main
  .joshua-container
    .content
      .auto-type-box(
        ref='copyHolder'
      )
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
      background-image: url('../assets/design/main.svg')
      background-size: cover
      background-position: center center
      .auto-type-box
        padding: 0rem 3rem 6rem 3rem
        max-width: 800px
        max-height: 16rem
        overflow-y: scroll
        scrollbar-width: none
        margin-top: 6rem
        &::-webkit-scrollbar
          display: none
        .copy
          font-size: 32px
          font-family: $font-2
          padding-bottom: 10rem
        .cursor
          border-right: thick solid black
          padding-left: .2rem
          height: 1.5rem
          display: inline-grid
          bottom: -.1rem
          position: relative

@media (max-width:700px)
  .joshua-main
    .joshua-container
      .content
        .auto-type-box
          padding: 0rem 1.5rem
</style>