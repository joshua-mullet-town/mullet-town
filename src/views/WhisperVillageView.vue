<script>
export default {
  name: 'WhisperVillageView',
  data() {
    return {
      copied: false,
      emailCopied: false,
      displayedWords: [],
      contexts: [
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Add a loading spinner to the submit button while the form is processing"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Refactor the user authentication to use JWT tokens instead of sessions"
          ]
        },
        {
          type: 'slack',
          label: 'Slack',
          header: '#dev-team',
          phrases: [
            "Just pushed the fix to staging. Can someone review the PR?"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Write unit tests for the checkout flow"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Fix the bug where users can submit the form twice by double clicking"
          ]
        },
        {
          type: 'email',
          label: 'Gmail',
          header: 'To: team@startup.io',
          phrases: [
            "Hi everyone! Quick update on the release. We're on track for Friday."
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Add dark mode support to the settings page"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Create an API endpoint that returns paginated search results"
          ]
        },
        {
          type: 'slack',
          label: 'Slack',
          header: '#random',
          phrases: [
            "Anyone up for lunch?"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Optimize the database queries on the dashboard page"
          ]
        },
        {
          type: 'terminal',
          label: 'Claude Code',
          header: '>',
          phrases: [
            "Add input validation to the signup form with helpful error messages"
          ]
        }
      ],
      currentContextIndex: 0,
      currentPhraseInContext: 0,
      isTyping: false,
      showEnterKey: false,
      pillData: [
        { text: 'No account', emoji: '🎉', exploding: false, cta: false },
        { text: 'No subscription', emoji: '✨', exploding: false, cta: false },
        { text: 'Just speak', emoji: '🎤', exploding: false, cta: true }
      ]
    }
  },
  computed: {
    currentContext() {
      return this.contexts[this.currentContextIndex]
    }
  },
  methods: {
    copyCommand() {
      const command = 'curl -fsSL https://mullet.town/whisper-village/install.sh | bash'
      navigator.clipboard.writeText(command).then(() => {
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      })
    },
    copyEmail() {
      navigator.clipboard.writeText('joshua@mullet.town').then(() => {
        this.emailCopied = true
        setTimeout(() => {
          this.emailCopied = false
        }, 2000)
      })
    },
    explodePill(index) {
      if (this.pillData[index].exploding) return
      this.pillData[index].exploding = true
      setTimeout(() => {
        this.pillData[index].exploding = false
      }, 1200)
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const screen = this.$el.querySelector('.screen-content')
        if (screen) {
          screen.scrollTop = screen.scrollHeight
        }
      })
    },
    async typePhrase() {
      if (this.isTyping) return
      this.isTyping = true

      const context = this.currentContext
      const phrase = context.phrases[this.currentPhraseInContext]
      const words = phrase.split(' ')
      this.displayedWords = []

      // Type each word with random delay (simulating speech-to-text)
      for (const word of words) {
        // Random delay between 80-200ms for faster appearance
        const delay = 80 + Math.random() * 120
        await new Promise(resolve => setTimeout(resolve, delay))
        this.displayedWords.push(word)
        this.scrollToBottom()
      }

      // Pause to let user read the complete phrase
      await new Promise(resolve => setTimeout(resolve, 800))

      // Show enter key press animation
      this.showEnterKey = true
      await new Promise(resolve => setTimeout(resolve, 400))

      // Clear the display (message sent)
      this.displayedWords = []
      this.showEnterKey = false

      // Short pause before next phrase
      await new Promise(resolve => setTimeout(resolve, 600))

      // Move to next phrase in context, or next context
      this.currentPhraseInContext++
      if (this.currentPhraseInContext >= context.phrases.length) {
        this.currentPhraseInContext = 0
        this.currentContextIndex = (this.currentContextIndex + 1) % this.contexts.length
      }

      this.isTyping = false

      // Start next phrase
      this.typePhrase()
    }
  },
  mounted() {
    // Start the typing animation
    this.typePhrase()
  }
}
</script>

<template lang="pug">
.whisper-village-page
  .content-wrapper
    .main-content
      //- Logo centered at top
      .product-header
        .header-top
          img.logo(src="/img/projects/whisper-village.png" alt="Whisper Village")
          span.product-name Whisper Village
        a.made-by(href="/") by Mullet Town

      //- Hero section - dominates the view
      .hero-section
        h1.hero-title Type with your voice

      //- Combined demo section
      .demo-section
        //- Voice-to-text transformation visual
        .transformation-visual
          .visual-container
            //- Left: Waveform streaming into logo
            .waveform-section
              .waveform-track
                .waveform(v-for="n in 3" :key="'waveform-' + n")
                  .bar(v-for="i in 24" :key="'bar-' + n + '-' + i")

            //- Center: Logo
            .logo-center
              .logo-glow
              img.transform-logo(src="/img/projects/whisper-village.png" alt="")

            //- Right: Cute cartoon laptop
            .text-section
              .cute-laptop(:class="[{ sending: showEnterKey }, 'context-' + currentContext.type]")
                .laptop-lid
                  .screen-content(:class="'screen-' + currentContext.type")
                    .context-header
                      .app-logo(:class="'logo-' + currentContext.type")
                      span.context-label {{ currentContext.label }}
                    .message-header {{ currentContext.header }}
                    .typed-text(:class="'text-' + currentContext.type")
                      template(v-for="(word, index) in displayedWords" :key="'word-' + currentContextIndex + '-' + index")
                        span.word {{ word }}
                        span.space &nbsp;
                      span.cursor(v-if="displayedWords.length > 0 && !showEnterKey")
                .laptop-bottom
                .send-indicator(v-if="showEnterKey") ✨ sent!

        //- Divider
        .demo-divider

        //- Info section
        .info-section
          p.tagline Free voice-to-text that runs on your Mac.
          .pills
            .pill-wrapper(v-for="(pill, index) in pillData" :key="index")
              span.pill(:class="{ cta: pill.cta }" @click="explodePill(index)") {{ pill.text }}
              .emoji-burst(v-if="pill.exploding")
                span.emoji(v-for="n in 6" :key="n" :class="'emoji-' + n") {{ pill.emoji }}

      //- Dark sections container
      .dark-sections-wrapper
        //- Install section - distinct and clear
        .install-section
          h2 Install with one command
          .command-box
            .code-wrapper
              code curl -fsSL https://mullet.town/whisper-village/install.sh | bash
            button.copy-btn(@click="copyCommand")
              span(v-if="!copied") Copy
              span(v-else) Copied!

          .terminal-help
            details
              summary Unsure what to do? Click for detailed instructions
              .help-content
                ol
                  li
                    | Open
                    strong  Terminal
                    |  (press
                    kbd ⌘
                    | +
                    kbd Space
                    | , type "Terminal", hit Enter)
                  li
                    | Paste the command above (
                    kbd ⌘
                    | +
                    kbd V
                    | )
                  li
                    | Press
                    kbd Enter
                    | and watch the magic happen
                p.reassurance
                  | This script is open source and only installs Whisper Village to your Applications folder.
                  a(href="https://github.com/joshua-mullet-town/whisper-village/blob/main/install.sh" target="_blank" rel="noopener")  View the source code

        //- Features - below the fold
        .features-section
          .features
            .feature-card
              .icon 🔒
              h3 Runs Locally
              p Your voice never leaves your Mac. No cloud, no subscriptions, no data collection.

            .feature-card
              .icon ⚡
              h3 Blazing Fast
              p On-device Whisper models. Speak and see text instantly.

            .feature-card
              .icon 🎯
              h3 Works Everywhere
              p Paste into any app. Slack, Notion, email—anywhere you type.

        .footer-info
          .links
            button.email-btn(@click="copyEmail")
              span(v-if="!emailCopied") Questions? Copy email
              span(v-else) Email copied!
            span.divider •
            a(href="https://github.com/joshua-mullet-town/whisper-village" target="_blank" rel="noopener") GitHub
</template>

<style lang="sass" scoped>
.whisper-village-page
  min-height: 100vh
  background-image: url('../assets/design/main.svg')
  background-size: cover
  background-position: center center
  font-family: $font-body
  position: relative

// Product header - centered at top
.product-header
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding: 2rem 0 1rem

  .header-top
    display: flex
    align-items: center
    gap: 0.75rem

  .logo
    width: 52px
    height: 52px
    border-radius: 12px
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)

  .product-name
    font-family: $font-2
    font-size: 1.75rem
    color: white
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)

  .made-by
    font-family: $font-body
    font-size: 0.85rem
    color: rgba(255, 255, 255, 0.7)
    text-decoration: none
    margin-top: 0.25rem
    transition: color 0.2s ease
    &:hover
      color: white

.content-wrapper
  padding: 1rem 2rem 2rem
  min-height: 100vh
  box-sizing: border-box

.main-content
  max-width: 800px
  margin: 0 auto

// Hero section - BIG and dominant
.hero-section
  text-align: center
  padding: 2rem 0 2.5rem

  .hero-title
    font-family: $font-2
    font-size: 5rem
    margin: 0
    color: white
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)
    line-height: 1.1

// Combined demo section - groups visual + info together
.demo-section
  background: rgba(255, 255, 255, 0.12)
  border-radius: 24px
  padding: 1.5rem
  padding: 2rem
  margin-bottom: 2rem
  backdrop-filter: blur(4px)

// Transformation visual - voice to text flow
.transformation-visual
  margin: 0
  display: flex
  justify-content: center

// Divider between visual and info
.demo-divider
  height: 1px
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)
  margin: 0.75rem 2rem

.visual-container
  display: grid
  grid-template-columns: 1fr auto 1fr
  align-items: center
  height: 160px
  max-width: 800px
  width: 100%
  padding: 0 20px

// Center logo
.logo-center
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  position: relative
  padding: 0 10px

.logo-glow
  position: absolute
  width: 90px
  height: 90px
  background: radial-gradient(circle, rgba(239, 89, 27, 0.5) 0%, rgba(239, 89, 27, 0.2) 40%, transparent 70%)
  border-radius: 50%
  animation: logoPulse 2s ease-in-out infinite

.transform-logo
  width: 56px
  height: 56px
  border-radius: 12px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4)
  position: relative
  z-index: 1
  animation: logoWorking 1.5s ease-in-out infinite

@keyframes logoWorking
  0%, 100%
    transform: scale(1)
    filter: brightness(1)
  50%
    transform: scale(1.08)
    filter: brightness(1.15)

@keyframes logoPulse
  0%, 100%
    transform: scale(1)
    opacity: 0.7
  50%
    transform: scale(1.2)
    opacity: 1

// Left section - Waveform flows INTO logo
.waveform-section
  height: 100%
  display: flex
  align-items: center
  justify-content: flex-end
  overflow: hidden
  // Fade from left edge, solid on right
  mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%)
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%)

.waveform-track
  display: flex
  align-items: center
  gap: 5px
  animation: waveformScroll 6s linear infinite

.waveform
  display: flex
  align-items: center
  gap: 5px
  flex-shrink: 0

.bar
  width: 4px
  background: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.9))
  border-radius: 2px
  flex-shrink: 0

// Audio-reactive heights pattern
.bar:nth-child(1)
  height: 12px
.bar:nth-child(2)
  height: 28px
.bar:nth-child(3)
  height: 18px
.bar:nth-child(4)
  height: 38px
.bar:nth-child(5)
  height: 14px
.bar:nth-child(6)
  height: 32px
.bar:nth-child(7)
  height: 20px
.bar:nth-child(8)
  height: 42px
.bar:nth-child(9)
  height: 16px
.bar:nth-child(10)
  height: 35px
.bar:nth-child(11)
  height: 22px
.bar:nth-child(12)
  height: 30px
.bar:nth-child(13)
  height: 15px
.bar:nth-child(14)
  height: 40px
.bar:nth-child(15)
  height: 19px
.bar:nth-child(16)
  height: 36px
.bar:nth-child(17)
  height: 13px
.bar:nth-child(18)
  height: 25px
.bar:nth-child(19)
  height: 44px
.bar:nth-child(20)
  height: 17px
.bar:nth-child(21)
  height: 33px
.bar:nth-child(22)
  height: 21px
.bar:nth-child(23)
  height: 38px
.bar:nth-child(24)
  height: 15px

// Infinite scroll: move exactly 33.333% (one copy's width) so it loops seamlessly with 3 copies
@keyframes waveformScroll
  0%
    transform: translateX(0)
  100%
    transform: translateX(33.333%)

// Right section - Cute cartoon laptop
.text-section
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  overflow: visible

.cute-laptop
  display: flex
  flex-direction: column
  align-items: center
  position: relative
  flex-shrink: 0
  &.sending
    .laptop-lid, .laptop-bottom
      animation: laptopBounce 0.4s ease

@keyframes laptopBounce
  0%, 100%
    transform: scale(1)
  50%
    transform: scale(1.02)

// Screen/lid - the main part
.laptop-lid
  width: 250px
  height: 125px
  background: linear-gradient(135deg, lighten($orange, 10%) 0%, $orange 100%)
  border-radius: 14px 14px 4px 4px
  padding: 8px 12px
  box-sizing: border-box
  position: relative
  box-shadow: 0 4px 20px rgba($orange, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.5)
  border: 3px solid rgba(255, 255, 255, 0.6)

.screen-content
  width: 100%
  height: 100%
  background: white
  border-radius: 6px
  padding: 5px 8px
  box-sizing: border-box
  overflow-y: auto
  overflow-x: hidden
  position: relative
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.08)
  display: flex
  flex-direction: column
  transition: background 0.3s ease
  // Hide scrollbar but keep functionality
  scrollbar-width: none
  -ms-overflow-style: none
  &::-webkit-scrollbar
    display: none
  // Gmail style
  &.screen-email
    background: #fff
  // Slack style
  &.screen-slack
    background: linear-gradient(180deg, #f8f8f8 0%, #fff 100%)
  // Terminal/Claude Code style
  &.screen-terminal
    background: #1a1a2e

.context-header
  display: flex
  align-items: center
  gap: 4px
  margin-bottom: 3px
  padding-bottom: 3px
  border-bottom: 1px solid rgba(0, 0, 0, 0.08)
  flex-shrink: 0

// CSS Logos
.app-logo
  width: 10px
  height: 10px
  border-radius: 2px
  flex-shrink: 0

.logo-email
  background: linear-gradient(135deg, #EA4335 25%, #FBBC05 25%, #FBBC05 50%, #34A853 50%, #34A853 75%, #4285F4 75%)

.logo-slack
  background: #611f69
  position: relative
  &::before
    content: ''
    position: absolute
    top: 2px
    left: 2px
    right: 2px
    bottom: 2px
    background: linear-gradient(135deg, #36C5F0 25%, #2EB67D 25%, #2EB67D 50%, #ECB22E 50%, #ECB22E 75%, #E01E5A 75%)
    border-radius: 1px

.logo-terminal
  background: #1a1a2e
  border: 1px solid #4a9eff
  position: relative
  &::after
    content: '>_'
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 5px
    color: #4a9eff
    font-weight: bold

.context-label
  font-family: $font-body
  font-size: 0.5rem
  color: #666
  font-weight: 600

.message-header
  font-family: $font-body
  font-size: 0.5rem
  color: #999
  margin-bottom: 4px
  flex-shrink: 0

.screen-terminal .message-header
  color: #4a9eff
  font-family: 'SF Mono', 'Fira Code', monospace

.screen-slack .message-header
  color: #1264a3
  font-weight: 600

.typed-text
  display: flex
  flex-wrap: wrap
  align-content: flex-start
  line-height: 1.25
  width: 100%
  flex: 1
  // Terminal style - natural language, not code
  &.text-terminal
    .word
      font-family: $font-body
      color: #e0e0e0
    .space
      font-family: $font-body

.word
  font-family: $font-body
  font-size: 0.6rem
  color: #444
  font-weight: 500
  animation: wordPop 0.15s ease-out
  flex-shrink: 0

.space
  font-size: 0.6rem
  flex-shrink: 0

// Terminal context needs light colors
.screen-terminal
  .context-header
    border-bottom-color: rgba(255, 255, 255, 0.15)
  .context-label
    color: #4a9eff
  .cursor
    background: #4a9eff

.cursor
  display: inline-block
  width: 2px
  height: 0.75em
  background: $red
  border-radius: 1px
  animation: blink 0.8s infinite
  vertical-align: text-bottom
  margin-left: 1px

.send-indicator
  position: absolute
  right: -5px
  bottom: 18px
  font-size: 0.75rem
  color: $red
  font-weight: 700
  font-family: $font-body
  white-space: nowrap
  transform: rotate(-8deg)
  animation: arcadePop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)

@keyframes arcadePop
  0%
    opacity: 0
    transform: rotate(-8deg) scale(0) translateY(10px)
  50%
    transform: rotate(-8deg) scale(1.2) translateY(-5px)
  100%
    opacity: 1
    transform: rotate(-8deg) scale(1) translateY(0)

@keyframes blink
  0%, 45%
    opacity: 1
  50%, 100%
    opacity: 0

@keyframes wordPop
  0%
    opacity: 0
    transform: scale(0.8)
  100%
    opacity: 1
    transform: scale(1)

// Bottom part - just a simple hint of keyboard
.laptop-bottom
  width: 270px
  height: 14px
  background: linear-gradient(135deg, $orange 0%, darken($orange, 8%) 100%)
  border-radius: 0 0 10px 10px
  margin-top: -2px
  box-shadow: 0 4px 12px rgba($orange, 0.3)
  border: 3px solid rgba(255, 255, 255, 0.5)
  border-top: none
  position: relative
  // Little notch/indent hint
  &::after
    content: ''
    position: absolute
    top: 2px
    left: 50%
    transform: translateX(-50%)
    width: 40px
    height: 4px
    background: rgba(255, 255, 255, 0.4)
    border-radius: 2px

// Info section - inside demo-section
.info-section
  text-align: center
  padding: 0.5rem 1rem 0
  max-width: 600px
  margin: 0 auto

  .tagline
    font-family: $font-body
    font-size: 1.8rem
    font-weight: 600
    color: white
    margin: 0 0 1rem 0
    padding: 0.5rem 0
    line-height: 1.3
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)

  .pills
    display: flex
    gap: 0.5rem
    justify-content: center
    flex-wrap: wrap

  .pill-wrapper
    position: relative

  .pill
    font-family: $font-2
    font-size: 1.2rem
    background: linear-gradient(135deg, $orange 0%, darken($orange, 5%) 100%)
    padding: 0.5rem 1rem
    border-radius: 50px
    box-shadow: 0 3px 12px rgba($orange, 0.35)
    border: 2px solid rgba(255, 255, 255, 0.3)
    color: white
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)
    cursor: pointer
    transition: transform 0.15s ease, box-shadow 0.15s ease
    &:hover
      transform: scale(1.05)
      box-shadow: 0 5px 18px rgba($orange, 0.5)
    &:active
      transform: scale(0.95)
    &.cta
      background: linear-gradient(135deg, $red 0%, darken($red, 5%) 100%)
      box-shadow: 0 3px 12px rgba($red, 0.4)
      &:hover
        box-shadow: 0 5px 18px rgba($red, 0.5)

  .emoji-burst
    position: absolute
    top: 50%
    left: 50%
    pointer-events: none

  .emoji
    position: absolute
    font-size: 1.2rem

  // Each emoji gets unique natural falling trajectory with wobble
  .emoji-1
    animation: emojiFall1 1.1s ease-in-out forwards
  .emoji-2
    animation: emojiFall2 1s ease-in-out forwards
    animation-delay: 0.02s
  .emoji-3
    animation: emojiFall3 1.15s ease-in-out forwards
    animation-delay: 0.04s
  .emoji-4
    animation: emojiFall4 0.95s ease-in-out forwards
    animation-delay: 0.01s
  .emoji-5
    animation: emojiFall5 1.2s ease-in-out forwards
    animation-delay: 0.03s
  .emoji-6
    animation: emojiFall6 1.05s ease-in-out forwards

  // Natural falling with horizontal wobble (like confetti/leaves)
  // Pop up, then drift side-to-side while falling
  @keyframes emojiFall1
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(-30px, -50px) scale(1) rotateZ(-15deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(-50px, 0px) scale(0.95) rotateZ(10deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(-35px, 50px) scale(0.85) rotateZ(-5deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(-55px, 90px) scale(0.7) rotateZ(15deg) rotateY(540deg)

  @keyframes emojiFall2
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(40px, -55px) scale(1.1) rotateZ(20deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(25px, 5px) scale(1) rotateZ(-10deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(50px, 55px) scale(0.85) rotateZ(15deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(35px, 95px) scale(0.65) rotateZ(-8deg) rotateY(540deg)

  @keyframes emojiFall3
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(-15px, -60px) scale(0.95) rotateZ(-8deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(10px, -5px) scale(0.9) rotateZ(12deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(-20px, 45px) scale(0.8) rotateZ(-15deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(5px, 85px) scale(0.6) rotateZ(10deg) rotateY(540deg)

  @keyframes emojiFall4
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(55px, -45px) scale(1) rotateZ(15deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(70px, 10px) scale(0.95) rotateZ(-12deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(45px, 60px) scale(0.8) rotateZ(8deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(65px, 100px) scale(0.65) rotateZ(-10deg) rotateY(540deg)

  @keyframes emojiFall5
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(5px, -65px) scale(1.15) rotateZ(5deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(-25px, -10px) scale(1) rotateZ(-18deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(15px, 50px) scale(0.85) rotateZ(12deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(-10px, 95px) scale(0.6) rotateZ(-6deg) rotateY(540deg)

  @keyframes emojiFall6
    0%
      opacity: 1
      transform: translate(-50%, -50%) scale(0.2) rotateZ(0deg)
    15%
      opacity: 1
      transform: translate(-60px, -40px) scale(0.9) rotateZ(-20deg) rotateY(0deg)
    40%
      opacity: 1
      transform: translate(-40px, 15px) scale(0.85) rotateZ(8deg) rotateY(180deg)
    70%
      opacity: 0.8
      transform: translate(-65px, 55px) scale(0.75) rotateZ(-12deg) rotateY(360deg)
    100%
      opacity: 0
      transform: translate(-45px, 90px) scale(0.6) rotateZ(5deg) rotateY(540deg)

// Dark sections wrapper - light card behind all dark sections
.dark-sections-wrapper
  background: rgba(255, 255, 255, 0.2)
  border-radius: 16px
  padding: 1.25rem
  backdrop-filter: blur(4px)

// Install section - dark terminal aesthetic
.install-section
  background: rgba(20, 20, 25, 0.95)
  border-radius: 12px
  padding: 2rem
  margin-bottom: 1.25rem
  backdrop-filter: blur(8px)
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)

  h2
    font-family: $font-2
    font-size: 1.8rem
    margin: 0 0 1.25rem 0
    color: rgba(255, 255, 255, 0.9)
    text-align: center

.command-box
  display: flex
  align-items: center
  background: #2a2a30
  border-radius: 8px
  padding: 0.75rem
  margin-bottom: 1rem
  gap: 0.75rem
  border: 1px solid rgba(255, 255, 255, 0.1)

  .code-wrapper
    flex: 1
    overflow-x: auto
    padding: 0.5rem
    &::-webkit-scrollbar
      height: 4px
    &::-webkit-scrollbar-track
      background: #333
      border-radius: 2px
    &::-webkit-scrollbar-thumb
      background: #555
      border-radius: 2px

  code
    font-family: 'SF Mono', 'Fira Code', monospace
    font-size: 0.95rem
    color: #4DBA87
    white-space: nowrap

  .copy-btn
    background: $red
    color: white
    border: none
    padding: 0.75rem 1.5rem
    border-radius: 6px
    cursor: pointer
    font-family: $font-2
    font-size: 1.2rem
    transition: all 0.2s ease
    white-space: nowrap
    flex-shrink: 0

    &:hover
      background: darken($red, 8%)
      transform: translateY(-1px)

.terminal-help
  text-align: left

  details
    background: rgba(255, 255, 255, 0.08)
    border-radius: 8px
    padding: 1rem 1.25rem

    summary
      cursor: pointer
      color: rgba(255, 255, 255, 0.6)
      font-size: 1.1rem
      font-family: $font-2

      &:hover
        color: rgba(255, 255, 255, 0.9)

  .help-content
    margin-top: 1rem
    padding-top: 1rem
    border-top: 1px solid rgba(255, 255, 255, 0.1)
    font-family: $font-body

    p
      margin: 0 0 0.75rem 0
      color: rgba(255, 255, 255, 0.8)
      font-size: 1rem
      line-height: 1.6

    ol
      margin: 0 0 1rem 0
      padding-left: 1.5rem
      color: rgba(255, 255, 255, 0.8)
      font-size: 1rem

      li
        margin-bottom: 0.75rem
        line-height: 1.7

    kbd
      background: rgba(255, 255, 255, 0.15)
      padding: 0.2rem 0.5rem
      margin: 0 0.25rem
      border-radius: 4px
      font-family: 'SF Mono', monospace
      font-size: 0.9rem
      border: 1px solid rgba(255, 255, 255, 0.2)
      color: white
      display: inline-block

    strong
      color: white
      font-weight: 600

    .reassurance
      font-size: 0.95rem
      color: rgba(255, 255, 255, 0.6)
      margin-top: 1.25rem
      line-height: 1.6

      a
        color: #4DBA87
        text-decoration: none
        font-weight: 500

        &:hover
          text-decoration: underline

// Features section - dark themed
.features-section
  background: rgba(20, 20, 25, 0.95)
  border-radius: 12px
  padding: 2rem
  margin-bottom: 1.25rem
  backdrop-filter: blur(8px)
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)

.features
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 1rem

.feature-card
  background: rgba(255, 255, 255, 0.08)
  border-radius: 12px
  padding: 1.25rem
  text-align: center

  .icon
    font-size: 2.5rem
    margin-bottom: 0.5rem

  h3
    font-family: $font-2
    font-size: 1.3rem
    margin: 0 0 0.5rem 0
    color: rgba(255, 255, 255, 0.9)

  p
    font-family: $font-body
    font-size: 0.95rem
    color: rgba(255, 255, 255, 0.7)
    margin: 0
    line-height: 1.5

.footer-info
  text-align: center
  background: rgba(20, 20, 25, 0.95)
  border-radius: 12px
  padding: 1.5rem 2rem
  backdrop-filter: blur(8px)
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)
  font-family: $font-body

  .links
    font-size: 0.95rem
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap
    gap: 0.25rem

    .email-btn
      background: $red
      color: white
      border: none
      padding: 0.5rem 1rem
      border-radius: 6px
      cursor: pointer
      font-family: $font-2
      font-size: 1rem
      transition: all 0.2s ease

      &:hover
        background: darken($red, 8%)
        transform: translateY(-1px)

    a
      color: #4DBA87
      text-decoration: none
      font-weight: 500

      &:hover
        text-decoration: underline

    .divider
      margin: 0 0.5rem
      color: rgba(255, 255, 255, 0.4)

@media (max-width: 700px)
  .product-header
    padding: 1.5rem 0 0.5rem

    .logo
      width: 40px
      height: 40px

    .product-name
      font-size: 1.4rem

    .made-by
      font-size: 0.75rem

  .content-wrapper
    padding: 1rem

  .hero-section
    padding: 1.5rem 0 1.5rem

    .hero-title
      font-size: 2.8rem

  .transformation-visual
    margin: 0.75rem 0 1rem

  // Switch to vertical layout on mobile
  .visual-container
    grid-template-columns: 1fr
    grid-template-rows: auto auto auto
    height: auto
    border-radius: 24px
    padding: 0 15px 15px 15px
    max-width: 320px
    gap: 5px

  // Waveform at top, flowing downward
  .waveform-section
    height: 60px
    justify-content: center
    mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%)
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 85%, transparent 100%)

  .waveform-track
    flex-direction: column
    animation: waveformScrollVertical 6s linear infinite

  .waveform
    flex-direction: column
    gap: 3px

  // Varying widths for vertical waveform, all same thin height
  .bar:nth-child(1)
    width: 12px
    height: 3px
  .bar:nth-child(2)
    width: 28px
    height: 3px
  .bar:nth-child(3)
    width: 18px
    height: 3px
  .bar:nth-child(4)
    width: 38px
    height: 3px
  .bar:nth-child(5)
    width: 14px
    height: 3px
  .bar:nth-child(6)
    width: 32px
    height: 3px
  .bar:nth-child(7)
    width: 20px
    height: 3px
  .bar:nth-child(8)
    width: 42px
    height: 3px
  .bar:nth-child(9)
    width: 16px
    height: 3px
  .bar:nth-child(10)
    width: 35px
    height: 3px
  .bar:nth-child(11)
    width: 22px
    height: 3px
  .bar:nth-child(12)
    width: 30px
    height: 3px
  .bar:nth-child(13)
    width: 15px
    height: 3px
  .bar:nth-child(14)
    width: 40px
    height: 3px
  .bar:nth-child(15)
    width: 19px
    height: 3px
  .bar:nth-child(16)
    width: 36px
    height: 3px
  .bar:nth-child(17)
    width: 13px
    height: 3px
  .bar:nth-child(18)
    width: 25px
    height: 3px
  .bar:nth-child(19)
    width: 44px
    height: 3px
  .bar:nth-child(20)
    width: 17px
    height: 3px
  .bar:nth-child(21)
    width: 33px
    height: 3px
  .bar:nth-child(22)
    width: 21px
    height: 3px
  .bar:nth-child(23)
    width: 38px
    height: 3px
  .bar:nth-child(24)
    width: 15px
    height: 3px

  @keyframes waveformScrollVertical
    0%
      transform: translateY(0)
    100%
      transform: translateY(33.333%)

  .logo-center
    padding: 5px 0

  .logo-glow
    width: 50px
    height: 50px

  .transform-logo
    width: 36px
    height: 36px
    border-radius: 8px

  // Laptop at bottom, wider
  .text-section
    width: 100%

  .cute-laptop
    transform: none

  .laptop-lid
    width: 260px
    height: 100px

  .laptop-bottom
    width: 280px
    height: 12px

  .word
    font-size: 0.55rem

  .context-label, .message-header
    font-size: 0.55rem

  .demo-section
    padding: 0 1rem 1rem 1rem
    border-radius: 20px

  .info-section
    padding: 0.5rem 0

    .tagline
      font-size: 1.05rem

    .sub-tagline
      font-size: 0.95rem

    .pills
      row-gap: 1rem
      column-gap: 0.5rem

    .pill
      font-size: 1rem
      padding: 0.4rem 0.8rem
      display: inline-block

  .install-section
    padding: 1.5rem

    h2
      font-size: 1.4rem

  .command-box
    flex-direction: row
    gap: 0.5rem
    padding: 0.5rem

    .code-wrapper
      padding: 0.25rem

    code
      font-size: 0.75rem

    .copy-btn
      padding: 0.6rem 1rem
      font-size: 1rem

  .features-section
    padding: 1.5rem

  .features
    grid-template-columns: 1fr

  .feature-card
    padding: 1rem

  .footer-info
    padding: 1.5rem
</style>
