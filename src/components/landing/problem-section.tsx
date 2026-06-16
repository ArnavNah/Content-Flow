"use client";

import { motion } from "framer-motion";

export function ProblemSection() {
  return (
    <section className="py-24 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Creating content is exhausting.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You know you need to be posting daily across LinkedIn, Twitter, and your newsletter. But who has the time?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-card border border-border/50 text-left shadow-sm hover:shadow-md transition-shadow"
          >
             <div className="text-4xl mb-6 bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">😰</div>
             <h3 className="text-xl font-bold mb-3">The Blank Page</h3>
             <p className="text-muted-foreground leading-relaxed">You spend hours staring at a blank screen trying to format a thread that actually gets engagement.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-card border border-border/50 text-left shadow-sm hover:shadow-md transition-shadow"
          >
             <div className="text-4xl mb-6 bg-orange-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">📉</div>
             <h3 className="text-xl font-bold mb-3">Zero Reach</h3>
             <p className="text-muted-foreground leading-relaxed">You write an amazing 2,000 word blog post, but nobody clicks the plain link when you share it.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl bg-card border border-border/50 text-left shadow-sm hover:shadow-md transition-shadow"
          >
             <div className="text-4xl mb-6 bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">⏳</div>
             <h3 className="text-xl font-bold mb-3">No Time</h3>
             <p className="text-muted-foreground leading-relaxed">You want to be omni-channel to grow your personal brand, but you're a team of one with a business to run.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
