"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { 
  WORKSPACES, 
  MOCK_CONTENT_ASSETS, 
  MOCK_SUGGESTIONS, 
  MOCK_CAMPAIGNS,
  WorkspaceConfig, 
  MockContentAsset, 
  MockSuggestion,
  Campaign
} from "@/data/mock-data";

function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function getRandomColor() {
  const colors = [
    "bg-emerald-500/10 text-emerald-600",
    "bg-blue-500/10 text-blue-600",
    "bg-indigo-500/10 text-indigo-600",
    "bg-pink-500/10 text-pink-600",
    "bg-purple-500/10 text-purple-600",
    "bg-amber-500/10 text-amber-600"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export interface UserProfile {
  name: string;
  email: string;
  initials: string;
}

export interface MockNotification {
  id: number;
  text: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning";
  timestamp: number;
}

export interface SavedTemplate {
  id: number;
  name: string;
  prompt: string;
  tone: string;
  source: string;
}

interface WorkspaceContextType {
  activeWorkspaceId: "personal" | "agency" | "startup";
  activeWorkspace: WorkspaceConfig;
  workspaces: WorkspaceConfig[];
  assets: MockContentAsset[];
  suggestions: MockSuggestion[];
  currentUser: UserProfile;
  kpis: {
    assets: number;
    reach: number;
    engagement: number;
    drafts: number;
  };
  setActiveWorkspaceId: (id: "personal" | "agency" | "startup") => void;
  addAsset: (title: string, type: MockContentAsset["type"], performance?: string, perfValue?: number) => MockContentAsset;
  updateAsset: (id: number, updated: Partial<MockContentAsset>) => void;
  deleteAsset: (id: number) => void;
  bulkDeleteAssets: (ids: number[]) => void;
  bulkUpdateAssetStatus: (ids: number[], status: MockContentAsset["status"]) => void;
  inviteMember: (name: string, role: string) => void;
  updateWorkspaceName: (name: string) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  
  // Premium Extensions
  notifications: MockNotification[];
  addNotification: (text: string, type?: MockNotification["type"]) => void;
  markNotificationAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  clearAllNotifications: () => void;
  templates: SavedTemplate[];
  saveTemplate: (name: string, prompt: string, tone: string, source: string) => void;
  deleteTemplate: (id: number) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  tourCompleted: boolean;
  setTourCompleted: (completed: boolean) => void;
  generateDemoData: () => void;
  
  // Campaigns Extensions
  campaigns: Campaign[];
  addCampaign: (name: string, description: string, type: Campaign["type"], startDate: string, endDate: string, members: string[], useTemplate?: boolean) => Campaign;
  updateCampaign: (id: number, updated: Partial<Campaign>) => void;
  deleteCampaign: (id: number) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeWorkspaceId, setActiveWorkspaceIdState] = useState<"personal" | "agency" | "startup">(() => {
    if (typeof window !== "undefined") {
      try {
        const storedWorkspaceId = localStorage.getItem("cf_active_workspace_id");
        if (storedWorkspaceId && ["personal", "agency", "startup"].includes(storedWorkspaceId)) {
          return storedWorkspaceId as "personal" | "agency" | "startup";
        }
      } catch (e) {
        console.error(e);
      }
    }
    return "personal";
  });

  const [workspaces, setWorkspaces] = useState<WorkspaceConfig[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedWorkspaces = localStorage.getItem("cf_workspaces");
        if (storedWorkspaces) {
          return JSON.parse(storedWorkspaces);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return WORKSPACES;
  });

  const [assets, setAssets] = useState<MockContentAsset[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedAssets = localStorage.getItem("cf_assets");
        if (storedAssets) {
          return JSON.parse(storedAssets);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return MOCK_CONTENT_ASSETS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("cf_current_user");
        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch (e) {
        console.error(e);
      }
    }
    return { name: "John Doe", email: "john.doe@contentflow.ai", initials: "JD" };
  });

  // Premium State Extensions
  const [notifications, setNotifications] = useState<MockNotification[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_notifications");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 1, text: "AI Suggestion: 'Top 5 LinkedIn Hooks' is ready", time: "10m ago", read: false, type: "info", timestamp: Date.now() - 10 * 60 * 1000 },
      { id: 2, text: "Twitter thread scheduled successfully", time: "2h ago", read: false, type: "success", timestamp: Date.now() - 2 * 60 * 60 * 1000 },
      { id: 3, text: "Engagement spike detected on LinkedIn post (+24%)", time: "1d ago", read: true, type: "success", timestamp: Date.now() - 24 * 60 * 60 * 1000 },
    ];
  });

  const [templates, setTemplates] = useState<SavedTemplate[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_templates");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 1, name: "Contrarian Founder Tech Hook", prompt: "Write about why standard MVPs are dead and why visual premium layouts convert better.", tone: "bold", source: "text" },
      { id: 2, name: "Product Feature Release Thread", prompt: "Outline our new local state operations and Command Palette feature for the SaaS dashboard.", tone: "professional", source: "notes" },
      { id: 3, name: "My Personal Bootstrapping Story", prompt: "Tell the story of how we launched ContentFlow AI in public, got our first 10 B2B users, and saved creators 14 hours a week.", tone: "inspiring", source: "text" }
    ];
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_campaigns");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return MOCK_CAMPAIGNS;
  });

  const [onboardingCompleted, setOnboardingCompletedState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_onboarding_completed");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  });

  const [tourCompleted, setTourCompletedState] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_tour_completed");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  });

  const [kpiIncrements, setKpiIncrements] = useState<Record<string, { assets: number; reach: number; engagement: number; drafts: number }>>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cf_kpi_increments");
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      personal: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
      agency: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
      startup: { assets: 0, reach: 0, engagement: 0, drafts: 0 },
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 0);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_active_workspace_id", activeWorkspaceId);
    } catch (e) {
      console.error(e);
    }
  }, [activeWorkspaceId, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_workspaces", JSON.stringify(workspaces));
    } catch (e) {
      console.error(e);
    }
  }, [workspaces, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_assets", JSON.stringify(assets));
    } catch (e) {
      console.error(e);
    }
  }, [assets, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_current_user", JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_notifications", JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_templates", JSON.stringify(templates));
    } catch (e) {
      console.error(e);
    }
  }, [templates, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_campaigns", JSON.stringify(campaigns));
    } catch (e) {
      console.error(e);
    }
  }, [campaigns, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_onboarding_completed", JSON.stringify(onboardingCompleted));
    } catch (e) {
      console.error(e);
    }
  }, [onboardingCompleted, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("cf_tour_completed", JSON.stringify(tourCompleted));
    } catch (e) {
      console.error(e);
    }
  }, [tourCompleted, isLoaded]);

  // Ticking Counter for simulated dynamic metrics updates
  useEffect(() => {
    if (!isLoaded) return;

    const interval = setInterval(() => {
      setKpiIncrements(prev => {
        const active = activeWorkspaceId;
        const current = prev[active] || { assets: 0, reach: 0, engagement: 0, drafts: 0 };
        
        // Randomly select a metric to increment slightly
        const rand = Math.random();
        let updated = { ...prev };
        
        if (rand < 0.1) {
          // Increment Content Assets by 1
          updated[active] = { ...current, assets: current.assets + 1 };
        } else if (rand < 0.45) {
          // Reach ticks up by 100-300
          updated[active] = { ...current, reach: current.reach + Math.floor(Math.random() * 200) + 100 };
        } else if (rand < 0.65) {
          // Engagement fluctuates slightly
          const diff = (Math.random() * 0.1) * (Math.random() > 0.5 ? 1 : -1);
          updated[active] = {
            ...current,
            engagement: parseFloat(Math.max(-1.5, Math.min(1.5, current.engagement + diff)).toFixed(2))
          };
        }

        try {
          localStorage.setItem("cf_kpi_increments", JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isLoaded, activeWorkspaceId]);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  // Dynamic KPI Aggregator
  const kpis = useMemo(() => {
    const base = activeWorkspace.baselineKPIs;
    const increment = kpiIncrements[activeWorkspaceId] || { assets: 0, reach: 0, engagement: 0, drafts: 0 };

    const workspaceDynAssets = assets.filter(a => a.workspaceId === activeWorkspaceId);
    const dynamicTotalCount = workspaceDynAssets.length;
    const dynamicDraftsCount = workspaceDynAssets.filter(a => a.status === "Draft" || a.status === "Review").length;

    // Seed offsets to avoid double-counting MOCK_CONTENT_ASSETS
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

  const addNotification = (text: string, type: MockNotification["type"] = "info") => {
    const newNotif: MockNotification = {
      id: generateId(),
      text,
      time: "Just now",
      read: false,
      type,
      timestamp: Date.now()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const loginUser = (email: string, name?: string) => {
    const inferredName = name || email.split("@")[0].split(/[._+-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    const initials = inferredName.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2) || "U";
    setCurrentUser({
      name: inferredName,
      email,
      initials
    });
  };

  const logoutUser = () => {
    setCurrentUser({ name: "John Doe", email: "john.doe@contentflow.ai", initials: "JD" });
    setOnboardingCompletedState(false);
    setTourCompletedState(false);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("cf_current_user");
        localStorage.removeItem("cf_onboarding_completed");
        localStorage.removeItem("cf_tour_completed");
        localStorage.removeItem("cf_assets");
        localStorage.removeItem("cf_kpi_increments");
      } catch (e) {
        console.error(e);
      }
    }
  };

  const setActiveWorkspaceId = (id: "personal" | "agency" | "startup") => {
    setActiveWorkspaceIdState(id);
    addNotification(`Switched to workspace: "${workspaces.find(w => w.id === id)?.name}"`, "info");
  };

  const addAsset = (
    title: string, 
    type: MockContentAsset["type"],
    performance = "Draft",
    perfValue = 0
  ) => {
    const newAsset: MockContentAsset = {
      id: generateId(),
      title,
      type,
      status: "Draft",
      performance,
      perfValue,
      date: new Date().toISOString(),
      workspaceId: activeWorkspaceId
    };

    setAssets(prev => [newAsset, ...prev]);

    // Update workspace stats (baselineKPIs.assets)
    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return {
          ...w,
          baselineKPIs: {
            ...w.baselineKPIs,
            assets: w.baselineKPIs.assets + 1,
            drafts: w.baselineKPIs.drafts + 1
          }
        };
      }
      return w;
    }));

    addNotification(`Generated ${type} Draft: "${title.slice(0, 20)}..."`, "success");
    return newAsset;
  };

  const updateAsset = (id: number, updated: Partial<MockContentAsset>) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id === id) {
        // If status changes from Draft/Review to Published, update KPIs
        if (updated.status === "Published" && asset.status !== "Published") {
          setWorkspaces(workspacesPrev => workspacesPrev.map(w => {
            if (w.id === asset.workspaceId) {
              return {
                ...w,
                baselineKPIs: {
                  ...w.baselineKPIs,
                  drafts: Math.max(0, w.baselineKPIs.drafts - 1)
                }
              };
            }
            return w;
          }));
          addNotification(`Published asset: "${asset.title.slice(0, 25)}..."`, "success");
        } else if (updated.title && updated.title !== asset.title) {
          addNotification(`Renamed asset to: "${updated.title.slice(0, 25)}..."`, "info");
        } else if (updated.date && updated.date !== asset.date) {
          addNotification(`Rescheduled asset publication date`, "info");
        }
        return { ...asset, ...updated };
      }
      return asset;
    }));
  };

  const deleteAsset = (id: number) => {
    const assetToDelete = assets.find(a => a.id === id);
    if (!assetToDelete) return;

    setAssets(prev => prev.filter(asset => asset.id !== id));

    setWorkspaces(prev => prev.map(w => {
      if (w.id === assetToDelete.workspaceId) {
        const isDraft = assetToDelete.status === "Draft" || assetToDelete.status === "Review";
        return {
          ...w,
          baselineKPIs: {
            ...w.baselineKPIs,
            assets: Math.max(0, w.baselineKPIs.assets - 1),
            drafts: isDraft ? Math.max(0, w.baselineKPIs.drafts - 1) : w.baselineKPIs.drafts
          }
        };
      }
      return w;
    }));
    addNotification(`Deleted asset: "${assetToDelete.title.slice(0, 20)}..."`, "warning");
  };

  const bulkDeleteAssets = (ids: number[]) => {
    const assetsToDelete = assets.filter(a => ids.includes(a.id));
    if (assetsToDelete.length === 0) return;

    setAssets(prev => prev.filter(asset => !ids.includes(asset.id)));

    setWorkspaces(prev => prev.map(w => {
      const workspaceDeletees = assetsToDelete.filter(a => a.workspaceId === w.id);
      if (workspaceDeletees.length === 0) return w;

      const draftCount = workspaceDeletees.filter(a => a.status === "Draft" || a.status === "Review").length;

      return {
        ...w,
        baselineKPIs: {
          ...w.baselineKPIs,
          assets: Math.max(0, w.baselineKPIs.assets - workspaceDeletees.length),
          drafts: Math.max(0, w.baselineKPIs.drafts - draftCount)
        }
      };
    }));
    addNotification(`Bulk deleted ${assetsToDelete.length} assets`, "warning");
  };

  const bulkUpdateAssetStatus = (ids: number[], status: MockContentAsset["status"]) => {
    setAssets(prev => prev.map(asset => {
      if (ids.includes(asset.id)) {
        if (status === "Published" && asset.status !== "Published") {
          setWorkspaces(workspacesPrev => workspacesPrev.map(w => {
            if (w.id === asset.workspaceId) {
              return {
                ...w,
                baselineKPIs: {
                  ...w.baselineKPIs,
                  drafts: Math.max(0, w.baselineKPIs.drafts - 1)
                }
              };
            }
            return w;
          }));
        }
        return { ...asset, status };
      }
      return asset;
    }));
    addNotification(`Updated ${ids.length} assets to ${status}`, "success");
  };

  const inviteMember = useCallback((name: string, role: string) => {
    const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    const color = getRandomColor();

    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return {
          ...w,
          members: [
            ...w.members,
            { name, role, initials, color }
          ]
        };
      }
      return w;
    }));
    addNotification(`Invited ${name} as ${role}`, "success");
  }, [activeWorkspaceId]);

  const updateWorkspaceName = (name: string) => {
    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return { ...w, name };
      }
      return w;
    }));
    addNotification(`Renamed workspace to "${name}"`, "info");
  };

  // Premium State Extensions Methods

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const saveTemplate = (name: string, prompt: string, tone: string, source: string) => {
    const newTemplate: SavedTemplate = {
      id: generateId(),
      name,
      prompt,
      tone,
      source
    };
    setTemplates(prev => [newTemplate, ...prev]);
    addNotification(`Saved prompt template: "${name}"`, "success");
  };

  const deleteTemplate = (id: number) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    addNotification("Deleted prompt template", "info");
  };

  const addCampaign = (
    name: string,
    description: string,
    type: Campaign["type"],
    startDate: string,
    endDate: string,
    members: string[],
    useTemplate: boolean = false
  ) => {
    const newId = generateId();
    const newCampaign: Campaign = {
      id: newId,
      name,
      description,
      type,
      status: "Active",
      startDate,
      endDate,
      workspaceId: activeWorkspaceId,
      members
    };

    setCampaigns(prev => [newCampaign, ...prev]);

    if (useTemplate) {
      const templateAssets: { title: string; type: MockContentAsset["type"] }[] = [];
      if (type === "Product Launch") {
        templateAssets.push(
          { title: `[Teaser] Introducing ${name} - coming soon`, type: "LinkedIn Post" },
          { title: `[Launch Day] We are officially live with ${name}!`, type: "LinkedIn Post" },
          { title: `How we built ${name} from scratch in 30 days`, type: "Twitter Thread" },
          { title: `${name} Walkthrough & Feature Demo`, type: "Video Script" },
          { title: `Special Announcement: Introducing ${name}`, type: "Newsletter" }
        );
      } else if (type === "Newsletter Growth") {
        templateAssets.push(
          { title: `Why you should subscribe to the ${name} newsletter`, type: "LinkedIn Post" },
          { title: `10 tactical insights you missed in ${name} last week`, type: "Twitter Thread" },
          { title: `How to optimize your workflow (Edition #1 of ${name})`, type: "Newsletter" },
          { title: `Behind the scenes of writing ${name}`, type: "Video Script" }
        );
      } else if (type === "Personal Brand") {
        templateAssets.push(
          { title: `My biggest failure and what it taught me about business`, type: "LinkedIn Post" },
          { title: `Standard templates vs custom premium layouts: The design debate`, type: "LinkedIn Post" },
          { title: `10 utilities that save me 15 hours of work every week`, type: "Twitter Thread" },
          { title: `A day in the life of a founder building in public`, type: "Video Script" }
        );
      } else if (type === "Agency Growth") {
        templateAssets.push(
          { title: `Case Study: How we scaled client pipeline by 300%`, type: "LinkedIn Post" },
          { title: `Why typical agency retainers are broken and how we fixed them`, type: "LinkedIn Post" },
          { title: `The exact client acquisition system we use for B2B`, type: "Twitter Thread" },
          { title: `How to hire high-performing editors and copywriters`, type: "Video Script" },
          { title: `Q3 Marketing Breakdown: What's working now`, type: "Newsletter" }
        );
      } else if (type === "SaaS Launch") {
        templateAssets.push(
          { title: `Building in public: Designing the dashboard for ${name}`, type: "LinkedIn Post" },
          { title: `Why local state operations are replacing raw API calls in ${name}`, type: "Twitter Thread" },
          { title: `Introducing the Ctrl+K Command Palette in ${name}`, type: "Twitter Thread" },
          { title: `${name} Walkthrough: Launch Day Edition`, type: "Video Script" },
          { title: `${name} is live: Here is how to get 50% off today`, type: "Newsletter" }
        );
      }

      const generatedAssets: MockContentAsset[] = templateAssets.map((ta, idx) => ({
        id: generateId() + idx + 1000,
        title: ta.title,
        type: ta.type,
        status: "Draft",
        performance: "Draft",
        perfValue: 0,
        date: new Date().toISOString(),
        workspaceId: activeWorkspaceId,
        campaignId: newId
      }));

      setAssets(prev => [...generatedAssets, ...prev]);
      addNotification(`Created campaign "${name}" with ${generatedAssets.length} template draft assets!`, "success");
    } else {
      addNotification(`Created campaign "${name}"!`, "success");
    }

    return newCampaign;
  };

  const updateCampaign = (id: number, updated: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
    addNotification(`Updated campaign properties`, "info");
  };

  const deleteCampaign = (id: number) => {
    const campaignToDelete = campaigns.find(c => c.id === id);
    if (!campaignToDelete) return;
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setAssets(prev => prev.map(a => a.campaignId === id ? { ...a, campaignId: undefined } : a));
    addNotification(`Deleted campaign: "${campaignToDelete.name}"`, "warning");
  };

  const setOnboardingCompleted = (completed: boolean) => {
    setOnboardingCompletedState(completed);
  };

  const setTourCompleted = (completed: boolean) => {
    setTourCompletedState(completed);
  };

  const generateDemoData = () => {
    const platforms: MockContentAsset["type"][] = ["LinkedIn Post", "Twitter Thread", "Newsletter", "Video Script"];
    const statuses: MockContentAsset["status"][] = ["Published", "Draft", "Review", "Idea", "Scheduled"];
    
    const sampleTitles = [
      "Why Attio's database model is the future of CRMs",
      "Linear's keyboard-first navigation: UX breakdown",
      "Typefully vs Taplio: Which content tool is better in 2026?",
      "How to write cold emails that VCs actually reply to",
      "Why HSL tailored colors are superior to hex variables",
      "Our Next.js 16 build optimization: A 40% speedup story",
      "The death of the MVP: Say hello to Minimum Awesome Product",
      "How we grew our organic reach to 500k monthly views",
      "10 Command Line utilities every growth engineer needs",
      "Why corporate stock photos are destroying your brand conversion",
      "Figma hooks to code variables: A design tokens handbook",
      "Framer motion orchestration guide: Micro-interactions that wow",
      "The copywriting checklist we use to audit SaaS landing pages",
      "Why local states and localStorage are replacing simple API databases",
      "How to run a remote development sprint with zero meetings",
      "Designing beautiful glassmorphic dashboards: A step-by-step tutorial",
      "How to build a SaaS pricing card layout that doubles CTR",
      "Attio vs Salesforce: The CRM architecture showdown",
      "Stop copy-pasting standard Tailwind templates",
      "How we landed our first 5 enterprise B2B customers",
      "The newsletter copywriting hook formula that gets 60% opens",
      "Whiteboard session: Decoupled client state management",
      "Why we banned meetings on Wednesdays",
      "The marketing playbook of growing from $0 to $30k MRR",
      "How to invite and onboard creative partners in 5 minutes"
    ];

    const newAssets: MockContentAsset[] = sampleTitles.map((title, idx) => {
      const type = platforms[idx % platforms.length];
      const status = statuses[idx % statuses.length];
      
      const date = new Date("2026-06-17T20:00:00.000Z");
      // For scheduled events, spread them in the future or recent past
      if (status === "Scheduled") {
        date.setDate(date.getDate() + (idx % 7)); // future dates
      } else {
        date.setDate(date.getDate() - (idx + 1)); // past dates
      }
      
      let performance = "Draft";
      let perfValue = 0;
      if (status === "Published") {
        if (type === "LinkedIn Post" || type === "Twitter Thread") {
          perfValue = Math.floor(Math.random() * 50000) + 5000;
          performance = `${(perfValue / 1000).toFixed(1)}K Reach`;
        } else if (type === "Newsletter") {
          perfValue = Math.floor(Math.random() * 8000) + 1000;
          performance = `${(perfValue / 1000).toFixed(1)}K Opens`;
        } else {
          perfValue = Math.floor(Math.random() * 100000) + 10000;
          performance = `${(perfValue / 1000).toFixed(1)}K Views`;
        }
      } else if (status === "Review") {
        performance = "Review";
      } else if (status === "Idea") {
        performance = "Idea";
      } else if (status === "Scheduled") {
        performance = "Scheduled";
      }

      return {
        id: generateId() + idx,
        title,
        type,
        status,
        performance,
        perfValue,
        date: date.toISOString(),
        workspaceId: activeWorkspaceId
      };
    });

    setAssets(prev => {
      const otherWorkspaceAssets = prev.filter(a => a.workspaceId !== activeWorkspaceId);
      return [...newAssets, ...otherWorkspaceAssets];
    });

    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return {
          ...w,
          baselineKPIs: {
            assets: newAssets.length + 120, 
            reach: 485000,
            engagement: 9.2,
            drafts: newAssets.filter(a => a.status === "Draft" || a.status === "Review").length
          }
        };
      }
      return w;
    }));

    addNotification(`Generated 25 demo assets for "${activeWorkspace.name}"!`, "success");
  };

  return (
    <WorkspaceContext.Provider value={{
      activeWorkspaceId,
      activeWorkspace,
      workspaces,
      assets,
      suggestions: MOCK_SUGGESTIONS,
      currentUser,
      kpis,
      setActiveWorkspaceId,
      addAsset,
      updateAsset,
      deleteAsset,
      bulkDeleteAssets,
      bulkUpdateAssetStatus,
      inviteMember,
      updateWorkspaceName,
      loginUser,
      logoutUser,
      
      // Premium Extensions
      notifications,
      addNotification,
      markNotificationAsRead,
      deleteNotification,
      clearAllNotifications,
      templates,
      saveTemplate,
      deleteTemplate,
      onboardingCompleted,
      setOnboardingCompleted,
      tourCompleted,
      setTourCompleted,
      generateDemoData,
      campaigns,
      addCampaign,
      updateCampaign,
      deleteCampaign
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (context === undefined) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
