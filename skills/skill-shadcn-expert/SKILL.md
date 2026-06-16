---
name: skill-shadcn-expert
description: Advanced shadcn/ui component composition, accessible form handling (react-hook-form + zod), and WCAG accessibility standards.
---

<objective>
Equip the AI assistant with expert-level knowledge of shadcn/ui, Tailwind CSS composition, and accessibility guidelines to build production-grade, highly accessible interfaces.
</objective>

<process>

1. **Leverage shadcn/ui Composition Rules**:
   - **Component Composition**: Avoid passing giant config objects. Prefer compound components (e.g., `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`).
   - **Custom Class Merging**: Always use the `cn()` helper (which combines `clsx` and `tailwind-merge`) to merge defaults with user-supplied classes without collision:
     ```tsx
     import { cn } from "@/lib/utils"
     
     export const Button = React.forwardRef(({ className, ...props }, ref) => (
       <button className={cn("inline-flex items-center justify-center rounded-md text-sm", className)} ref={ref} {...props} />
     ))
     ```

2. **Build Highly Accessible Components (WCAG 2.2 AA)**:
   - **Focus States**: Ensure all interactive elements have highly visible focus-visible indicators (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
   - **Semantic Labels**: Add `aria-label` or `aria-describedby` when an interactive element does not contain text (e.g., button with only an icon).
   - **Keyboard Nav**: Check that all custom components support keyboard navigation (e.g., Enter/Space to select, Esc to close modals).

3. **Implement Robust Form Patterns**:
   - **Validation**: Use `react-hook-form` paired with `zod` for schema definition and client-side validation.
   - **Error Handling**: Use the `<FormMessage />` component from shadcn/ui to display error alerts contextually below inputs. Make sure errors are announced to screen readers by setting `aria-live="assertive"`.
   - **Visual States**: Disable inputs and display a loading spinner inside the submit button during submission.

</process>

<references>
- shadcn/ui Documentation: https://github.com/shadcn-ui/ui
- Awesome shadcn/ui Resources: https://github.com/bytefer/awesome-shadcn-ui
- Accessible Components: https://github.com/microsoft/generative-ai-for-beginners
- Tailwind Custom Inputs: https://github.com/origin-space/originui
</references>

<notes>
- Never overwrite default component code unnecessarily; customize components using Tailwind config classes (`tailwind.config.js`) and theme variables (`globals.css`).
- Maintain clean TypeScript typing for all custom elements, extending native HTML attributes whenever wrapping HTML tags.
</notes>
