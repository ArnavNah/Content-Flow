"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, LayoutDashboard, Sparkles, Library, Settings, BarChart3, CreditCard, LogOut, User, Calendar, FolderKanban } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";


const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: FolderKanban },
  { name: "AI Generator", href: "/dashboard/generator", icon: Sparkles },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Content Library", href: "/dashboard/library", icon: Library },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const settingsItems = [
  { name: "Workspaces", href: "/dashboard/settings/workspace", icon: Layers },
  { name: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace, currentUser, logoutUser } = useWorkspace();

  return (
    <aside className="hidden md:flex w-64 border-r border-border/40 bg-background flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-xl border border-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">ContentFlow<span className="text-primary">.ai</span></span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
        <div>
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Platform</p>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Configuration</p>
          <nav className="flex flex-col gap-1">
            {settingsItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard/settings" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-border/40">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors outline-none text-left">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {currentUser.initials}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">{currentUser.name}</span>
              <span className="text-xs text-muted-foreground truncate">{activeWorkspace.name}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" sideOffset={12} className="w-56 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/dashboard/settings" className="flex w-full items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Profile Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/dashboard/settings/workspace" className="flex w-full items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Workspace Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutUser} className="text-red-500 focus:text-red-500 cursor-pointer">
              <Link href="/" className="flex w-full items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
