"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-card border border-border/50 rounded-3xl p-10 md:p-20 shadow-2xl shadow-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
              Ready to scale your content?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of creators and marketers who are saving 10+ hours a week repurposing content with ContentFlow AI.
            </p>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 px-10 rounded-full text-base shadow-xl shadow-primary/20"
              )}
            >
              Start your 14-day free trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
