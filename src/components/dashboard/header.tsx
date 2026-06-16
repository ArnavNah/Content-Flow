"use client";

import { useState } from "react";
import { Bell, Search, Settings, User, LogOut, ChevronDown, Check, Sparkles, Shield, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const workspaces = [
  { id: "personal", name: "Personal Brand", type: "Personal" },
  { id: "team", name: "ContentFlow Team", type: "Team" },
  { id: "creator", name: "Creator Studio", type: "Agency" }
];

const mockNotifications = [
  { id: 1, text: "AI Suggestion: 'Top 5 LinkedIn Hooks' is ready", time: "10m ago", read: false },
  { id: 2, text: "Twitter thread scheduled successfully", time: "2h ago", read: false },
  { id: 3, text: "Engagement spike detected on LinkedIn post (+24%)", time: "1d ago", read: true },
];

export function Header() {
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-35 transition-all duration-300">
      {/* Left: Workspace Switcher */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-secondary border border-border/60 text-sm font-medium text-foreground transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="max-w-[120px] truncate">{activeWorkspace.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 mt-1 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-3 py-1.5">Switch Workspace</DropdownMenuLabel>
            {workspaces.map((w) => (
              <DropdownMenuItem 
                key={w.id} 
                className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg text-sm"
                onClick={() => setActiveWorkspace(w)}
              >
                <div className="flex flex-col">
                  <span>{w.name}</span>
                  <span className="text-[10px] text-muted-foreground">{w.type}</span>
                </div>
                {activeWorkspace.id === w.id && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-primary focus:text-primary px-3 py-2 cursor-pointer rounded-lg text-sm">
              <UserPlus className="h-4 w-4" />
              <span>Create Workspace</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Middle: Search with shortcut */}
      <div className="hidden md:flex items-center w-full max-w-sm lg:max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search assets, drafts, analytics..." 
            className="w-full pl-10 pr-12 bg-secondary/40 border-border/80 focus-visible:bg-card h-9 rounded-full text-xs transition-all duration-200"
          />
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/80 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-2 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-full hover:bg-secondary cursor-pointer focus:outline-none">
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse"></span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 mt-1 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] p-2">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
              <span className="text-xs font-semibold text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-[10px] text-primary hover:underline font-medium cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="py-1 max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`flex flex-col gap-1 px-3 py-2.5 hover:bg-secondary/40 rounded-lg transition-colors cursor-pointer text-xs ${!n.read ? 'bg-emerald-500/[0.02]' : ''}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-medium ${!n.read ? 'text-foreground' : 'text-muted-foreground'}`}>{n.text}</p>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1"></span>}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings Shortcut */}
        <Link 
          href="/dashboard/settings" 
          className="p-2 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-full hover:bg-secondary hidden sm:inline-flex"
          title="Workspace Settings"
        >
          <Settings className="h-4.5 w-4.5" />
        </Link>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 hover:bg-secondary p-1 rounded-full border border-transparent hover:border-border/60 transition-all duration-200 cursor-pointer focus:outline-none">
            <Avatar className="h-7.5 w-7.5 border border-border/60">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col px-3 py-2.5 border-b border-border/40">
              <span className="text-xs font-semibold text-foreground leading-none">John Doe</span>
              <span className="text-[10px] text-muted-foreground mt-1 truncate">john.doe@contentflow.ai</span>
            </div>
            <div className="p-1">
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-xs">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <Link href="/dashboard/settings" className="w-full">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-xs">
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                <Link href="/dashboard/settings/workspace" className="w-full">Workspace Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg text-xs">
                <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Security & API</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <div className="p-1">
              <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer text-red-500 focus:text-red-500 rounded-lg text-xs">
                <LogOut className="h-3.5 w-3.5" />
                <Link href="/" className="w-full">Log out</Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
