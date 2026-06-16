"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AtSign, Mail, Play, Eye, Copy, Edit, MoreVertical, ExternalLink } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const mockContent = [
  {
    id: 1,
    title: "How I Built My Agency from Scratch",
    type: "LinkedIn Post",
    icon: LinkedinIcon,
    status: "Published",
    statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    performance: "12.3K Reach",
    perfType: "Reach",
    date: "Today",
  },
  {
    id: 2,
    title: "Why Founders Fail at Delegation",
    type: "Twitter Thread",
    icon: AtSign,
    status: "Published",
    statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    performance: "8.4K Impressions",
    perfType: "Reach",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Scaling Content Operations with AI",
    type: "Newsletter",
    icon: Mail,
    status: "Review",
    statusColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    performance: "Draft",
    perfType: "Status",
    date: "2 days ago",
  },
  {
    id: 4,
    title: "SaaS Launch Announcement Video",
    type: "Video Script",
    icon: Play,
    status: "Draft",
    statusColor: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
    performance: "Draft",
    perfType: "Status",
    date: "3 days ago",
  },
  {
    id: 5,
    title: "10 Frameworks for Writing Better Code",
    type: "LinkedIn Post",
    icon: LinkedinIcon,
    status: "Published",
    statusColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    performance: "24.5K Reach",
    perfType: "Reach",
    date: "1 week ago",
  }
];

export function RecentContent() {
  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card overflow-hidden">
      <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold text-foreground">Recent Content</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Overview of recently processed and published assets
          </CardDescription>
        </div>
        
        <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5 cursor-pointer">
          <span>View Library</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
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
              {mockContent.map((item, index) => {
                const PlatformIcon = item.icon;
                return (
                  <TableRow 
                    key={item.id} 
                    className="hover:bg-secondary/10 border-b border-border/40 last:border-0 transition-colors group"
                  >
                    {/* Title */}
                    <TableCell className="pl-6 py-4 font-bold text-foreground max-w-sm truncate text-xs">
                      {item.title}
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
                      <Badge variant="outline" className={`text-[10px] font-semibold tracking-wider rounded-md py-0.5 border ${item.statusColor}`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    
                    {/* Performance */}
                    <TableCell className="py-4 text-xs font-semibold text-foreground">
                      <span className={item.perfType === "Reach" ? "text-emerald-600" : "text-muted-foreground"}>
                        {item.performance}
                      </span>
                    </TableCell>
                    
                    {/* Date */}
                    <TableCell className="py-4 text-xs text-muted-foreground font-semibold">
                      {item.date}
                    </TableCell>
                    
                    {/* Actions dropdown and micro-buttons */}
                    <TableCell className="pr-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-80 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {/* View Action */}
                        <button 
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                          title="View analytics"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        {/* Action Menu Trigger */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer focus:outline-none">
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 rounded-xl mt-0.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg text-xs">
                              <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>Edit content</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer rounded-lg text-xs">
                              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>Duplicate asset</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer rounded-lg text-xs">
                              <span>Archive item</span>
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
