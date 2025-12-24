# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Memory System

**Every new agent should read these files FIRST:**

### STATE.md - What We Know (The Past)
- **Location:** `/Users/joshuamullet/code/mullet-town/STATE.md`
- **Contains:** Facts, lessons learned, accomplished work
- **Organization:** Newest entries at top with **full timestamps** (date AND time, e.g., `[2025-12-10 14:30]`)

### PLAN.md - What We're Doing (The Future)
- **Location:** `/Users/joshuamullet/code/mullet-town/PLAN.md`
- **Contains:** Current work, next steps, active tasks
- **Organization:** Current task at top, priority order descending

### The Workflow (Scoop & Consolidate)
1. Work on top item in PLAN.md
2. When completed: scoop it off the top
3. Consolidate into concise learning
4. Drop at top of STATE.md with **full timestamp** (date + time)

---

## Development Commands

### Development Server
```bash
npm run serve
```
Starts the Vue development server with hot-reload on port 3000.

### Build for Production
```bash
npm run build
```
Compiles and minifies the application for production deployment.

### Deploy to Firebase
```bash
npm run deploy
```
Builds the application and deploys to Firebase hosting.

### Install Dependencies
```bash
npm install
```

## Architecture Overview

This is a Vue 3 portfolio website ("Mullet Town") built with:
- **Vue 3** with Composition API
- **Vue Router 4** for client-side routing
- **Vuex 4** for state management
- **Sass** for styling with Pug templating
- **Firebase** for hosting and deployment
- **PWA** capabilities enabled

### Key Architectural Patterns

**Custom Plugin System**: The app uses two custom Vue plugins:
- `pro-emissions.js`: Event emitter using mitt library for global event communication
- `modals.js`: Modal management system that integrates with the event emitter

**Component Structure**: 
- Main components in `src/components/`
- Modal components in `src/components/modals/`
- Views in `src/views/` (HomeView, AboutView)
- Shared utilities in `src/components/typer.js`

**Asset Management**: Extensive use of webpack aliases defined in `vue.config.js`:
- `@` → `src/`
- `$modals` → `src/components/modals/`
- `$styles` → `src/global/styles/`
- `$vars` → `src/global/styles/vars.sass`

**Styling Architecture**: 
- Global Sass variables automatically imported via `vue.config.js`
- Consistent button styling with `.pro-button` class
- Transition styles in `src/global/styles/transitions.sass`

**Event Communication**: Uses mitt-based event emitter for component communication, particularly for modal show/hide functionality.

## File Structure Notes

- `public/img/projects/` contains project showcase images
- `src/assets/design/` contains design assets and SVG files
- Firebase configuration in `firebase.json` with hosting setup pointing to `dist/`
- Service worker registration enabled for PWA functionality

## Important Development Notes

- The app uses Pug templating syntax in Vue components
- Sass is configured with automatic variable imports
- Modal system is centralized through the custom plugin architecture
- Firebase deployment builds to `dist/` directory automatically