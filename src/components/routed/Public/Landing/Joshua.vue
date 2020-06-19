<script>
import Typer from './typer.js'
export default {
  name: 'Joshua',
  data() {
    return {
      copy: '',
      showCursor: false,
      typer: null,
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
      // .wait(1000)
      // .type('hello')
      // .wait(2000)
      // .clear()
      // .wait(1500)
      .type('My name is Joshua and I build things.')
      //.wait(3800)
      .clear(1)
      //.wait(200)
      .type(' quickly.')
      //.wait(1500)
      .clear(8)
      //.wait(1000)
      .type(' like lightning.')
      //.wait()
      .custom(() => this.inst.$refs.display.style.backgroundColor = 'black')
      .go()
  },
}
</script>

<template lang="pug">
  .joshua-main
    .joshua-container
      .content
        .auto-type-box {{copy}}
          span(
            :class='showCursor ? "cursor" : ""'
          )
        .display-box(
          ref='display'
        )
</template>

<style lang="sass" scoped>
  .joshua-main
    .joshua-container
      .content
        display: grid
        grid-template-columns: 1fr 1fr
        height: 100vh
        .auto-type-box
          padding: 3rem 4rem
          font-size: 48px
          font-family: Courier New
          .cursor
            border-right: thick solid black
            padding-left: .25rem
        .display-box
          transition: .25s all
          background-color: white
</style>