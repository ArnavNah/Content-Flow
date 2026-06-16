# ContentFlow AI — Master Prompt + Product Build Spec

## Purpose

This document is the single source of truth for designing and building **ContentFlow AI**, a premium portfolio SaaS that looks like a real AI content repurposing startup.

The project must feel like a funded SaaS product inspired by:

- Taplio
- Typefully
- Contentdrips
- Linear
- Arc Browser
- Vercel
- Stripe
- Attio
- Notion

The goal is to impress clients, not to create a complex backend.

---

# Master Prompt for Stitch + Antigravity

You are a senior SaaS product team consisting of:

- Product Manager
- Senior UI/UX Designer
- Staff Frontend Engineer
- SaaS Architect
- Growth Designer

Your job is to design and build a premium SaaS portfolio project called **ContentFlow AI**.

## Core Rule

Before doing anything, read this markdown file completely and treat it as the **source of truth**.

Do not invent new product directions that conflict with this document.

If something is missing, improve the UX only if it does not violate the spec.

## Product

**Name:** ContentFlow AI  
**Tagline:** Turn One Piece of Content Into Dozens

## Product Goal

Build a SaaS that helps creators, founders, agencies, and marketers repurpose one content source into many content outputs.

The finished product should look like a polished AI SaaS with:

- beautiful marketing pages
- premium dashboard UX
- realistic demo data
- modern analytics
- workspace management
- content library management
- clean settings and billing screens

## Constraints

- Use free tools and free-tier friendly setup
- No paid APIs
- No real AI API calls
- No real Stripe payment integration
- Use mock data and static JSON only
- Everything should be possible to build cheaply or for free
- UI should look expensive even if the backend is fake

## Recommended Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Recharts
- Lucide Icons
- Static JSON or local TypeScript mock files

## Design Direction

The product should feel closer to:

- Linear
- Arc
- Typefully
- Taplio
- Vercel
- Stripe

Use:

- Purple + Blue gradients
- Dark and light mode
- Spacious layouts
- Premium card systems
- Glassy overlays
- Soft shadows
- Clean typography
- Strong hierarchy

Avoid:

- generic Tailwind dashboard feel
- empty template layouts
- childish colors
- clutter
- cheap-looking UI

---

# Build Phases

## Phase 1 — Product Planning
Define:
- target users
- feature scope
- page structure
- demo data needs
- UI priorities

## Phase 2 — Design System
Create:
- colors
- typography
- spacing
- radius
- shadows
- buttons
- cards
- inputs
- tables
- charts
- nav patterns

## Phase 3 — Landing Page
Design a premium marketing page with:
- navbar
- hero
- social proof
- problem/solution
- feature bento grid
- product showcase
- testimonials
- pricing
- FAQ
- CTA
- footer

## Phase 4 — Dashboard
Design:
- overview
- KPI cards
- charts
- recent activity
- insights
- quick actions

## Phase 5 — AI Generator
Design:
- content input
- generation panel
- output tabs
- copy/export actions
- loading states
- empty states

## Phase 6 — Content Library
Design:
- search
- filters
- sort
- status
- categories
- table/list views
- bulk actions

## Phase 7 — Workspaces
Design:
- workspace switcher
- roles
- members
- permissions
- settings

## Phase 8 — Analytics
Design:
- engagement
- reach
- growth
- content performance
- charts
- filters

## Phase 9 — Settings & Billing
Design:
- profile
- team
- notifications
- appearance
- billing
- plan cards
- invoices
- usage

## Phase 10 — Polish
Add:
- animations
- loading states
- empty states
- tooltips
- responsive behavior
- nice screenshots
- micro-interactions

---

# Product Pages

## Landing Page
The landing page should feel premium and conversion-focused.

### Hero
Do NOT build a basic centered hero.

Use a split or layered layout with:
- bold headline
- strong CTA
- social proof
- large product visual

### Required sections
- Navbar
- Hero
- Social proof
- Problem section
- Solution section
- Feature bento grid
- Product showcase
- Analytics showcase
- Workspace showcase
- Testimonials
- Pricing
- FAQ
- Final CTA
- Footer

### Hero Copy
Headline:
**Turn One Piece of Content Into 20+ Content Assets**

Subheadline:
Repurpose blogs, videos, newsletters, and social posts into LinkedIn posts, Twitter threads, newsletters, and short-form scripts.

Primary CTA:
**Start Free Trial**

Secondary CTA:
**Watch Demo**

### Landing Page Style
- expensive-looking
- high contrast
- excellent spacing
- premium motion
- realistic SaaS screenshots
- not a generic template

---

## Dashboard Overview
Show:
- posts generated
- views
- reach
- engagement
- workspaces
- charts
- weekly activity
- content performance
- insights

Use all demo data.

---

## AI Generator
Include:
- content input area
- format tabs
- LinkedIn post
- Twitter thread
- Newsletter
- Short-form video script
- static JSON output
- copy button
- regenerate button
- export button

No external APIs.

---

## Content Library
Include:
- 50+ demo content items
- search
- filters
- status tags
- category tags
- dates
- performance indicators
- realistic table UI

---

## Workspace Management
Include:
- workspace switcher
- workspace list
- team members
- roles
- permissions
- fake users
- recent activity

Examples:
- Personal Brand
- Growth Agency
- SaaS Startup

---

## Analytics
Include:
- engagement
- reach
- growth
- performance charts
- line chart
- bar chart
- area chart
- filters for time ranges

Use Recharts with static data.

---

## Settings & Billing
Include:
- profile
- team
- notifications
- appearance
- billing
- current plan
- invoices
- usage
- upgrade cards

No Stripe integration needed. UI only.

---

# Design System Specification

## Color System
Primary:
- Purple
- Blue

Suggested palette:
- #7C3AED
- #6366F1
- #3B82F6

Neutral:
- Light background
- Dark background
- soft borders
- muted text

## Typography
Use:
- Inter
or
- Geist

Typography must feel modern and clean.

## Spacing
Use an 8px spacing system.

## Radius
Use rounded corners that feel premium:
- cards: 16px
- buttons: 12px
- modals: 20px

## Shadows
Use soft, realistic shadows only.

## Components
Create reusable:
- navbar
- sidebar
- buttons
- cards
- tabs
- tables
- dropdowns
- modals
- alerts
- badges
- charts
- loading skeletons
- empty states

---

# Stitch-Specific Instruction

When designing in Stitch:

1. Start with the design system
2. Then design the landing page
3. Then design the dashboard
4. Then design all app pages
5. Keep everything visually consistent
6. Make the landing page more premium than a simple hero template
7. Use real SaaS storytelling
8. Make every section support the idea:
   Raw content -> AI processing -> multiple content outputs -> analytics -> growth

The landing page must not feel basic.

It must feel like a real startup landing page that could convert clients.

---

# Antigravity-Specific Instruction

When building in Antigravity:

1. Read this markdown file first
2. Extract all requirements
3. Build the architecture
4. Build reusable components
5. Use demo data only
6. Avoid unnecessary backend complexity
7. Focus on premium UI and clean UX
8. Make the dashboard feel like a real SaaS product
9. Improve polish until it feels portfolio-ready

Use this repository list only for inspiration:

- https://github.com/shadcn-ui/ui
- https://github.com/shadcn-ui/taxonomy
- https://github.com/leerob/next-saas-starter
- https://github.com/ixartz/SaaS-Boilerplate
- https://github.com/arhamkhnz/next-shadcn-admin-dashboard
- https://github.com/magicuidesign/magicui
- https://github.com/bytefer/awesome-shadcn-ui
- https://github.com/birobirobiro/awesome-shadcn-ui
- https://github.com/recharts/recharts
- https://github.com/motiondivision/motion
- https://github.com/antigravity-ai/antigravity-awesome-skills
- https://github.com/origin-space/originui
- https://github.com/ibelick/motion-primitives
- https://github.com/keenthemes/reui
- https://github.com/arihantcodes/spectrum-ui

Do not copy code blindly. Learn patterns and create a unique product.

---

# Quality Checklist

Every page should have:
- strong hierarchy
- good spacing
- responsive behavior
- loading states
- empty states
- hover states
- premium-looking cards
- clear CTA flow
- realistic content

The final result should look like a product that costs money and was designed by a real SaaS team.

---

# Final Output Goal

The final project should look like a premium AI SaaS portfolio case study and be good enough to present on:
- Fiverr
- Upwork
- LinkedIn
- Personal portfolio
- Product showcase pages
