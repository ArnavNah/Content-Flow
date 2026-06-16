---
name: skill-dashboard-designer
description: Expert guidelines for designing high-performance analytics dashboards, KPI cards, custom Recharts visualizations, and loading/empty states.
---

<objective>
Equip the AI assistant with patterns to build state-of-the-art SaaS analytics dashboards. Focus on rich data density, clean spacing, pixel-perfect charts, and solid user feedback flows (skeletons and empty states).
</objective>

<process>

1. **Design High-Impact KPI Cards**:
   - **Structure**: Title (muted, uppercase, small text), Main Metric (large, bold, high contrast), Trend (inline or bottom, e.g., "+12.3% this month" with green/red badge and arrow icon), and an optional mini-sparkline chart at the bottom or corner.
   - **Visual Finish**: Glassmorphism or solid dark background with a hover gradient border. Set height to `h-32` or similar to keep them uniform.

2. **Implement Sleek Recharts Visualizations**:
   - **Area Charts**: Use smooth curves (`type="monotone"`), subtle grid lines (`strokeDasharray="3 3"` with very low opacity e.g. `stroke="#1f2937"`), and a beautiful color gradient fill (`stopColor` with `stopOpacity={0.2}` and `stopOpacity={0}`).
   - **Bar Charts**: Use rounded bars (`radius={[4, 4, 0, 0]}`) and custom active states.
   - **Custom Tooltips**: Never use default Recharts tooltips. Build a custom HTML/React tooltip:
     ```tsx
     const CustomTooltip = ({ active, payload, label }) => {
       if (active && payload && payload.length) {
         return (
           <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-3 shadow-xl backdrop-blur-md">
             <p className="text-xs font-semibold text-neutral-400">{label}</p>
             <p className="text-sm font-bold text-white">{payload[0].value}</p>
           </div>
         );
       }
       return null;
     };
     ```
   - **Interactive Elements**: Use animations on mount and active dot highlights on hover.

3. **Incorporate Loading (Skeleton/Shimmer) States**:
   - **Skeleton Cards**: Use a pulse animation (`animate-pulse`) with gray placeholders (`bg-neutral-800`) matching the exact layout of the real KPI/chart cards.
   - **Shimmer Overlay**: For tables, show a loading row structure with different width skeletons for text and circular skeletons for avatars.

4. **Design Engaging Empty States**:
   - **Elements**: A simple, abstract vector/icon (e.g., folder with plus sign, blurred dot outline), a clear header ("No content generated yet"), a helpful description ("Paste a blog post above to start generating social assets"), and a primary CTA button ("Create New Asset").

</process>

<references>
- Vercel Analytics Design: https://github.com/vercel/next.js
- Next.js Dashboard Templates: https://github.com/continuedev/continue
- Origin UI Forms: https://github.com/origin-space/originui
</references>

<notes>
- All analytics data should come from modular, local JSON mock files to prevent performance issues and simplify deployment.
- Never let charts overflow their parent containers; always wrap them in a `<ResponsiveContainer width="100%" height={...}>`.
- Set precise chart margins to avoid cut-off labels (`margin={{ top: 10, right: 10, left: -20, bottom: 0 }}`).
</notes>
