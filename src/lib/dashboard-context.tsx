"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { 
  WORKSPACES, 
  MOCK_SUGGESTIONS, 
  MOCK_CONTENT_ASSETS, 
  MOCK_ACTIVITIES,
  WorkspaceConfig, 
  MockContentAsset, 
  MockSuggestion 
} from "@/data/mock-data";

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  timestamp: Date;
}

interface DashboardContextType {
  hydrated: boolean;
  activeWorkspace: WorkspaceConfig;
  workspaces: WorkspaceConfig[];
  assets: MockContentAsset[];
  activeSuggestions: MockSuggestion[];
  recentActivity: ActivityItem[];
  isGenerating: boolean;
  generationStep: string;
  kpis: {
    assets: number;
    reach: number;
    engagement: number;
    drafts: number;
  };
  switchWorkspace: (id: "personal" | "agency" | "startup") => void;
  dismissSuggestion: (id: number) => void;
  saveSuggestion: (id: number) => void;
  generateContent: (title?: string) => Promise<void>;
  resetDemoData: () => void;
  deleteAsset: (id: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  
  // States
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<"personal" | "agency" | "startup">("personal");
  const [assets, setAssets] = useState<MockContentAsset[]>([]);
  const [dismissedSuggestionIds, setDismissedSuggestionIds] = useState<number[]>([]);
  const [customActivities, setCustomActivities] = useState<ActivityItem[]>([]);
  
  // Ticking adjustments for KPI metrics (simulates live SaaS traffic)
  const [kpiIncrements, setKpiIncrements] = useState<Record<string, { assets: number; reach: number; engagement: number; drafts: number }>>({
    personal: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
    agency: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
    startup: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
  });

  // Generator States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  // 1. Initial Load & Hydration from LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWorkspace = localStorage.getItem("cf_active_workspace") as "personal" | "agency" | "startup";
      if (savedWorkspace) {
        setTimeout(() => {
          setActiveWorkspaceId(savedWorkspace);
        }, 0);
      }

      const savedAssets = localStorage.getItem("cf_content_assets");
      if (savedAssets) {
        setTimeout(() => {
          setAssets(JSON.parse(savedAssets));
        }, 0);
      } else {
        setTimeout(() => {
          setAssets(MOCK_CONTENT_ASSETS);
        }, 0);
        localStorage.setItem("cf_content_assets", JSON.stringify(MOCK_CONTENT_ASSETS));
      }

      const savedDismissed = localStorage.getItem("cf_dismissed_suggestions");
      if (savedDismissed) {
        setTimeout(() => {
          setDismissedSuggestionIds(JSON.parse(savedDismissed));
        }, 0);
      }

      const savedActivities = localStorage.getItem("cf_custom_activities");
      if (savedActivities) {
        setTimeout(() => {
          setCustomActivities(JSON.parse(savedActivities).map((a: { id: string; text: string; time: string; timestamp: string | number | Date }) => ({ ...a, timestamp: new Date(a.timestamp) })));
        }, 0);
      }

      const savedIncrements = localStorage.getItem("cf_kpi_increments");
      if (savedIncrements) {
        setTimeout(() => {
          setKpiIncrements(JSON.parse(savedIncrements));
        }, 0);
      }

      setTimeout(() => {
        setHydrated(true);
      }, 0);
    }
  }, []);

  // Helper to save updates to localStorage
  const saveAssets = (newAssets: MockContentAsset[]) => {
    setAssets(newAssets);
    localStorage.setItem("cf_content_assets", JSON.stringify(newAssets));
  };

  // 2. Ticking Counter Effect (Step 3: live metrics increments every few seconds)
  useEffect(() => {
    if (!hydrated) return;

    const interval = setInterval(() => {
      setKpiIncrements(prev => {
        const active = activeWorkspaceId;
        const current = prev[active];
        
        // Randomly select a metric to increment slightly
        const rand = Math.random();
        const updated = { ...prev };
        
        if (rand < 0.15) {
          // Content Asset increments
          updated[active] = {
            ...current,
            assets: current.assets + 1
          };
        } else if (rand < 0.5) {
          // Reach increments (adds between 100 and 300)
          updated[active] = {
            ...current,
            reach: current.reach + Math.floor(Math.random() * 200) + 100
          };
        } else if (rand < 0.7) {
          // Engagement ticks slightly
          const diff = (Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1);
          updated[active] = {
            ...current,
            engagement: Math.max(2, Math.min(20, parseFloat((current.engagement + diff).toFixed(2))))
          };
        }
        
        localStorage.setItem("cf_kpi_increments", JSON.stringify(updated));
        return updated;
      });
    }, 6000); // Ticks every 6 seconds

    return () => clearInterval(interval);
  }, [hydrated, activeWorkspaceId]);

  // 3. Workspace Calculations
  const activeWorkspace = useMemo(() => {
    const ws = WORKSPACES.find(w => w.id === activeWorkspaceId) || WORKSPACES[0];
    return ws;
  }, [activeWorkspaceId]);

  // 4. Dynamic KPI values (baseline + ticking increments + content edits)
  const kpis = useMemo(() => {
    const base = activeWorkspace.baselineKPIs;
    const increment = kpiIncrements[activeWorkspaceId] || { assets: 0, reach: 0, engagement: 0, drafts: 0 };
    
    // Count additional assets created dynamically via LocalStorage
    const workspaceDynAssets = assets.filter(a => a.workspaceId === activeWorkspaceId);
    const dynamicTotalCount = workspaceDynAssets.length;
    const dynamicDraftsCount = workspaceDynAssets.filter(a => a.status === "Draft" || a.status === "Review").length;
    
    // Original assets counts (from seeds)
    const seedTotalCount = MOCK_CONTENT_ASSETS.filter(a => a.workspaceId === activeWorkspaceId).length;
    const seedDraftsCount = MOCK_CONTENT_ASSETS.filter(a => a.workspaceId === activeWorkspaceId && (a.status === "Draft" || a.status === "Review")).length;
    
    const totalAssetsOffset = Math.max(0, dynamicTotalCount - seedTotalCount);
    const draftsOffset = Math.max(0, dynamicDraftsCount - seedDraftsCount);

    return {
      assets: base.assets + increment.assets + totalAssetsOffset,
      reach: base.reach + increment.reach,
      engagement: parseFloat((base.engagement + increment.engagement).toFixed(1)),
      drafts: base.drafts + increment.drafts + draftsOffset
    };
  }, [activeWorkspace, kpiIncrements, activeWorkspaceId, assets]);

  // 5. Suggestions selection (filters out dismissed, takes 4 items fitting workspace)
  const activeSuggestions = useMemo(() => {
    const pool = MOCK_SUGGESTIONS.filter(s => !dismissedSuggestionIds.includes(s.id));
    
    // Filter suggestions based on workspace keyword mapping to make them feel unique
    let wsFiltered = pool;
    if (activeWorkspaceId === "agency") {
      wsFiltered = pool.filter(s => s.description.toLowerCase().includes("client") || s.type === "Strategy" || s.type === "Curation");
    } else if (activeWorkspaceId === "startup") {
      wsFiltered = pool.filter(s => s.description.toLowerCase().includes("saas") || s.description.toLowerCase().includes("product") || s.type === "Strategy");
    } else {
      wsFiltered = pool.filter(s => !s.description.toLowerCase().includes("client"));
    }

    // Fallback if pool is empty or too small
    if (wsFiltered.length < 4) {
      wsFiltered = pool;
    }

    // Stable selection (e.g. hash by workspaceId or take first 4)
    return wsFiltered.slice(0, 4);
  }, [dismissedSuggestionIds, activeWorkspaceId]);

  // 6. Dynamic relative time activity feed (Step 7)
  const recentActivity = useMemo(() => {
    // Generate relative time strings dynamically
    const baseActivities = MOCK_ACTIVITIES.map((act, idx) => {
      const timestamp = new Date("2026-06-16T18:00:00.000Z");
      timestamp.setMinutes(timestamp.getMinutes() - act.offsetMinutes);
      return {
        id: `seed-${idx}`,
        text: act.text,
        timestamp,
        time: "" // Calculated below
      };
    });

    const combined = [...customActivities, ...baseActivities].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Format relative time strings
    return combined.map(act => {
      const now = new Date("2026-06-17T02:40:00.000Z"); // Locked simulated now
      const diffMs = now.getTime() - act.timestamp.getTime();
      const diffMins = Math.max(1, Math.floor(diffMs / 60000));
      
      let timeStr = "";
      if (diffMins < 60) {
        timeStr = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
      } else if (diffMins < 1440) {
        const hours = Math.floor(diffMins / 60);
        timeStr = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(diffMins / 1440);
        timeStr = `${days} day${days > 1 ? 's' : ''} ago`;
      }

      return {
        ...act,
        time: timeStr
      };
    });
  }, [customActivities]);

  // 7. Operations
  const switchWorkspace = useCallback((id: "personal" | "agency" | "startup") => {
    setActiveWorkspaceId(id);
    localStorage.setItem("cf_active_workspace", id);
  }, []);

  const dismissSuggestion = useCallback((id: number) => {
    setDismissedSuggestionIds(prev => {
      const updated = [...prev, id];
      localStorage.setItem("cf_dismissed_suggestions", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveSuggestion = useCallback((id: number) => {
    const sugg = MOCK_SUGGESTIONS.find(s => s.id === id);
    if (!sugg) return;

    // Create a new draft
    const newAsset: MockContentAsset = {
      id: Date.now(),
      title: sugg.title,
      type: sugg.platform === "Twitter" ? "Twitter Thread" : sugg.platform === "LinkedIn" ? "LinkedIn Post" : sugg.platform === "Newsletter" ? "Newsletter" : "Video Script",
      status: "Draft",
      performance: "Draft",
      perfValue: 0,
      date: new Date("2026-06-17T02:40:00.000Z").toISOString(),
      workspaceId: activeWorkspaceId
    };

    saveAssets([newAsset, ...assets]);
    dismissSuggestion(id);
  }, [assets, activeWorkspaceId, dismissSuggestion]);

  const generateContent = useCallback(async (titleInput?: string) => {
    setIsGenerating(true);
    
    const steps = [
      "Generating initial concepts...",
      "Processing and refining copy...",
      "Building social assets...",
      "Structuring drafts in workspace..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise(resolve => setTimeout(resolve, 800)); // 800ms per step = 3.2s total
    }

    const title = titleInput || "How to Scale SaaS Operations";
    
    // Create 4 new content items (Step 9)
    const timestampStr = new Date("2026-06-17T02:40:00.000Z").toISOString();
    const newItems: MockContentAsset[] = [
      {
        id: Date.now(),
        title: `[LinkedIn] ${title}`,
        type: "LinkedIn Post",
        status: "Draft",
        performance: "Draft",
        perfValue: 0,
        date: timestampStr,
        workspaceId: activeWorkspaceId
      },
      {
        id: Date.now() + 1,
        title: `[Twitter] ${title} Thread`,
        type: "Twitter Thread",
        status: "Draft",
        performance: "Draft",
        perfValue: 0,
        date: timestampStr,
        workspaceId: activeWorkspaceId
      },
      {
        id: Date.now() + 2,
        title: `[Newsletter] ${title} Digest`,
        type: "Newsletter",
        status: "Draft",
        performance: "Draft",
        perfValue: 0,
        date: timestampStr,
        workspaceId: activeWorkspaceId
      },
      {
        id: Date.now() + 3,
        title: `[Video] ${title} Script Outline`,
        type: "Video Script",
        status: "Draft",
        performance: "Draft",
        perfValue: 0,
        date: timestampStr,
        workspaceId: activeWorkspaceId
      }
    ];

    // Append to assets
    const updatedAssets = [...newItems, ...assets];
    saveAssets(updatedAssets);

    // Add activity feed item
    const newActivity: ActivityItem = {
      id: `custom-${Date.now()}`,
      text: `AI generated 4 assets for '${title}'`,
      timestamp: new Date("2026-06-17T02:40:00.000Z"),
      time: "Just now"
    };
    
    setCustomActivities(prev => {
      const updated = [newActivity, ...prev];
      localStorage.setItem("cf_custom_activities", JSON.stringify(updated));
      return updated;
    });

    // Bump KPIs reach slightly
    setKpiIncrements(prev => {
      const current = prev[activeWorkspaceId];
      const updated = { ...prev };
      updated[activeWorkspaceId] = {
        ...current,
        reach: current.reach + 1500 // Immediately add 1.5K Reach
      };
      localStorage.setItem("cf_kpi_increments", JSON.stringify(updated));
      return updated;
    });

    setIsGenerating(false);
    setGenerationStep("");
  }, [assets, activeWorkspaceId]);

  const deleteAsset = useCallback((id: number) => {
    const updated = assets.filter(a => a.id !== id);
    saveAssets(updated);
  }, [assets]);

  const resetDemoData = useCallback(() => {
    localStorage.removeItem("cf_active_workspace");
    localStorage.removeItem("cf_content_assets");
    localStorage.removeItem("cf_dismissed_suggestions");
    localStorage.removeItem("cf_custom_activities");
    localStorage.removeItem("cf_kpi_increments");
    
    // Reload state
    setActiveWorkspaceId("personal");
    setAssets(MOCK_CONTENT_ASSETS);
    setDismissedSuggestionIds([]);
    setCustomActivities([]);
    setKpiIncrements({
      personal: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
      agency: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
      startup: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        hydrated,
        activeWorkspace,
        workspaces: WORKSPACES,
        assets,
        activeSuggestions,
        recentActivity,
        isGenerating,
        generationStep,
        kpis,
        switchWorkspace,
        dismissSuggestion,
        saveSuggestion,
        generateContent,
        resetDemoData,
        deleteAsset
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a DashboardProvider");
  }
  return context;
}
