"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Award, ArrowUpRight, CheckCircle } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";

export function WorkspaceSnapshot() {
  const { activeWorkspace, assets } = useWorkspace();
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const members = activeWorkspace.members;
  const healthScore = activeWorkspace.healthScore;

  const workspaceAssets = useMemo(() => {
    return assets.filter(a => a.workspaceId === activeWorkspace.id);
  }, [assets, activeWorkspace.id]);

  const totalAssets = activeWorkspace.baselineKPIs.assets;
  const publishedAssetsCount = workspaceAssets.filter(a => a.status === "Published").length + Math.round(totalAssets * 0.7);

  const formatReach = (val: number) => {
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
    return val.toString();
  };

  const dynamicActivities = useMemo(() => {
    // 1. Convert assets to activity events
    const assetActivities = workspaceAssets.map(asset => {
      let text = "";
      if (asset.status === "Published") {
        text = `Published ${asset.type}`;
      } else if (asset.status === "Review") {
        text = `Submitted ${asset.type} for Review`;
      } else if (asset.status === "Idea") {
        text = `Added ${asset.type} Idea`;
      } else {
        text = `Created ${asset.type} Draft`;
      }

      // Calculate time string
      let time = "Just now";
      const timestamp = new Date(asset.date).getTime();
      try {
        const diff = new Date("2026-06-17T20:00:00.000Z").getTime() - timestamp;
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) time = days === 1 ? "1d ago" : `${days}d ago`;
        else if (hours > 0) time = `${hours}h ago`;
        else if (mins > 0) time = `${mins}m ago`;
      } catch {
        time = "Recent";
      }

      return {
        text,
        time,
        timestamp
      };
    });

    // 2. Convert workspace members to activity events
    const memberActivities = members.map((m, idx) => {
      let time = `${idx + 1}d ago`;
      let timestamp = new Date("2026-06-17T20:00:00.000Z").getTime() - (idx + 1) * 24 * 60 * 60 * 1000;

      // If the member is Steve Jobs (or not in initial member list), it means they were newly invited in the session!
      const initialNames = [
        "John Doe", "Alice Smith", "Koby Lee", 
        "Sarah Connor", "Marcus Aurelius", "Cleopatra Philopator", 
        "Elon Musk", "Gwynne Shotwell"
      ];
      if (!initialNames.includes(m.name)) {
        time = "Just now";
        timestamp = new Date("2026-06-17T20:00:00.000Z").getTime();
      }

      return {
        text: `${m.name} joined Workspace`,
        time,
        timestamp
      };
    });

    // 3. Merge, sort by timestamp (descending), and slice to 3
    const merged = [...assetActivities, ...memberActivities].sort((a, b) => b.timestamp - a.timestamp);
    
    // If we have fewer than 3, pad with a workspace initialized event
    if (merged.length < 3) {
      merged.push({
        text: `${activeWorkspace.name} setup completed`,
        time: "3d ago",
        timestamp: new Date("2026-06-17T20:00:00.000Z").getTime() - 3 * 24 * 60 * 60 * 1000
      });
    }

    return merged.slice(0, 3);
  }, [workspaceAssets, members, activeWorkspace.name]);

  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card flex flex-col justify-between h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-foreground">Workspace Snapshot</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Active: <span className="font-bold text-foreground">{activeWorkspace.name}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5 flex-1 flex flex-col justify-between">
        {/* Health Score Circular Gauge */}
        <div className="flex items-center justify-between bg-secondary/30 border border-border/40 rounded-2xl p-4 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Health Score</span>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-foreground">{healthScore}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">Optimal</span>
            </div>
            <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">Excellent output rate and audience engagement.</p>
          </div>
          
          {/* SVG Progress Circle */}
          <div className="relative h-14 w-14 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-border/40"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary"
                strokeDasharray={`${healthScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Award className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Small Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Members</span>
            <div className="text-sm font-bold text-foreground mt-0.5">{members.length} active</div>
          </div>
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Assets</span>
            <div className="text-sm font-bold text-foreground mt-0.5">{totalAssets.toLocaleString()} total</div>
          </div>
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Reach</span>
            <div className="text-sm font-bold text-emerald-600 flex items-center mt-0.5">
              <span>{formatReach(activeWorkspace.baselineKPIs.reach)}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Published</span>
            <div className="text-sm font-bold text-foreground mt-0.5">{publishedAssetsCount.toLocaleString()} items</div>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/40" />

        {/* Team Members List */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Workspace Team</h4>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2.5 overflow-hidden">
              {members.map((m, idx) => (
                <Avatar key={idx} className="h-7 w-7 border-2 border-card" title={`${m.name} (${m.role})`}>
                  <AvatarFallback className={`${m.color} text-[9px] font-black`}>{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Link href="/dashboard/settings/workspace" className="text-[10px] font-semibold text-primary hover:underline cursor-pointer">
              Invite
            </Link>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/40" />

        {/* Recent Activity List */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Recent Workspace Activity</h4>
            <button 
              onClick={() => setIsTimelineOpen(true)}
              className="text-[10px] font-semibold text-primary hover:underline cursor-pointer bg-transparent border-0 p-0"
            >
              View Log
            </button>
          </div>
          <div className="space-y-2.5">
            {dynamicActivities.map((a, idx) => (
              <div key={idx} className="flex justify-between items-start text-[11px] gap-2 leading-tight">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span className="line-clamp-1">{a.text}</span>
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <ActivityTimeline isOpen={isTimelineOpen} onClose={() => setIsTimelineOpen(false)} />
    </Card>
  );
}
