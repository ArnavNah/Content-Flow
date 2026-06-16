"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  { 
    quote: "ContentFlow AI changed how we run our agency. What used to take a team of 3 days now takes me 15 minutes.", 
    author: "Sarah Jenkins", 
    role: "Founder, GrowthGen", 
    initials: "SJ" 
  },
  { 
    quote: "The virality scoring feature alone is worth 10x the price. Our LinkedIn reach has exploded since we started using this.", 
    author: "David Chen", 
    role: "Head of Marketing", 
    initials: "DC" 
  },
  { 
    quote: "Finally, a tool that actually understands tone of voice. It doesn't sound like a robot; it sounds like me on a really good day.", 
    author: "Elena Rodriguez", 
    role: "Creator", 
    initials: "ER" 
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by creators and founders</h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what teams are saying about ContentFlow AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border/50 bg-background p-8 flex flex-col justify-between shadow-sm relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
              <p className="text-lg mb-8 relative z-10 font-medium">"{t.quote}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
