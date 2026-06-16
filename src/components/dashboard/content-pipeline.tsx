"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtSign, Mail, Play, Plus, MoreHorizontal, Calendar, Eye } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const pipelineData = {
  ideas: {
    title: "Ideas",
    count: 24,
    color: "border-t-amber-500",
    badgeColor: "bg-amber-500/10 text-amber-600",
    items: [
      { id: 1, title: "Top 5 AI tools we use daily", platform: "LinkedIn", icon: LinkedinIcon, tag: "Inspiration", date: "Jun 20", members: ["JD", "AS"] },
      { id: 2, title: "Why bootstrapping is the new VC", platform: "Threads", icon: AtSign, tag: "Opinion", date: "Jun 22", members: ["JD"] },
      { id: 3, title: "ContentFlow AI product roadshow", platform: "Video Script", icon: Play, tag: "Product", date: "Jun 25", members: ["AS", "KL"] }
    ]
  },
  drafts: {
    title: "Drafts",
    count: 12,
    color: "border-t-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-600",
    items: [
      { id: 4, title: "Scaling from 0 to 10k subscribers", platform: "Newsletter", icon: Mail, tag: "Case Study", date: "Jun 18", members: ["JD", "KL"] },
      { id: 5, title: "How we designed our billing system", platform: "LinkedIn", icon: LinkedinIcon, tag: "Engineering", date: "Jun 19", members: ["KL"] }
    ]
  },
  review: {
    title: "In Review",
    count: 7,
    color: "border-t-indigo-500",
    badgeColor: "bg-indigo-500/10 text-indigo-600",
    items: [
      { id: 6, title: "5 copywriting rules for landing pages", platform: "Threads", icon: AtSign, tag: "Marketing", date: "Jun 17", members: ["AS"] }
    ]
  },
  published: {
    title: "Published",
    count: 43,
    color: "border-t-emerald-500",
    badgeColor: "bg-emerald-500/10 text-emerald-600",
    items: [
      { id: 7, title: "Building a SaaS in public: Week 1", platform: "LinkedIn", icon: LinkedinIcon, tag: "Storytelling", date: "Published Today", members: ["JD", "AS", "KL"], views: "12.3K Reach" },
      { id: 8, title: "Stop writing boring subject lines", platform: "Newsletter", icon: Mail, tag: "Tips", date: "Published Jun 14", members: ["JD"], views: "8.4K Opens" }
    ]
  }
};

export function ContentPipeline() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-base font-bold text-foreground">Content Pipeline</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Notion-inspired workflow tracking asset lifecycle</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-card hover:bg-secondary/40 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>New Group</span>
        </button>
      </div>

      {/* Grid of columns - stacks on mobile, horizontal on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(pipelineData).map(([key, column], colIdx) => (
          <div key={key} className="flex flex-col gap-3">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2.5 py-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{column.title}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${column.badgeColor}`}>
                  {column.count}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-secondary/60 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <button className="p-1 hover:bg-secondary/60 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Column Content Area */}
            <div className="bg-secondary/20 border-dashed border border-border/80 rounded-xl p-3 flex-1 flex flex-col gap-3 min-h-[300px]">
              {column.items.map((item, itemIdx) => {
                const PlatformIcon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (colIdx * 0.1) + (itemIdx * 0.05) }}
                    whileHover={{ y: -2 }}
                    className="cursor-pointer"
                  >
                    <Card className={`border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)] transition-all duration-200 hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] border-t-2 ${column.color} bg-card rounded-lg`}>
                      <CardContent className="p-4 space-y-3.5">
                        <div className="flex justify-between items-start gap-2">
                          {/* Platform Badge */}
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-semibold text-muted-foreground">
                            <PlatformIcon className="h-3 w-3 shrink-0" />
                            <span>{item.platform}</span>
                          </div>
                          
                          {/* Custom Category Tag */}
                          <Badge variant="outline" className="text-[9px] font-semibold tracking-wider text-muted-foreground border-border/80 px-1.5 py-0">
                            {item.tag}
                          </Badge>
                        </div>

                        {/* Title */}
                        <p className="text-xs font-bold leading-normal text-foreground line-clamp-2">
                          {item.title}
                        </p>

                        {/* Bottom Row: Avatars & Metas */}
                        <div className="flex items-center justify-between pt-1 border-t border-border/20 text-[10px] text-muted-foreground font-semibold">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{item.date}</span>
                          </div>

                          {/* Published Specific Reach */}
                          {"views" in item && (
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/5 px-1.5 py-0.5 rounded">
                              <Eye className="h-3 w-3" />
                              <span>{item.views}</span>
                            </div>
                          )}

                          {/* Avatars */}
                          {!("views" in item) && (
                            <div className="flex -space-x-1.5">
                              {item.members.map((initial, avIdx) => (
                                <Avatar key={avIdx} className="h-5.5 w-5.5 border-2 border-card">
                                  <AvatarFallback className="bg-primary/5 text-primary text-[8px] font-black">{initial}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
              {/* Empty Column Filler */}
              {column.items.length === 0 && (
                <div className="flex-1 flex items-center justify-center py-12 text-[11px] text-muted-foreground font-medium">
                  Drop cards here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
