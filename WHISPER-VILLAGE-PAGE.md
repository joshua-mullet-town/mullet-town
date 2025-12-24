# Whisper Village Landing Page - Plan

**Goal:** Create a dedicated page at `/whisper-village` for easy onboarding and download.

---

## Page Structure

### 1. Hero Section
- **Logo:** `whisper-village-logo.png` (copy from whisper-village repo)
- **Headline:** "Whisper Village"
- **Tagline:** "Voice-to-text that runs entirely on your Mac"
- **Subtext:** "100% local. 100% private. Blazing fast."

### 2. Install Section
Primary CTA - terminal command with copy button:
```bash
curl -fsSL https://mullet.town/whisper-village/install.sh | bash
```

Helper text: "New to Terminal?" with link to quick guide (or inline instructions)

### 3. Key Features (3 cards)
| Icon | Title | Description |
|------|-------|-------------|
| Lock | Runs Locally | Your voice never leaves your Mac. No cloud, no subscriptions. |
| Zap | Blazing Fast | On-device Whisper models. Speak and see text instantly. |
| Target | Works Everywhere | Paste into any app. Slack, Notion, email - anywhere. |

### 4. System Requirements
- macOS only (badge/note)
- "Works on most modern Macs" (until we know specifics)

### 5. Footer/Contact
- Email: joshua@mullet.town
- GitHub repo link (open source)
- "Questions? Reach out!"

---

## Technical Implementation

### Files to Create
```
src/views/WhisperVillageView.vue    # Main page component
src/assets/img/whisper-village-logo.png  # Logo asset
public/whisper-village/install.sh   # Host install script here too
```

### Route Addition (src/router/index.js)
```javascript
{
  path: '/whisper-village',
  name: 'whisper-village',
  component: () => import('../views/WhisperVillageView.vue')
}
```

### Styling Notes
- Use existing `$orange` and `$red` from vars.sass
- Match VT323 font for headlines (techy feel)
- Dark background preferred (matches app aesthetic)
- Mobile responsive

---

## Content Decisions

### Tone
Developer-focused but accessible. Terminal install is the primary method, but include help for non-technical users.

### What We're NOT Doing (Yet)
- Screenshots/GIFs of the app in action
- Detailed feature comparisons
- Pricing section (it's free)
- Blog/articles

### Future Additions
- Demo video
- LLM/AI Polish feature highlight
- User testimonials

---

## Assets Needed
- [ ] Copy logo from whisper-village repo
- [ ] Host install.sh at /whisper-village/install.sh
- [ ] Favicon/meta tags for social sharing

---

## Open Questions
1. Do we need Apple Silicon vs Intel messaging?
2. Minimum macOS version?
3. Should we include a "What's New" section for updates?
