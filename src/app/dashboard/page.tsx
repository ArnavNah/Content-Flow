"use client";

import { useState, useMemo } from "react";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { ContentMix } from "@/components/dashboard/content-mix";
import { ContentPipeline } from "@/components/dashboard/content-pipeline";
import { AISuggestions } from "@/components/dashboard/ai-suggestions";
import { RecentContent } from "@/components/dashboard/recent-content";
import { WorkspaceSnapshot } from "@/components/dashboard/workspace-snapshot";
import { WeeklyActivity } from "@/components/dashboard/weekly-activity";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Sparkles, 
  DownloadCloud, 
  Plus, 
  Layers,
  Sliders,
  CheckCircle,
  Clock,
  LayoutDashboard
} from "lucide-react";
import { 
  KPICardsSkeleton, 
  ChartsSkeleton, 
  ContentPipelineSkeleton, 
  AISuggestionsSkeleton, 
  RecentContentSkeleton, 
  WorkspaceSnapshotSkeleton 
} from "@/components/dashboard/skeletons";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspace } from "@/context/workspace-context";
import Link from "next/link";

type DashboardState = "normal" | "loading" | "empty";

export default function DashboardOverview() {
  const { activeWorkspace } = useWorkspace();
  const [dbState, setDbState] = useState<DashboardState>("normal");
  const [showControls, setShowControls] = useState(false);
  const greeting = useMemo(() => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good morning";
    if (hours >= 12 && hours < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  // Switch to normal state after clicking "Generate Content" in empty state
  const handleGenerateFromEmpty = () => {
    setDbState("loading");
    setTimeout(() => {
      setDbState("normal");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6 pb-12 relative min-h-screen">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border/60 rounded-2xl p-6 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-gradient-to-r from-card to-secondary/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{greeting} 👋</h1>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Welcome back to ContentFlow AI.</p>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 text-xs font-semibold text-muted-foreground mt-3 border border-border/40">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>Workspace:</span>
            <span className="text-foreground font-bold">{activeWorkspace.name}</span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/dashboard/generator"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full shadow-sm hover:shadow-md transition-all duration-200 h-10 px-5 text-xs font-bold shrink-0 cursor-pointer flex items-center justify-center"
            )}
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Generate Content
          </Link>

          <Button 
            variant="secondary" 
            className="rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary h-10 px-5 text-xs font-bold bg-card shrink-0 cursor-pointer"
          >
            <DownloadCloud className="mr-1.5 h-3.5 w-3.5" /> Import Content
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary h-10 px-5 text-xs font-bold bg-transparent shrink-0 cursor-pointer"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Create Workspace
          </Button>
        </div>
      </div>

      {/* Main Content Area based on Simulated State */}
      <AnimatePresence mode="wait">
        {dbState === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <KPICardsSkeleton />
            <ChartsSkeleton />
            <ContentPipelineSkeleton />
            <AISuggestionsSkeleton />
            <RecentContentSkeleton />
            <WorkspaceSnapshotSkeleton />
          </motion.div>
        )}

        {dbState === "empty" && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmptyState onGenerate={handleGenerateFromEmpty} />
          </motion.div>
        )}

        {dbState === "normal" && (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* KPI Cards (answering "How is it performing?") */}
            <div id="kpi-cards">
              <KPICards />
            </div>

            {/* Performance & Mix Section (answering "How is it performing?") */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <PerformanceChart />
              <div id="content-mix" className="h-full flex flex-col">
                <ContentMix />
              </div>
            </div>

            {/* Content Pipeline Section (answering "What content do I have?") */}
            <ContentPipeline />

            {/* AI Suggestions Section (answering "What should I create next?") */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-full flex flex-col" id="ai-suggestions">
                <AISuggestions />
              </div>
              <WorkspaceSnapshot />
            </div>

            {/* Weekly Consistency & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WeeklyActivity />
              <div className="lg:col-span-2 h-full flex flex-col">
                <RecentContent />
              </div>
            </div>

            {/* Quick Actions (answering "What should I create next?") */}
            <div id="quick-actions">
              <QuickActions />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating State Sim Controls Panel (Dev Feature) */}
      <div className="fixed bottom-20 right-6 md:bottom-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-card border border-border rounded-xl p-3.5 shadow-2xl flex flex-col gap-2 w-48 text-xs font-semibold"
            >
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Simulate Dashboard States</p>
              
              <button 
                onClick={() => { setDbState("normal"); setShowControls(false); }}
                className={`flex items-center gap-2 p-2 rounded-lg text-left transition-colors cursor-pointer ${dbState === 'normal' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Normal State</span>
              </button>

              <button 
                onClick={() => { setDbState("loading"); setShowControls(false); }}
                className={`flex items-center gap-2 p-2 rounded-lg text-left transition-colors cursor-pointer ${dbState === 'loading' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
              >
                <Clock className="h-4 w-4" />
                <span>Loading State</span>
              </button>

              <button 
                onClick={() => { setDbState("empty"); setShowControls(false); }}
                className={`flex items-center gap-2 p-2 rounded-lg text-left transition-colors cursor-pointer ${dbState === 'empty' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'}`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Empty State</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowControls(!showControls)}
          className="h-10 w-10 bg-primary hover:bg-primary/95 text-primary-foreground rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer border border-primary/20"
          title="Simulate dashboard states"
        >
          <Sliders className="h-4.5 w-4.5" />
        </button>
      </div>

    </div>
  );
}
