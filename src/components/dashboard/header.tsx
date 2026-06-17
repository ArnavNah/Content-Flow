"use client";

import { Bell, Search, Settings, User, LogOut, ChevronDown, Check, Shield, UserPlus, Info, CheckCircle2, AlertTriangle, Inbox } from "lucide-react";
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
import { useWorkspace } from "@/context/workspace-context";

export function Header() {
  const { 
    activeWorkspaceId, 
    setActiveWorkspaceId, 
    workspaces, 
    currentUser, 
    logoutUser,
    notifications,
    markNotificationAsRead,
    clearAllNotifications
  } = useWorkspace();
  
  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />;
      case "warning": return <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />;
      default: return <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />;
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-35 transition-all duration-300 flex items-center w-full">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
      {/* Left: Workspace Switcher */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger id="header-switcher" className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-secondary border border-border/60 text-sm font-medium text-foreground transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/30">
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
                onClick={() => setActiveWorkspaceId(w.id)}
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

      {/* Middle: Spotlight search button */}
      <div className="hidden md:flex items-center w-full max-w-sm lg:max-w-md mx-4">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
          className="relative w-full text-left h-9 pl-10 pr-12 bg-secondary/40 border border-border/80 hover:bg-secondary/60 rounded-full text-xs text-muted-foreground transition-all duration-200 cursor-pointer flex items-center select-none"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <span>Search assets, drafts, actions...</span>
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/80 bg-background px-1.5 font-mono text-[9px] font-bold text-muted-foreground shadow-sm">
            <span>⌘</span>K
          </kbd>
        </button>
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
              <span className="text-sm font-semibold text-foreground">Notifications</span>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick={clearAllNotifications}
                    className="text-xs text-muted-foreground hover:text-foreground font-medium cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
            <div className="py-1 max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => markNotificationAsRead(n.id)}
                    className={`flex items-start gap-2.5 px-3 py-2.5 hover:bg-secondary/40 rounded-lg transition-colors cursor-pointer text-sm ${!n.read ? 'bg-primary/[0.02] font-semibold' : ''}`}
                  >
                    {getNotificationIcon(n.type)}
                    <div className="flex-1 space-y-0.5 overflow-hidden">
                      <p className={!n.read ? 'text-foreground' : 'text-muted-foreground'}>{n.text}</p>
                      <span className="text-xs text-muted-foreground font-normal block">{n.time}</span>
                    </div>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5"></span>}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-2 text-muted-foreground select-none">
                  <Inbox className="h-8 w-8 text-muted-foreground/60" />
                  <p className="text-sm font-bold text-foreground">All caught up!</p>
                  <p className="text-xs">No new notifications inside this workspace.</p>
                </div>
              )}
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
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{currentUser.initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col px-3 py-2.5 border-b border-border/40">
              <span className="text-xs font-semibold text-foreground leading-none">{currentUser.name}</span>
              <span className="text-[10px] text-muted-foreground mt-1 truncate">{currentUser.email}</span>
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
              <DropdownMenuItem onClick={logoutUser} className="flex items-center gap-2 px-3 py-2 cursor-pointer text-red-500 focus:text-red-500 rounded-lg text-xs">
                <LogOut className="h-3.5 w-3.5" />
                <Link href="/" className="w-full">Log out</Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        </div>
      </div>
    </header>
  );
}
