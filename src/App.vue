<script>
import ProToast from '$common/ProToast'
import Loading from '$common/Loading'
import ModalsMain from '$modals/Main'
export default {
  name: 'App',
  components: {
    'pro-toast': ProToast,
    'loading': Loading,
    'modals-main': ModalsMain,
  },
  data () {
    return {
      lessonRecordsUnsubscribe: null,
    }
  },
  methods: {
    getUser (uid) {
      return new Promise(async resolve => {
        const userDoc = await this.$firestore.collection('users').doc(uid).get()
        const user = userDoc.data()
        user.id = userDoc.id
        resolve(user)
      })
    },
    getUnsubscribe (ref, storeTitle, fireMethod, beforePlacement = null) {
      let fbRef = typeof ref === 'string' ? this.$firestore.collection(ref) : ref
      return fbRef.onSnapshot(async qs => {
        const update = {}
        update[storeTitle] = this.$fire.qs[fireMethod](qs)
        if (beforePlacement) {
          update[storeTitle] = await beforePlacement(update[storeTitle])
        }
        this.$store.commit('update', update)
      })
    },
    async listenForUser () {
      this.$auth.onAuthStateChanged(async (auth) => {
        this.$store.commit('update', {auth})
        if (auth) {
          this.$proEmit('hide-login')
          const user = await this.getUser(auth.uid)
          
          this.$store.commit('update', {user})

          if (user.role === 'STUDENT') {
            this.lessonRecordsUnsubscribe = this.$firestore.collection('lesson_records')
              .where('user_id', '==', auth.uid).onSnapshot(qs => {
                const lessonRecords = qs.docs.reduce((acc, doc) => {
                  const lessonRecord = doc.data()
                  acc[lessonRecord.lesson_id] = lessonRecord
                  return acc
                }, {})
                this.$store.commit('update', {lessonRecords})
              })
              
          } else if (user.role === 'ADMIN') {
            this.lessonRecordsUnsubscribe = this.getUnsubscribe('lesson_records', 'lessonRecords', 'toArray')
            this.studentsUnsubscribe = this.getUnsubscribe(this.$firestore.collection('users').where('role', '==', 'STUDENT'), 'students', 'toJSON')
            this.lessonsUnsubscribe = this.getUnsubscribe('lessons', 'lessons', 'toJSON', (lessons) => new Promise(async resolve => {
              // need to collect and attach video details
              const isDone = () => Object.values(lessons).every(lesson => lesson.details !== undefined)

              Object.values(lessons).forEach(async lesson => {
                try {
                  lesson.details = (await this.$HTTP({
                    method: 'get',
                    fullUri: `https://vimeo.com/api/v2/video/${lesson.video_id}.json`,
                    secure: false,
                  })).body[0]
                } catch (err) {
                  lesson.details = null
                }

                isDone() && resolve(lessons)
              })
            }))
          }

          if (!['SignUp', 'PublicMain'].includes(this.$route.name)) return //don't navigate if the page has a plan

          const defaultRoute = {
            STUDENT: 'StudentDashboard',
            ADMIN: 'AdminStats',
          }[user.role]

          this.$router.push(this.$route.query.redirect || {name: defaultRoute})
        } else {
          const unsubs = [
            this.lessonRecordsUnsubscribe,
            this.studentsUnsubscribe,
            this.lessonsUnsubscribe,
          ]
          unsubs.forEach(unsub => unsub && unsub())
        }
      })
    },
  },
  mounted () {
    this.listenForUser()
  },
}
</script>


<template lang='pug'>
  #app
    modals-main
    router-view
    pro-toast
    loading
</template>

<style lang="sass">
  @import '$vars'
  body
    margin: 0
    font-family: $font-1
  #app
    position: relative
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button
    -webkit-appearance: none
    margin: 0

  .pro-button
    @extend .font-1-bold
    cursor: pointer
    border-radius: 1rem
    padding: .75em 1.5em
    font-size: 20px
    background-color: black
    color: white
    box-shadow: 0px 2px 2px 0 rgba(0, 0, 0, .3)
    transition: all .1s
    &.plain
      background-color: transparent
      color: black
      box-shadow: none
      &:hover
        box-shadow: none
    &:hover
      box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, .3)
    &:active
      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, .3)
    &.gradient
      @extend .cs-gradient
  
  .pro-image
    position: relative
    &::before
      content: ' '
      padding-top: 100%
      display: block
    .image
      position: absolute
      top: 0
      left: 0
      bottom: 0
      right: 0
      background-position: top
      background-repeat: no-repeat
      background-size: cover
</style>
