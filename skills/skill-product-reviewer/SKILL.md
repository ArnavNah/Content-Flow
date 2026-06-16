---
name: skill-product-reviewer
description: Systematic visual and UX quality reviewer to audit pages, layouts, and data features against top tools like Taplio and Typefully.
---

<objective>
Establish a high-standard, visual and usability review protocol for auditing features and UI screens. Ensure ContentFlow AI matches or exceeds the design quality, micro-interactions, and simplicity of Taplio and Typefully.
</objective>

<process>

1. **Conduct Page-by-Page Visual Audit**:
   - Check every page against the visual direction (e.g., Purple -> Blue gradient accent, dark canvas consistency).
   - **Spacing Check**: Verify elements are not crammed. Align vertical rhythm (e.g., `space-y-6` or `space-y-8`) and standard container widths.
   - **Contrast & Hierarchy**: Ensure titles are prominent, body text is readable (`text-neutral-300`/`text-neutral-400`), and secondary details are appropriately muted (`text-neutral-500`).

2. **Benchmark Against Taplio & Typefully**:
   - **LinkedIn/Twitter Post Formatting**: Taplio and Typefully emphasize a live preview box. Ensure the AI Generator output has a side-by-side or tabbed real-time preview showing exactly how the post will look on social feeds (avatar, name, handles, and line breaks).
   - **Analytics Comparison**: Taplio focuses heavily on simple, high-visibility engagement metrics. Verify that our analytics charts and KPI cards show core stats like "Impressions", "Clicks", and "Engagement Rate" clearly, without cluttering the UI.
   - **Content Scheduler / Queue**: Benchmark against Typefully's queue list. Ensure that list items representing scheduled posts show a clear timeline representation (time, date, brand logo, content snippet, and edit/delete actions).

3. **Verify Interactive & Feedback states**:
   - Every primary action should trigger a response (e.g., spinner, toast notification, button disable).
   - All charts must have clean hover tooltips.
   - Forms must show valid error messages.

</process>

<references>
- Awesome Cursorrules & Quality Guides: https://github.com/PatrickJS/awesome-cursorrules
- UI Components Reference: https://github.com/origin-space/originui
- Context Engineering guidelines: https://github.com/coleam00/context-engineering-intro
</references>

<notes>
- Never mark a review as passed if there are unstyled default input fields, raw border-black lines, or missing loading states.
- Prioritize mobile responsiveness; test that grids collapse into single columns and sidebars hide into hamburger triggers on mobile viewport widths.
</notes>
