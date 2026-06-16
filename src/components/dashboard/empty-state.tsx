"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onGenerate: () => void;
}

export function EmptyState({ onGenerate }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 bg-card border border-border/80 rounded-2xl shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] text-center max-w-xl mx-auto my-12"
    >
      <div className="bg-primary/10 p-4 rounded-full border border-primary/20 mb-6 relative animate-pulse">
        <Sparkles className="h-8 w-8 text-primary" />
        <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-card" />
      </div>

      <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
        No content yet
      </h3>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm">
        Start generating content to see analytics, pipeline workflows, audience reach, and performance data.
      </p>

      <Button 
        onClick={onGenerate}
        className="rounded-full shadow-md shadow-primary/20 h-11 px-6 text-sm font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 cursor-pointer"
      >
        Generate Content <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  );
}
