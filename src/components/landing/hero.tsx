"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Sparkles, PlayCircle, Layers, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-8"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>ContentFlow AI 2.0</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tighter text-foreground leading-[1.05] mb-6"
            >
              Turn One Piece of Content Into 20+ Assets
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
            >
              Repurpose blogs, videos, newsletters, and social posts into LinkedIn posts, Twitter threads, newsletters, and short-form scripts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full"
            >
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-14 px-8 rounded-full text-base w-full sm:w-auto shadow-xl shadow-primary/20"
                )}
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="#demo"
                className={cn(
                  buttonVariants({ size: "lg", variant: "secondary" }),
                  "h-14 px-8 text-base w-full sm:w-auto bg-card border border-border text-foreground hover:bg-muted"
                )}
              >
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-sm text-muted-foreground font-medium"
            >
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4 text-primary" /> No credit card required
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4 text-primary" /> 14-day free trial
               </div>
            </motion.div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-7 relative mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-[24px] bg-card border border-border shadow-[0_20px_60px_-15px_rgba(30,30,30,0.05)] overflow-hidden"
            >
              {/* App UI Mockup */}
              <div className="flex flex-col h-full bg-background">
                {/* Header Mockup */}
                <div className="h-14 border-b border-border flex items-center px-6 gap-4 bg-card">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="h-6 w-48 bg-muted rounded-md ml-4" />
                </div>
                {/* Content Mockup */}
                <div className="flex-1 p-8 flex gap-6">
                  <div className="w-1/3 space-y-4">
                    <div className="h-8 w-3/4 bg-border rounded-md" />
                    <div className="h-32 w-full bg-card border border-border shadow-sm rounded-xl p-4 flex flex-col gap-2">
                       <div className="h-4 w-full bg-muted rounded-sm" />
                       <div className="h-4 w-5/6 bg-muted rounded-sm" />
                       <div className="h-4 w-4/6 bg-muted rounded-sm" />
                    </div>
                  </div>
                  <div className="w-2/3 space-y-4">
                    <div className="h-8 w-1/2 bg-border rounded-md" />
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-24 w-full bg-primary/5 border border-primary/20 rounded-xl" />
                       <div className="h-24 w-full bg-card border border-border rounded-xl shadow-sm" />
                       <div className="h-24 w-full bg-card border border-border rounded-xl shadow-sm" />
                       <div className="h-24 w-full bg-card border border-border rounded-xl shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 sm:-left-12 bg-card border border-border rounded-2xl p-4 shadow-[0_15px_40px_-10px_rgba(30,30,30,0.08)] flex items-center gap-4 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xl">
                +24
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Assets Generated</div>
                <div className="text-xs text-muted-foreground">From a single YouTube video</div>
              </div>
            </motion.div>
            
            {/* Floating Element 2 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 sm:-right-8 bg-card border border-border rounded-2xl p-4 shadow-[0_15px_40px_-10px_rgba(30,30,30,0.08)] flex items-center gap-3 z-10"
            >
              <Sparkles className="h-5 w-5 text-primary" />
              <div className="text-sm font-medium text-foreground">AI Processing Complete</div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
