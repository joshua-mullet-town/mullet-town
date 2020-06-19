<script>
import { vueVimeoPlayer } from 'vue-vimeo-player'
export default {
  name: 'ProVideo',
  components: {
    'vimeo-player': vueVimeoPlayer,
  },
  props: {
    id: {
      required: true,
    }
  },
  data() {
    return {
      hovering: false,
      isPlaying: false,
      loaded: false,
      showVideo: false,
      width: 0,
      height: 400,
    }
  },
  methods: {
    toggleVideo () {
      this.$refs.video[this.isPlaying ? 'pause' : 'play']()
      this.$emit('video-click')
    },
    onStatusChange (isPlaying) {
      this.isPlaying = isPlaying
      if (isPlaying) {
        this.hovering = false
      }
    },
    onMouseMove () {
      this.hovering = true

      setTimeout(() => this.hovering = false, 3000)
    },
    determineVideoProperties () {
      setTimeout(() => { // have to slow this down or else it thinks the screen is way to heckin wide
        const width = window.innerWidth
        this.width = Math.min(width, 800)
        this.height = this.width / 2
        this.showVideo = true
      }, 1000)
    },
    setListeners () {
      const holder = this.$refs.holder
      holder.addEventListener('hover', e => {
        console.log(e)
      })
    },
  },
  mounted () {
    this.determineVideoProperties()
    this.setListeners()
  },
}
</script>

<template lang="pug">
  .pro-video-main
    .pro-video-container(
      :style='{width: `${width}px`}'
    )
      .video-holder(
        @click='onMouseMove'
        @mouseenter='onMouseMove'
        ref='holder'
      )
        vimeo-player(
          v-if='showVideo'
          :video-id='id'
          ref='video'
          :controls='false'
          :options='{color: "eeeeee", portrait: false, controls: false,}'
          @play='onStatusChange(true)'
          @pause='onStatusChange(false)'
          @ready='loaded = true'
          @click='onMouseMove'
          :player-width='width'
          :player-height='height'
        )
        .faux-controls(
          :style='{position: showVideo ? "absolute" : "relative", opacity: (hovering || !isPlaying) && loaded ? 1 : 0, height: `${height}px`,}'
          @click='toggleVideo'
        )
          .faux-controls-container
            .controls-holder(
              :style='{height: `${height}px`,}'
            )
              i.material-icons.main-button {{isPlaying ? 'pause' : 'play_arrow_'}}
</template>

<style lang="sass" scoped>
  @import '$styles/transitions.sass'
  .pro-video-main
    .pro-video-container
      margin: 0 auto
      .video-holder
        position: relative
        .faux-controls
          position: absolute
          top: 0
          width: 100%
          background-color: transparentize($orange, .5)
          cursor: pointer
          transition: .25s all
          .faux-controls-container
            .controls-holder
              display: grid
              position: relative
              .main-button
                position: absolute
                left: 50%
                top: 50%
                transform: translateX(-50%) translateY(-50%)
                color: white
                font-size: 5rem
                width: 5rem
                border: .5rem white solid
                border-radius: 100vw
                padding: .5rem
</style>