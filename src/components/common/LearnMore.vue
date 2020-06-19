<script>
import partners from '@/global/js/partners.json'
export default {
  name: 'LearnMore',
  data() {
    return {
      partners,
    }
  },
}
</script>

<template lang="pug">
  #learn-more-main
    .partners-container
      .title.font-2 Thank You To Our Partners
      .partners-holder
        a.partner(
          v-for='partner in partners'
          :href='partner.link'
          target='_blank'
        )
          img(
            :src='require(`@/assets/img/landing/sponsors/${partner.imgURL}`)'
          )
          .title.font-2 {{partner.title}}
    a.learn-more-container(
      href='https://southbendcodeschool.com/'
      target='_blank'
    )
      .left-side.side
        .image-holder
          img(
            src='@/assets/img/common/logo.png'
          )
      .right-side.side
        .title Want to learn more about South Bend Code School?
        .pro-button.link.font-2.cs-gradient Click here!
</template>

<style lang="sass" scoped>
  #learn-more-main
    .partners-container
      padding: 2rem 3rem 1rem
      background-color: $blue
      //border-bottom: thin black solid
      > .title
        font-size: 24px
        margin-bottom: 1rem
        color: white
      .partners-holder
        display: flex
        flex-wrap: wrap
        .partner
          display: grid
          justify-items: center
          width: fit-content
          margin: 0 1em 1em 0
          box-shadow: 1px 1px 3px 0 #999
          border-radius: 1em
          padding: .75rem
          text-decoration: none
          transition: all .25s
          background-color: white
          > img
            height: 40px
          .title
            color: black
            font-size: 14px
          &:hover
            box-shadow: 1px 2px 4px 0px #999
    .learn-more-container
      display: grid
      grid-template-columns: 1fr 1fr
      align-items: center
      transition: all .25s
      text-decoration: none
      .side
        padding: 4rem
        display: grid
      .left-side
        .image-holder
          width: 100%
          max-width: 400px
          justify-self: center
          > img
            width: 100%
      .right-side
        text-align: center
        justify-items: center
        .title
          font-size: 22px
          margin-bottom: 1rem
          color: black
        .link
          font-size: 28px
  @media (max-width: 1150px)
    #learn-more-main
      .learn-more-container
        .right-side
          .title
            font-size: 20px
  @media (max-width: 900px)
    #learn-more-main
      .learn-more-container
        grid-template-columns: 1fr
        padding: 2rem
        .side
          padding: 0
        .left-side
          margin-bottom: 2rem
          .image-holder
            max-width: 500px
            margin: 0 auto
        .right-side
          .title
            font-size: 20px
</style>