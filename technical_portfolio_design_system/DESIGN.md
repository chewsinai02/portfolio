---
name: Technical Portfolio Design System
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#c7c8ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#a7a9ff'
  on-tertiary-container: '#2b29bb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is engineered to project technical proficiency, precision, and architectural clarity. The brand personality is "The Modern Architect"—expert, reliable, and cutting-edge without being overly flashy. It targets high-end recruiters and technical stakeholders who value clean code and systematic thinking.

The visual style is a fusion of **Minimalism** and **Modern Corporate**, utilizing heavy whitespace to emphasize content and a rigorous grid to demonstrate order. It borrows subtle cues from **Glassmorphism** specifically for "private" or "locked" content to create a sense of depth and exclusivity, while maintaining a predominantly flat, high-performance aesthetic.

## Colors

The palette is rooted in a deep "Midnight" foundation, using a hierarchy of dark neutrals to create structural separation without relying on heavy borders. 

- **Primary (Electric Blue):** Used for interactive elements, syntax highlighting, and progress indicators. It represents "active code."
- **Secondary (Emerald Green):** Reserved for success states, deployment status, and "Live Preview" links.
- **Surface Tiers:** Backgrounds use `#020617`, while primary containers use `#0F172A`. A tertiary slate (`#1E293B`) is used for subtle UI plumbing like dividers and inactive states.

## Typography

This design system employs a tiered typographic strategy to balance readability with technical flair. 

- **Manrope** is used for headlines to provide a refined, geometric, and professional appearance.
- **Inter** handles the bulk of body copy, chosen for its exceptional legibility in technical documentation and long-form project descriptions.
- **Space Grotesk** is utilized for "Technical Accents"—labels, tags, numbers, and code snippets. While not a true monospace, its geometric and futuristic construction evokes a "code-inspired" aesthetic that remains highly legible at small sizes.

## Layout & Spacing

The layout utilizes a **Fixed Grid** model (12 columns) for desktop views, transitioning to a fluid single-column for mobile. A strict 4px baseline grid ensures vertical rhythm.

- **Margins:** Page-level horizontal margins are set to `lg` (48px) on desktop to provide breathing room.
- **Sectioning:** Vertical spacing between major project sections should be `xl` (80px) to maintain a clean, uncluttered portfolio feel.
- **Component Spacing:** Use `sm` (16px) for internal padding of cards and `xs` (8px) for related grouping (e.g., tech stacks/chips).

## Elevation & Depth

Depth is primarily communicated through **Tonal Layers** rather than traditional shadows. This keeps the interface feeling "flat-tech" and high-performance.

- **Level 0 (Base):** Deepest background (`#020617`).
- **Level 1 (Cards/Sections):** Slightly lighter slate (`#0F172A`).
- **Level 2 (Hover/Active):** Tinted slate or subtle border illumination using the primary Electric Blue at 20% opacity.
- **Locked Content:** Uses a **Backdrop Blur** (12px) with a semi-transparent slate overlay to create a "frosted" look, signaling that the content is behind a security layer.

## Shapes

The design system adopts a **Soft (Level 1)** roundedness approach. This maintains the "engineered" feel of sharp corners while slightly softening the user experience for a modern touch.

- **Standard Elements:** 0.25rem (4px) radius for buttons and small inputs.
- **Cards/Containers:** 0.5rem (8px) radius for larger components.
- **Chips:** Full pill-shape (circular ends) to distinguish them as metadata/tags from interactive buttons.

## Components

### Buttons
- **Primary:** Solid Electric Blue with bold Manrope text. No gradient. 
- **Ghost:** Transparent background with a 1px Slate border; transitions to a Blue border on hover.
- **CTAs:** Include a small "chevron" or "arrow" icon (Space Grotesk character) to emphasize direction.

### Cards & Hover Effects
Cards use a subtle 1px border (`#1E293B`). On hover, the border color transitions to the Primary Electric Blue, and a very faint blue glow (4px blur, 10% opacity) is applied to simulate a "powered-on" state.

### Tech Stack Chips
Small, low-contrast capsules. Background: `#1E293B`, Text: Space Grotesk 12px. Used to list languages (e.g., TypeScript, Rust).

### Private/Locked Containers
For "private" project content, the container uses a glassmorphic blur. A centered lock icon is paired with a primary-color "Request Access" button. The header of these cards remains legible, but the body content is obscured.

### Input Fields
Darker than the surface tier, with a clear Electric Blue focus ring. Labels always use the **label-caps** typography style for a technical, data-entry feel.