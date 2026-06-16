---
name: skill-saas-ui-designer
description: Expert guidelines for building premium, portfolio-grade SaaS interfaces (landing pages, pricing pages, dashboard layout) inspired by Linear, Stripe, and Vercel.
---

<objective>
Equip the AI assistant with expert SaaS visual design principles to produce highly polished, premium, and visual-first landing pages, pricing grids, and dashboard layouts that mimic a $10k+ custom build.
</objective>

<process>

1. **Establish a Sleek Color Palette & Contrast**:
   - **Dark Mode (Default/Premium)**: Avoid pure black (`#000000`). Use rich dark slates/grays (`#0b0f19`, `#030712`) as the main canvas.
   - **Borders & Gradients**: Use extremely subtle borders (`border-neutral-800` or HSL-based border overlays) to create clean separation.
   - **Accents**: Use high-quality gradient glows (e.g., Violet-to-Blue or Indigo-to-Emerald) for key highlights, hover states, and primary CTAs.
   - **Glows/Radial Gradients**: Place absolute-positioned radial gradients (`bg-radial-gradient`) in the background of hero sections to simulate a light source reflecting behind cards.

2. **Structure Landing Pages (Linear & Vercel Style)**:
   - **Hero Section**: Large, readable typography (e.g., Font: Inter/Outfit) with bold headings, a clear value-oriented subheading, and a dual-button CTA structure (e.g., high-contrast primary button + ghost outline button with a subtle chevron).
   - **Feature Grid**: A bento-grid layout combining large card highlights with small technical cards. Ensure each card has a custom hover effect (e.g., border color shift, subtle scale, glow spotlight).
   - **Pricing Sections**: Compare Starter, Pro, and Agency tiers. Highlight the "Pro" tier using a glowing border gradient, a badge like "Most Popular", and Framer Motion spring transitions.

3. **Master Dashboard Layouts (Hub-and-Spoke Navigation)**:
   - **Sidebar Navigation**: Fixed left-side layout, collapsible on mobile. Include workspaces switcher, links with custom SVG icons (using Lucide), and active states featuring a subtle highlight background and left-side indicator border.
   - **Global Header**: Sticky top header with search box, workspace name, user profile dropdown, and a theme switcher (Dark/Light mode).
   - **Content Canvas**: Centered grid structure with standard responsive paddings (`px-4 sm:px-6 md:px-8`).

</process>

<references>
- Vercel UI Design: https://github.com/vercel/next.js
- Magic UI Components: https://github.com/magicuidesign/magicui
- Aceternity UI Layouts: https://github.com/aceternity/ui
- Origin UI Inputs: https://github.com/origin-space/originui
- Cursor Rules & Best Practices: https://github.com/PatrickJS/awesome-cursorrules
</references>

<notes>
- Never use raw default colors (e.g., plain `bg-blue-500` or `text-red-500`). Use refined colors (`bg-indigo-600`, `text-rose-500`).
- Always implement absolute spacing discipline (use Tailwind values like `space-y-6`, `p-6` or `gap-6` consistently).
- Use glassmorphism overlays: `bg-white/5 backdrop-blur-md border border-white/10`.
</notes>
