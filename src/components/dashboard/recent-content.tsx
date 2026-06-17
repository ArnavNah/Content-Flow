"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AtSign, Mail, Play, Eye, Copy, Edit, MoreVertical, Trash } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import Link from "next/link";
import { useState } from "react";
import { MockContentAsset } from "@/data/mock-data";

export function RecentContent() {
  const { assets, activeWorkspace, updateAsset, deleteAsset, addAsset } = useWorkspace();
  const workspaceAssets = assets.filter(a => a.workspaceId === activeWorkspace.id);
  const recentAssets = workspaceAssets.slice(0, 5);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleStartEdit = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleSaveEdit = (id: number) => {
    if (editingTitle.trim()) {
      updateAsset(id, { title: editingTitle.trim() });
    }
    setEditingId(null);
  };

  const handleDuplicate = (item: MockContentAsset) => {
    addAsset(
      `${item.title} (Copy)`, 
      item.type, 
      item.status === "Published" ? "Published" : "Draft", 
      item.perfValue
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "LinkedIn Post": return LinkedinIcon;
      case "Twitter Thread": return AtSign;
      case "Newsletter": return Mail;
      case "Video Script": return Play;
      default: return LinkedinIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Review": return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "Idea": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default: return "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20";
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diffTime = Math.abs(new Date().getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recent";
    }
  };

  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card overflow-hidden h-full">
      <CardHeader className="pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold text-foreground">Recent Content</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Overview of recently processed and published assets
          </CardDescription>
        </div>
        
        <Link href="/dashboard/library" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer">
          <span>View Library</span>
          <Eye className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Responsive Container */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/40 text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-border/40">
              <TableRow className="hover:bg-transparent border-0">
                <TableHead className="h-10 pl-6 text-left">Title</TableHead>
                <TableHead className="h-10 text-left">Type</TableHead>
                <TableHead className="h-10 text-left">Status</TableHead>
                <TableHead className="h-10 text-left">Performance</TableHead>
                <TableHead className="h-10 text-left">Date</TableHead>
                <TableHead className="h-10 pr-6 text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {recentAssets.map((item) => {
                const PlatformIcon = getIcon(item.type);
                const isEditing = editingId === item.id;
                return (
                  <TableRow 
                    key={item.id} 
                    className="hover:bg-secondary/10 border-b border-border/40 last:border-0 transition-colors group"
                  >
                    {/* Title */}
                    <TableCell className="pl-6 py-4 font-bold text-foreground max-w-sm truncate text-xs">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input 
                            value={editingTitle} 
                            onChange={(e) => setEditingTitle(e.target.value)}
                            className="h-8 text-xs bg-background border border-primary focus:outline-none focus:ring-1 focus:ring-primary px-2 rounded-lg py-1 w-full"
                            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(item.id)}
                            autoFocus
                          />
                          <button 
                            className="bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] font-bold px-2 py-1 rounded-md cursor-pointer"
                            onClick={() => handleSaveEdit(item.id)}
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <span className="line-clamp-1">{item.title}</span>
                      )}
                    </TableCell>
                    
                    {/* Type / Platform */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                        <PlatformIcon className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{item.type}</span>
                      </div>
                    </TableCell>
                    
                    {/* Status Badge */}
                    <TableCell className="py-4">
                      <Badge variant="outline" className={`text-[10px] font-semibold tracking-wider rounded-md py-0.5 border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    
                    {/* Performance */}
                    <TableCell className="py-4 text-xs font-semibold text-foreground">
                      <span className={item.status === "Published" ? "text-emerald-600" : "text-muted-foreground"}>
                        {item.performance}
                      </span>
                    </TableCell>
                    
                    {/* Date */}
                    <TableCell className="py-4 text-xs text-muted-foreground font-semibold">
                      {formatDate(item.date)}
                    </TableCell>
                    
                    {/* Actions dropdown and micro-buttons */}
                    <TableCell className="pr-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {/* View Action */}
                        <Link 
                          href="/dashboard/library" 
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                          title="View library"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        
                        {/* Action Menu Trigger */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer focus:outline-none">
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl mt-0.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                            <DropdownMenuItem 
                              onClick={() => handleStartEdit(item.id, item.title)}
                              className="flex items-center gap-2 cursor-pointer rounded-lg text-xs"
                            >
                              <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>Edit title</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDuplicate(item)}
                              className="flex items-center gap-2 cursor-pointer rounded-lg text-xs"
                            >
                              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>Duplicate asset</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => deleteAsset(item.id)}
                              className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer rounded-lg text-xs"
                            >
                              <Trash className="h-3.5 w-3.5" />
                              <span>Delete asset</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
