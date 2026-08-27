# Woof RWA — marketing site

React + Vite + framer-motion. Design: own layout in the woof.software tone — navy #191826 ground, accent #5DA6FD, sky gradient reserved for the closing CTA panel; Poppins/Inter/Fragment Mono; semantic colors (green = ownership wins, red = competitor pains); symmetric grids (3 stack layers x 3, 5-step timeline, animated 5-segment pipeline in the hero).

## Develop
```
npm install
npm run dev
```

## Deploy to Netlify
Option A — Git: push this folder to a repo, "Add new site → Import from Git" on Netlify.
`netlify.toml` already sets build command (`npm run build`) and publish dir (`dist`).

Option B — drag & drop: run `npm run build`, then drag the `dist/` folder onto https://app.netlify.com/drop

The "Book a scope" form uses **Netlify Forms** (`scope-request`) — it starts collecting submissions automatically after the first deploy (check Site → Forms). Notifications: Site settings → Forms → Form notifications → add email.

## Single-file build (for sharing/preview without hosting)
`npm run build:single` → `dist-single/index.html` (everything inlined).

## Before going live (draft checklist)
- Replace placeholder logos in "Our Work" (get client permission) and link them to real case studies.
- Point CTA/footer links to the final domain; set up a real email for form notifications.
- Remove the "Draft v1" badge in `src/sections/Close.jsx` (Footer).
- Review the legal disclaimer in the footer with counsel.
