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
      .header.area(
        :style='options.style || {}'
      )
        a(
          v-if='!options.isDownload && !options.isInternalLink'
          :href='options.url'
          target='_blank'
          class='launch-link'
        )
          i.material-icons launch
        a.view-badge(
          v-if='options.isInternalLink'
          :href='options.url'
        )
          i.material-icons open_in_new
          .view-text View Landing Page
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
      a.button.major.view-button(
        v-if='options.isInternalLink'
        :href='options.url'
      ) View Whisper Village
      .button.secondary(
        v-if='options.isInternalLink'
        @click='emitter.emit("hide-modal", "project-recap")'
      ) Close
      .button.major(
        v-if='!options.isInternalLink'
        @click='emitter.emit("hide-modal", "project-recap")'
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
        .launch-link > i
          position: absolute
          right: 2px
          top: 2px
          color: $red
        .view-badge
          position: absolute
          right: 8px
          top: 8px
          background: $red
          color: white
          padding: 0.5rem 1rem
          border-radius: 20px
          display: flex
          align-items: center
          gap: 0.5rem
          font-size: 14px
          font-weight: bold
          box-shadow: 0 2px 4px rgba(0,0,0,0.2)
          text-decoration: none
          cursor: pointer
          transition: all 0.2s ease
          &:hover
            background: darken($red, 10%)
            transform: translateY(-1px)
            box-shadow: 0 4px 8px rgba(0,0,0,0.3)
            color: white
            text-decoration: none
          .view-text
            font-size: 12px
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
    .action
      display: flex
      gap: 1rem
      .view-button
        background-color: $red
        color: white
        text-decoration: none
        padding: 8px 24px
        text-align: center
        cursor: pointer
        border: $red 2px solid
        transition: all .25s
        user-select: none
        &:hover
          text-decoration: none
          color: white
          background-color: darken($red, 10%)
      .secondary
        background: #95a5a6
        color: white
        &:hover
          background: #7f8c8d
</style>
