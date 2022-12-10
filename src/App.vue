<template>
  <router-view/>
</template>

<style lang="sass">
body
  margin: 0

.pro-button
  font-family: $font-2
  cursor: pointer
  //padding: .75em 1.5em
  font-size: 20px
  color: white
  //box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, .3)
  transition: all .1s
  &.plain
    background-color: transparent
    color: black
    box-shadow: none
    &:hover
      box-shadow: none
  &:hover
    text-decoration: underline
  &:active
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .3)
</style>
