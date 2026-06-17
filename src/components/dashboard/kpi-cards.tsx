"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, Users, BarChart3, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/workspace-context";

export function KPICards() {
  const { activeWorkspace, kpis } = useWorkspace();

  const formatReach = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
    return val.toString();
  };

  const cardsData = [
    {
      title: "Content Assets",
      value: kpis.assets.toLocaleString(),
      change: activeWorkspace.id === "personal" ? "+12%" : activeWorkspace.id === "agency" ? "+24%" : "+8%",
      trend: "up",
      description: "Assets created this month",
      icon: FileText,
      color: "emerald",
      sparkline: [20, 24, 22, 28, 30, 26, 32]
    },
    {
      title: "Total Reach",
      value: formatReach(kpis.reach),
      change: activeWorkspace.id === "personal" ? "+18%" : activeWorkspace.id === "agency" ? "+31%" : "+14%",
      trend: "up",
      description: "Audience reached across channels",
      icon: Users,
      color: "blue",
      sparkline: [15, 18, 17, 21, 24, 22, 28]
    },
    {
      title: "Engagement Rate",
      value: `${kpis.engagement.toFixed(1)}%`,
      change: activeWorkspace.id === "personal" ? "+1.2%" : activeWorkspace.id === "agency" ? "-0.4%" : "+1.8%",
      trend: activeWorkspace.id === "agency" ? "down" : "up",
      description: "Average engagement across content",
      icon: BarChart3,
      color: "indigo",
      sparkline: [6.5, 7.0, 7.2, 7.8, 8.0, 8.2, 8.4]
    },
    {
      title: "Saved Drafts",
      value: kpis.drafts.toString(),
      change: null,
      trend: "neutral",
      description: "Draft content waiting for review",
      icon: Edit3,
      color: "amber",
      sparkline: [30, 32, 29, 34, 35, 36, 37]
    }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((kpi, i) => {
        const isUp = kpi.trend === "up";
        
        // Define color styles
        const bgOpacity = kpi.color === "emerald" ? "bg-emerald-500/10 text-emerald-600" :
                           kpi.color === "blue" ? "bg-blue-500/10 text-blue-600" :
                           kpi.color === "indigo" ? "bg-indigo-500/10 text-indigo-600" :
                           "bg-amber-500/10 text-amber-600";
        
        const sparklineColor = kpi.color === "emerald" ? "#10b981" :
                               kpi.color === "blue" ? "#3b82f6" :
                               kpi.color === "indigo" ? "#6366f1" :
                               "#f59e0b";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group h-full"
          >
            <Card className="h-full border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] transition-all duration-300 hover:shadow-[0_15px_45px_-15px_rgba(30,30,30,0.06)] bg-card overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {kpi.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${bgOpacity} transition-transform duration-300 group-hover:scale-110`}>
                  <kpi.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{kpi.value}</span>
                  {kpi.change && (
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isUp ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                    }`}>
                      {isUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                      {kpi.change}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/30">
                  <p className="text-[11px] text-muted-foreground leading-normal max-w-[140px]">
                    {kpi.description}
                  </p>
                  
                  {/* Small Visual Indicator: Sparkline SVG */}
                  <div className="h-6 w-16">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 60 20">
                      <polyline
                        fill="none"
                        stroke={sparklineColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={kpi.sparkline
                          .map((val, idx) => {
                            const max = Math.max(...kpi.sparkline);
                            const min = Math.min(...kpi.sparkline);
                            const range = max - min || 1;
                            const x = (idx / (kpi.sparkline.length - 1)) * 60;
                            const y = 18 - ((val - min) / range) * 16;
                            return `${x},${y}`;
                          })
                          .join(" ")}
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

