# Samit Pawar — Portfolio

An immersive, scroll-driven WebGL portfolio inspired by award-winning sites like
[sebastien-lempens.com](https://sebastien-lempens.com). A custom GLSL shader
background morphs its palette and structure as you travel through each project
"chapter," with optional generative ambient audio that drives the visuals.

## Stack

| Layer            | Tech                                            |
| ---------------- | ----------------------------------------------- |
| Shell / SSR / SEO| **Astro 5** (static shell, meta, JSON-LD)       |
| 3D engine        | **Three.js** via **React Three Fiber**          |
| Background       | **Custom GLSL** fragment shader (no 3D models)  |
| UI animation     | **Framer Motion**                               |
| Smooth scroll    | **Lenis**                                       |
| State            | **Zustand**                                     |
| Audio            | **Web Audio API** (generative pad + analyser)   |

The heavy WebGL lives in one `client:only` React island (`Experience.tsx`);
Astro renders the instant preloader and an SSR content block for crawlers.
If WebGL is unavailable, a `CanvasBoundary` falls back to an animated CSS
gradient so the page is never blank.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

Tip: append `?skipintro` to the URL to bypass the loader, or `#<project-id>`
(e.g. `#gitaflow`) to deep-link to a section.

## Editing content

All content is typed in **`src/data/site.ts`** — identity, stats, projects
(each with its own `accent`/`glow`/`mood` that drives the shader), skills, and
experience. Add or reorder a project and the nav, shader chapters, and SEO
block update automatically.

## Still to fill in (placeholders)

These were marked `FILL IN` in the source data; update `src/data/site.ts` /
`src/pages/index.astro` when you have them:

- GitHub URL (currently `https://github.com/samit9495`)
- Live URLs / repos for GitaFlow, LLM Council, Agentic SRE, HR Comp, Label by Mahi
- A real PDF resume link (currently points at the markdown file)
- Optional: a profile photo (the design currently runs photo-free by intent)
- Optional: swap the licensed display font — currently using Google's `Zen Dots`

## Deploy

Static output — drop `dist/` on Cloudflare Pages, Vercel, or Netlify
(`build command: npm run build`, `output: dist`).
