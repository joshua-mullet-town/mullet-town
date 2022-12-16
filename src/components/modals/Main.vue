<script>
import Alert from './Alert'
import Skills from './Skills'
import Projects from './Projects'
import ProjectRecap from './ProjectRecap'
export default {
  name: 'ModalsMain',
  components: {
    //'alert': Alert,
    'skills': Skills,
    'projects': Projects,
    'project-recap': ProjectRecap,
  },
  data () {
    return {
      modalsOptions: {},
      keys: {},
    }
  },
  computed: {
    seeModals () {
      return Object.keys(this.modalsOptions).length
    },
    componentsList () {
      return Object.keys(this.$options.components).filter(comp => !['ModalsMain',].includes(comp))
    },
    visibleComps () {
      return Object.keys(this.modalsOptions)
    }
  },
  methods: {
    shouldIncludeComp (comp) {
      return Object.keys(this.modalsOptions).includes(comp)
    },
    setUpListeners () {
      this.emitter.on('show-modal', options => {
        if (options && this.componentsList.includes(options.name)) {
          this.modalsOptions[options.name] = options
          this.$forceUpdate()
        } else {
          alert(`Could not find and show the following modal: ${options && options.name}`)
        }
      })
      this.emitter.on('hide-modal', modalName => {
        // hides all modals if no modal name is declared
        if (!modalName) {
          this.modalsOptions = {}
        } else {
          delete this.modalsOptions[modalName]
        }
        this.$forceUpdate()
      })
      document.addEventListener('keydown', this.keyListener, true)
      document.addEventListener('keyup', this.keyListener, true)
    },
    onContainerClick (comp) {
      if (this.modalsOptions[comp].hardClose) return
      
      this.emitter.emit('hide-modal', comp)
    },
    keyListener (e) {
      if (e.type === 'keydown') {
        this.keys[e.key] = Date.now()
        if (this.keys.Meta < this.keys.s) {
          e.preventDefault()
          this.emitter.emit('show-modal', {
            name: 'super-admin',
          })
        }
      } else if (e.type === 'keyup') {
        delete this.keys[e.key]
      }
    },
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keyListener, true)
    document.removeEventListener('keyup', this.keyListener, true)
  },
  mounted () {
   this.setUpListeners()
  },
}
</script>

<template lang="pug">
span
  transition(
    name='fade'
  )
    .modals-main(
      v-if='Object.keys(this.modalsOptions).length'
    )
      span(
        v-for='(comp, idx) in componentsList'
      )
        .modals-container(
          v-if='visibleComps.includes(comp)'
          @click='onContainerClick(comp)'
          )
            span(
              @click.stop=''
            )
              transition(
                name='from-top'
              )
                component(
                  :is='comp'
                  :options='modalsOptions[comp]'
                  )
</template>

<style lang="sass">
@import '$styles/transitions.sass'
@import '$styles/form.sass'
.modals-main
  height: 100vh
  width: 100vw
  position: fixed
  z-index: 950
  .modals-container
    height: 100%
    width: 100%
    //background-color: transparentize(grey, .5)
    position: absolute
    > span
      > .modal-main
        background-color: white
        position: absolute
        left: 50%
        top: 50%
        transform: translateY(-50%) translateX(-50%)
        height: auto
        max-height: 100vh
        width: 320px
        //border-radius: 10px
        box-shadow: 0 0 .5rem 0 transparentize(black, .5)
        //border: thin grey solid
        overflow-y: scroll
        > .modal-container
          > *
            padding: 16px
          > .title
            @extend .font-2
            font-size: 24px
            color: white
            background-color: $red
            //border: black thin solid
          > .content
            padding: 24px
            max-height: calc(100vh - 232px)
            overflow-y: scroll
            background-color: $orange
            .description
              font-size: 18px
              margin-bottom: 1rem
            .content-title
              font-size: 1.6em
            .input-field
              margin-top: 5px
              $input-font-size: .9em
              > input
                margin-bottom: 8px
                height: 2.6rem
              label
                &.active
                  transform: translateY(-8px) scale(0.8)
          > .action
            background-color: $red
            color: white
            display: flex
            > .button
              border-sizing: border-box
              padding: 8px 24px
              background-color: white
              color: black
              text-align: center
              cursor: pointer
              border: white 2px solid
              transition: all .25s
              user-select: none
              margin-right: 8px
              &.minor
                background-color: transparent
                border-color: transparent
              &.cancel
                background-color: transparent
                color: white
</style>
