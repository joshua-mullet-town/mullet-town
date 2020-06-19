<script>
import Typer from './typer.js'
export default {
  name: 'Joshua',
  data() {
    return {
      copy: 'hello',
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
      .wait(1000)
      .type('')
      .wait(2000)
      .type('Hi!')
      .go()
  },
}
</script>

<template lang="pug">
  .joshua-main
    .joshua-container
      .content
        .auto-type-box(
          :class='showCursor ? "cursor" : ""'
        ) {{copy}}
</template>

<style lang="sass" scoped>
  .joshua-main
    .joshua-container
      .content
        padding: 3rem
        .auto-type-box
          font-size: 72px
          font-family: Courier New
          width: fit-content
          padding-right: .5rem
          &.cursor
            border-right: thick solid black
</style>