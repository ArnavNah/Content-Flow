"use client";

import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Clock, 
  UserPlus, 
  FileText, 
  AtSign, 
  Mail, 
  Play, 
  Sparkles
} from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

interface ActivityTimelineProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityTimeline({ isOpen, onClose }: ActivityTimelineProps) {
  const { assets, activeWorkspace } = useWorkspace();
  const members = activeWorkspace.members;

  const timelineEvents = useMemo(() => {
    const wsAssets = assets.filter(a => a.workspaceId === activeWorkspace.id);

    // 1. Map assets to timeline events
    const assetEvents = wsAssets.map(asset => {
      let text = "";
      let icon: React.ElementType = FileText;
      let color = "text-blue-500 bg-blue-500/10 border-blue-500/15";

      if (asset.type === "LinkedIn Post") {
        icon = LinkedinIcon;
        color = "text-emerald-600 bg-emerald-500/10 border-emerald-500/15";
      } else if (asset.type === "Twitter Thread") {
        icon = AtSign;
        color = "text-sky-500 bg-sky-500/10 border-sky-500/15";
      } else if (asset.type === "Newsletter") {
        icon = Mail;
        color = "text-orange-500 bg-orange-500/10 border-orange-500/15";
      } else if (asset.type === "Video Script") {
        icon = Play;
        color = "text-purple-500 bg-purple-500/10 border-purple-500/15";
      }

      if (asset.status === "Published") {
        text = `Published ${asset.type} "${asset.title.slice(0, 30)}..."`;
      } else if (asset.status === "Review") {
        text = `Submitted ${asset.type} "${asset.title.slice(0, 30)}..." for Review`;
      } else if (asset.status === "Idea") {
        text = `Added ${asset.type} Idea: "${asset.title.slice(0, 30)}..."`;
      } else {
        text = `Created ${asset.type} Draft: "${asset.title.slice(0, 30)}..."`;
      }

      return {
        id: `asset-event-${asset.id}`,
        text,
        time: asset.date,
        status: asset.status,
        type: asset.type,
        icon,
        color,
        timestamp: new Date(asset.date).getTime()
      };
    });

    // 2. Map members to timeline events
    const memberEvents = members.map((m, memberIdx) => {
      // Spread pre-defined members across the past
      const daysAgo = memberIdx + 1;
      const date = new Date("2026-06-17T20:00:00.000Z");
      
      const initialNames = [
        "John Doe", "Alice Smith", "Koby Lee", 
        "Sarah Connor", "Marcus Aurelius", "Cleopatra Philopator", 
        "Elon Musk", "Gwynne Shotwell"
      ];
      
      let timestamp = date.getTime() - daysAgo * 24 * 60 * 60 * 1000;
      if (!initialNames.includes(m.name)) {
        timestamp = date.getTime(); // Newly invited member
      }

      return {
        id: `member-event-${m.name}-${memberIdx}`,
        text: `Team member ${m.name} joined the workspace as ${m.role}`,
        time: new Date(timestamp).toISOString(),
        status: "Member",
        type: "Workspace Invite",
        icon: UserPlus,
        color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/15",
        timestamp
      };
    });

    // 3. Merge and sort
    const merged = [...assetEvents, ...memberEvents].sort((a, b) => b.timestamp - a.timestamp);
    
    // Add setup event at the end
    merged.push({
      id: "setup-event",
      text: `Workspace "${activeWorkspace.name}" was initialized`,
      time: new Date("2026-06-14T12:00:00.000Z").toISOString(),
      status: "System",
      type: "System Setup",
      icon: Sparkles,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/15",
      timestamp: new Date("2026-06-14T12:00:00.000Z").getTime()
    });

    return merged;
  }, [assets, activeWorkspace, members]);

  // Group events by Date heading
  const groupedEvents = useMemo(() => {
    const groups: { [key: string]: typeof timelineEvents } = {};
    
    timelineEvents.forEach(event => {
      const date = new Date(event.time);
      const today = new Date("2026-06-17T20:00:00.000Z");
      const yesterday = new Date("2026-06-17T20:00:00.000Z");
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      
      if (date.toDateString() === today.toDateString() || event.timestamp > today.getTime() - 10 * 60 * 1000) {
        groupKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Yesterday";
      } else {
        const diffDays = Math.ceil(Math.abs(today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays < 7) {
          groupKey = "This Week";
        }
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(event);
    });

    return groups;
  }, [timelineEvents]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published": 
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[9px] scale-90">Published</Badge>;
      case "Review": 
        return <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 text-[9px] scale-90">In Review</Badge>;
      case "Member":
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-[9px] scale-90">Team</Badge>;
      case "System":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[9px] scale-90">System</Badge>;
      default: 
        return <Badge className="bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20 text-[9px] scale-90">Draft</Badge>;
    }
  };

  const getFormattedTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    } catch {
      return "00:00";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-card border-l border-border/60 shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-border/40 flex items-center justify-between bg-secondary/10">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <Clock className="h-4.5 w-4.5 text-primary" /> Workspace Activity Log
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">Audit logs for {activeWorkspace.name}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Scrollable log contents */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {Object.entries(groupedEvents).map(([group, events]) => (
                  <div key={group} className="space-y-4">
                    {/* Date header */}
                    <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider sticky top-0 bg-card py-1 z-10 flex items-center gap-2">
                      <span>{group}</span>
                      <div className="h-px bg-border/60 flex-1" />
                    </div>

                    {/* Timeline items list */}
                    <div className="relative border-l border-border/80 ml-3.5 pl-6 space-y-5">
                      {events.map((event) => {
                        const Icon = event.icon;
                        return (
                          <div key={event.id} className="relative group/item">
                            {/* Dot indicator */}
                            <div className="absolute -left-[35px] top-0.5 z-10">
                              <div className={`h-7 w-7 rounded-full border flex items-center justify-center transition-transform group-hover/item:scale-105 ${event.color}`}>
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                            </div>

                            {/* Meta & Info details */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-foreground leading-normal">
                                  {event.text}
                                </span>
                                {getStatusBadge(event.status)}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                                <span>{event.type}</span>
                                <span>•</span>
                                <span>{getFormattedTime(event.time)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
