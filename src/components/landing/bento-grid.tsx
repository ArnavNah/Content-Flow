"use client";

import { motion } from "framer-motion";
import { MessageSquare, Briefcase, Mail, FileVideo, Zap, Sparkles, TrendingUp } from "lucide-react";

export function FeatureBentoGrid() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">One input. Dozens of outputs.</h2>
          <p className="text-lg text-muted-foreground">
            Our AI analyzes your source content&apos;s tone and structure, then perfectly adapts it for every major platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Large main feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 row-span-2 rounded-2xl border border-border/50 bg-card p-8 flex flex-col justify-between overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Instant Repurposing Engine</h3>
              <p className="text-muted-foreground max-w-md">
                Paste a YouTube URL or a 2,000 word blog post. Our engine breaks it down into hooks, threads, and engaging social posts in seconds.
              </p>
            </div>
            
            <div className="mt-8 rounded-xl border border-border/50 bg-background p-4 shadow-sm relative">
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Auto-generated
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-muted rounded-full w-3/4" />
                    <div className="h-2 bg-muted/60 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-sky-500" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-muted rounded-full w-full" />
                    <div className="h-2 bg-muted/60 rounded-full w-4/5" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 bg-muted rounded-full w-2/3" />
                    <div className="h-2 bg-muted/60 rounded-full w-1/3" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col relative group overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <FileVideo className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Short-form Scripts</h3>
            <p className="text-sm text-muted-foreground">
              Turn dense articles into punchy 60-second TikTok or Reels scripts.
            </p>
          </motion.div>

          {/* Small feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border/50 bg-card p-6 flex flex-col relative group overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Virality Scoring</h3>
            <p className="text-sm text-muted-foreground">
              Predictive AI scores your generated hooks before you hit publish.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
