"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, LayoutTemplate, Send } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-6 w-6 text-primary" />,
    title: "1. Upload Source Material",
    description: "Paste a YouTube link, upload a podcast audio file, or drop in a 2,000-word blog post. We handle any format."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "2. AI Analysis & Extraction",
    description: "Our custom models analyze the tone, extract key insights, and identify the most engaging hooks from your content."
  },
  {
    icon: <LayoutTemplate className="h-6 w-6 text-primary" />,
    title: "3. Platform-Native Generation",
    description: "Select the platforms you want to target. We automatically generate Twitter threads, LinkedIn carousels, and newsletters."
  },
  {
    icon: <Send className="h-6 w-6 text-primary" />,
    title: "4. Review & Publish",
    description: "Make quick edits in our collaborative editor, approve the final drafts, and export them directly to your scheduler."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <p className="font-eyebrow text-xs uppercase tracking-widest text-primary mb-4">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">From one to many in minutes.</h2>
          <p className="text-lg text-muted-foreground">
            A streamlined workflow designed for editorial teams and solo creators. No more copying and pasting between ChatGPT windows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border/50 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center mb-8 relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
