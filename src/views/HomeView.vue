<template lang='pug'>
.home
  Joshua(
    msg="Welcome to Your Vue.js App"
  )
</template>

<script>
// @ is an alias to /src
import Joshua from '@/components/Joshua.vue'

export default {
  name: 'HomeView',
  components: {
    Joshua
  }
}
</script>
