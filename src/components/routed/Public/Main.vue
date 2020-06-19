<script>
import ProNav from '$common/ProNav'
export default {
  name: 'PublicMain',
  components: {
    'pro-nav': ProNav,
  },
  watch: {
    '$route' (newRoute, oldRoute) {
      const isHigherRoute = newRoute.meta.transIndex > oldRoute.meta.transIndex
      this.transtionName = isHigherRoute ? 'slide-left' : 'slide-right'
    },
  },
  data () {
    return {
      transtionName: 'slide-left',
    }
  },
}
</script>


<template lang="pug">
  .public-main-main
    .public-main-container
      transition(
        :name='transtionName'
        mode='out-in'
      )
        router-view.router-view(
          :key="$route.name"
        )
</template>

<style lang="sass">
  @import '$vars'
  @import '$styles/transitions.sass'
  .public-main-main
    .public-main-container
      background-color: white
      .router-view
        .public-container
          .header
            display: grid
            height: 70vh
            position: relative
            .banner
              width: 100%
              height: 100%
              position: absolute
              .image
                height: 100%
                width: 100%
                background-size: 100%
                background-position: left 0vw
      @media (max-width: 900px)
        .router-view
          .public-container
            .header
              height: 400px
              .banner
                .image
                  background-position: right 0 !important
                  background-size: cover !important
</style>
