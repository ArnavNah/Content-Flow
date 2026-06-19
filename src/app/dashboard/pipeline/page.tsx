"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AtSign, Mail, Play, Plus, MoreHorizontal, Calendar, Eye, Trash2, X, Sparkles, LayoutGrid, CheckCircle } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useWorkspace } from "@/context/workspace-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface ColumnType {
  id: string;
  title: string;
  colorKey: string;
}

const DEFAULT_COLUMNS: ColumnType[] = [
  { id: "Idea", title: "Ideas", colorKey: "amber" },
  { id: "Draft", title: "Drafts", colorKey: "blue" },
  { id: "Review", title: "In Review", colorKey: "indigo" },
  { id: "Published", title: "Published", colorKey: "emerald" }
];

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; badge: string }> = {
  amber: { border: "border-t-amber-500", bg: "bg-amber-500/10", text: "text-amber-600", badge: "bg-amber-500/10 text-amber-600 border-amber-500/10" },
  blue: { border: "border-t-blue-500", bg: "bg-blue-500/10", text: "text-blue-600", badge: "bg-blue-500/10 text-blue-600 border-blue-500/10" },
  indigo: { border: "border-t-indigo-500", bg: "bg-indigo-500/10", text: "text-indigo-600", badge: "bg-indigo-500/10 text-indigo-600 border-indigo-500/10" },
  emerald: { border: "border-t-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-600", badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/10" },
  pink: { border: "border-t-pink-500", bg: "bg-pink-500/10", text: "text-pink-600", badge: "bg-pink-500/10 text-pink-600 border-pink-500/10" },
  purple: { border: "border-t-purple-500", bg: "bg-purple-500/10", text: "text-purple-600", badge: "bg-purple-500/10 text-purple-600 border-purple-500/10" },
  orange: { border: "border-t-orange-500", bg: "bg-orange-500/10", text: "text-orange-600", badge: "bg-orange-500/10 text-orange-600 border-orange-500/10" },
  teal: { border: "border-t-teal-500", bg: "bg-teal-500/10", text: "text-teal-600", badge: "bg-teal-500/10 text-teal-600 border-teal-500/10" },
  slate: { border: "border-t-slate-500", bg: "bg-slate-500/10", text: "text-slate-600", badge: "bg-slate-500/10 text-slate-600 border-slate-500/10" }
};

export default function PipelinePage() {
  const { assets, activeWorkspace, addAsset, updateAsset, deleteAsset } = useWorkspace();
  
  // Kanban columns state (loaded from local storage if available)
  const [columns, setColumns] = useState<ColumnType[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_pipeline_columns");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_COLUMNS;
  });

  // Track columns change
  useEffect(() => {
    try {
      localStorage.setItem("cf_pipeline_columns", JSON.stringify(columns));
    } catch (e) {
      console.error(e);
    }
  }, [columns]);

  // Drag states
  const [draggingAssetId, setDraggingAssetId] = useState<number | null>(null);
  const [activeDropColumn, setActiveDropColumn] = useState<string | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [draggedHeight, setDraggedHeight] = useState<number>(120);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const draggedAsset = useMemo(() => {
    return assets.find(a => a.id === draggingAssetId);
  }, [assets, draggingAssetId]);

  // Dialog states for card quick creation
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardTargetStatus, setCardTargetStatus] = useState("Idea");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardType, setNewCardType] = useState<"LinkedIn Post" | "Twitter Thread" | "Newsletter" | "Video Script">("LinkedIn Post");

  // Dialog states for column creation (New Group)
  const [isColModalOpen, setIsColModalOpen] = useState(false);
  const [newColName, setNewColName] = useState("");
  const [newColColor, setNewColColor] = useState("slate");

  // Filter assets to active workspace
  const workspaceAssets = useMemo(() => {
    return assets.filter(a => a.workspaceId === activeWorkspace.id);
  }, [assets, activeWorkspace.id]);

  // Helper mappings
  const getIcon = (type: string) => {
    switch (type) {
      case "LinkedIn Post": return LinkedinIcon;
      case "Twitter Thread": return AtSign;
      case "Newsletter": return Mail;
      case "Video Script": return Play;
      default: return LinkedinIcon;
    }
  };

  const getPlatformLabel = (type: string) => {
    switch (type) {
      case "LinkedIn Post": return "LinkedIn";
      case "Twitter Thread": return "Twitter / X";
      case "Newsletter": return "Newsletter";
      case "Video Script": return "Video Script";
      default: return type;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  // Helper to render card body consistently for list and drag preview
  const renderCard = (asset: any, isDragPreview = false) => {
    const col = columns.find(c => c.id === asset.status) || columns[0] || { colorKey: "slate" };
    const colColors = COLOR_MAP[col.colorKey] || COLOR_MAP.slate;
    const PlatformIcon = getIcon(asset.type);

    return (
      <Card className={`border border-border/60 shadow-[0_4px_12px_rgba(0,0,0,0.015)] border-t-2 ${colColors.border} bg-card rounded-xl overflow-hidden ${isDragPreview ? "shadow-2xl" : ""} select-none`}>
        <CardContent className="px-4 py-4 space-y-3.5">
          <div className="flex justify-between items-start gap-2">
            {/* Platform Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-bold text-muted-foreground">
              <PlatformIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span>{getPlatformLabel(asset.type)}</span>
            </div>
            
            {/* Option Action Menu */}
            {!isDragPreview && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${asset.title}"?`)) {
                    deleteAsset(asset.id);
                  }
                }}
                className="p-1 text-muted-foreground hover:text-red-500 hover:bg-secondary/40 rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Delete Card"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Card Title */}
          <p className="text-xs font-bold leading-normal text-foreground line-clamp-3">
            {asset.title}
          </p>

          {/* Card Meta & Bottom Row */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border/30 text-[10px] text-muted-foreground font-semibold">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{asset.status === "Published" ? "Pub " : ""}{formatDate(asset.date)}</span>
            </div>

            {/* Performance statistics for published content */}
            {asset.status === "Published" && asset.performance !== "Idea" && asset.performance !== "Draft" && (
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">
                <Eye className="h-3 w-3" />
                <span>{asset.performance}</span>
              </div>
            )}

            {/* Member Avatars */}
            {asset.status !== "Published" && (
              <div className="flex -space-x-1.5">
                <Avatar className="h-5 w-5 border-2 border-card">
                  <AvatarFallback className="bg-primary/10 text-primary text-[8px] font-black">JD</AvatarFallback>
                </Avatar>
                {asset.status === "Draft" && (
                  <Avatar className="h-5 w-5 border-2 border-card">
                    <AvatarFallback className="bg-blue-500/10 text-blue-500 text-[8px] font-black">AS</AvatarFallback>
                  </Avatar>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Native HTML5 Drag and Drop handlers with custom drag preview
  const handleDragStart = (e: React.DragEvent, assetId: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    dragOffsetRef.current = offset;
    setDraggedHeight(rect.height);
    
    dragX.set(e.clientX - offset.x);
    dragY.set(e.clientY - offset.y);

    // Use a blank transparent canvas to synchronously hide the default browser drag ghost preview
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    e.dataTransfer.setDragImage(canvas, 0, 0);

    setDraggingAssetId(assetId);
    e.dataTransfer.setData("text/plain", assetId.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.clientX !== 0 || e.clientY !== 0) {
      dragX.set(e.clientX - dragOffsetRef.current.x);
      dragY.set(e.clientY - dragOffsetRef.current.y);
    }
  };

  const handleDragEnd = () => {
    setDraggingAssetId(null);
    setActiveDropColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    if (activeDropColumn !== columnId) {
      setActiveDropColumn(columnId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const assetIdStr = e.dataTransfer.getData("text/plain");
    if (assetIdStr) {
      const assetId = parseInt(assetIdStr);
      updateAsset(assetId, { status: targetStatus as any });
    }
    setDraggingAssetId(null);
    setActiveDropColumn(null);
  };

  // Track global dragover to update custom drag preview coordinates smoothly
  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      if (draggingAssetId !== null) {
        dragX.set(e.clientX - dragOffsetRef.current.x);
        dragY.set(e.clientY - dragOffsetRef.current.y);
      }
    };
    window.addEventListener("dragover", handleGlobalDragOver);
    return () => window.removeEventListener("dragover", handleGlobalDragOver);
  }, [draggingAssetId, dragX, dragY]);

  // + Card quick-create triggers
  const openQuickCreateCard = (status: string) => {
    setCardTargetStatus(status);
    setNewCardTitle("");
    setNewCardType("LinkedIn Post");
    setIsCardModalOpen(true);
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCardTitle.trim()) {
      // 1. Create a draft asset using workspace-context's addAsset (by default status=Draft)
      const asset = addAsset(newCardTitle.trim(), newCardType);
      // 2. Set the status of this asset to the target status immediately
      updateAsset(asset.id, { status: cardTargetStatus as any });
      
      setIsCardModalOpen(false);
      setNewCardTitle("");
    }
  };

  // New Group (Column) triggers
  const handleCreateCol = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      const colId = newColName.trim();
      // Avoid duplicate IDs
      if (columns.some(col => col.id.toLowerCase() === colId.toLowerCase())) {
        alert("A column with that name already exists!");
        return;
      }
      
      const newCol: ColumnType = {
        id: colId,
        title: newColName.trim(),
        colorKey: newColColor
      };
      
      setColumns([...columns, newCol]);
      setNewColName("");
      setIsColModalOpen(false);
    }
  };

  const handleDeleteColumn = (colId: string) => {
    if (DEFAULT_COLUMNS.some(c => c.id === colId)) {
      alert("System columns cannot be deleted!");
      return;
    }
    
    if (confirm(`Are you sure you want to delete column "${colId}"? Assets inside will remain in the library.`)) {
      setColumns(prev => prev.filter(c => c.id !== colId));
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 relative min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Content Pipeline</h1>
          <p className="text-muted-foreground mt-1">
            Drag-and-drop assets between status groups to manage your social workflow in <span className="font-bold text-foreground">{activeWorkspace.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={() => setIsColModalOpen(true)}
            className="flex items-center gap-1.5 px-4 h-9 rounded-xl text-xs font-bold bg-primary shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>New Group</span>
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex gap-5 pb-8 overflow-x-auto select-none items-start min-h-[70vh] pr-4">
        {columns.map((col) => {
          const colAssets = workspaceAssets.filter(a => a.status === col.id);
          const colColors = COLOR_MAP[col.colorKey] || COLOR_MAP.slate;
          const isOver = activeDropColumn === col.id;
          const isSystem = DEFAULT_COLUMNS.some(c => c.id === col.id);

          return (
            <div 
              key={col.id} 
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col w-[300px] shrink-0 bg-secondary/15 border border-border/40 rounded-2xl transition-all p-3.5 gap-3.5 ${
                isOver ? "bg-primary/5 border-primary/20 border-dashed scale-[1.01]" : ""
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-foreground">{col.title}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${colColors.badge}`}>
                    {colAssets.length}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <button 
                    onClick={() => openQuickCreateCard(col.id)}
                    className="p-1 hover:bg-secondary/80 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Add Asset to Column"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  {!isSystem && (
                    <button 
                      onClick={() => handleDeleteColumn(col.id)}
                      className="p-1 hover:bg-red-500/10 rounded-lg text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete Column"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  {isSystem && (
                    <button 
                      className="p-1 hover:bg-secondary/80 rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="More actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Column Cards List */}
              <div className="flex flex-col gap-3 min-h-[450px]">
                <AnimatePresence mode="popLayout">
                  {colAssets.map((asset) => {
                    const isDragging = draggingAssetId === asset.id;

                    if (isDragging) {
                      return (
                        <motion.div
                          key={asset.id}
                          layoutId={`card-container-${asset.id}`}
                          style={{ height: draggedHeight }}
                          className="rounded-xl border-2 border-dashed border-border bg-secondary/5 shrink-0"
                        />
                      );
                    }

                    return (
                      <motion.div
                        key={asset.id}
                        layoutId={`card-container-${asset.id}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e as any, asset.id)}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        className="cursor-grab active:cursor-grabbing group shrink-0 select-none"
                      >
                        {renderCard(asset)}
                      </motion.div>
                    );
                  })}

                  {/* Dynamic drag hover placeholder for smooth Trello-style landing */}
                  {isOver && draggedAsset && draggedAsset.status !== col.id && (
                    <motion.div
                      key="drag-hover-placeholder"
                      layoutId="drag-hover-placeholder"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: draggedHeight }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 shrink-0"
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>

                {/* Empty Column Drop Hint */}
                {colAssets.length === 0 && !isOver && (
                  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-xl py-12 text-[10px] text-muted-foreground font-semibold">
                    <LayoutGrid className="h-5 w-5 text-muted-foreground/40 mb-2" />
                    <span>Drop cards here</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* DIALOG MODAL: QUICK CREATE CARD */}
      <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-black text-foreground">Create New Content Asset</DialogTitle>
            <DialogDescription className="text-xs">
              Quickly add a card to the <span className="font-bold text-primary">{cardTargetStatus}</span> group.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCard} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Asset Title</label>
              <Input 
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="e.g. 5 steps to build an interactive dashboard..."
                className="text-xs h-9 rounded-lg"
                required
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Platform Type</label>
              <Select 
                value={newCardType} 
                onValueChange={(val: any) => setNewCardType(val)}
              >
                <SelectTrigger className="w-full text-xs h-9 rounded-lg bg-background">
                  <SelectValue placeholder="Select Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LinkedIn Post" className="text-xs">LinkedIn Post</SelectItem>
                  <SelectItem value="Twitter Thread" className="text-xs">Twitter Thread</SelectItem>
                  <SelectItem value="Newsletter" className="text-xs">Newsletter</SelectItem>
                  <SelectItem value="Video Script" className="text-xs">Video Script</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="flex items-center justify-end gap-2 pt-2 border-t border-border/40 mt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsCardModalOpen(false)}
                className="text-xs font-bold h-9 rounded-lg border-border/80"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="text-xs font-bold h-9 rounded-lg bg-primary"
                disabled={!newCardTitle.trim()}
              >
                Create Asset Card
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG MODAL: CREATE NEW COLUMN (GROUP) */}
      <Dialog open={isColModalOpen} onOpenChange={setIsColModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-card border border-border">
          <DialogHeader>
            <DialogTitle className="text-sm font-black text-foreground">Create Custom Workflow Group</DialogTitle>
            <DialogDescription className="text-xs">
              Add a new status column to your board to organize specialized stages.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCol} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Group / Column Title</label>
              <Input 
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="e.g. Scheduled, Backlog..."
                className="text-xs h-9 rounded-lg"
                required
                autoFocus
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">Accent Color</label>
              <Select 
                value={newColColor} 
                onValueChange={(val: any) => setNewColColor(val)}
              >
                <SelectTrigger className="w-full text-xs h-9 rounded-lg bg-background">
                  <SelectValue placeholder="Select Color Accent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slate" className="text-xs">Slate Gray</SelectItem>
                  <SelectItem value="pink" className="text-xs">Hot Pink</SelectItem>
                  <SelectItem value="purple" className="text-xs">Royal Purple</SelectItem>
                  <SelectItem value="orange" className="text-xs">Sunset Orange</SelectItem>
                  <SelectItem value="teal" className="text-xs">Ocean Teal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="flex items-center justify-end gap-2 pt-2 border-t border-border/40 mt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => setIsColModalOpen(false)}
                className="text-xs font-bold h-9 rounded-lg border-border/80"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="text-xs font-bold h-9 rounded-lg bg-primary"
                disabled={!newColName.trim()}
              >
                Create Columns Group
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Floating Drag Preview (Trello style) */}
      {draggingAssetId !== null && draggedAsset && (
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: 272,
            pointerEvents: "none",
            zIndex: 9999,
            x: dragX,
            y: dragY,
          }}
          initial={{ scale: 1, rotate: 0 }}
          animate={{ 
            scale: 1.04, 
            rotate: 2.5,
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {renderCard(draggedAsset, true)}
        </motion.div>
      )}

    </div>
  );
}
