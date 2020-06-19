<script>
import ProNav from '$common/ProNav'
export default {
  name: 'AdminStats',
  components: {
    'pro-nav': ProNav,
  },
  data() {
    return {
      totals: {
        students: {
          title: 'Students',
          calc: () => this.students ? Object.keys(this.students).length : 0,
        },
        lessonRecords: {
          title: 'Lesson Records',
          description: 'A record of the interaction between a student and a lesson.',
          calc: () => this.lessonRecords ? this.lessonRecords.length : 0,
        },
        lessons: {
          title: 'Tutorials',
          calc: () => this.lessons ? Object.keys(this.lessons).length : 0,
        },
      },
      overviews: {
        students: {
          gender: {
            title: 'Gender',
          },
          ethnicity: {
            title: 'Ethnicity',
          },
          states: {
            title: 'States',
            statsFunction: students => {
              const obj = {'Not From The US': 0}
              students.forEach(stud => {
                if (stud.not_from_the_us) {
                  obj['Not From The US'] += 1
                } else {
                  if (!obj[stud.state]) {
                    obj[stud.state] = 0
                  }
                  obj[stud.state] += 1
                }
              })
              return obj
            }
          },
          not_from_the_us: {
            title: 'Country',
            statsFunction: students => {
              const obj = {'USA': 0, 'Other': 0}
              students.forEach(stud => {
                obj[stud.not_from_the_us ? 'Other' : 'USA'] += 1
              })
              return obj
            },
          },
        },
      },
      details: {
        students: [
          stud => stud.email,
          stud => stud.gender === 'self-described' ? `Self-described: ${stud.self_described_gender}` : stud.gender,
          stud => stud.ethnicity,
          stud => `Joined: ${this.$buildDate(new Date(stud.created), '{shortMonth} {longDate}, {year}')}`,
          stud => `${stud.city}, ${stud.state || stud.country}`
        ],
        lessons: [
          lesson => lesson.group,
          lesson => `${this.lessonRecords.filter(record => record.lesson_id === lesson.id).length} views`,
          lesson => `${this.lessonRecords.filter(record => (record.lesson_id === lesson.id) && record.clicked_on_video).length} video clicks`,
          lesson => `${this.lessonRecords.filter(record => (record.lesson_id === lesson.id) && record.submission).length} submissions`,
        ],
      },
      view: '',
    }
  },
  computed: {
    students () {
      return this.$state.students
    },
    lessonRecords () {
      return this.$state.lessonRecords
    },
    lessons () {
      return this.$state.lessons
    },
  },
  methods: {
    setView () {
      this.view = this.$cookies.get('virtual-admin-stats-view') || 'students'
    },
    onViewClick (view) {
      this.view = view
      this.$cookies.set('virtual-admin-stats-view', view)
    },
    getStats (field) {
      let entities = this[this.view]
      if (!entities) return
      if (!Array.isArray(entities)) {
        entities = Object.values(entities)
      }
      const customStatsFunction = this.overviews[this.view][field].statsFunction
      const statsObj = customStatsFunction ? customStatsFunction(entities) : entities.reduce((acc, entity) => {
        const value = entity[field]
        if (!acc[value]) {
          acc[value] = 0
        }
        acc[value] += 1
        return acc
      }, {})
      return Object.keys(statsObj).map(name => ({
        name,
        value: statsObj[name],
      })).sort((a, b) => b.value - a.value)
    },
    getPercentage (amount) {
      return `(${Math.round(amount / this.totals[this.view].calc()  * 100)}%)`
    },
    onCopySubmission (text) {
      this.$copyToClipboard(text)
      this.$toast('Copied!')
    },
  },
  mounted () {
    this.setView()
  },
}
</script>

<template lang="pug">
  .admin-stats-main
    pro-nav
    .admin-stats-container 
      .header
        .totals-area
          .title.font-2 Totals
          .totals-holder
            .total(
              v-for='(total, key) in totals'
              :class='key === view ? "chosen" : ""'
              @click='onViewClick(key)'
            )
              .title.font-2 {{total.title}}
              .amount {{total.calc()}}
      .view-main
        .view-container
          .title.font-2 {{totals[view] && totals[view].title}}
          .overview-main(
            v-if='overviews[view] && Object.keys(overviews[view]).length'
          )
            .overview-container
              .title.font-2 Overview
              .overviews-holder
                .overview(
                  v-for='(overview, field) in overviews[view]'
                ) 
                  .title {{overview.title}}
                  .stats-holder
                    .stat(
                      v-for='stat in getStats(field)'
                    )
                      .name {{stat.name}}
                      .value.font-1-bold {{stat.value}}
                        span.percentage {{getPercentage(stat.value)}}
          .content.students(
            v-if='view === "students"'
          )
            .students-holder.entities-holder
              .student.entity(
                v-for='student in students'
              )
                .header
                  .name.font-2 {{student.name}}
                  .details-holder
                    .detail(
                      v-for='detailFunc in details.students'
                    ) {{detailFunc(student)}}
                .content(
                  v-if='lessonRecords.find(record => record.user_id === student.id)'
                )
                  .title.font-2 Lesson Records
                  .lesson-records-holder(
                    v-if='lessons'
                  )
                    .lesson-record(
                      v-for='lessonRecord in lessonRecords'
                      v-if='lessonRecord.user_id === student.id'
                      )
                      .name.font-2 {{lessons[lessonRecord.lesson_id].details.title}}
                      .details-holder
                        .detail {{lessonRecord.clicked_on_video ? 'Clicked on video' : 'Did not click on video'}}
                        .detail Steps: {{lessonRecord.completed_steps.length}}/{{lessons[lessonRecord.lesson_id].steps.length}}
                        .detail
                          span(
                            v-if='!lessonRecord.submission'
                          ) Did not submit
                          span.copy.font-2(
                            @click='onCopySubmission(lessonRecord.submission)'
                            v-else
                          ) Click to copy submission
          .content.lessons(
            v-if='view === "lessons"'
          )
            .entities-holder
              .lesson.entity(
                v-for='lesson in lessons'
                :class='lesson.live ? "" : "hidden"'
              )
                .header
                  .name.font-2 {{lesson.details && lesson.details.title}}
                .content
                  .details-holder
                    .detail(
                      v-for='detail in details.lessons'
                    ) {{detail(lesson)}}
</template>

<style lang="sass" scoped>
  .admin-stats-main
    .admin-stats-container
      > .header
        padding: 3rem
        background-color: $aqua
        .totals-area
          > .title
            font-size: 3rem
            margin-bottom: 1rem
            color: white
          .totals-holder
            display: flex
            .total
              cursor: pointer
              display: grid
              padding: 1rem
              grid-template-columns: auto auto
              align-items: center
              font-size: 18px
              border: thick black solid
              border-radius: 1rem
              margin-right: 1rem
              &.chosen
                background: black
                color: white
              .title
                margin-right: 1rem
      .view-main
        .view-container
          padding: 3rem
          max-width: 100vw
          > .title
            font-size: 48px
            margin-bottom: 1rem
          .overview-main
            .overview-container
              padding: 1.5rem
              border-radius: 1rem
              border: thick solid black
              > .title
                font-size: 28px
                border-bottom: thick black solid
                margin-bottom: 1rem
              .overviews-holder
                display: flex
                flex-wrap: wrap
                .overview
                  margin: 0 2rem 2rem 0
                  > .title
                    font-weight: bold
                    font-size: 18px
                    margin-bottom: .5rem
                  .stats-holder
                    width: max-content
                    .stat
                      display: grid
                      grid-template-columns: auto auto
                      .name
                        margin-right: .5rem
                      .value
                        text-align: right
                        > span
                          margin-left: .5rem
          > .content
            padding: 2rem 0
            &.lessons
              .entities-holder
                display: flex
                flex-wrap: wrap
                .lesson
                  margin-right: 1rem
                  &.hidden
                    opacity: .5
            .students-holder, .entities-holder
              .student, .entity
                padding: 1rem
                border: thick black solid
                border-radius: 1rem
                margin-bottom: 1rem
                width: fit-content
                max-width: 100%
                box-sizing: border-box
                .header
                  padding-bottom: .5rem
                  .name
                    font-size: 22px
                    margin-bottom: .25rem
                  .details-holder
                    display: flex
                    flex-wrap: wrap
                    background-color: $aqua
                    padding: .5rem .75rem
                    border-radius: .5rem
                    width: fit-content
                    box-sizing: border-box
                    .detail
                      margin-right: .5rem
                      font-size: 14px
                      //color: white
                      font-weight: bold
                      &:after
                        content: ','
                      &:last-child
                        &:after
                          content: ''
                .content
                  > .title
                    margin-bottom: .25rem
                  .lesson-records-holder
                    display: flex
                    max-width: 100%
                    overflow-x: scroll
                    .lesson-record
                      padding: .75rem
                      background-color: $orange
                      margin-right: 1rem
                      border-radius: 1rem
                      border: 3px solid black
                      box-sizing: border-box
                      .name
                        font-size: 20px
                        margin-bottom: .25rem
                      .details-holder
                        .detail
                          font-size: 14px
                          .copy
                            cursor: pointer

</style>