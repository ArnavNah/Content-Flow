"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/context/workspace-context";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Navigation, 
  Settings, 
  FileText, 
  Sparkles, 
  Plus, 
  Layers, 
  Moon, 
  Sun, 
  User, 
  Shield, 
  Check,
  Kanban,
  Lightbulb,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Workspaces" | "Quick Actions" | "Content Assets";
  icon: React.ElementType;
  action: () => void;
}

interface GroupedCommandItem extends CommandItem {
  flatIndex: number;
}

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { 
    workspaces, 
    activeWorkspaceId, 
    setActiveWorkspaceId, 
    assets, 
    generateDemoData,
    setTourCompleted
  } = useWorkspace();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Listen for Ctrl+K, Cmd+K, or custom open event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => {
          const next = !prev;
          if (next) {
            setSearch("");
            setSelectedIndex(0);
          }
          return next;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpen = () => {
      setSearch("");
      setSelectedIndex(0);
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpen);
    };
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const activeWorkspaceAssets = useMemo(() => {
    return assets.filter(a => a.workspaceId === activeWorkspaceId);
  }, [assets, activeWorkspaceId]);

  // Command items mapping
  const commandItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [
      // Navigation
      {
        id: "nav-overview",
        title: "Go to Dashboard Overview",
        subtitle: "View main metrics and content pipeline",
        category: "Navigation",
        icon: Navigation,
        action: () => { router.push("/dashboard"); setIsOpen(false); }
      },
      {
        id: "nav-pipeline",
        title: "Go to Content Pipeline",
        subtitle: "Manage kanban workflow tracking assets",
        category: "Navigation",
        icon: Kanban,
        action: () => { router.push("/dashboard/pipeline"); setIsOpen(false); }
      },
      {
        id: "nav-ideas",
        title: "Go to AI Ideas & Suggestions",
        subtitle: "View content ideas and brainstorming cards",
        category: "Navigation",
        icon: Lightbulb,
        action: () => { router.push("/dashboard/ideas"); setIsOpen(false); }
      },
      {
        id: "nav-workspace",
        title: "Go to Workspace Snapshot",
        subtitle: "Manage team collaboration details and metrics",
        category: "Navigation",
        icon: Users,
        action: () => { router.push("/dashboard/workspace"); setIsOpen(false); }
      },
      {
        id: "nav-generator",
        title: "Go to AI Content Generator",
        subtitle: "Create post drafts and video outlines",
        category: "Navigation",
        icon: Sparkles,
        action: () => { router.push("/dashboard/generator"); setIsOpen(false); }
      },
      {
        id: "nav-library",
        title: "Go to Content Library",
        subtitle: "Manage all generated draft assets",
        category: "Navigation",
        icon: FileText,
        action: () => { router.push("/dashboard/library"); setIsOpen(false); }
      },
      {
        id: "nav-analytics",
        title: "Go to Analytics Center",
        subtitle: "Track reach and audience rates",
        category: "Navigation",
        icon: Layers,
        action: () => { router.push("/dashboard/analytics"); setIsOpen(false); }
      },
      {
        id: "nav-settings-profile",
        title: "Go to Profile Settings",
        subtitle: "Edit account information",
        category: "Navigation",
        icon: User,
        action: () => { router.push("/dashboard/settings"); setIsOpen(false); }
      },
      {
        id: "nav-settings-workspace",
        title: "Go to Workspace Settings",
        subtitle: "Manage team collaboration details",
        category: "Navigation",
        icon: Settings,
        action: () => { router.push("/dashboard/settings/workspace"); setIsOpen(false); }
      },
      
      // Workspaces Switcher
      ...workspaces.map(w => ({
        id: `switch-ws-${w.id}`,
        title: `Switch to: "${w.name}"`,
        subtitle: `Role: ${w.members.find(m => m.name === "John Doe")?.role || "Member"} • Type: ${w.type}`,
        category: "Workspaces" as const,
        icon: Layers,
        action: () => { setActiveWorkspaceId(w.id); setIsOpen(false); }
      })),

      // Quick Actions
      {
        id: "action-gen-linkedin",
        title: "Create LinkedIn Post Draft",
        subtitle: "Redirects to generator with LinkedIn presets",
        category: "Quick Actions",
        icon: Plus,
        action: () => {
          localStorage.setItem("cf_prefill_platform", "linkedin");
          router.push("/dashboard/generator");
          setIsOpen(false);
        }
      },
      {
        id: "action-gen-twitter",
        title: "Create Twitter Thread Draft",
        subtitle: "Redirects to generator with Twitter presets",
        category: "Quick Actions",
        icon: Plus,
        action: () => {
          localStorage.setItem("cf_prefill_platform", "twitter");
          router.push("/dashboard/generator");
          setIsOpen(false);
        }
      },
      {
        id: "action-demo-data",
        title: "Populate Demo Workspace Data",
        subtitle: "Generates 25 scheduled drafts/posts",
        category: "Quick Actions",
        icon: Sparkles,
        action: () => { generateDemoData(); setIsOpen(false); }
      },
      {
        id: "action-restart-tour",
        title: "Restart Product Onboarding Tour",
        subtitle: "Starts the walkthrough guide again",
        category: "Quick Actions",
        icon: Shield,
        action: () => {
          localStorage.removeItem("cf_tour_completed");
          setTourCompleted(false);
          router.push("/dashboard");
          setIsOpen(false);
        }
      },
      {
        id: "action-toggle-theme",
        title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        subtitle: "Toggle between dark and light themes",
        category: "Quick Actions",
        icon: theme === "dark" ? Sun : Moon,
        action: () => { setTheme(theme === "dark" ? "light" : "dark"); setIsOpen(false); }
      },

      // Content Assets
      ...activeWorkspaceAssets.map(asset => ({
        id: `asset-link-${asset.id}`,
        title: asset.title,
        subtitle: `${asset.type} • Status: ${asset.status}`,
        category: "Content Assets" as const,
        icon: FileText,
        action: () => {
          // Redirect to Library and search for this specific asset title
          router.push(`/dashboard/library?search=${encodeURIComponent(asset.title)}`);
          setIsOpen(false);
        }
      }))
    ];

    return items;
  }, [workspaces, activeWorkspaceAssets, theme, router, setActiveWorkspaceId, setTheme, generateDemoData, setTourCompleted]);

  // Filter command list based on search term
  const filteredItems = useMemo(() => {
    if (!search.trim()) return commandItems.filter(i => i.category !== "Content Assets").slice(0, 15);
    const query = search.toLowerCase().trim();
    return commandItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.subtitle?.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    ).slice(0, 20);
  }, [commandItems, search]);

  // Reset selected index when search query changes is now handled inline in onChange

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      scrollSelectedIntoView();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      scrollSelectedIntoView();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  const scrollSelectedIntoView = () => {
    setTimeout(() => {
      const selectedEl = listRef.current?.querySelector("[data-selected='true']");
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }, 10);
  };

  // Group filtered items by category
  const groupedItems = useMemo(() => {
    const groups: { [key: string]: GroupedCommandItem[] } = {};
    filteredItems.forEach((item, index) => {
      // Keep track of the item's index in the flat filteredItems array
      const itemWithIndex: GroupedCommandItem = { ...item, flatIndex: index };
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(itemWithIndex);
    });
    return groups;
  }, [filteredItems]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Spotlight Dialog panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[480px] outline-none"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input bar */}
            <div className="flex items-center gap-3.5 px-4 py-3 border-b border-border/40 bg-secondary/10">
              <Search className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
              <input 
                ref={inputRef}
                type="text"
                placeholder="Type a command or search content..."
                className="w-full bg-transparent border-0 outline-none placeholder-muted-foreground text-sm font-medium text-foreground py-0.5 focus:ring-0"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border/60 bg-background px-1.5 font-mono text-xs font-bold text-muted-foreground shadow-sm">
                ESC
              </kbd>
            </div>

            {/* List panel */}
            <div 
              ref={listRef}
              className="flex-1 overflow-y-auto p-2 space-y-4 max-h-[360px]"
            >
              {filteredItems.length > 0 ? (
                Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className="space-y-1.5">
                    {/* Category Label */}
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      {category}
                    </div>
                    {/* Items */}
                    <div className="space-y-0.5">
                      {items.map((item: GroupedCommandItem) => {
                        const Icon = item.icon;
                        const isSelected = selectedIndex === item.flatIndex;
                        
                        return (
                          <div
                            key={item.id}
                            data-selected={isSelected}
                            onClick={item.action}
                            className={cn(
                              "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer select-none transition-colors group",
                              isSelected 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-secondary/60 text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3.5 overflow-hidden">
                              <div className={cn(
                                "h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                                isSelected 
                                  ? "bg-primary-foreground/15 border-transparent text-primary-foreground" 
                                  : "bg-secondary/40 border-border/40 text-muted-foreground group-hover:bg-card"
                              )}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold truncate leading-none mb-1">
                                  {item.title}
                                </span>
                                {item.subtitle && (
                                  <span className={cn(
                                    "text-xs truncate leading-none",
                                    isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
                                  )}>
                                    {item.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Switch Check indicators */}
                            {item.id === `switch-ws-${activeWorkspaceId}` && (
                              <Check className={cn("h-4 w-4", isSelected ? "text-primary-foreground" : "text-primary")} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="h-10 w-10 bg-secondary/50 rounded-xl flex items-center justify-center text-muted-foreground mb-3">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-0.5">No commands found</p>
                  <p className="text-xs text-muted-foreground">Try searching for other terms like &apos;theme&apos; or &apos;dashboard&apos;.</p>
                </div>
              )}
            </div>

            {/* Footer helpbar */}
            <div className="px-4 py-2 border-t border-border/30 bg-secondary/20 flex items-center justify-between text-xs font-semibold text-muted-foreground select-none">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="border border-border/80 bg-background rounded px-1 text-[10px] shadow-sm">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border border-border/80 bg-background rounded px-1 text-[10px] shadow-sm">↵</kbd> Select
                </span>
              </div>
              <div>
                <span>ContentFlow Spotlight</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
