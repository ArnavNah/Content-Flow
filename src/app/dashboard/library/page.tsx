"use client";

import { useState, useMemo, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  MoreHorizontal, 
  Search, 
  Download, 
  Trash2, 
  Edit3, 
  CheckCircle,
  FileText,
  AlertCircle,
  Mail,
  Play,
  AtSign,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus
} from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MockContentAsset } from "@/data/mock-data";

const ITEMS_PER_PAGE = 10;

export default function ContentLibrary() {
  const { 
    assets, 
    activeWorkspace, 
    updateAsset, 
    deleteAsset, 
    bulkDeleteAssets, 
    bulkUpdateAssetStatus 
  } = useWorkspace();

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  
  // Edit mode state
  const [editingAssetId, setEditingAssetId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Calendar states
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [currentMonth, setCurrentMonth] = useState(new Date("2026-06-17"));
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<Date | null>(null);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Prev month days
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

    // Next month days
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const getAssetsForDay = (date: Date) => {
    return filteredData.filter(asset => {
      const assetDate = new Date(asset.date);
      return assetDate.getFullYear() === date.getFullYear() &&
             assetDate.getMonth() === date.getMonth() &&
             assetDate.getDate() === date.getDate();
    });
  };

  const getPlatformColorClasses = (type: string) => {
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

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Filter assets for this workspace
  const workspaceAssets = useMemo(() => {
    return assets.filter(item => item.workspaceId === activeWorkspace.id);
  }, [assets, activeWorkspace.id]);

  // Reset page and selections when switching workspace or filters
  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
      setSelectedIds([]);
    }, 0);
  }, [activeWorkspace.id, searchTerm, platformFilter, statusFilter]);

  // Filtered Assets list
  const filteredData = workspaceAssets.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = platformFilter === "all" || 
      (platformFilter === "linkedin" && item.type === "LinkedIn Post") ||
      (platformFilter === "twitter" && item.type === "Twitter Thread") ||
      (platformFilter === "newsletter" && item.type === "Newsletter") ||
      (platformFilter === "video" && item.type === "Video Script");
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Pagination bounds
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedData.map(item => item.id);
      setSelectedIds(prev => {
        const unique = new Set([...prev, ...pageIds]);
        return Array.from(unique);
      });
    } else {
      const pageIds = paginatedData.map(item => item.id);
      setSelectedIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const isAllPageSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id));

  // Bulk Actions
  const handleBulkPublish = () => {
    bulkUpdateAssetStatus(selectedIds, "Published");
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    bulkDeleteAssets(selectedIds);
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    const selectedAssets = assets.filter(a => selectedIds.includes(a.id));
    const textContent = selectedAssets.map(a => `Title: ${a.title}\nFormat: ${a.type}\nStatus: ${a.status}\nDate: ${a.date}\n------------------\n`).join("\n");
    
    // Simulate txt file download
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `contentflow-export-${activeWorkspace.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSelectedIds([]);
  };

  // Row edit handlers
  const startEdit = (id: number, currentTitle: string) => {
    setEditingAssetId(id);
    setEditingTitle(currentTitle);
  };

  const saveEdit = (id: number) => {
    if (editingTitle.trim()) {
      updateAsset(id, { title: editingTitle.trim() });
    }
    setEditingAssetId(null);
  };

  // Icon mapping
  const getIcon = (type: string) => {
    switch (type) {
      case "LinkedIn Post": return LinkedinIcon;
      case "Twitter Thread": return AtSign;
      case "Newsletter": return Mail;
      case "Video Script": return Play;
      default: return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published": 
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/15">Published</Badge>;
      case "Review": 
        return <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500/15">In Review</Badge>;
      case "Idea": 
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/15">Idea</Badge>;
      default: 
        return <Badge className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20 hover:bg-muted-foreground/15">Draft</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Content Library</h1>
          <p className="text-muted-foreground mt-1">Manage, filter, and export your generated assets.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Segmented View Switcher */}
          <div className="flex bg-secondary p-0.5 rounded-lg border border-border/40 mr-1 h-9 items-center">
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "px-3 h-8 text-[11px] font-bold rounded-md transition-all cursor-pointer border-0",
                viewMode === "table" 
                  ? "bg-card text-foreground shadow-sm font-black border border-border/20" 
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              )}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={cn(
                "px-3 h-8 text-[11px] font-bold rounded-md transition-all cursor-pointer border-0",
                viewMode === "calendar" 
                  ? "bg-card text-foreground shadow-sm font-black border border-border/20" 
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              )}
            >
              Calendar
            </button>
          </div>

          <Button variant="outline" size="sm" onClick={handleBulkExport} className="h-9 text-xs font-bold rounded-xl cursor-pointer">
            <Download className="mr-1.5 h-4 w-4" /> Export Raw TXT
          </Button>
          <Link href="/dashboard/generator" className={cn(buttonVariants({ size: "sm" }), "h-9 text-xs font-bold rounded-xl cursor-pointer bg-primary inline-flex items-center")}>
            New Content
          </Link>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="flex flex-wrap items-center gap-3 bg-card border border-border/60 rounded-xl p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search assets by title..." 
            className="pl-10 w-full bg-secondary/30 border-border/80 h-9 text-xs rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Platform Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Platform</span>
          <Select value={platformFilter} onValueChange={(val) => setPlatformFilter(val || "all")}>
            <SelectTrigger className="w-[140px] bg-secondary/30 border-border/80 h-9 text-xs rounded-lg">
              <SelectValue placeholder="All Channels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Channels</SelectItem>
              <SelectItem value="linkedin" className="text-xs">LinkedIn</SelectItem>
              <SelectItem value="twitter" className="text-xs">Twitter / X</SelectItem>
              <SelectItem value="newsletter" className="text-xs">Newsletter</SelectItem>
              <SelectItem value="video" className="text-xs">Video Script</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Status</span>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-[120px] bg-secondary/30 border-border/80 h-9 text-xs rounded-lg">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Status</SelectItem>
              <SelectItem value="Published" className="text-xs">Published</SelectItem>
              <SelectItem value="Draft" className="text-xs">Draft</SelectItem>
              <SelectItem value="Review" className="text-xs">In Review</SelectItem>
              <SelectItem value="Idea" className="text-xs">Idea</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* VIEW RENDER CONTAINER */}
      {viewMode === "table" ? (
        /* DATA TABLE */
        <div className="rounded-xl border border-border/60 bg-card text-card-foreground shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/40 text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-border/40">
                <TableRow className="hover:bg-transparent border-0">
                  <TableHead className="w-12 text-center h-10">
                    <Checkbox 
                      checked={isAllPageSelected}
                      onCheckedChange={(c) => handleSelectAll(!!c)}
                    />
                  </TableHead>
                  <TableHead className="h-10">Title</TableHead>
                  <TableHead className="h-10">Platform</TableHead>
                  <TableHead className="h-10">Status</TableHead>
                  <TableHead className="h-10 text-right">Performance</TableHead>
                  <TableHead className="h-10">Date Created</TableHead>
                  <TableHead className="w-16 h-10 pr-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => {
                    const PlatformIcon = getIcon(item.type);
                    const isEditing = editingAssetId === item.id;
                    
                    return (
                      <TableRow key={item.id} className="hover:bg-secondary/10 border-b border-border/40 last:border-0 transition-colors">
                        <TableCell className="text-center py-4">
                          <Checkbox 
                            checked={selectedIds.includes(item.id)}
                            onCheckedChange={(c) => handleSelectItem(item.id, !!c)}
                          />
                        </TableCell>
                        
                        {/* Title / Edit field */}
                        <TableCell className="font-bold text-foreground text-xs py-4 max-w-md">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <Input 
                                value={editingTitle} 
                                onChange={(e) => setEditingTitle(e.target.value)}
                                className="h-8 text-xs bg-background border-primary focus-visible:ring-1 py-1"
                                onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                              />
                              <Button size="sm" className="h-8 text-[10px] px-2.5 rounded-lg cursor-pointer" onClick={() => saveEdit(item.id)}>
                                Save
                              </Button>
                            </div>
                          ) : (
                            <span className="line-clamp-1">{item.title}</span>
                          )}
                        </TableCell>
                        
                        {/* Platform */}
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                            <PlatformIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{item.type}</span>
                          </div>
                        </TableCell>
                        
                        {/* Status */}
                        <TableCell className="py-4">
                          {getStatusBadge(item.status)}
                        </TableCell>
                        
                        {/* Performance */}
                        <TableCell className="text-right font-mono text-xs text-foreground font-bold py-4">
                          <span className={item.status === "Published" ? "text-emerald-600" : "text-muted-foreground"}>
                            {item.performance}
                          </span>
                        </TableCell>
                        
                        {/* Date */}
                        <TableCell className="text-muted-foreground text-xs font-semibold py-4">
                          {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </TableCell>
                        
                        {/* Row Actions */}
                        <TableCell className="pr-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-secondary h-8 w-8 p-0 cursor-pointer focus:outline-none border-0 bg-transparent">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-xl mt-0.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                              <DropdownMenuLabel className="text-[10px] text-muted-foreground">Asset Actions</DropdownMenuLabel>
                              <DropdownMenuItem 
                                onClick={() => startEdit(item.id, item.title)}
                                className="flex items-center gap-2 cursor-pointer rounded-lg text-xs"
                              >
                                <Edit3 className="h-3.5 w-3.5 text-muted-foreground" /> Edit title
                              </DropdownMenuItem>
                              
                              {item.status !== "Published" && (
                                <DropdownMenuItem 
                                  onClick={() => updateAsset(item.id, { status: "Published", performance: "1.2K Reach" })}
                                  className="flex items-center gap-2 cursor-pointer rounded-lg text-xs text-emerald-600 focus:text-emerald-600"
                                >
                                  <CheckCircle className="h-3.5 w-3.5" /> Publish now
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />
                              
                              <DropdownMenuItem 
                                onClick={() => deleteAsset(item.id)}
                                className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 rounded-lg text-xs"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete asset
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-20 text-center">
                      <div className="max-w-xs mx-auto flex flex-col items-center">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                        <h4 className="text-sm font-bold text-foreground mb-1">No assets found</h4>
                        <p className="text-xs text-muted-foreground leading-normal">
                          No matches were found for your search term or active filters. Try resetting them.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* TABLE FOOTER / PAGINATION */}
          <div className="p-4 bg-secondary/20 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <div>
              Showing <span className="text-foreground font-bold">{filteredData.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}</span> to{" "}
              <span className="text-foreground font-bold">{Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> of{" "}
              <span className="text-foreground font-bold">{filteredData.length}</span> assets
            </div>
            <div className="flex items-center gap-3">
              <span>Page <span className="text-foreground font-bold">{currentPage}</span> of {totalPages}</span>
              <div className="flex gap-1.5">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-lg border-border/80 cursor-pointer"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-lg border-border/80 cursor-pointer"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CALENDAR MONTH GRID VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-border/60 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-black text-foreground">
                {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-lg cursor-pointer border-border/60 bg-background"
                  onClick={handlePrevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-lg cursor-pointer border-border/60 bg-background"
                  onClick={handleNextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">
              {filteredData.length} Matching Assets
            </div>
          </div>

          <div className="grid grid-cols-7 gap-[1px] bg-border/40 border border-border/40 rounded-2xl overflow-hidden shadow-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="bg-secondary/40 text-center py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {day}
              </div>
            ))}
            {calendarDays.map(({ date, isCurrentMonth }, idx) => {
              const dayAssets = getAssetsForDay(date);
              const isToday = date.toDateString() === new Date("2026-06-17").toDateString();
              
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedCalendarDay(date)}
                  className={cn(
                    "bg-card min-h-[120px] p-2.5 flex flex-col justify-between hover:bg-secondary/10 transition-colors cursor-pointer group/cell select-none",
                    !isCurrentMonth && "bg-secondary/15 opacity-55"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-xs font-bold flex items-center justify-center h-6 w-6 rounded-full",
                      isToday ? "bg-primary text-primary-foreground font-black animate-pulse" : "text-muted-foreground group-hover/cell:text-foreground"
                    )}>
                      {date.getDate()}
                    </span>
                    <Plus className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/cell:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="mt-2 flex-1 flex flex-col gap-1.5 overflow-hidden">
                    {dayAssets.slice(0, 3).map((asset) => {
                      const colors = getPlatformColorClasses(asset.type);
                      return (
                        <div 
                          key={asset.id} 
                          className={cn(
                            "text-[9px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 truncate",
                            colors
                          )}
                          title={asset.title}
                        >
                          <div className="h-1 w-1 rounded-full bg-current shrink-0" />
                          <span className="truncate">{asset.title}</span>
                        </div>
                      );
                    })}
                    {dayAssets.length > 3 && (
                      <div className="text-[8px] text-muted-foreground font-black pl-1 mt-0.5">
                        +{dayAssets.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SELECTED CALENDAR DAY DETAILS DIALOG */}
      <AnimatePresence>
        {selectedCalendarDay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedCalendarDay(null)}
            />
            {/* Dialog panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-card border border-border shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden z-10 flex flex-col max-h-[85vh] bg-card/95"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between bg-secondary/15">
                <div className="space-y-0.5">
                  <span className="text-xs uppercase font-bold text-primary tracking-wider">Scheduled Content</span>
                  <h3 className="text-base font-black text-foreground">
                    {selectedCalendarDay.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedCalendarDay(null)}
                  className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>

              {/* Assets list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {getAssetsForDay(selectedCalendarDay).length > 0 ? (
                  getAssetsForDay(selectedCalendarDay).map((asset) => {
                    const PlatformIcon = getIcon(asset.type);
                    return (
                      <div key={asset.id} className="border border-border/65 rounded-xl p-4 bg-secondary/10 space-y-3.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <div className="p-2 bg-background border border-border/40 rounded-lg shrink-0 mt-0.5">
                              <PlatformIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground line-clamp-2 leading-snug">
                                {asset.title}
                              </h4>
                              <p className="text-xs text-muted-foreground font-semibold mt-0.5 capitalize">{asset.type} • {asset.performance}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteAsset(asset.id)}
                            className="text-muted-foreground hover:text-red-500 p-1.5 hover:bg-secondary/40 rounded-lg transition-colors cursor-pointer border-0 bg-transparent shrink-0"
                            title="Delete Asset"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Edit panel */}
                        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-border/40">
                          {/* Reschedule Date */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Reschedule</span>
                            <input 
                              type="date" 
                              value={new Date(asset.date).toISOString().split("T")[0]} 
                              onChange={(e) => {
                                  if (e.target.value) {
                                    const newDate = new Date(e.target.value);
                                    const orig = new Date(asset.date);
                                    newDate.setHours(orig.getHours(), orig.getMinutes(), orig.getSeconds());
                                    updateAsset(asset.id, { date: newDate.toISOString() });
                                  }
                                }}
                              className="text-sm bg-background border border-border/80 px-2 py-1.5 rounded-lg text-foreground focus:outline-none focus:border-primary w-full font-bold"
                            />
                          </div>

                          {/* Status Picker */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Status</span>
                            <select 
                              value={asset.status}
                              onChange={(e) => updateAsset(asset.id, { status: e.target.value as MockContentAsset["status"] })}
                              className="text-sm bg-background border border-border/80 px-2 py-1.5 rounded-lg text-foreground focus:outline-none focus:border-primary w-full cursor-pointer font-bold animate-none"
                            >
                              <option value="Draft">Draft</option>
                              <option value="Review">In Review</option>
                              <option value="Published">Published</option>
                              <option value="Idea">Idea</option>
                            </select>
                          </div>
                        </div>

                        {/* Open in Editor Link */}
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={() => {
                              if (typeof window !== "undefined") {
                                localStorage.setItem("cf_prefill_generator", asset.title);
                                localStorage.setItem("cf_prefill_platform", asset.type === "LinkedIn Post" ? "linkedin" : asset.type === "Twitter Thread" ? "twitter" : asset.type === "Newsletter" ? "newsletter" : "script");
                                localStorage.setItem("cf_prefill_source", "text");
                                window.location.href = "/dashboard/generator";
                              }
                            }}
                            className="text-xs text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer bg-transparent border-0 p-0"
                          >
                            Open in Creator Editor →
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <Calendar className="h-8 w-8 text-muted-foreground mb-3" />
                    <h4 className="text-sm font-bold text-foreground">No assets scheduled</h4>
                    <p className="text-xs text-muted-foreground leading-normal mt-0.5 max-w-xs">
                      There are no content assets scheduled or generated for this date.
                    </p>
                  </div>
                )}
              </div>

              {/* Action footer */}
              <div className="p-4 border-t border-border/40 bg-secondary/15 flex gap-2">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("cf_prefill_generator", "");
                      const prefillDate = new Date(selectedCalendarDay);
                      prefillDate.setHours(12, 0, 0, 0);
                      localStorage.setItem("cf_prefill_date", prefillDate.toISOString());
                      window.location.href = "/dashboard/generator";
                    }
                  }}
                  className="flex-1 text-center bg-primary text-primary-foreground py-2 rounded-xl text-sm font-bold hover:opacity-90 cursor-pointer border-0 shadow-sm"
                >
                  Create Asset for this Day
                </button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCalendarDay(null)}
                  className="px-4 py-2 h-9 rounded-xl text-sm font-bold cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING BULK ACTIONS BAR */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card/90 border border-border shadow-[0_15px_45px_-10px_rgba(0,0,0,0.15)] px-6 py-3.5 rounded-full flex items-center gap-6 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 shrink-0 border-r border-border/60 pr-5">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-xs font-black text-foreground">
                {selectedIds.length} assets selected
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-[10px] font-bold rounded-lg border-border/85 bg-background hover:bg-secondary/40 text-foreground cursor-pointer"
                onClick={handleBulkPublish}
              >
                Publish Selected
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-[10px] font-bold rounded-lg border-border/85 bg-background hover:bg-secondary/40 text-foreground cursor-pointer"
                onClick={handleBulkExport}
              >
                <Download className="mr-1 h-3.5 w-3.5 text-muted-foreground" /> Export
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                className="h-8 text-[10px] font-bold rounded-lg cursor-pointer bg-red-600 hover:bg-red-500"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
              </Button>
            </div>
            <button 
              onClick={() => setSelectedIds([])}
              className="text-[10px] text-muted-foreground hover:text-foreground font-bold cursor-pointer hover:underline"
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
