"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MessageSquare, Mail } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { useMemo } from "react";

export function RecentActivity() {
  const { assets, activeWorkspace } = useWorkspace();

  const activities = useMemo(() => {
    // Filter assets for this active workspace
    const wsAssets = assets.filter(a => a.workspaceId === activeWorkspace.id);

    // Convert assets to activities
    const assetActivities = wsAssets.map(asset => {
      let title = "";
      let icon = Briefcase;
      let color = "text-blue-600";
      let bg = "bg-blue-600/10";

      if (asset.type === "LinkedIn Post") {
        icon = Briefcase;
        color = "text-blue-600";
        bg = "bg-blue-600/10";
      } else if (asset.type === "Twitter Thread") {
        icon = MessageSquare;
        color = "text-sky-500";
        bg = "bg-sky-500/10";
      } else if (asset.type === "Newsletter") {
        icon = Mail;
        color = "text-orange-500";
        bg = "bg-orange-500/10";
      }

      if (asset.status === "Published") {
        title = `Published ${asset.type}`;
      } else if (asset.status === "Review") {
        title = `Submitted ${asset.type} for review`;
      } else if (asset.status === "Idea") {
        title = `Added ${asset.type} idea`;
      } else {
        title = `Generated ${asset.type} draft`;
      }

      // Calculate simple time string
      let time = "Just now";
      try {
        const diff = new Date("2026-06-17T20:00:00.000Z").getTime() - new Date(asset.date).getTime();
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) time = days === 1 ? "Yesterday" : `${days} days ago`;
        else if (hours > 0) time = `${hours} hours ago`;
        else if (mins > 0) time = `${mins} mins ago`;
      } catch {
        time = "Recent";
      }

      return {
        title,
        source: asset.title,
        time,
        icon,
        color,
        bg
      };
    });

    // Fallback if we have fewer than 4 activities to keep layout rich
    if (assetActivities.length < 4) {
      const defaultActivities = [
        {
          title: "Workspace members synchronized",
          source: `Active members in ${activeWorkspace.name}`,
          time: "1 day ago",
          icon: Briefcase,
          color: "text-emerald-600",
          bg: "bg-emerald-600/10"
        },
        {
          title: "Workspace initialized",
          source: `${activeWorkspace.name} setup completed`,
          time: "2 days ago",
          icon: Briefcase,
          color: "text-purple-600",
          bg: "bg-purple-600/10"
        }
      ];
      return [...assetActivities, ...defaultActivities].slice(0, 4);
    }

    return assetActivities.slice(0, 4);
  }, [assets, activeWorkspace]);

  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm border border-border/60 bg-card">
      <CardHeader>
        <CardTitle className="text-base font-bold text-foreground">Recent Activity</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">Latest generations and exports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.bg}`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1 space-y-1 overflow-hidden">
                <p className="text-sm font-medium leading-none truncate text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.source}</p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
