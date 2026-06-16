---
name: skill-motion-designer
description: Framer Motion animation orchestration, micro-interactions, responsive page transitions, and hover spotlight effects.
---

<objective>
Equip the AI assistant with patterns to build dynamic, interactive, and fluid interfaces using Framer Motion. Keep animations natural, performance-optimized, and visually stunning.
</objective>

<process>

1. **Configure Fluid Spring Animation Physics**:
   - Avoid slow default transitions. Use responsive spring parameters:
     - **For standard UI shifts (hover/click)**: `type: "spring", stiffness: 400, damping: 30` (snappy, no bounce).
     - **For menu entrances or modal pops**: `type: "spring", stiffness: 300, damping: 20` (slight, premium bounce).
     - **For sliders/tabs**: `type: "spring", stiffness: 380, damping: 30`.

2. **Implement Premium Micro-Interactions**:
   - **Active Navigation Tabs**: Use Framer Motion's `layoutId` on a background element to create a smooth sliding bubble effect when transitioning between tabs:
     ```tsx
     <div className="relative">
       {isActive && (
         <motion.div layoutId="nav-pill" className="absolute inset-0 bg-neutral-800 rounded-md" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
       )}
       <span className="relative z-10">{label}</span>
     </div>
     ```
   - **Card Hover Effects**: Enhance grids with hover scale transitions (`whileHover={{ scale: 1.01 }}`) and subtle border highlight changes.

3. **Orchestrate Page & List Transitions**:
   - **Page Transitions**: Wrap components in `<AnimatePresence mode="wait">` to animate routes out before introducing new pages.
   - **Staggered Animations**: Use variant propagation to animate lists. The parent sets `staggerChildren`, and children animate in sequence:
     ```tsx
     const containerVariants = {
       hidden: { opacity: 0 },
       show: { opacity: 1, transition: { staggerChildren: 0.05 } }
     }
     const itemVariants = {
       hidden: { opacity: 0, y: 10 },
       show: { opacity: 1, y: 0 }
     }
     ```

4. **Build Custom Hover Spotlight Cards**:
   - Listen to `onMouseMove` events on a grid or card, calculate client coordinates (`clientX`, `clientY`), and update CSS variables (`--mouse-x`, `--mouse-y`) to power a radial gradient background spotlight that tracks the mouse.

</process>

<references>
- Motion Primitives: https://github.com/ibelick/motion-primitives
- Magic UI Animations: https://github.com/magicuidesign/magicui
- Aceternity Components: https://github.com/aceternity/ui
</references>

<notes>
- Always set `layout` or `layoutId` transitions to prevent layout shifts.
- Include `willChange: "transform"` or `transform-gpu` to offload animations to the GPU, preventing jitter.
- Avoid animating heavy layout properties like `height`, `width`, or `margin`; animate `scale`, `x`, `y`, and `opacity` for better performance.
</notes>
