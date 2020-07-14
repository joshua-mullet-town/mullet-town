<script>
export default {
  name: 'ProjectRecap',
  props: {
    options: {
      required: true,
    },
  },
}
</script>

<template lang="pug">
  #project-recap-main.modal-main
    .project-recap-container.modal-container
      .title {{options.title}}
      .content
        a.header.area(
          :href='options.url'
          target='_blank'
          :style='options.style || {}'
        )
          i.material-icons launch
          img(
            :src='`img/projects/${options.recapImg || options.img}`'
          )
        .overview-area.area
          .title Overview
          .copy {{options.overview}}
        .skills.list.area
          .title Skills
          ul
            li(
              v-for='skill in options.skills'
            ) {{skill}}
        .features.list.area(
          v-if='options.features && options.features.length'
        )
          .title Highlights
          ul
            li(
              v-for='feature in options.features'
            ) {{feature}}
      .action
        .button.major(
          @click='$modals.hide("project-recap")'
        ) Close
</template>

<style lang="sass" scoped>
  #project-recap-main
    width: 500px
    max-width: calc(100vw - 50px)
    .project-recap-container
      .content
        .header
          display: grid
          justify-items: center
          background-color: white
          padding: 1.5rem
          border-radius: .5rem
          box-shadow: 0 0 5px 0 black
          position: relative
          > i
            position: absolute
            right: 2px
            top: 2px
            color: $red
          > img
            max-width: 100%
            max-height: 400px
        .area
          margin-bottom: 1rem
          .title
            font-size: 32px
            margin-bottom: .5rem
          .copy
            font-size: 18px
        .list
          > ul
            margin: 0
            > li
              font-size: 18px
</style>
