<script>
import Joshua from './Joshua'
export default {
  name: 'LandingShell',
  components: {
    joshua: Joshua,
  },
}
</script>

<template lang="pug">
  .landing-shell-main
    .landing-shell-container
      joshua
</template>

<style lang="sass" scoped>
  .landing-shell-main
    .landing-shell-container
</style>