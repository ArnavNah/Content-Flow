"use client";

import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for solo creators just getting started.",
    features: ["50 AI Generations / month", "3 Platform Formats", "Basic Analytics", "1 Workspace"],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "$79",
    description: "For professionals who need scale and growth.",
    features: ["Unlimited AI Generations", "All Platform Formats", "Advanced Virality Scoring", "Custom Tone Profiles", "Up to 3 Workspaces"],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Agency",
    price: "$199",
    description: "For teams managing multiple client brands.",
    features: ["Everything in Pro", "Unlimited Workspaces", "Team Collaboration", "API Access", "White-label Exports"],
    popular: false,
    cta: "Contact Sales"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">
            Start for free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl border p-8 flex flex-col ${
                plan.popular 
                ? "border-primary bg-primary/5 relative shadow-lg shadow-primary/10" 
                : "border-border/50 bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="text-muted-foreground font-medium">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-0.5 rounded-full">
                      <Check className="h-3 w-3 text-primary font-bold" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: plan.popular ? "default" : "outline" }),
                  "w-full rounded-full h-12 text-base font-semibold flex items-center justify-center"
                )}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
