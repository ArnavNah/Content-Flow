"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, Library, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Gen", href: "/dashboard/generator", icon: Sparkles },
  { name: "Library", href: "/dashboard/library", icon: Library },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-md border-t border-border flex items-center justify-around md:hidden px-2 z-40 shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.06)] pb-safe">
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 py-1 px-2 text-[10px] font-medium transition-all duration-200 gap-1 rounded-xl h-12",
              isActive 
                ? "text-primary bg-primary/5 font-semibold" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            )}
          >
            <item.icon className={cn("h-4.5 w-4.5 transition-transform duration-200", isActive && "scale-105")} />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
