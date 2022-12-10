<template lang='pug'>
.home
  ProNav
  Joshua(
    msg="Welcome to Your Vue.js App"
  )
</template>

<script>
// @ is an alias to /src
import Joshua from '@/components/Joshua.vue'
import ProNav from '@/components/ProNav.vue';

export default {
  name: 'HomeView',
  components: {
    Joshua,
    ProNav,
  }
}
</script>
