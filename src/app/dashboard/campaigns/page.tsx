"use client";

import React, { useState, useMemo } from "react";
import { useWorkspace } from "@/context/workspace-context";
import { Campaign, MockContentAsset } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  Percent, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  X, 
  FileText, 
  Edit3, 
  Grid, 
  Link as LinkIcon, 
  FilePlus, 
  HelpCircle,
  Megaphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Helper to format large numbers
const formatMetric = (val: number) => {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toString();
};

export default function CampaignsPage() {
  const { 
    activeWorkspaceId, 
    activeWorkspace, 
    campaigns, 
    assets, 
    addCampaign, 
    updateCampaign, 
    deleteCampaign,
    addAsset,
    updateAsset
  } = useWorkspace();

  // State controls
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [detailTab, setDetailTab] = useState<"overview" | "assets" | "timeline" | "analytics" | "members">("overview");

  // Create Campaign Form State
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignDesc, setNewCampaignDesc] = useState("");
  const [newCampaignType, setNewCampaignType] = useState<Campaign["type"]>("Product Launch");
  const [newCampaignStart, setNewCampaignStart] = useState("2026-06-18");
  const [newCampaignEnd, setNewCampaignEnd] = useState("2026-07-18");
  const [newCampaignMembers, setNewCampaignMembers] = useState<string[]>([]);
  const [useTemplate, setUseTemplate] = useState(true);

  // Asset action forms inside detail panel
  const [isAddingNewAsset, setIsAddingNewAsset] = useState(false);
  const [newAssetTitle, setNewAssetTitle] = useState("");
  const [newAssetType, setNewAssetType] = useState<MockContentAsset["type"]>("LinkedIn Post");
  
  const [isLinkingAsset, setIsLinkingAsset] = useState(false);
  const [linkedAssetId, setLinkedAssetId] = useState<string>("");

  // Edit Campaign Form State
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [editCampaignName, setEditCampaignName] = useState("");
  const [editCampaignDesc, setEditCampaignDesc] = useState("");
  const [editCampaignStatus, setEditCampaignStatus] = useState<Campaign["status"]>("Active");
  const [editCampaignStart, setEditCampaignStart] = useState("");
  const [editCampaignEnd, setEditCampaignEnd] = useState("");

  // Filter campaigns by active workspace
  const workspaceCampaigns = useMemo(() => {
    return campaigns.filter(c => c.workspaceId === activeWorkspaceId);
  }, [campaigns, activeWorkspaceId]);

  // Selected Campaign details
  const selectedCampaign = useMemo(() => {
    return workspaceCampaigns.find(c => c.id === selectedCampaignId) || null;
  }, [workspaceCampaigns, selectedCampaignId]);

  // Get campaign assets
  const campaignAssets = useMemo(() => {
    if (!selectedCampaignId) return [];
    return assets.filter(a => a.campaignId === selectedCampaignId);
  }, [assets, selectedCampaignId]);

  // Get assets in the current workspace that are NOT linked to any campaign
  const unlinkedAssets = useMemo(() => {
    return assets.filter(a => a.workspaceId === activeWorkspaceId && !a.campaignId);
  }, [assets, activeWorkspaceId]);

  // Dynamic campaign metrics calculator
  const campaignMetrics = useMemo(() => {
    const metricsMap: Record<number, { reach: number; engagement: number; completion: number; totalAssets: number; publishedAssets: number }> = {};
    
    workspaceCampaigns.forEach(c => {
      const cAssets = assets.filter(a => a.campaignId === c.id);
      const totalAssets = cAssets.length;
      const publishedAssets = cAssets.filter(a => a.status === "Published");
      
      let totalReach = 0;
      let totalEngagement = 0;
      
      publishedAssets.forEach(a => {
        totalReach += a.perfValue || 0;
        // Generate engagement rate between 5% and 12% if none exists
        totalEngagement += a.perfValue ? parseFloat(((a.perfValue * 0.08) / 100).toFixed(1)) : 0;
      });

      const reach = totalReach;
      const averageEngagement = publishedAssets.length > 0 
        ? parseFloat((totalEngagement / publishedAssets.length).toFixed(1)) 
        : 0;
      const completion = totalAssets > 0 
        ? Math.round((publishedAssets.length / totalAssets) * 100) 
        : 0;

      metricsMap[c.id] = {
        reach,
        engagement: averageEngagement || (c.status === "Completed" ? 8.4 : 0),
        completion,
        totalAssets,
        publishedAssets: publishedAssets.length
      };
    });

    return metricsMap;
  }, [workspaceCampaigns, assets]);

  // Custom styling mappings
  const getCampaignTypeStyles = (type: Campaign["type"]) => {
    switch (type) {
      case "Product Launch":
        return "bg-violet-500/10 text-violet-500 border-violet-500/20";
      case "Newsletter Growth":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Personal Brand":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Agency Growth":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "SaaS Launch":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-secondary text-secondary-foreground border-border";
    }
  };

  const getStatusStyles = (status: Campaign["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getAssetTypeIcon = (type: MockContentAsset["type"]) => {
    switch (type) {
      case "LinkedIn Post":
        return <Megaphone className="h-3.5 w-3.5 text-emerald-500" />;
      case "Twitter Thread":
        return <FileText className="h-3.5 w-3.5 text-blue-500" />;
      case "Newsletter":
        return <ArrowUpRight className="h-3.5 w-3.5 text-rose-500" />;
      case "Video Script":
        return <BarChart2 className="h-3.5 w-3.5 text-violet-500" />;
      default:
        return <HelpCircle className="h-3.5 w-3.5" />;
    }
  };

  // Actions
  const handleOpenDetail = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setDetailTab("overview");
    setIsEditingCampaign(false);
    setIsAddingNewAsset(false);
    setIsLinkingAsset(false);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    // Use active workspace members as default members if none selected
    const selectedMembers = newCampaignMembers.length > 0 
      ? newCampaignMembers 
      : activeWorkspace.members.map(m => m.name);

    addCampaign(
      newCampaignName,
      newCampaignDesc,
      newCampaignType,
      newCampaignStart,
      newCampaignEnd,
      selectedMembers,
      useTemplate
    );

    // Reset Form
    setNewCampaignName("");
    setNewCampaignDesc("");
    setNewCampaignType("Product Launch");
    setNewCampaignStart("2026-06-18");
    setNewCampaignEnd("2026-07-18");
    setNewCampaignMembers([]);
    setUseTemplate(true);
    setIsCreateModalOpen(false);
  };

  const handleStartEditing = () => {
    if (!selectedCampaign) return;
    setEditCampaignName(selectedCampaign.name);
    setEditCampaignDesc(selectedCampaign.description);
    setEditCampaignStatus(selectedCampaign.status);
    setEditCampaignStart(selectedCampaign.startDate);
    setEditCampaignEnd(selectedCampaign.endDate);
    setIsEditingCampaign(true);
  };

  const handleSaveCampaignEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    updateCampaign(selectedCampaign.id, {
      name: editCampaignName,
      description: editCampaignDesc,
      status: editCampaignStatus,
      startDate: editCampaignStart,
      endDate: editCampaignEnd
    });

    setIsEditingCampaign(false);
  };

  const handleDeleteCampaign = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign? Draft assets associated will be unlinked.")) {
      deleteCampaign(id);
      if (selectedCampaignId === id) {
        setSelectedCampaignId(null);
      }
    }
  };

  // Add Asset from details panel
  const handleAddNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetTitle.trim() || !selectedCampaignId) return;

    const newAsset = addAsset(newAssetTitle, newAssetType);
    // Link to campaign
    updateAsset(newAsset.id, { campaignId: selectedCampaignId });

    setNewAssetTitle("");
    setIsAddingNewAsset(false);
  };

  // Link existing asset to campaign
  const handleLinkExistingAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedAssetId || !selectedCampaignId) return;

    const assetIdNum = parseInt(linkedAssetId);
    updateAsset(assetIdNum, { campaignId: selectedCampaignId });

    setLinkedAssetId("");
    setIsLinkingAsset(false);
  };

  // Unlink asset from campaign
  const handleUnlinkAsset = (assetId: number) => {
    updateAsset(assetId, { campaignId: undefined });
  };

  // Timeline list sorted
  const sortedTimelineAssets = useMemo(() => {
    return [...campaignAssets].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [campaignAssets]);

  // Analytics Chart Data
  const chartData = useMemo(() => {
    return campaignAssets.map((asset) => ({
      name: asset.title.length > 20 ? `${asset.title.slice(0, 20)}...` : asset.title,
      Reach: asset.status === "Published" ? asset.perfValue : 0,
      Status: asset.status,
      Type: asset.type
    }));
  }, [campaignAssets]);

  return (
    <div className="flex flex-col gap-6 pb-12 min-h-screen">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border/60 rounded-2xl p-6 shadow-sm bg-gradient-to-r from-card to-secondary/10">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-primary" /> Campaigns
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Group your social posts, newsletters, and video scripts into structured marketing pipelines.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 text-xs font-semibold text-muted-foreground mt-3 border border-border/40">
            <span>Workspace:</span>
            <span className="text-foreground font-bold">{activeWorkspace.name}</span>
          </div>
        </div>

        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-full shadow-sm hover:shadow-md transition-all duration-200 h-10 px-5 text-xs font-bold shrink-0 cursor-pointer flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Create Campaign
        </Button>
      </div>

      {/* Campaigns Listing */}
      {workspaceCampaigns.length === 0 ? (
        <Card className="border border-border/60 shadow-sm p-12 text-center flex flex-col items-center justify-center gap-4 bg-card/50 backdrop-blur-sm">
          <div className="bg-primary/10 p-4 rounded-full border border-primary/20">
            <FolderKanban className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg font-bold text-foreground">No campaigns found</h3>
            <p className="text-xs text-muted-foreground">
              You haven&apos;t created any marketing campaigns inside this workspace yet. Create one to organize your content.
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full shadow-sm mt-2 text-xs font-bold"
          >
            Create Your First Campaign
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaceCampaigns.map((campaign) => {
            const metrics = campaignMetrics[campaign.id] || { reach: 0, engagement: 0, completion: 0, totalAssets: 0, publishedAssets: 0 };
            return (
              <motion.div
                key={campaign.id}
                whileHover={{ scale: 1.01, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="group relative bg-card border border-border/60 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between min-h-[300px]"
                onClick={() => handleOpenDetail(campaign.id)}
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="outline" className={getCampaignTypeStyles(campaign.type)}>
                      {campaign.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusStyles(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {campaign.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px]">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 my-4">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{metrics.completion}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${metrics.completion}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {metrics.publishedAssets} of {metrics.totalAssets} assets published
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 border-t border-border/40 pt-4 mt-auto">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Reach</span>
                    <span className="text-sm font-extrabold text-foreground flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      {formatMetric(metrics.reach)}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Engagement</span>
                    <span className="text-sm font-extrabold text-foreground flex items-center gap-0.5">
                      <Percent className="h-3 w-3 text-blue-500" />
                      {metrics.engagement}%
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Completions</span>
                    <span className="text-sm font-extrabold text-foreground flex items-center gap-0.5">
                      <CheckCircle2 className="h-3 w-3 text-violet-500" />
                      {metrics.completion}%
                    </span>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="flex items-center justify-between border-t border-border/40 pt-3.5 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span className="font-semibold text-foreground/80">{campaign.members.length} members</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCampaign(campaign.id);
                    }}
                    className="p-1 text-muted-foreground hover:text-red-500 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Campaign Detail Drawer / Overlay (Using AnimatePresence) */}
      <AnimatePresence>
        {selectedCampaign && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCampaignId(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Sidebar Canvas */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-2xl bg-card border-l border-border h-full shadow-2xl flex flex-col z-10"
            >
              {/* Drawer Header */}
              <div className="h-16 border-b border-border px-6 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">Campaign Control Desk</span>
                </div>
                <button
                  onClick={() => setSelectedCampaignId(null)}
                  className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                
                {/* Quick Info Header */}
                <div className="bg-secondary/40 border border-border/40 rounded-xl p-5 flex flex-col gap-4">
                  {!isEditingCampaign ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getCampaignTypeStyles(selectedCampaign.type)}>
                          {selectedCampaign.type}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 px-3 text-xs font-semibold rounded-lg"
                            onClick={handleStartEditing}
                          >
                            <Edit3 className="h-3 w-3 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="h-8 px-3 text-xs font-semibold rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleDeleteCampaign(selectedCampaign.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <h2 className="text-xl font-extrabold text-foreground">{selectedCampaign.name}</h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">{selectedCampaign.description}</p>
                      
                      {/* Dates & Timeline info */}
                      <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mt-2 border-t border-border/30 pt-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>Timeline: {selectedCampaign.startDate} to {selectedCampaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-primary" />
                          <span>Status: <span className="text-foreground">{selectedCampaign.status}</span></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveCampaignEdit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Campaign Name</Label>
                        <Input
                          id="edit-name"
                          value={editCampaignName}
                          onChange={(e) => setEditCampaignName(e.target.value)}
                          className="bg-card text-xs h-9 rounded-lg"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-desc">Description</Label>
                        <Textarea
                          id="edit-desc"
                          value={editCampaignDesc}
                          onChange={(e) => setEditCampaignDesc(e.target.value)}
                          className="bg-card text-xs min-h-[60px] rounded-lg"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select value={editCampaignStatus} onValueChange={(val) => val && setEditCampaignStatus(val as Campaign["status"])}>
                            <SelectTrigger className="bg-card text-xs h-9 rounded-lg">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active" className="text-xs">Active</SelectItem>
                              <SelectItem value="Completed" className="text-xs">Completed</SelectItem>
                              <SelectItem value="Draft" className="text-xs">Draft</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-start">Start Date</Label>
                          <Input
                            id="edit-start"
                            type="date"
                            value={editCampaignStart}
                            onChange={(e) => setEditCampaignStart(e.target.value)}
                            className="bg-card text-xs h-9 rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-end">End Date</Label>
                          <Input
                            id="edit-end"
                            type="date"
                            value={editCampaignEnd}
                            onChange={(e) => setEditCampaignEnd(e.target.value)}
                            className="bg-card text-xs h-9 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          className="h-8 text-xs font-semibold rounded-lg"
                          onClick={() => setIsEditingCampaign(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          size="sm"
                          className="h-8 text-xs font-semibold rounded-lg"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Tabs */}
                <div className="border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex gap-2 text-xs font-bold text-muted-foreground">
                    {[
                      { id: "overview", label: "Overview", icon: Grid },
                      { id: "assets", label: `Assets (${campaignAssets.length})`, icon: FileText },
                      { id: "timeline", label: "Timeline", icon: Calendar },
                      { id: "analytics", label: "Analytics", icon: BarChart2 },
                      { id: "members", label: "Members", icon: Users },
                    ].map((tab) => {
                      const isActive = detailTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setDetailTab(tab.id as typeof detailTab)}
                          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 transition-all relative cursor-pointer ${
                            isActive ? 'text-primary border-primary' : 'border-transparent hover:text-foreground'
                          }`}
                        >
                          <tab.icon className="h-3.5 w-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 min-h-[300px]">
                  {detailTab === "overview" && (
                    <div className="space-y-6">
                      {/* Overview KPIs */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="border border-border/40 shadow-none bg-secondary/10">
                          <CardHeader className="p-4 pb-2">
                            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Reach Score</CardDescription>
                            <CardTitle className="text-xl font-extrabold text-foreground mt-1">
                              {formatMetric(campaignMetrics[selectedCampaign.id]?.reach || 0)}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                        <Card className="border border-border/40 shadow-none bg-secondary/10">
                          <CardHeader className="p-4 pb-2">
                            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Engagement</CardDescription>
                            <CardTitle className="text-xl font-extrabold text-foreground mt-1">
                              {campaignMetrics[selectedCampaign.id]?.engagement || 0}%
                            </CardTitle>
                          </CardHeader>
                        </Card>
                        <Card className="border border-border/40 shadow-none bg-secondary/10">
                          <CardHeader className="p-4 pb-2">
                            <CardDescription className="text-[10px] uppercase font-bold tracking-wider">Completion</CardDescription>
                            <CardTitle className="text-xl font-extrabold text-foreground mt-1">
                              {campaignMetrics[selectedCampaign.id]?.completion || 0}%
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      </div>

                      {/* Content breakdown brief */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-foreground">Content Distribution</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {["LinkedIn Post", "Twitter Thread", "Newsletter", "Video Script"].map(type => {
                            const count = campaignAssets.filter(a => a.type === type).length;
                            return (
                              <div key={type} className="border border-border/40 rounded-xl p-3 bg-secondary/10 text-center">
                                <span className="text-[10px] text-muted-foreground block font-bold truncate">{type}s</span>
                                <span className="text-lg font-extrabold text-foreground mt-1 block">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {detailTab === "assets" && (
                    <div className="space-y-4">
                      {/* Asset Header Actions */}
                      <div className="flex items-center justify-between gap-2 border-b border-border/30 pb-3">
                        <span className="text-xs font-bold text-muted-foreground">Campaign Assets Inventory</span>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-xs font-bold rounded-lg border-border/80"
                            onClick={() => {
                              setIsAddingNewAsset(true);
                              setIsLinkingAsset(false);
                            }}
                          >
                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Draft
                          </Button>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="h-8 text-xs font-bold rounded-lg"
                            onClick={() => {
                              setIsLinkingAsset(true);
                              setIsAddingNewAsset(false);
                            }}
                          >
                            <LinkIcon className="h-3.5 w-3.5 mr-1" /> Link Existing
                          </Button>
                        </div>
                      </div>

                      {/* Add New Asset Form */}
                      {isAddingNewAsset && (
                        <Card className="border border-primary/20 bg-primary/5 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground flex items-center gap-1"><FilePlus className="h-3.5 w-3.5 text-primary" /> Create Campaign Asset</span>
                            <button onClick={() => setIsAddingNewAsset(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                          </div>
                          <form onSubmit={handleAddNewAsset} className="space-y-3">
                            <div className="space-y-1">
                              <Label htmlFor="asset-title" className="text-[10px] uppercase font-bold text-muted-foreground">Draft Title</Label>
                              <Input
                                id="asset-title"
                                placeholder="E.g., 5 next.js hydration mistakes..."
                                value={newAssetTitle}
                                onChange={(e) => setNewAssetTitle(e.target.value)}
                                className="bg-card text-xs h-9 rounded-lg"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Platform Format</Label>
                                <Select value={newAssetType} onValueChange={(val) => val && setNewAssetType(val as MockContentAsset["type"])}>
                                  <SelectTrigger className="bg-card text-xs h-9 rounded-lg">
                                    <SelectValue placeholder="Format" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="LinkedIn Post" className="text-xs">LinkedIn Post</SelectItem>
                                    <SelectItem value="Twitter Thread" className="text-xs">Twitter Thread</SelectItem>
                                    <SelectItem value="Newsletter" className="text-xs">Newsletter</SelectItem>
                                    <SelectItem value="Video Script" className="text-xs">Video Script</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-end justify-end">
                                <Button type="submit" size="sm" className="h-9 w-full text-xs font-bold rounded-lg">
                                  Generate Draft
                                </Button>
                              </div>
                            </div>
                          </form>
                        </Card>
                      )}

                      {/* Link Existing Asset Form */}
                      {isLinkingAsset && (
                        <Card className="border border-primary/20 bg-primary/5 p-4 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5 text-primary" /> Link Workspace Asset</span>
                            <button onClick={() => setIsLinkingAsset(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                          </div>
                          {unlinkedAssets.length === 0 ? (
                            <p className="text-xs text-muted-foreground">No unlinked assets left in this workspace. Create a new draft.</p>
                          ) : (
                            <form onSubmit={handleLinkExistingAsset} className="space-y-3">
                              <div className="space-y-1">
                                <Label className="text-[10px] uppercase font-bold text-muted-foreground">Select Asset</Label>
                                <Select value={linkedAssetId} onValueChange={(val) => setLinkedAssetId(val || "")}>
                                  <SelectTrigger className="bg-card text-xs h-9 rounded-lg">
                                    <SelectValue placeholder="Choose an asset..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {unlinkedAssets.map(asset => (
                                      <SelectItem key={asset.id} value={asset.id.toString()} className="text-xs">
                                        [{asset.type}] {asset.title.slice(0, 40)}...
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end">
                                <Button type="submit" size="sm" className="h-8 text-xs font-bold rounded-lg">
                                  Link to Campaign
                                </Button>
                              </div>
                            </form>
                          )}
                        </Card>
                      )}

                      {/* Assets List */}
                      {campaignAssets.length === 0 ? (
                        <div className="py-8 text-center text-xs text-muted-foreground">
                          No assets linked to this campaign yet. Click Add Draft to generate template drafts.
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {campaignAssets.map(asset => (
                            <div 
                              key={asset.id} 
                              className="border border-border/40 hover:border-border rounded-xl p-3 bg-secondary/15 flex items-center justify-between gap-4 transition-colors"
                            >
                              <div className="flex items-start gap-2.5 overflow-hidden">
                                <div className="mt-0.5 shrink-0">
                                  {getAssetTypeIcon(asset.type)}
                                </div>
                                <div className="space-y-0.5 overflow-hidden">
                                  <h5 className="text-xs font-bold text-foreground truncate">{asset.title}</h5>
                                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                    <span>{asset.type}</span>
                                    <span>•</span>
                                    <span>{new Date(asset.date).toLocaleDateString()}</span>
                                    {asset.status === "Published" && (
                                      <>
                                        <span>•</span>
                                        <span className="text-emerald-500 font-bold">{asset.performance}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-semibold py-0.5 ${
                                  asset.status === "Published" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-secondary text-muted-foreground border-border"
                                }`}>
                                  {asset.status}
                                </Badge>
                                <button 
                                  onClick={() => handleUnlinkAsset(asset.id)}
                                  className="text-muted-foreground hover:text-red-500 p-1 hover:bg-secondary rounded-lg transition-colors"
                                  title="Unlink from campaign"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === "timeline" && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-muted-foreground block border-b border-border/30 pb-2">Campaign Milestone Timeline</span>
                      {sortedTimelineAssets.length === 0 ? (
                        <div className="py-8 text-center text-xs text-muted-foreground">No assets mapped.</div>
                      ) : (
                        <div className="relative border-l border-border/60 ml-2.5 pl-5 space-y-6 py-2">
                          {sortedTimelineAssets.map((asset) => {
                            const dateObj = new Date(asset.date);
                            return (
                              <div key={asset.id} className="relative group/timeline">
                                {/* Timeline Node dot */}
                                <div className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 ${
                                  asset.status === "Published" ? "bg-emerald-500 border-card" : "bg-muted border-card"
                                } group-hover/timeline:scale-110 transition-transform`} />
                                
                                <div className="space-y-1">
                                  <span className="text-[10px] font-bold text-muted-foreground">
                                    {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                  </span>
                                  <h5 className="text-xs font-bold text-foreground">{asset.title}</h5>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-[9px] h-4 leading-none font-semibold">
                                      {asset.type}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground">Status: <span className="font-semibold">{asset.status}</span></span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === "analytics" && (
                    <div className="space-y-6">
                      <span className="text-xs font-bold text-muted-foreground block border-b border-border/30 pb-2 font-mono">Performance Charts</span>
                      {campaignAssets.filter(a => a.status === "Published").length === 0 ? (
                        <div className="py-8 text-center text-xs text-muted-foreground bg-secondary/5 rounded-xl border border-dashed border-border/60">
                          Analytics will appear here once assets are published. Set campaign status and performance metrics to view charts.
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <Card className="border border-border/40 shadow-none p-4 bg-secondary/5">
                            <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Reach by Content Piece</CardTitle>
                            <div className="h-[220px] w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.2)" />
                                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} />
                                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} tickFormatter={formatMetric} />
                                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '10px' }} />
                                  <Bar dataKey="Reach" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </Card>

                          {/* Distribution Area Chart */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border border-border/40 rounded-xl p-4 bg-secondary/5">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-2">Omnichannel Breakdown</span>
                              <div className="space-y-2">
                                {["LinkedIn Post", "Twitter Thread", "Newsletter", "Video Script"].map(type => {
                                  const count = campaignAssets.filter(a => a.type === type).length;
                                  const pct = campaignAssets.length > 0 ? Math.round((count / campaignAssets.length) * 100) : 0;
                                  return (
                                    <div key={type} className="space-y-1">
                                      <div className="flex items-center justify-between text-[10px] font-semibold">
                                        <span className="text-muted-foreground">{type}s</span>
                                        <span className="text-foreground">{count} ({pct}%)</span>
                                      </div>
                                      <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <div className="border border-border/40 rounded-xl p-4 bg-secondary/5 flex flex-col justify-center text-center">
                              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Campaign Conversion Health</span>
                              <span className="text-3xl font-black text-emerald-400">92%</span>
                              <span className="text-[10px] text-muted-foreground mt-2 font-medium">Calculated based on average reach metrics and scheduling consistency.</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {detailTab === "members" && (
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-muted-foreground block border-b border-border/30 pb-2">Assigned Campaign Owners</span>
                      <div className="space-y-3">
                        {selectedCampaign.members.map(name => {
                          // Find member initials and color from workspace members
                          const workspaceMem = activeWorkspace.members.find(m => m.name === name);
                          const initials = workspaceMem?.initials || name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                          const color = workspaceMem?.color || "bg-primary/20 text-primary";
                          
                          return (
                            <div key={name} className="flex items-center gap-3 border border-border/40 p-2.5 rounded-xl bg-secondary/10">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${color}`}>
                                {initials}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-foreground">{name}</span>
                                <span className="text-[9px] text-muted-foreground">{workspaceMem?.role || "Campaign Contributor"}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Campaign Dialog Modal (AnimatePresence) */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Launch New Marketing Campaign</h3>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground">Campaign Name</Label>
                  <Input
                    id="name"
                    placeholder="E.g., Summer Product Launch 2026"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    className="bg-card border-border/80 text-xs h-9 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="desc" className="text-xs font-semibold text-foreground">Description / Objectives</Label>
                  <Textarea
                    id="desc"
                    placeholder="Provide a brief summary of campaign targets and objectives..."
                    value={newCampaignDesc}
                    onChange={(e) => setNewCampaignDesc(e.target.value)}
                    className="bg-card border-border/80 text-xs min-h-[60px] rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold text-foreground">Campaign Type</Label>
                    <Select value={newCampaignType} onValueChange={(val) => val && setNewCampaignType(val as Campaign["type"])}>
                      <SelectTrigger className="bg-card border-border/80 text-xs h-9 rounded-lg">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product Launch" className="text-xs">Product Launch</SelectItem>
                        <SelectItem value="Newsletter Growth" className="text-xs">Newsletter Growth</SelectItem>
                        <SelectItem value="Personal Brand" className="text-xs">Personal Brand</SelectItem>
                        <SelectItem value="Agency Growth" className="text-xs">Agency Growth</SelectItem>
                        <SelectItem value="SaaS Launch" className="text-xs">SaaS Launch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 flex flex-col justify-end pb-1.5">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="use-template" 
                        checked={useTemplate} 
                        onChange={(e) => setUseTemplate(e.target.checked)}
                        className="h-4 w-4 rounded border-border/80 text-primary focus:ring-primary/40 bg-card cursor-pointer"
                      />
                      <Label htmlFor="use-template" className="text-xs font-semibold cursor-pointer">
                        SeedTesting Draft Assets
                      </Label>
                    </div>
                    <span className="text-[10px] text-muted-foreground block mt-1 leading-normal">
                      Auto-generate 4-5 draft outline templates in workspace library.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="start" className="text-xs font-semibold text-foreground">Start Date</Label>
                    <Input
                      id="start"
                      type="date"
                      value={newCampaignStart}
                      onChange={(e) => setNewCampaignStart(e.target.value)}
                      className="bg-card border-border/80 text-xs h-9 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="end" className="text-xs font-semibold text-foreground">End Date</Label>
                    <Input
                      id="end"
                      type="date"
                      value={newCampaignEnd}
                      onChange={(e) => setNewCampaignEnd(e.target.value)}
                      className="bg-card border-border/80 text-xs h-9 rounded-lg"
                    />
                  </div>
                </div>

                {/* Team members selector */}
                <div className="space-y-2 border-t border-border/40 pt-4">
                  <Label className="text-xs font-semibold text-foreground block">Assign Campaign Team Owners</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-24 overflow-y-auto pr-1">
                    {activeWorkspace.members.map(member => {
                      const isChecked = newCampaignMembers.includes(member.name);
                      return (
                        <div key={member.name} className="flex items-center space-x-2 p-1.5 hover:bg-secondary/40 rounded-lg">
                          <input
                            type="checkbox"
                            id={`mem-${member.name}`}
                            checked={isChecked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewCampaignMembers(prev => [...prev, member.name]);
                              } else {
                                setNewCampaignMembers(prev => prev.filter(n => n !== member.name));
                              }
                            }}
                            className="h-3.5 w-3.5 rounded border-border/80 text-primary bg-card cursor-pointer"
                          />
                          <label htmlFor={`mem-${member.name}`} className="text-xs cursor-pointer select-none">
                            {member.name} ({member.role})
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="h-10 text-xs font-bold rounded-lg border-border/80"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="h-10 text-xs font-bold rounded-lg px-6"
                  >
                    Deploy Campaign
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
