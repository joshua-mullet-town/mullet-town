# Mullet Town State - What We Know

**Purpose:** Knowledge base of accomplished work, lessons learned, and current facts. Always add new entries at the top with full timestamps (date + time).

---

## [2025-12-23 ~14:00] Whisper Village Landing Page - COMPLETE

**Achievement:** Created dedicated landing page for Whisper Village at `/whisper-village`.

### What Was Built

- **Standalone page** - No nav bar, just "Made by Mullet Town" link back to homepage
- **Product header** - Logo + "Whisper Village" name centered at top
- **Hero section** - "Type with your voice" in 5rem VT323 font
- **Info section** - Light transparent background with taglines
- **Dark sections wrapper** - Light background container around all dark sections
- **Install section** - Dark terminal aesthetic with copy-to-clipboard command
- **Features section** - 3 cards (Runs Locally, Blazing Fast, Works Everywhere)
- **Footer** - Questions button (copy email), GitHub link, Made by Mullet Town

### Key Design Decisions

- **Two-tier dark/light**: Dark terminal sections wrapped in light transparent container
- **Font pairing**: VT323 for headlines, Work Sans for body text
- **Copy-to-clipboard**: Both install command and email use clipboard API
- **Honest messaging**: Changed from "100% private" to "Voice-to-text that runs on your Mac" + "No account. No subscription." to be honest about optional API features
- **Accent color**: $red (#ef591b) for emphasis, underlines, and buttons

### Technical Details

**Install command:**
```bash
curl -fsSL https://mullet.town/whisper-village/install.sh | bash
```

**Route:** `/whisper-village` → `WhisperVillageView.vue` (lazy-loaded)

### Files Created/Modified

| File | Changes |
|------|---------|
| `src/views/WhisperVillageView.vue` | **NEW** - Complete landing page |
| `src/components/ProNav.vue` | Reorganized nav, added Whisper Village link |
| `src/global/styles/vars.sass` | Added Work Sans font, $font-body variable |
| `src/router/index.js` | Added /whisper-village route |

### Lessons Learned

1. **Font inheritance**: When a page sets `font-family: $font-body`, it can override nav fonts. Fix by adding explicit `font-family` to nav container.

2. **kbd element spacing**: Using margins (`margin: 0 0.25rem`) + `display: inline-block` works better than trying to add spaces in Pug template.

3. **Pug spacing with underlined text**: Use `|` for text spacing and add `margin-left` to the span to prevent underline from extending before the text.

4. **Semi-transparent dark sections**: `rgba(20, 20, 25, 0.95)` for dark sections, `rgba(255, 255, 255, 0.2)` for light wrapper.

---

## Project Facts

**Site:** mullet.town
**Framework:** Vue 3 + Vue Router 4 + Vuex 4
**Templating:** Pug
**Styling:** Sass with global variables
**Hosting:** Firebase
**Fonts:** VT323 (retro/headlines), Work Sans (body text)
**Colors:** $orange (#EA9842), $red (#ef591b)
