"use client";

import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-16 border-b border-border/40 bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search campaigns, content, or generators..." 
            className="w-full pl-9 bg-muted/50 border-transparent focus-visible:bg-background h-9 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
        </button>
      </div>
    </header>
  );
}
