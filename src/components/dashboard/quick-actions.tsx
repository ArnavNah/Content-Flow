"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AtSign, Mail, Plus, ArrowRight, DownloadCloud, Sparkles } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { motion } from "framer-motion";

const actions = [
  {
    title: "Generate LinkedIn Post",
    description: "Convert ideas or blogs into high-authority post drafts",
    icon: LinkedinIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    hoverBg: "hover:border-emerald-500/30 hover:bg-emerald-500/[0.01]",
    actionText: "Generate"
  },
  {
    title: "Generate Twitter Thread",
    description: "Repurpose long-form writing into punchy threads",
    icon: AtSign,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    hoverBg: "hover:border-blue-500/30 hover:bg-blue-500/[0.01]",
    actionText: "Generate"
  },
  {
    title: "Generate Newsletter",
    description: "Write styled, structured weekly email recaps",
    icon: Mail,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
    hoverBg: "hover:border-orange-500/30 hover:bg-orange-500/[0.01]",
    actionText: "Generate"
  },
  {
    title: "Create Workspace",
    description: "Establish a new brand space for team collaboration",
    icon: Plus,
    color: "text-indigo-600",
    bg: "bg-indigo-500/10",
    hoverBg: "hover:border-indigo-500/30 hover:bg-indigo-500/[0.01]",
    actionText: "Create"
  },
  {
    title: "Import Content",
    description: "Ingest external PDFs, YouTube URLs, or blogs",
    icon: DownloadCloud,
    color: "text-foreground",
    bg: "bg-secondary",
    hoverBg: "hover:border-border hover:bg-secondary/40",
    actionText: "Import"
  }
];

export function QuickActions() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
          <Sparkles className="h-4.5 w-4.5 text-primary" />
          <span>Quick Actions</span>
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">Rapid creation tools and workspace shortcuts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="cursor-pointer"
            >
              <Card className={`h-full border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.03)] bg-card rounded-xl overflow-hidden flex flex-col justify-between ${act.hoverBg} group`}>
                <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                  <div className="space-y-3.5">
                    {/* Floating Icon */}
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${act.bg} ${act.color} transition-transform duration-300 group-hover:scale-105`}>
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                    </div>
                    
                    {/* Meta */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold leading-snug text-foreground">
                        {act.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground leading-normal line-clamp-2">
                        {act.description}
                      </p>
                    </div>
                  </div>

                  {/* Inline Arrow Indicator */}
                  <div className="flex items-center gap-1 text-[10px] font-bold text-primary group-hover:underline mt-auto pt-2 border-t border-border/10">
                    <span>{act.actionText}</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
