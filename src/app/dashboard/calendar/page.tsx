"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useWorkspace } from "@/context/workspace-context";
import { MockContentAsset } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Clock, 
  X, 
  Trash2, 
  Edit3, 
  Check, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  AlertCircle,
  AtSign,
  Mail,
  Play,
  FileText,
  User,
  CalendarDays
} from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ContentCalendarPage() {
  const { 
    assets, 
    activeWorkspace, 
    workspaces,
    updateAsset, 
    deleteAsset, 
    addAsset,
    addNotification
  } = useWorkspace();

  // View Mode: month, week, agenda
  const [viewMode, setViewMode] = useState<"month" | "week" | "agenda">("month");
  
  // Date Reference: defaults to current date (anchored in mid-June 2026 for mock consistency)
  const [currentDate, setCurrentDate] = useState<Date>(new Date("2026-06-18T12:00:00Z"));

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [workspaceFilter, setWorkspaceFilter] = useState<string>("current"); // "current" or "all"

  // Quick Action / Modal States
  const [selectedAsset, setSelectedAsset] = useState<MockContentAsset | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [prefilledDate, setPrefilledDate] = useState<string>("");

  // Edit / Create Form States
  const [formTitle, setFormTitle] = useState("");
  const [formPlatform, setFormPlatform] = useState<MockContentAsset["type"]>("LinkedIn Post");
  const [formStatus, setFormStatus] = useState<MockContentAsset["status"]>("Draft");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("09:00");

  // Dragging state tracking for styling feedback
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [draggedAssetId, setDraggedAssetId] = useState<number | null>(null);

  // Syncing currentDate view range string
  const viewRangeLabel = useMemo(() => {
    if (viewMode === "month") {
      return currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    } else if (viewMode === "week") {
      const start = new Date(currentDate);
      const day = start.getDay();
      start.setDate(start.getDate() - day); // Start of week (Sunday)
      const end = new Date(start);
      end.setDate(end.getDate() + 6); // End of week (Saturday)
      
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString("en-US", { month: "long" })} ${start.getFullYear()}`;
      }
      return `${start.toLocaleDateString("en-US", { month: "short" })} - ${end.toLocaleDateString("en-US", { month: "short" })} ${end.getFullYear()}`;
    } else {
      return "Agenda Timeline";
    }
  }, [viewMode, currentDate]);

  // Adjust Date Range
  const handleNavigate = (direction: "prev" | "today" | "next") => {
    if (direction === "today") {
      setCurrentDate(new Date("2026-06-18T12:00:00Z"));
      return;
    }

    const offset = direction === "prev" ? -1 : 1;
    setCurrentDate(prev => {
      const next = new Date(prev);
      if (viewMode === "month") {
        next.setMonth(next.getMonth() + offset);
      } else {
        next.setDate(next.getDate() + (offset * 7));
      }
      return next;
    });
  };

  // Filter and workspace checks
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      // Workspace filter
      if (workspaceFilter === "current" && asset.workspaceId !== activeWorkspace.id) {
        return false;
      }
      
      // Search term
      if (searchTerm && !asset.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Platform filter
      if (platformFilter !== "all") {
        const mappedType = 
          platformFilter === "linkedin" ? "LinkedIn Post" :
          platformFilter === "twitter" ? "Twitter Thread" :
          platformFilter === "newsletter" ? "Newsletter" :
          platformFilter === "video" ? "Video Script" : "";
        if (asset.type !== mappedType) return false;
      }

      // Status filter
      if (statusFilter !== "all" && asset.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [assets, activeWorkspace.id, searchTerm, platformFilter, statusFilter, workspaceFilter]);

  // Split assets: Scheduled (for grid/views) vs Unscheduled (for sidebar publishing queue)
  const scheduledAssets = useMemo(() => {
    return filteredAssets.filter(a => a.status === "Scheduled" || a.status === "Published" || a.date);
  }, [filteredAssets]);

  const unscheduledQueue = useMemo(() => {
    // Unscheduled assets are Ideas, Drafts, or Reviews that don't have a specific scheduled date (or are marked Draft/Review/Idea)
    // For visual ease, we filter assets in active workspace with status != "Scheduled" & != "Published"
    return assets.filter(a => a.workspaceId === activeWorkspace.id && (a.status === "Idea" || a.status === "Draft" || a.status === "Review"));
  }, [assets, activeWorkspace.id]);

  // Upcoming Scheduled Assets (Next 7 Days from mock date June 18)
  const upcomingAssets = useMemo(() => {
    const start = new Date("2026-06-18T00:00:00.000Z");
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    return assets
      .filter(a => {
        if (a.workspaceId !== activeWorkspace.id) return false;
        if (a.status !== "Scheduled") return false;
        const d = new Date(a.date);
        return d >= start && d <= end;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [assets, activeWorkspace.id]);

  // Generate 35/42 days grid for Month view
  const monthDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill 42 cells (6 weeks)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  // Generate 7 days for Week view
  const weekDays = useMemo(() => {
    const days = [];
    const start = new Date(currentDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day); // Anchor at Sunday

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  }, [currentDate]);

  // Group scheduled assets by date key ("YYYY-MM-DD")
  const assetsByDate = useMemo(() => {
    const groups: Record<string, MockContentAsset[]> = {};
    scheduledAssets.forEach(asset => {
      try {
        const key = new Date(asset.date).toISOString().split("T")[0];
        if (!groups[key]) groups[key] = [];
        groups[key].push(asset);
      } catch (e) {
        console.error(e);
      }
    });
    return groups;
  }, [scheduledAssets]);

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, assetId: number) => {
    e.dataTransfer.setData("text/plain", assetId.toString());
    e.dataTransfer.effectAllowed = "move";
    setDraggedAssetId(assetId);
  };

  const handleDragEnd = () => {
    setDraggedAssetId(null);
    setDragOverDate(null);
  };

  const handleDragOver = (e: React.DragEvent, dateKey: string) => {
    e.preventDefault();
    if (dragOverDate !== dateKey) {
      setDragOverDate(dateKey);
    }
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    setDragOverDate(null);
    const idStr = e.dataTransfer.getData("text/plain");
    if (!idStr) return;
    
    const assetId = parseInt(idStr, 10);
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    if (asset.status === "Published") {
      addNotification("Cannot reschedule a published asset", "warning");
      return;
    }

    // Preserve hour/minute of original asset if present, otherwise default to 9:00 AM
    const newDate = new Date(date);
    try {
      const origDate = new Date(asset.date);
      newDate.setHours(origDate.getHours() || 9);
      newDate.setMinutes(origDate.getMinutes() || 0);
      newDate.setSeconds(0);
    } catch {
      newDate.setHours(9);
      newDate.setMinutes(0);
      newDate.setSeconds(0);
    }

    // Update the asset date and set status to Scheduled
    const nextStatus = asset.status === "Idea" || asset.status === "Draft" || asset.status === "Review" 
      ? "Scheduled" 
      : asset.status;
      
    updateAsset(assetId, { 
      date: newDate.toISOString(), 
      status: nextStatus,
      performance: nextStatus === "Scheduled" ? "Scheduled" : asset.performance
    });
    
    addNotification(`Rescheduled "${asset.title.slice(0, 25)}..." to ${newDate.toLocaleDateString()}`, "success");
  };

  // Optimize Schedule: spreading out drafts in queue starting tomorrow
  const optimizeSchedule = () => {
    const drafts = assets.filter(a => a.workspaceId === activeWorkspace.id && a.status === "Draft");
    if (drafts.length === 0) {
      addNotification("No draft assets in queue to optimize schedule", "info");
      return;
    }

    const start = new Date();
    start.setDate(start.getDate() + 1); // Start tomorrow
    
    drafts.forEach((draft, idx) => {
      const targetDate = new Date(start);
      targetDate.setDate(targetDate.getDate() + idx);
      targetDate.setHours(9, 0, 0, 0); // 9:00 AM

      updateAsset(draft.id, {
        date: targetDate.toISOString(),
        status: "Scheduled",
        performance: "Scheduled"
      });
    });

    addNotification(`Optimized scheduling: scheduled ${drafts.length} drafts starting tomorrow.`, "success");
  };

  // Open Edit Dialog
  const openEditModal = (asset: MockContentAsset) => {
    setSelectedAsset(asset);
    setFormTitle(asset.title);
    setFormPlatform(asset.type);
    setFormStatus(asset.status);
    
    try {
      const d = new Date(asset.date);
      setFormDate(d.toISOString().split("T")[0]);
      setFormTime(d.toTimeString().split(" ")[0].slice(0, 5));
    } catch {
      setFormDate(new Date().toISOString().split("T")[0]);
      setFormTime("09:00");
    }
    
    setIsEditModalOpen(true);
  };

  // Open Create Dialog
  const openCreateModal = (dateStr?: string) => {
    setFormTitle("");
    setFormPlatform("LinkedIn Post");
    setFormStatus("Scheduled");
    setFormTime("09:00");
    
    if (dateStr) {
      setFormDate(dateStr);
    } else {
      setFormDate(new Date().toISOString().split("T")[0]);
    }
    
    setIsCreateModalOpen(true);
  };

  // Submit Edit Form
  const saveAssetEdits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    const combinedDate = new Date(`${formDate}T${formTime}:00`);
    
    const performanceLabel = formStatus === "Published" 
      ? "1.5K Reach" 
      : formStatus === "Scheduled" 
      ? "Scheduled" 
      : formStatus === "Review" 
      ? "Review" 
      : "Draft";

    updateAsset(selectedAsset.id, {
      title: formTitle,
      type: formPlatform,
      status: formStatus,
      date: combinedDate.toISOString(),
      performance: performanceLabel
    });

    setIsEditModalOpen(false);
    setSelectedAsset(null);
  };

  // Submit Create Form
  const createNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const combinedDate = new Date(`${formDate}T${formTime}:00`);
    
    // Add to context (which handles saving to localStorage and notifying)
    const asset = addAsset(
      formTitle.trim(),
      formPlatform,
      formStatus === "Scheduled" ? "Scheduled" : formStatus,
      0
    );

    // Update with correct date & status (addAsset defaults to Draft and current date)
    updateAsset(asset.id, {
      date: combinedDate.toISOString(),
      status: formStatus,
      performance: formStatus === "Scheduled" ? "Scheduled" : formStatus === "Published" ? "1.2K Reach" : asset.performance
    });

    setIsCreateModalOpen(false);
    setFormTitle("");
  };

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case "LinkedIn Post": return LinkedinIcon;
      case "Twitter Thread": return AtSign;
      case "Newsletter": return Mail;
      case "Video Script": return Play;
      default: return FileText;
    }
  };

  const getPlatformColors = (type: string) => {
    switch (type) {
      case "LinkedIn Post": 
        return "text-emerald-600 bg-emerald-500/5 border-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/5 dark:border-emerald-500/20";
      case "Twitter Thread": 
        return "text-sky-500 bg-sky-500/5 border-sky-500/10 dark:text-sky-400 dark:bg-sky-500/5 dark:border-sky-500/20";
      case "Newsletter": 
        return "text-orange-500 bg-orange-500/5 border-orange-500/10 dark:text-orange-400 dark:bg-orange-500/5 dark:border-orange-500/20";
      case "Video Script": 
        return "text-purple-500 bg-purple-500/5 border-purple-500/10 dark:text-purple-400 dark:bg-purple-500/5 dark:border-purple-500/20";
      default: 
        return "text-muted-foreground bg-muted/5 border-muted/10";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Published": 
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Scheduled": 
        return "bg-primary/10 text-primary border-primary/20";
      case "Review": 
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "Idea": 
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default: 
        return "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20";
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 relative">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
            <CalendarIcon className="h-7 w-7 text-primary" />
            <span>Content Planner</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Drag, drop, and schedule your multi-platform content assets.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented View Mode Toggle */}
          <div className="flex bg-secondary p-0.5 rounded-lg border border-border/40 h-9 items-center shrink-0">
            {(["month", "week", "agenda"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-3 h-8 text-[11px] font-bold rounded-md transition-all cursor-pointer border-0 capitalize",
                  viewMode === mode 
                    ? "bg-card text-foreground shadow-sm font-black border border-border/20" 
                    : "text-muted-foreground hover:text-foreground bg-transparent"
                )}
              >
                {mode} View
              </button>
            ))}
          </div>

          <Button 
            onClick={() => openCreateModal()} 
            className="h-9 text-xs font-bold rounded-xl cursor-pointer bg-primary"
          >
            <Plus className="mr-1.5 h-4 w-4" /> Quick Schedule
          </Button>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="flex flex-wrap items-center gap-3 bg-card border border-border/60 rounded-xl p-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search planning board..." 
            className="pl-10 w-full bg-secondary/30 border-border/80 h-9 text-xs rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Workspace Context Switcher in Calendar */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Workspace</span>
          <select 
            value={workspaceFilter} 
            onChange={(e) => setWorkspaceFilter(e.target.value)}
            className="text-xs font-semibold bg-secondary/30 hover:bg-secondary/50 border border-border/80 h-9 px-2.5 rounded-lg text-foreground focus:outline-none cursor-pointer"
          >
            <option value="current">{activeWorkspace.name} (Active)</option>
            <option value="all">All Workspaces Combined</option>
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Platform</span>
          <select 
            value={platformFilter} 
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="text-xs font-semibold bg-secondary/30 hover:bg-secondary/50 border border-border/80 h-9 px-2.5 rounded-lg text-foreground focus:outline-none cursor-pointer"
          >
            <option value="all">All Channels</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter / X</option>
            <option value="newsletter">Newsletter</option>
            <option value="video">Video Script</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Status</span>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold bg-secondary/30 hover:bg-secondary/50 border border-border/80 h-9 px-2.5 rounded-lg text-foreground focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Review">In Review</option>
            <option value="Idea">Idea</option>
          </select>
        </div>

        {(searchTerm || platformFilter !== "all" || statusFilter !== "all" || workspaceFilter !== "current") && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSearchTerm("");
              setPlatformFilter("all");
              setStatusFilter("all");
              setWorkspaceFilter("current");
            }}
            className="h-9 px-2.5 text-xs text-primary hover:bg-primary/5 hover:text-primary font-bold"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* DOUBLE PANEL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        
        {/* LEFT PANEL: Side Queues & Actions (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-black uppercase text-foreground tracking-wider">Planner Assistant</h3>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={optimizeSchedule}
                className="w-full justify-start text-left text-xs font-bold rounded-xl h-9 hover:bg-primary/5 border-border hover:border-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                Auto-Optimize Drafts
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openCreateModal()}
                className="w-full justify-start text-left text-xs font-bold rounded-xl h-9 hover:bg-primary/5 border-border hover:border-primary/20 hover:text-primary transition-colors cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4 text-primary" />
                Schedule Custom Post
              </Button>
            </div>
          </div>

          {/* Draggable Publishing Queue */}
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex-1 flex flex-col min-h-[320px] max-h-[500px]">
            <div className="flex items-center justify-between pb-3 border-b border-border/40 shrink-0">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black uppercase text-foreground tracking-wider">Publishing Queue</h3>
                <p className="text-[10px] text-muted-foreground font-semibold">Drag assets into the calendar grid</p>
              </div>
              <Badge variant="secondary" className="text-[10px] font-black">{unscheduledQueue.length} items</Badge>
            </div>

            <div className="flex-1 overflow-y-auto pt-3 space-y-2.5 pr-1">
              {unscheduledQueue.length > 0 ? (
                unscheduledQueue.map((asset) => {
                  const PlatformIcon = getPlatformIcon(asset.type);
                  const colors = getPlatformColors(asset.type);
                  return (
                    <div
                      key={asset.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, asset.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => openEditModal(asset)}
                      className={cn(
                        "p-3 bg-secondary/20 hover:bg-secondary/40 border border-border/80 hover:border-border rounded-xl cursor-grab active:cursor-grabbing transition-all select-none space-y-2 group shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]",
                        draggedAssetId === asset.id && "opacity-40"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded border capitalize", colors)}>
                          {asset.type.split(" ")[0]}
                        </span>
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded border", getStatusBadgeColor(asset.status))}>
                          {asset.status}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-foreground leading-normal line-clamp-2 group-hover:text-primary transition-colors">
                        {asset.title}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-xs text-muted-foreground font-bold">No draft assets left</p>
                  <p className="text-[10px] text-muted-foreground/85 px-4 mt-0.5">Use the AI generator or quick-create to add content.</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Content Feed (Linear list) */}
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm flex flex-col max-h-[380px]">
            <div className="flex items-center justify-between pb-3 border-b border-border/40 shrink-0">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black uppercase text-foreground tracking-wider">Next 7 Days</h3>
                <p className="text-[10px] text-muted-foreground font-semibold">Immediate publishing order</p>
              </div>
              <Badge className="bg-primary/10 text-primary text-[10px] font-black border border-primary/20">{upcomingAssets.length} active</Badge>
            </div>

            <div className="flex-1 overflow-y-auto pt-3 space-y-3 pr-1">
              {upcomingAssets.length > 0 ? (
                upcomingAssets.map((asset) => {
                  const PlatformIcon = getPlatformIcon(asset.type);
                  const d = new Date(asset.date);
                  const timeStr = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                  const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  
                  return (
                    <div 
                      key={asset.id}
                      onClick={() => openEditModal(asset)}
                      className="flex gap-2.5 items-start cursor-pointer hover:bg-secondary/20 p-2 rounded-xl transition-colors"
                    >
                      <div className="p-2 bg-secondary/40 border border-border/60 rounded-lg shrink-0 mt-0.5">
                        <PlatformIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate leading-normal">
                          {asset.title}
                        </p>
                        <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-bold mt-0.5">
                          <Clock className="h-2.5 w-2.5 text-primary" />
                          <span>{dateStr} • {timeStr}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <Clock className="h-7 w-7 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-xs text-muted-foreground font-bold">Nothing planned</p>
                  <p className="text-[10px] text-muted-foreground/80 mt-0.5">Schedule drafts to fill the pipeline.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Main Interactive Calendar Views (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Calendar Controller Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card border border-border/60 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-black text-foreground tracking-tight select-none">
                {viewRangeLabel}
              </h2>
              <div className="flex gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-lg cursor-pointer border-border/60 bg-background hover:bg-secondary/40"
                  onClick={() => handleNavigate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 px-3 rounded-lg text-xs font-bold cursor-pointer border-border/60 bg-background hover:bg-secondary/40"
                  onClick={() => handleNavigate("today")}
                >
                  Today
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-lg cursor-pointer border-border/60 bg-background hover:bg-secondary/40"
                  onClick={() => handleNavigate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-wider bg-secondary/40 px-2.5 py-1 rounded-full border border-border/40 select-none">
              {scheduledAssets.length} scheduled total
            </div>
          </div>

          {/* MAIN CALENDAR GRID RENDER */}
          <div className="bg-card border border-border/60 rounded-2xl p-1 shadow-sm min-h-[500px] overflow-hidden flex flex-col">
            
            {/* MONTH VIEW */}
            {viewMode === "month" && (
              <div className="flex-1 flex flex-col">
                {/* Week Day Header */}
                <div className="grid grid-cols-7 gap-0.5 border-b border-border/40 bg-secondary/10 shrink-0">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center py-2 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Month Cells Grid */}
                <div className="flex-1 grid grid-cols-7 grid-rows-6 gap-[1px] bg-border/20">
                  {monthDays.map(({ date, isCurrentMonth }, idx) => {
                    const dateKey = date.toISOString().split("T")[0];
                    const dayAssets = assetsByDate[dateKey] || [];
                    const isToday = date.toDateString() === new Date("2026-06-18").toDateString();
                    const isDragOver = dragOverDate === dateKey;
                    
                    return (
                      <div 
                        key={idx}
                        onDragOver={(e) => handleDragOver(e, dateKey)}
                        onDrop={(e) => handleDrop(e, date)}
                        className={cn(
                          "bg-card min-h-[100px] p-2 flex flex-col justify-between hover:bg-secondary/5 transition-all select-none border-b border-r border-border/20 relative group/cell",
                          !isCurrentMonth && "bg-secondary/10 opacity-45",
                          isToday && "bg-primary/5",
                          isDragOver && "bg-primary/10 border-2 border-primary border-dashed z-10 scale-[0.99] rounded-lg"
                        )}
                      >
                        {/* Day Cell Header */}
                        <div className="flex justify-between items-start shrink-0">
                          <span className={cn(
                            "text-[11px] font-black flex items-center justify-center h-5 w-5 rounded-full select-none",
                            isToday 
                              ? "bg-primary text-primary-foreground font-black scale-105 shadow-sm" 
                              : "text-muted-foreground group-hover/cell:text-foreground"
                          )}>
                            {date.getDate()}
                          </span>
                          
                          {/* Cell Actions on Hover */}
                          <button
                            onClick={() => openCreateModal(dateKey)}
                            className="opacity-0 group-hover/cell:opacity-100 p-0.5 hover:bg-secondary rounded text-primary hover:text-primary/90 transition-all cursor-pointer border-0 bg-transparent"
                            title="Schedule content for this day"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        {/* Cell Draggable Assets List */}
                        <div className="mt-1 flex-1 flex flex-col gap-1 overflow-y-auto max-h-[85px] scrollbar-thin">
                          {dayAssets.map((asset) => {
                            const colors = getPlatformColors(asset.type);
                            const PlatformIcon = getPlatformIcon(asset.type);
                            
                            // Grab time component
                            let timeStr = "";
                            try {
                              const ad = new Date(asset.date);
                              timeStr = ad.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });
                            } catch {}

                            return (
                              <div 
                                key={asset.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, asset.id)}
                                onDragEnd={handleDragEnd}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditModal(asset);
                                }}
                                className={cn(
                                  "text-[9px] font-bold px-1.5 py-0.5 rounded-md border flex items-center justify-between gap-1 cursor-grab active:cursor-grabbing hover:shadow-sm transition-all truncate",
                                  colors
                                )}
                                title={`${asset.title} (${asset.status})`}
                              >
                                <div className="flex items-center gap-1 min-w-0 flex-1">
                                  <PlatformIcon className="h-2.5 w-2.5 shrink-0" />
                                  <span className="truncate">{asset.title}</span>
                                </div>
                                {timeStr && (
                                  <span className="text-[8px] font-mono opacity-80 shrink-0 select-none pl-1 border-l border-current/20">
                                    {timeStr}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WEEK VIEW */}
            {viewMode === "week" && (
              <div className="flex-1 flex flex-col h-full">
                <div className="grid grid-cols-7 gap-[1px] bg-border/20 flex-1 h-full">
                  {weekDays.map((date, idx) => {
                    const dateKey = date.toISOString().split("T")[0];
                    const dayAssets = assetsByDate[dateKey] || [];
                    const isToday = date.toDateString() === new Date("2026-06-18").toDateString();
                    const isDragOver = dragOverDate === dateKey;
                    
                    return (
                      <div
                        key={idx}
                        onDragOver={(e) => handleDragOver(e, dateKey)}
                        onDrop={(e) => handleDrop(e, date)}
                        className={cn(
                          "bg-card min-h-[480px] p-3 flex flex-col border-r border-border/20 relative group/cell",
                          isToday && "bg-primary/5 border-t-2 border-t-primary",
                          isDragOver && "bg-primary/10 border-2 border-primary border-dashed z-10"
                        )}
                      >
                        {/* Day Column Header */}
                        <div className="pb-3 border-b border-border/40 flex justify-between items-center shrink-0">
                          <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                              {date.toLocaleDateString("en-US", { weekday: "short" })}
                            </p>
                            <p className={cn(
                              "text-base font-black mt-0.5 h-7 w-7 flex items-center justify-center rounded-full",
                              isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                            )}>
                              {date.getDate()}
                            </p>
                          </div>

                          <button
                            onClick={() => openCreateModal(dateKey)}
                            className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-primary transition-all cursor-pointer border-0 bg-transparent"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Draggable Cards feed */}
                        <div className="flex-1 pt-3 flex flex-col gap-2 overflow-y-auto">
                          {dayAssets.length > 0 ? (
                            dayAssets.map((asset) => {
                              const PlatformIcon = getPlatformIcon(asset.type);
                              const colors = getPlatformColors(asset.type);
                              
                              let timeStr = "";
                              try {
                                const ad = new Date(asset.date);
                                timeStr = ad.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                              } catch {}

                              return (
                                <div
                                  key={asset.id}
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, asset.id)}
                                  onDragEnd={handleDragEnd}
                                  onClick={() => openEditModal(asset)}
                                  className={cn(
                                    "p-3 rounded-xl border cursor-grab active:cursor-grabbing hover:shadow-md transition-all space-y-2 select-none group text-left",
                                    colors
                                  )}
                                >
                                  <div className="flex items-center justify-between gap-1.5">
                                    <PlatformIcon className="h-3.5 w-3.5 shrink-0" />
                                    {timeStr && (
                                      <span className="text-[8px] font-mono opacity-80 px-1 py-0.5 bg-background/50 rounded">
                                        {timeStr}
                                      </span>
                                    )}
                                  </div>
                                  
                                  <p className="text-xs font-bold text-foreground leading-normal line-clamp-3">
                                    {asset.title}
                                  </p>

                                  <div className="flex justify-between items-center pt-1 border-t border-current/10">
                                    <span className={cn("text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded", getStatusBadgeColor(asset.status))}>
                                      {asset.status}
                                    </span>
                                    {asset.workspaceId !== activeWorkspace.id && (
                                      <span className="text-[8px] opacity-70 font-mono">
                                        {asset.workspaceId}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="h-full flex items-center justify-center py-20 text-center select-none">
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">No Content</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AGENDA VIEW */}
            {viewMode === "agenda" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[600px]">
                {Object.keys(assetsByDate).length > 0 ? (
                  Object.keys(assetsByDate)
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
                    .map((dateStr) => {
                      const dateAssets = assetsByDate[dateStr];
                      const d = new Date(dateStr + "T12:00:00Z");
                      const isToday = dateStr === new Date("2026-06-18").toISOString().split("T")[0];
                      
                      return (
                        <div key={dateStr} className="grid grid-cols-1 md:grid-cols-10 gap-4 pb-4 border-b border-border/40 last:border-0">
                          {/* Date Header */}
                          <div className="md:col-span-2 flex md:flex-col gap-2 md:gap-0 sticky top-0 bg-card z-10 py-1">
                            <span className={cn(
                              "text-xs font-black uppercase tracking-wider",
                              isToday ? "text-primary font-black" : "text-muted-foreground"
                            )}>
                              {d.toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-xl font-black text-foreground">
                              {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                            {isToday && (
                              <Badge className="bg-primary/15 hover:bg-primary/20 text-primary border border-primary/25 text-[9px] font-black uppercase py-0 px-2 mt-1 w-max">
                                Today
                              </Badge>
                            )}
                          </div>

                          {/* Asset Feed List */}
                          <div className="md:col-span-8 space-y-2.5">
                            {dateAssets.map((asset) => {
                              const PlatformIcon = getPlatformIcon(asset.type);
                              const colors = getPlatformColors(asset.type);
                              
                              let timeStr = "";
                              try {
                                const ad = new Date(asset.date);
                                timeStr = ad.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                              } catch {}

                              return (
                                <div
                                  key={asset.id}
                                  onClick={() => openEditModal(asset)}
                                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-secondary/15 hover:bg-secondary/35 border border-border/60 rounded-2xl cursor-pointer transition-colors"
                                >
                                  <div className="flex gap-3.5 items-start">
                                    <div className="p-2.5 bg-background border border-border/40 rounded-xl shrink-0 mt-0.5">
                                      <PlatformIcon className="h-4.5 w-4.5 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="text-xs font-bold text-foreground leading-normal line-clamp-2">
                                        {asset.title}
                                      </h4>
                                      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-muted-foreground">
                                        <span className="capitalize">{asset.type}</span>
                                        <span>•</span>
                                        <span className={cn("text-[9px] font-bold px-1.5 py-0.2 rounded border", getStatusBadgeColor(asset.status))}>
                                          {asset.status}
                                        </span>
                                        {asset.workspaceId !== activeWorkspace.id && (
                                          <>
                                            <span>•</span>
                                            <Badge variant="outline" className="text-[8px] font-bold">
                                              {workspaces.find(w => w.id === asset.workspaceId)?.name}
                                            </Badge>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4 shrink-0 pl-12 md:pl-0">
                                    <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground font-bold">
                                      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                                      <span>{timeStr}</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:translate-x-1 group-hover:opacity-100 transition-all shrink-0" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div className="py-20 text-center flex flex-col items-center justify-center select-none">
                    <CalendarDays className="h-10 w-10 text-muted-foreground opacity-50 mb-3" />
                    <h4 className="text-sm font-bold text-foreground">Planning pipeline empty</h4>
                    <p className="text-xs text-muted-foreground max-w-xs leading-normal mt-0.5">
                      No matching events found in this date range. Try clearing active filters or rescheduling drafts.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUICK EDIT MODAL */}
      <AnimatePresence>
        {isEditModalOpen && selectedAsset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            {/* Dialog panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[85vh] bg-card/95"
            >
              <form onSubmit={saveAssetEdits} className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between bg-secondary/15">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase font-bold text-primary tracking-wider">Modify scheduled asset</span>
                    <h3 className="text-base font-black text-foreground">Edit Planner Details</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Form fields */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Content Title</label>
                    <Input 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                      placeholder="Give this scheduled post a title..."
                      className="w-full bg-secondary/20 h-10 text-xs rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Platform Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Platform</label>
                      <select 
                        value={formPlatform}
                        onChange={(e) => setFormPlatform(e.target.value as MockContentAsset["type"])}
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="LinkedIn Post">LinkedIn Post</option>
                        <option value="Twitter Thread">Twitter Thread</option>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Video Script">Video Script</option>
                      </select>
                    </div>

                    {/* Status Picker */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Asset Status</label>
                      <select 
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as MockContentAsset["status"])}
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Review">In Review</option>
                        <option value="Idea">Idea</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Publish Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Schedule Date</label>
                      <input 
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        required
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer font-bold"
                      />
                    </div>

                    {/* Publish Time */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Schedule Time</label>
                      <input 
                        type="time"
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                        required
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-[10px] text-muted-foreground font-semibold">
                    <span>Workspace: {workspaces.find(w => w.id === selectedAsset.workspaceId)?.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        deleteAsset(selectedAsset.id);
                        setIsEditModalOpen(false);
                        setSelectedAsset(null);
                      }}
                      className="text-red-500 hover:text-red-600 inline-flex items-center gap-1 cursor-pointer bg-transparent border-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete permanently
                    </button>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t border-border/40 bg-secondary/15 flex justify-end gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedAsset(null);
                    }}
                    className="h-9 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 text-xs font-bold rounded-xl bg-primary cursor-pointer"
                  >
                    Apply Changes
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK CREATE MODAL */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsCreateModalOpen(false)}
            />
            {/* Dialog panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[85vh] bg-card/95"
            >
              <form onSubmit={createNewAsset} className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between bg-secondary/15">
                  <div className="space-y-0.5">
                    <span className="text-xs uppercase font-bold text-primary tracking-wider">Planner Pipeline</span>
                    <h3 className="text-base font-black text-foreground">Schedule Content Item</h3>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Form fields */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Content Title</label>
                    <Input 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      required
                      placeholder="e.g. 5 copywriter rules that boost SaaS landing page CTR by 2x..."
                      className="w-full bg-secondary/20 h-10 text-xs rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Platform Selector */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Channel Platform</label>
                      <select 
                        value={formPlatform}
                        onChange={(e) => setFormPlatform(e.target.value as MockContentAsset["type"])}
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="LinkedIn Post">LinkedIn Post</option>
                        <option value="Twitter Thread">Twitter Thread</option>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Video Script">Video Script</option>
                      </select>
                    </div>

                    {/* Status Picker */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Content Status</label>
                      <select 
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as MockContentAsset["status"])}
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Draft">Draft</option>
                        <option value="Review">In Review</option>
                        <option value="Idea">Idea</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Publish Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Schedule Date</label>
                      <input 
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        required
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer font-bold"
                      />
                    </div>

                    {/* Publish Time */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-black text-muted-foreground tracking-wider">Schedule Time</label>
                      <input 
                        type="time"
                        value={formTime}
                        onChange={(e) => setFormTime(e.target.value)}
                        required
                        className="text-xs font-semibold bg-secondary/20 border border-border/80 h-10 w-full px-3 rounded-xl text-foreground focus:outline-none cursor-pointer font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="text-[10px] text-muted-foreground font-semibold">
                    <span>This asset will be created inside: <strong>{activeWorkspace.name}</strong></span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 border-t border-border/40 bg-secondary/15 flex justify-end gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="h-9 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-9 text-xs font-bold rounded-xl bg-primary cursor-pointer"
                  >
                    Create & Schedule
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
