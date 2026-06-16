"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, FileText, Share2, Award, ArrowUpRight, CheckCircle } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const members = [
  { name: "John Doe", role: "Owner", initials: "JD", color: "bg-emerald-500/10 text-emerald-600" },
  { name: "Alice Smith", role: "Writer", initials: "AS", color: "bg-blue-500/10 text-blue-600" },
  { name: "Koby Lee", role: "Editor", initials: "KL", color: "bg-indigo-500/10 text-indigo-600" }
];

const activities = [
  { text: "LinkedIn Draft scheduled by John", time: "2h ago" },
  { text: "Alice Smith joined Workspace", time: "5h ago" },
  { text: "Twitter thread exported to library", time: "1d ago" }
];

export function WorkspaceSnapshot() {
  const healthScore = 96;

  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card flex flex-col justify-between">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-foreground">Workspace Snapshot</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Active: <span className="font-bold text-foreground">Personal Brand</span>
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
            <div className="text-sm font-bold text-foreground mt-0.5">420 total</div>
          </div>
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Reach</span>
            <div className="text-sm font-bold text-emerald-600 flex items-center mt-0.5">
              <span>54K</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="border border-border/60 rounded-xl p-3 bg-secondary/10 hover:bg-secondary/25 transition-colors">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Published</span>
            <div className="text-sm font-bold text-foreground mt-0.5">83 items</div>
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
            <button className="text-[10px] font-semibold text-primary hover:underline cursor-pointer">Invite</button>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border/40" />

        {/* Recent Activity List */}
        <div className="space-y-2">
          <h4 className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Recent Workspace Activity</h4>
          <div className="space-y-2.5">
            {activities.map((a, idx) => (
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
    </Card>
  );
}
