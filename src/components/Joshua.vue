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
      .type('My name is Josh Mu')
      .clear(3)
      .type('ua Mullet and this little town down below works just like I do.')
      .wait(1000)
      .clear()
      .type('For instance, this town offers one thing, fuel to get you where you want to go.')
      .wait(1000)
      .clear()
      .type('Similarly, my only goal is to build websites to get you and your ideas to their destination.')
      .wait(1000)
      .clear()
      .type('Another way I am like this town is that, while it isn\'t large or fancy, it offers everything you need.')
      .wait(1000)
      .clear()
      .type('Likewise, I\'m just one guy with no frills or fancy technical terms I use to try and impress.')
      .wait(1000)
      .clear()
      .type('However, you can trust that the website you are looking to be built can be found here in Mullet Town.')
      .wait(1000)
      .clear()
      .type('Lastly, while extremely simple, this town has a natural beauty to it.')
      .clear()
      .type('I love building websites that are both functional and beautiful in a way that doesn\'t overpower, but compliments, the message of the website.')
      .wait(1000)
      .clear()
      .type('My only goal is to beautifully support while otherwise staying out of the way.')
      .wait(2000)
      .clear()
      .type('Want to build something together?')
      .wait(1000)
      .type(' Feel free to look at my skills, previous projects, and reach out if you\'d like.')
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
      background-image: url('../assets/design/main.svg')
      background-size: cover
      background-position: center center
      .auto-type-box
        padding: 6rem 3rem
        max-width: 800px
        .copy
          font-size: 32px
          font-family: $font-2
          .cursor
            border-right: thick solid black
            padding-left: .25rem
@media (max-width:700px)
  .joshua-main
    .joshua-container
      .content
        .auto-type-box
          padding: 6rem 1.5rem
</style>