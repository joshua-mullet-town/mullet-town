<script>
export default {
  name: 'Skills',
  data () {
    return {
      skillsSections: [
        {
          title: 'AI & Automation',
          skills: [
            {
              name: 'AI Workflow Automation',
              stars: 5,
            },
            {
              name: 'Third-Party API Integration',
              stars: 4.5,
            },
            {
              name: 'Agent Development',
              stars: 4,
            },
            {
              name: 'GitHub App Development',
              stars: 4.5,
            },
          ]
        },
        {
          title: 'Coding',
          skills: [
            {
              name: 'React',
              stars: 5,
            },
            {
              name: 'Vue',
              stars: 4,
            },
            {
              name: 'Node.js',
              stars: 4.5,
            },
            {
              name: 'NPM',
              stars: 4.5,
            },
            {
              name: 'Github',
              stars: 4.5,
            },
          ]
        },
        {
          title: 'Integrations',
          skills: [
            {
              name: 'Firebase',
              stars: 5,
            },
            {
              name: 'Stripe',
              stars: 4.5,
            },
            {
              name: 'AWS',
              stars: 4,
            },
            {
              name: 'Square',
              stars: 4.5,
            },
            {
              name: 'Zapier',
              stars: 4.5,
            },
            {
              name: 'Twilio',
              stars: 4,
            },
            {
              name: 'Algolia',
              stars: 3.5,
            },
            {
              name: 'Braintree',
              stars: 3.5,
            }
          ],
        },
        {
          title: 'Design',
          skills: [
            {
              name: 'Web UI/UX',
              stars: 4.5,
            },
          ]
        },
        {
          title: 'Client',
          skills: [
            {
              name: 'Communication',
              stars: 4.5,
            },
            {
              name: 'Onboarding',
              stars: 4.5,
            },
          ],
        },
        {
          title: 'Other',
          skills: [
            {
              name: 'Bare knuckle brawl',
              stars: .5,
            },
            {
              name: 'Volleyball',
              stars: 4.5,
            },
          ],
        }
      ],
    }
  },
}
</script>

<template lang="pug">
.skills-main.modal-main
  .skills-container.modal-container
    .title Skills
    .content
      .description I do these things pretty good.
      .skills-area
        .skills-section(
          v-for='section in skillsSections'
        )
          .skills-title {{section.title}}
          .skills-holder
            .skill(
              v-for='skill in section.skills'
            )
              .name {{skill.name}}
              .stars-holder
                i.material-icons(
                  v-for='_ in Math.floor(skill.stars)'
                ) star
                i.material-icons(
                  v-if='Math.round(skill.stars) !== skill.stars'
                ) star_half
                i.material-icons(
                  v-for='_ in 5 - Math.ceil(skill.stars)'
                ) star_outline
    .action
      .button.major(
        @click='emitter.emit("hide-modal", "skills")'
      ) Close
</template>

<style lang="sass" scoped>
.skills-main
  .skills-container
    .title
    .content
      .description
      .skills-area
        max-height: 400px
        overflow-y: scroll
        .skills-section
          margin-bottom: 1rem
          .skills-title
            margin-bottom: .5rem
            color: white
            border-bottom: white thin solid
            padding-bottom: .5rem
            font-size: 20px
          .skills-holder
            .skill
              .name
                font-size: 22px
              .stars-holder
                > i
                  font-size: 32px
</style>