<script>
export default {
  name: 'Projects',
  data() {
    return {
      mainProject: {
        title: 'Whisper Village',
        img: 'whisper-village.png',
        url: 'https://github.com/joshua-mullet-town/whisper-village/releases/download/v1.1.0/Whisper.Village.v1.1.0.dmg',
        buttonWidth: '16rem',
        overview: 'Whisper Village is an AI-powered voice transcription app for macOS. Just speak naturally and watch your words appear instantly with 99% accuracy. Perfect for writers, journalists, students, and anyone who needs reliable speech-to-text conversion.',
        skills: ['macOS app development', 'AI transcription', 'Swift/SwiftUI', 'Audio processing', 'UI/UX design', 'Open source forking & attribution'],
        features: ['instant AI transcription', 'multiple AI model support', 'keyboard shortcut integration', 'offline processing', 'recording timer', 'clean, intuitive interface'],
        downloadUrl: 'https://github.com/joshua-mullet-town/whisper-village/releases/download/v1.1.0/Whisper.Village.v1.1.0.dmg',
        isDownload: true
      },
      projects: [
        {
          title: 'Agent Billy',
          img: 'agent-billy.png',
          url: 'https://github.com/joshua-mullet-town/agent-billy',
          buttonWidth: '8rem',
          overview: 'Agent Billy is an AI developer that works directly from GitHub issues. It enables stakeholders to contribute to codebases they could never work with before—just describe what you need and Billy handles the coding, testing, and pull requests. Being proven out daily and improving continuously.',
          skills: ['AI-driven automation', 'GitHub App development', 'VM orchestration', 'Claude Code CLI integration', 'end-to-end workflow automation'],
          features: ['real-time GitHub issue processing', 'intelligent clarification conversations', 'automated VM provisioning & testing', 'complete PR automation with cleanup'],
        },
        {
          title: 'clawtree',
          img: 'clawtree.png',
          url: 'https://www.npmjs.com/package/clawtree',
          buttonWidth: '8rem',
          overview: 'ClawTree is a minimal CLI tool for managing Git worktrees with an intuitive terminal interface, designed for Claude Code workflows. It allows developers to work on multiple branches simultaneously without switching contexts.',
          skills: ['CLI development', 'Git automation', 'terminal UI', 'npm packaging', 'workflow optimization'],
          features: ['interactive terminal dashboard', 'git worktree management', 'Claude Code integration', 'VS Code integration', 'smart branch detection'],
        },
        {
          title: 'sno',
          img: 'snowflake.svg',
          url: 'https://sit-n-order-prod.web.app/',
          buttonWidth: '8rem',
          overview: 'sno allows anyone who uses a Square POS system (like, a coffee shop or sports stadium) to let their customers order from their seats, allowing the customer to skip the line.',
          skills: ['integrations', 'Square', 'design', 'rapid, feedback-driven development', 'SSO'],
          features: ['free to use', 'ultra-lightweight', 'intuitive'],
        },
        {
          title: 'tAIcher',
          img: 'taicher.png',
          url: 'https://clover-and-quill.web.app/',
          buttonWidth: '8rem',
          overview: 'tAIcher is an AI-powered teaching platform that enables teachers to create dynamic, personalized lessons. Teachers can assign custom lessons (like Python tutorials) with various question types, while students engage through an interactive ChatGPT-style interface that adapts to their responses.',
          skills: ['AI orchestration', 'multi-agent systems', 'dynamic UI generation', 'educational technology', 'conversational AI'],
          features: ['dynamic question generation (multiple choice, open text, true/false)', 'teacher-defined lesson creation', 'adaptive student interactions', 'orchestrated agent communication', 'personalized learning paths'],
        },
        {
          title: 'uncool',
          img: 'uncool.png',
          url: 'https://www.npmjs.com/package/uncool',
          buttonWidth: '6rem',
          overview: 'Uncool is a lightweight content management system. Installed as an npm package, it allows non-technical individuals to login to their site and change both copy and photos, all without coding or talking to a dev. This feature both allows the website owner more control over her/his site and avoids pesky copy/image change requests that bog down the development team.',
          skills: ['coding', 'npm'],
          features: [],
        },
        {
          title: 'Alumnity',
          img: 'alumnity.png',
          recapImg: 'alumnity_recap.png',
          url: 'https://www.alumnityshares.com/',
          buttonWidth: '10rem',
          overview: 'Alumnity refinances student loans, as do many companies. The main difference is that Alumnity pairs each borrower with a mentor that is in their field.',
          skills: ['coding', 'neo4j (for matching users)'],
          features: ['1 year build', 'custom video chat', 'messaging', 'file sharing', 'algorithmic matching of mentor/mentee', 'Quickbooks integration for accounting', 'Stripe integration for payments and deposits',],
        },
        {
          title: 'Coding Portal',
          img: 'sbcs.png',
          recapImg: 'sbcs_recap.png',
          url: 'https://virtual.southbendcodeschool.com',
          buttonWidth: '11rem',
          overview: 'The SBCS Coding Portal was built in response to SBCS not being able to hold classes in person. The site had around 36 lessons that 7 - 18 year olds could watch, build, and then upload a link to show off their creation.',
          skills: ['coding', 'design',],
          features: ['10 day build', 'admin dashboard', 'comprehensive analytics', 'used in 5 different countries'],
        },
        // {
        //   title: 'Correct Property Tax',
        //   img: 'cpt.png',
        //   url: 'https://app.correctpropertytax.com/',
        //   style: {backgroundColor: 'black'},
        //   buttonWidth: '13rem',
        //   overview: 'Correct Property Tax reassesses property values for property owners to avoid paying too much during tax season. I took a process that included sending physical documents, paying via check, no automatic tracking, no automatic emails and put all of it online in order to streamline their process.',
        //   skills: ['coding', 'design', 'client management',],
        //   features: ['online document signing', 'online sign up', 'online payment', 'automatic client tracking', 'automatic emails',]
        // },
        {
          title: 'GiveGrove',
          img: 'givegrove.png',
          url: 'https://givegrove.com',
          buttonWidth: '10rem',
          overview: 'GiveGrove allows for donors to interact with fundraisers online. This means donors can view live auction items beforehand, place bids online for silent auction, buy votes for their favorite teams, and much more.',
          skills: ['coding', 'design',],
          features: ['online payment', 'securely built to process millions of dollars worth of donations', 'easy to use for all generations',],
        },
        // {
        //   title: 'Pie For Providers',
        //   img: 'pie.png',
        //   buttonWidth: '10rem',
        //   overview: 'Pie For Providers helps child care providers track data about their clients in order to claim the maximum child care subsidy.',
        //   skills: ['coding',],
        //   features: ['monthly subscriptions', 'heavy analytics', 'bilingual',],
        // }
      ]
    }
  },
}
</script>

<template lang="pug">
#projects-main.modal-main
  .projects-container.modal-container
    .title Projects
    .content
      .description This is the neatest thing I have built.
      .projects-holder.main
        .main-project.project(
          :style='{width: mainProject.buttonWidth || "8rem", ...(mainProject.style || {})}'
          @click='emitter.emit("show-modal", {name: "project-recap", ...mainProject})'
        )
          .project-image.main
            img(
              :src='`img/projects/${mainProject.img}`'
            )
          .project-name {{ mainProject.title }}
      .description These are other things I have built.
      .projects-holder
        .project(
          v-for='project in projects'
          :style='{width: project.buttonWidth || "8rem", ...(project.style || {})}'
          @click='emitter.emit("show-modal", {name: "project-recap", ...project})'
        )
          .project-image
            img(
              :src='`img/projects/${project.img}`'
            )
          .project-name {{ project.title }}
    .action
      .button.major(
        @click='emitter.emit("hide-modal", "projects")'
      ) Close
</template>

<style lang="sass" scoped>
#projects-main
  width: max-content
  max-width: 600px
  min-width: 300px
  .projects-container
    .content
      .projects-holder
        display: grid
        grid-template-columns: auto auto
        justify-items: center
        &.main
          grid-template-columns: auto
        .project
          $dim: 8rem
          cursor: pointer
          border-radius: .5rem
          box-shadow: 0 0 .25rem 0 black
          padding: 1rem
          position: relative
          margin: 0 1rem 1.5rem 0
          transition: all .2s ease
          background-color: white
          display: flex
          flex-direction: column
          align-items: center
          &.main-project
            .project-image.main
              height: 12rem
              > img
                width: 10rem
          &:hover
            box-shadow: 0 0 .75rem 0 rgba(0, 0, 0, 0.4)
            transform: translateY(-4px) scale(1.02)
            .project-image
              transform: scale(1.05)
            .project-name
              color: #4DBA87
              text-shadow: 0 0 8px rgba(77, 186, 135, 0.3)
          .project-image
            height: $dim
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            transition: all .2s ease
            > img
              max-height: 100%
              max-width: 100%
              object-fit: contain
          .project-name
            font-family: $font-2
            font-size: 14px
            font-weight: 600
            text-align: center
            margin-top: 0.75rem
            color: #333
            transition: all .2s ease
            line-height: 1.2
@media (max-width:600px)
  #projects-main
    .projects-container
      .content
        .projects-holder
          grid-template-columns: auto
          .project
            margin: 0 0 1.5rem 0
            .project-name
              font-size: 12px
</style>