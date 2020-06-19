<script>
import bannerImg from '@/assets/img/sign-up/banner.jpg'
import arrayOfStates from '@/global/js/arrayOfStates.json'
import arrayOfCountries from '@/global/js/arrayOfCountries.json'
import ProNav from '$common/ProNav.vue'
import ProInput from '$common/ProInput.vue'
import ProSelect from '$common/ProSelect.vue'
export default {
  name: 'SignUp',
  components: {
    'pro-nav': ProNav,
    'pro-input': ProInput,
    'pro-select': ProSelect,
  },
  watch: {
    'form.city': {
      handler (city) {
        if (city !== 'wowz') return

        this.form = {
          email: 'jorymullet@gmail.com',
          password: 'password',
          repeat_password: 'password',
          name: 'Joshua Testboi',
          dob: new Date(2010, 8, 20),
          ethnicity: 'White, non-hispanic',
          gender: 'Male',
          self_described_gender: '',
          not_from_the_us: false,
          city: 'Goshen',
          state: 'Indiana',
          country: '',
          over_13_or_adult: true,
        }
      },
    },
  },
  data () {
    return {
      bannerImg,
      stage: 'USER',
      form: {
        email: '',
        password: '',
        repeat_password: '',
        name: '',
        dob: '',
        ethnicity: [],
        gender: '',
        self_described_gender: '',
        not_from_the_us: false,
        city: '',
        state: '',
        country: '',
        over_13_or_adult: false,
      },
      formOptions: {
        email: {
          title: 'Email',
          errorIf: val => this.$regex.is(val).an('email') ? '' : 'Enter valid email',
          type: 'email',
          info: 'Note: one email address per household'
        },
        password: {
          title: 'Password',
          errorIf: val => val && val.length > 5 ? '' : 'Password must be at least 6 characters',
          type: 'password',
        },
        repeat_password: {
          title: 'Repeat Password',
          errorIf: val => this.form.password === val ? '' : 'Passwords must match',
          type: 'password',
        },
        name: {
          rowTitle: 'Student Information',
          title: 'Student\'s Name',
          errorIf: val => val ? '' : 'Enter student\'s name',
        },
        dob: {
          title: 'Student\'s Date of Birth',
          errorIf: val => val ? '' : 'Enter student\'s date of birth',
          type: 'date',
        },
        ethnicity: {
          prompt: 'Student\'s Ethnicity',
          errorIf: val => val ? '' : 'Choose student\'s ethnicity',
          type: 'checkbox',
          multiple: true,
          options: [
            {
              name: 'American Indian/Alaska Native',
              value: 'American Indian/Alaska Native',
            },
            {
              name: 'Asian',
              value: 'Asian',
            },
            {
              name: 'Black/African American',
              value: 'Black/African American',
            },
            {
              name: 'Hispanic/Latino',
              value: 'Hispanic/Latino',
            },
            {
              name: 'Native hawaiian/Pacific Islander',
              value: 'Native hawaiian/Pacific Islander'
            },
            {
              name: 'White, non-hispanic',
              value: 'White, non-hispanic',
            },
            {
              name: 'Other',
              value: 'Other',
            },
          ],
        },
        gender: {
          prompt: 'Student\'s Gender',
          type: 'checkbox',
          errorIf: val => val ? '' : 'Select student\'s gender',
          options: [
            {
              name: 'Female',
              value: 'Female',
            },
            {
              name: 'Male',
              value: 'Male',
            },
            {
              name: 'Non-binary/third gender',
              value: 'Non-binary/third gender',
            },
            {
              name: 'Prefer to self-describe',
              value: 'self-described',
            },
          ]
        },
        self_described_gender: {
          title: 'Student\'s self-described gender',
          seeIf: () => this.form.gender === 'self-described',
          errorIf: val => (this.form.gender === 'self-described') && !val ? 'Enter student\'s self-described gender' : '',
        },
        not_from_the_us: {
          prompt: '',
          type: 'checkbox',
          options: [
            {
              name: 'I am not from the United States.',
              value: true,
            },
          ]
        },
        city: {
          title: 'City',
          errorIf: val => val ? '' : 'Enter city',
        },
        state: {
          title: 'State',
          component: 'select',
          options: arrayOfStates.map(state => ({name: state, value: state,})),
          errorIf: val => this.form.not_from_the_us || val ? '' : 'Enter state',
          seeIf: () => !this.form.not_from_the_us,
        },
        country: {
          title: 'Country',
          component: 'select',
          options: arrayOfCountries.map(state => ({name: state, value: state,})),
          errorIf: val => val || !this.form.not_from_the_us? '' : 'Enter country',
          seeIf: () => this.form.not_from_the_us,
        },
        over_13_or_adult: {
          prompt: '',
          type: 'checkbox',
          options: [
            {
              name: 'I am over the age of 13 or an adult or guardian is signing me up.',
              value: true,
            },
          ],
          errorIf: val => val ? '' : 'Check the age consent box'
        },
      },
    }
  },
  computed: {
    buttonCopy () {
      return {
        USER: 'Start Coding Today',
        SYSTEM: 'Creating User...',
        ERROR: 'Error. Try again.',
        SUCCESS: 'User Created!'
      }[this.stage]
    },
  },
  methods: {
    async onSignUp () {
      if (this.stage === 'SYSTEM') return

      const errors = this.$proErrors()
      if (errors.length) return errors.forEach(err => this.$toast(err))

      this.stage = 'SYSTEM'
      let customToken
      try {
        const response = await this.$HTTP({
          method: 'post',
          uri: 'users',
          body: this.form,
          secure: false,
        })
        customToken = response.body.customToken
      } catch (err) {
        this.stage = 'ERROR'
        this.$toast({copy: err.data.message, time: 3000, class: 'error'})
        return console.error(err)
      }

      try {
        await this.$auth.signInWithCustomToken(customToken)
        this.$toast('Success! You can start coding now!')
        this.stage = 'SUCCESS'
      } catch (err) {
        console.error(err)
        this.$toast('Could not automatically sign you in.')
      }
    },
  },
  mounted () {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  },
}
</script>

<template lang="pug">
  #sign-up-main
    pro-nav
    .sign-up-container.public-container
      .header
        .banner
          .image(
            :style='{backgroundImage: `url(${bannerImg})`}'
          )
        .copy
          .copy-container
            .title.font-2
              .normal Sign Up
              .free It's 
                span Free!
      .form-holder
        .pro-form
          .title We just need a few details
          .form-row(
            v-for='(options, key) in formOptions'
            v-if='!options.seeIf || options.seeIf()'
          )
            .row-title(
              v-if='options.rowTitle'
            ) {{options.rowTitle}}
            pro-select(
              v-if='(options.component === "select") && (!options.seeIf || options.seeIf())'
              v-model='form[key]'
              :options='options.options'
              :title='options.title'
            )
            pro-input(
              v-else-if='(!options.seeIf || options.seeIf())'
              v-model='form[key]'
              :options='options'
            )
            .info(
              v-if='options.info'
            ) {{options.info}}
        .buttons-holder
          .pro-button.cs-gradient(
            @click='onSignUp'
          ) {{buttonCopy}}
          .disclaimer By clicking Start Coding Now, I agree with South Bend Code School’s 
            a(
              target='_blank'
              href='/legal/Terms of Service.pdf'
            ) Terms of Service
            |  & 
            a(
              target='_blank'
              href='/legal/Privacy Policy.pdf'
            ) Privacy Policy
            | .


</template>

<style lang="sass">
  @import '$styles/form'
  #sign-up-main
    .sign-up-container
      display: grid
      .header
        height: 50vh
        .banner
          .image
            background-size: 125%
            background-position: left -15vw
        .copy
          position: relative
          background-color: transparentize($orange, .7)
          display: grid
          .copy-container
            width: fit-content
            justify-self: center
            align-self: center
            .title
              color: white
              text-align: center
              text-shadow: 0 0 5px $orange
              .normal
                font-size: 140px
              .free
                font-size: 60px
      .form-holder
        padding: 3rem 3rem 10rem 3rem
        display: grid
        max-width: 600px
        justify-self: center
        .pro-form
          justify-self: center
          width: 100%
          .title
            //font-size: 36px
          .form-row
            //margin-bottom: 40px
            .placeholder
              //font-size: 18px
              //bottom: 2.25rem
            input
              //@extend .font-2
              font-size: 18px
              padding-bottom: .25rem
        .buttons-holder
          display: grid
          margin-top: 2rem
          .pro-button
            font-size: 24px
            padding: 1em 1em
            justify-self: right
            width: calc(100% - 3rem)
          .disclaimer
            font-size: 14px
            margin-top: 1em
            //text-align: center
            color: grey
  @media (max-width: 900px)
    #sign-up-main
      .sign-up-container
        .header
          height: 400px
          .banner
            .image
              background-size: cover
              background-position: right 0
          .copy
            .copy-container
              width: 100%
              max-width: 600px
              .title
                text-align: left
                //padding: 0 3rem
                .normal
                  font-size: 88px
  @media (max-width: 700px)
    #sign-up-main
      .sign-up-container
        .header
          .copy
            .copy-container
              .title
                padding: 0 3rem

</style>