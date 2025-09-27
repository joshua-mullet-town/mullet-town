<template lang="pug">
#project-timeline-main.modal-main
  .timeline-container.modal-container
    .title My Development Journey
    .content
      .timeline-intro
        p Follow the timeline to see how I've evolved as a developer, from early web projects to AI-powered automation tools.
      
      .timeline-holder
        .timeline-line(ref="timelineLine")
        .timeline-projects(ref="timelineProjects")
          .timeline-project(
            v-for='(project, index) in chronologicalProjects'
            :key='project.title'
            :class='{ "left": index % 2 === 0, "right": index % 2 === 1 }'
            @click='openProjectDetails(project)'
          )
            .timeline-dot
            .project-card
              .project-date {{ project.year }}
              .project-image
                img(:src='`img/projects/${project.img}`')
              .project-info
                .project-title {{ project.title }}
                .project-summary {{ project.summary }}
                .project-skills
                  .skill-tag(
                    v-for='skill in project.mainSkills'
                    :key='skill'
                  ) {{ skill }}
    
    .action
      .button.major(
        @click='emitter.emit("hide-modal", "project-timeline")'
      ) Close
</template>

<script>
export default {
  name: 'ProjectTimeline',
  data() {
    return {
      chronologicalProjects: [
        {
          title: 'Whisper Village',
          year: '2025',
          img: 'whisper-village.png',
          summary: 'AI-powered voice transcription app for macOS with 99% accuracy',
          mainSkills: ['macOS dev', 'AI transcription', 'Swift'],
          ...this.getProjectData('Whisper Village')
        },
        {
          title: 'Agent Billy',
          year: '2025',
          img: 'agent-billy.png', 
          summary: 'AI developer that works directly from GitHub issues',
          mainSkills: ['AI automation', 'GitHub Apps', 'VM orchestration'],
          ...this.getProjectData('Agent Billy')
        },
        {
          title: 'clawtree',
          year: '2025',
          img: 'clawtree.png',
          summary: 'CLI tool for managing Git worktrees with terminal interface',
          mainSkills: ['CLI dev', 'Git automation', 'terminal UI'],
          ...this.getProjectData('clawtree')
        },
        {
          title: 'tAIcher',
          year: '2024',
          img: 'taicher.png',
          summary: 'AI-powered teaching platform with dynamic lessons',
          mainSkills: ['AI orchestration', 'multi-agent systems', 'EdTech'],
          ...this.getProjectData('tAIcher')
        },
        {
          title: 'sno',
          year: '2023',
          img: 'snowflake.svg',
          summary: 'Seat-based ordering system for Square POS businesses',
          mainSkills: ['integrations', 'Square API', 'rapid development'],
          ...this.getProjectData('sno')
        },
        {
          title: 'GiveGrove',
          year: '2021',
          img: 'givegrove.png',
          summary: 'Online fundraising platform for live events and auctions',
          mainSkills: ['full-stack', 'payment processing', 'real-time'],
          ...this.getProjectData('GiveGrove')
        },
        {
          title: 'Alumnity',
          year: '2020',
          img: 'alumnity.png',
          summary: 'Student loan refinancing with mentor matching system',
          mainSkills: ['Neo4j matching', 'fintech', 'video chat'],
          ...this.getProjectData('Alumnity')
        },
        {
          title: 'Coding Portal',
          year: '2020',
          img: 'sbcs.png',
          summary: 'Educational portal for remote coding classes (COVID response)',
          mainSkills: ['education platform', '10-day build', 'analytics'],
          ...this.getProjectData('Coding Portal')
        },
        {
          title: 'uncool',
          year: '2019',
          img: 'uncool.png',
          summary: 'Lightweight CMS as npm package for non-technical users',
          mainSkills: ['npm packaging', 'CMS', 'user empowerment'],
          ...this.getProjectData('uncool')
        }
      ]
    }
  },
  methods: {
    getProjectData(title) {
      // Get full project data from the original Projects.vue structure
      const mainProject = {
        title: 'Whisper Village',
        img: 'whisper-village.png',
        url: 'https://github.com/joshua-mullet-town/whisper-village/releases/download/v1.1.0/Whisper.Village.v1.1.0.dmg',
        buttonWidth: '16rem',
        overview: 'Whisper Village is an AI-powered voice transcription app for macOS. Just speak naturally and watch your words appear instantly with 99% accuracy. Perfect for writers, journalists, students, and anyone who needs reliable speech-to-text conversion.',
        skills: ['macOS app development', 'AI transcription', 'Swift/SwiftUI', 'Audio processing', 'UI/UX design', 'Open source forking & attribution'],
        features: ['instant AI transcription', 'multiple AI model support', 'keyboard shortcut integration', 'offline processing', 'recording timer', 'clean, intuitive interface'],
        downloadUrl: 'https://github.com/joshua-mullet-town/whisper-village/releases/download/v1.1.0/Whisper.Village.v1.1.0.dmg',
        isDownload: true
      }
      
      const projects = [
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
        {
          title: 'GiveGrove',
          img: 'givegrove.png',
          url: 'https://givegrove.com',
          buttonWidth: '10rem',
          overview: 'GiveGrove allows for donors to interact with fundraisers online. This means donors can view live auction items beforehand, place bids online for silent auction, buy votes for their favorite teams, and much more.',
          skills: ['coding', 'design',],
          features: ['online payment', 'securely built to process millions of dollars worth of donations', 'easy to use for all generations',],
        }
      ]
      
      if (title === 'Whisper Village') {
        return mainProject
      }
      
      return projects.find(p => p.title === title) || {}
    },
    
    openProjectDetails(project) {
      this.emitter.emit('show-modal', { name: 'project-recap', ...project })
    },
    
    updateTimelineHeight() {
      this.$nextTick(() => {
        const timelineProjects = this.$refs.timelineProjects
        const timelineLine = this.$refs.timelineLine
        if (timelineProjects && timelineLine) {
          const totalHeight = timelineProjects.scrollHeight
          timelineLine.style.height = totalHeight + 'px'
        }
      })
    }
  },
  
  mounted() {
    this.updateTimelineHeight()
  },
  
  updated() {
    this.updateTimelineHeight()
  }
}
</script>

<style lang="sass" scoped>
#project-timeline-main
  width: 95vw
  max-width: 1200px
  // max-height: 90vh
  background: $orange !important
  box-shadow: 0 0 .5rem 0 transparentize(black, .5) !important
  
  .timeline-container
    display: flex
    flex-direction: column
    
    .title
      font-size: 2rem
      margin-bottom: 0
      text-align: center
      color: white
      background-color: $red
      padding: 16px
      
    .content
      flex: 1
      display: flex
      flex-direction: column
      overflow: hidden
      background-color: $orange
      padding: 24px
      
      .timeline-intro
        text-align: center
        margin-bottom: 2rem
        
        p
          color: rgba(255, 255, 255, 0.9)
          font-size: 1.3rem
          line-height: 1.5
          
      .timeline-holder
        flex: 1
        position: relative
        overflow-y: auto
        padding: 2rem
        margin: 0 -24px
        
        .timeline-line
          position: absolute
          left: 50%
          top: 0
          width: 3px
          background: linear-gradient(to bottom, #4DBA87, #667eea)
          transform: translateX(-50%)
          z-index: 1
          min-height: 100%
          
        .timeline-projects
          position: relative
          z-index: 2
          
          .timeline-project
            position: relative
            margin-bottom: 4rem
            width: 45%
            cursor: pointer
            
            &.left
              margin-right: auto
              
              .timeline-dot
                right: -75px
                
              .project-card
                transform-origin: right center
                
            &.right
              margin-left: auto
              
              .timeline-dot
                left: -75px
                
              .project-card
                transform-origin: left center
                
            .timeline-dot
              position: absolute
              top: 2rem
              width: 20px
              height: 20px
              background: white
              border: 4px solid #4DBA87
              border-radius: 50%
              z-index: 3
              transition: all 0.3s ease
              
            &:hover .timeline-dot
              transform: scale(1.3)
              border-color: #667eea
              box-shadow: 0 0 20px rgba(102, 126, 234, 0.5)
              
            .project-card
              background: rgba(255, 255, 255, 0.95)
              border-radius: 12px
              padding: 1.5rem
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)
              transition: all 0.3s ease
              backdrop-filter: blur(10px)
              
              &:hover
                transform: scale(1.05)
                box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3)
                
              .project-date
                font-size: 0.9rem
                color: #667eea
                font-weight: 600
                margin-bottom: 0.5rem
                
              .project-image
                border-radius: 12px
                overflow: hidden
                margin-bottom: 1rem
                display: flex
                align-items: center
                justify-content: center
                
                img
                  max-width: 100%
                  max-height: 100%
                  object-fit: contain
                  
              .project-info
                color: #333
                
                .project-title
                  font-size: 1.3rem
                  font-weight: 600
                  margin-bottom: 0.5rem
                  color: #333
                  
                .project-summary
                  font-size: 0.95rem
                  line-height: 1.4
                  margin-bottom: 1rem
                  color: #666
                  
                .project-skills
                  display: flex
                  flex-wrap: wrap
                  gap: 0.5rem
                  
                  .skill-tag
                    background: linear-gradient(45deg, #4DBA87, #667eea)
                    color: white
                    padding: 0.25rem 0.75rem
                    border-radius: 20px
                    font-size: 0.8rem
                    font-weight: 500
    
    .action
      background-color: $red
      color: white
      display: flex
      justify-content: center
      padding: 16px
      flex-shrink: 0
      
      .button
        border-sizing: border-box
        padding: 8px 24px
        background-color: white
        color: black
        text-align: center
        cursor: pointer
        border: white 2px solid
        transition: all .25s
        user-select: none

@media (max-width: 768px)
  #project-timeline-main
    width: 100vw
    
    .timeline-container
      .content
        .timeline-holder
          padding: 1rem
          
          .timeline-line
            left: 2rem
            
          .timeline-projects
            .timeline-project
              width: calc(100% - 4rem)
              margin-left: 4rem !important
              margin-right: 0 !important
              
              &.left, &.right
                .timeline-dot
                  left: -4rem
                  right: auto
                  
                .project-card
                  transform-origin: left center
</style>