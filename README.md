# Vanzone AI UI

### Futuristic AI News Design System

Vanzone AI UI is a modern, lightweight, and highly animated UI design system created specifically for AI news, technology media, blogs, magazines, and futuristic web experiences.

Built with:

- Vanilla CSS
- Vanilla JavaScript
- No Bootstrap
- No Tailwind
- No jQuery
- No external UI framework

The goal is simple:

> Build a premium AI media interface that feels alive.

---

## Features

Vanzone AI UI includes a complete collection of reusable UI components and visual effects.

### Design

- Futuristic AI aesthetic
- Dark-first interface
- Light theme support
- Glassmorphism
- Gradient system
- Glow effects
- AI-inspired backgrounds
- Responsive layout
- Mobile-first architecture

### Animations

- Fade animations
- Slide animations
- Scale animations
- Blur reveal
- Scroll reveal
- Floating elements
- Glow pulse
- Gradient animation
- Shimmer
- Orbit animation
- Animated borders
- Image zoom
- Hover lift
- Card tilt

### Interactive Effects

- Mouse spotlight
- Magnetic buttons
- 3D card tilt
- Reading progress
- Theme switcher
- Mobile navigation
- Modal
- Dropdown
- Tabs
- Accordion
- Toast notification
- Tooltip
- Search overlay
- Skeleton loader

### AI Visual Effects

- Neural network background
- Animated particles
- Particle connections
- Mouse-reactive network
- Aurora glow
- AI grid
- Scanline
- Floating orbs
- Holographic effects
- Gradient borders

---

# Project Structure

```text
vanzone-ai-ui/
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── core.css
│   ├── animations.css
│   ├── effects.css
│   ├── components.css
│   ├── interactive.css
│   ├── ai-background.css
│   ├── utilities.css
│   └── responsive.css
│
├── js/
│   ├── vanzone-ui.js
│   └── ai-background.js
│
├── build/
│   ├── build-css.js
│   └── build-js.js
│
├── dist/
│   ├── vanzone-ai-ui.css
│   └── vanzone-ai-ui.js
│
├── docs/
│   └── index.html
│
├── package.json
└── README.md


---

Quick Start

You can use the source files individually or use the production build.

Production

<link
  rel="stylesheet"
  href="dist/vanzone-ai-ui.css"
>

<script
  src="dist/vanzone-ai-ui.js"
  defer
></script>


---

Basic Container

<div class="vz-container">

  <h1>
    Vanzone AI
  </h1>

  <p>
    The future of AI news.
  </p>

</div>


---

Gradient Text

<h1 class="vz-text-gradient">

  The Future of AI

</h1>


---

AI Hero

<section
  class="
    vz-hero
    vz-aurora
    vz-ai-grid
    vz-spotlight
  "

>

  <div
    class="vz-ai-background"
    data-vz-ai-background
  ></div>

  <div class="vz-container">

    <div class="vz-hero-content">

      <span class="vz-hero-eyebrow">

        AI INTELLIGENCE

      </span>

      <h1
        class="
          vz-hero-title
          vz-text-gradient
        "
      >

        The Future
        of AI News.

      </h1>

      <p
        class="vz-hero-description"
      >

        Discover the latest
        developments in artificial
        intelligence.

      </p>

      <div class="vz-hero-actions">

        <a
          href="#"
          class="
            vz-btn
            vz-btn-primary
          "
          data-vz-magnetic
        >

          Explore AI News →

        </a>

      </div>

    </div>

  </div>

</section>


---

News Card

<article
  class="
    vz-news-card
    vz-glow-border
    vz-reveal-on-scroll
  "
  data-vz-tilt
>

  <div class="vz-news-image">

    <img
      src="image.jpg"
      alt="AI technology"
    >

  </div>

  <div class="vz-news-body">

    <span class="vz-badge">

      AI NEWS

    </span>

    <h2 class="vz-news-title">

      <a href="#">

        The Future of Artificial
        Intelligence

      </a>

    </h2>

    <p class="vz-news-excerpt">

      The latest developments
      shaping the AI industry.

    </p>

    <div class="vz-news-meta">

      <span>
        5 min read
      </span>

      <span class="vz-meta-dot"></span>

      <span>
        Today
      </span>

    </div>

  </div>

</article>


---

Scroll Reveal

Add:

class="vz-reveal-on-scroll"

Example:

<div class="vz-reveal-on-scroll">

  Content appears
  when scrolling.

</div>

The JavaScript engine automatically detects the element.


---

Magnetic Button

<a
  href="#"
  class="
    vz-btn
    vz-btn-primary
  "
  data-vz-magnetic
>

  Explore

</a>

The button follows the user's pointer with a subtle magnetic movement.


---

3D Tilt Card

<div
  class="vz-news-card"
  data-vz-tilt
>

  Card content

</div>

The card reacts to pointer movement.


---

Mouse Spotlight

<section class="vz-spotlight">

  Content

</section>

The spotlight follows the pointer.


---

AI Neural Background

<div
  class="vz-ai-background"
  data-vz-ai-background
></div>

The AI background automatically creates animated particles and connections.

On mobile devices, the particle count is reduced automatically.


---

Theme

Dark mode is the default.

Light mode can be activated with:

<button
  data-vz-theme-toggle
>
  Theme
</button>

The selected theme is stored locally.


---

Tabs

<div data-vz-tabs>

  <div class="vz-tabs">

    <button
      class="
        vz-tab
        is-active
      "
    >
      AI News
    </button>

    <button class="vz-tab">
      Research
    </button>

    <button class="vz-tab">
      Tools
    </button>

  </div>


  <div
    class="
      vz-tab-panel
      is-active
    "
  >

    AI news content.

  </div>


  <div class="vz-tab-panel">

    Research content.

  </div>


  <div class="vz-tab-panel">

    AI tools content.

  </div>

</div>


---

Accordion

<div class="vz-accordion">

  <div class="vz-accordion-item">

    <button
      class="vz-accordion-trigger"
      aria-expanded="false"
    >

      What is Vanzone AI UI?

      <span
        class="vz-accordion-icon"
      >
        +
      </span>

    </button>

    <div class="vz-accordion-content">

      <div>

        <p
          class="vz-accordion-text"
        >

          A futuristic UI system
          designed for AI media.

        </p>

      </div>

    </div>

  </div>

</div>


---

Toast

You can trigger a toast from JavaScript:

VanzoneUI.toast(
  "Article copied!"
);


---

Search Overlay

Create a search button:

<button
  data-vz-search-open="#search"
>
  Search
</button>

Then create the overlay:

<div
  id="search"
  class="vz-search-overlay"
>

  <div class="vz-search-panel">

    <input
      class="vz-search-large"
      type="search"
      placeholder="Search AI news..."
    >

  </div>

</div>

Close it with:

<button
  data-vz-search-close
>
  Close
</button>


---

Reading Progress

Add:

<div
  data-vz-reading-progress
></div>

The JavaScript engine calculates article reading progress automatically.


---

Utility Classes

Vanzone includes lightweight utility classes.

Examples:

<div class="vz-flex vz-items-center vz-gap-4">

<div class="vz-grid vz-grid-3">

<div class="vz-p-6">

<div class="vz-mt-8">

<div class="vz-text-center">


---

Design Tokens

The entire design system is controlled through CSS variables.

Example:

:root {

  --vz-primary: #6d5dfc;

  --vz-cyan: #00d4ff;

  --vz-radius-lg: 22px;

  --vz-duration: 350ms;

}

This allows developers to customize the visual identity without rewriting the entire framework.


---

Responsive

Vanzone AI UI is designed for:

Small phones

Large phones

Tablets

Laptops

Desktop monitors

Ultra-wide displays


The system automatically adapts grids, typography, spacing, navigation, cards, and hero sections.


---

Accessibility

Vanzone AI UI includes several accessibility considerations:

Visible keyboard focus

Semantic HTML examples

Reduced motion support

Responsive typography

Touch-friendly controls

Accessible button states


Users who enable:

prefers-reduced-motion

will receive reduced animation.


---

Performance

Vanzone AI UI intentionally avoids large UI dependencies.

There is:

No jQuery

No Bootstrap

No Tailwind runtime

No React

No Vue

No external animation framework


The AI background uses HTML Canvas.

Mobile devices automatically receive fewer particles.


---

Build

If Node.js is available:

npm run build

Build CSS:

npm run build:css

Build JavaScript:

npm run build:js

The generated files are placed inside:

dist/


---

Browser Support

Vanzone AI UI targets modern browsers supporting:

CSS Custom Properties

CSS Grid

Flexbox

IntersectionObserver

ResizeObserver

Canvas

ES2017+ JavaScript



---

Intended Use

Vanzone AI UI is designed for:

AI news websites

Technology magazines

AI blogs

AI tool directories

Startup websites

Technology landing pages

Developer portals

Futuristic dashboards

Personal technology projects



---

Philosophy

Vanzone AI UI follows three principles.

01 — Content First

Animations should improve the experience, not distract from the content.

02 — Motion With Purpose

Every animation should communicate something:

interaction

hierarchy

feedback

transition

discovery


03 — Lightweight By Default

A beautiful interface should not require a giant JavaScript framework.


---

Roadmap

Version 1.0

[x] Design tokens

[x] CSS reset

[x] Core layout

[x] Animation system

[x] Visual effects

[x] News components

[x] Interactive components

[x] Responsive system

[x] AI neural background

[x] Vanilla JavaScript engine


Version 1.1

[ ] Advanced search command palette

[ ] Premium mobile navigation

[ ] Advanced article components

[ ] More AI background presets

[ ] Better animation orchestration

[ ] Component documentation


Version 2.0

[ ] Theme builder

[ ] Visual customization system

[ ] More layout presets

[ ] Blog templates

[ ] AI media starter template

[ ] Blogger integration presets



---

License

MIT License

Copyright (c) 2026 Vanzone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the software.

The software is provided "as is", without warranty of any kind.


---

Vanzone AI UI

Built for the future of AI media.

AI moves fast.
Your interface should move beautifully with it.

## 🔥 Posisi project kita sekarang

```text
vanzone-ai-ui/
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── core.css
│   ├── animations.css
│   ├── effects.css
│   ├── components.css
│   ├── interactive.css
│   ├── ai-background.css
│   ├── utilities.css
│   └── responsive.css
│
├── js/
│   ├── vanzone-ui.js
│   └── ai-background.js
│
├── build/
│   ├── build-css.js
│   └── build-js.js
│
├── dist/
│   ├── vanzone-ai-ui.css
│   └── vanzone-ai-ui.js
│
├── docs/
│   └── index.html
│
├── package.json
└── README.md
