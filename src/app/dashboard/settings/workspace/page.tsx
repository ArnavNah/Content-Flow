"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, Users, Shield, Building, CheckCircle, X } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkspaceSettings() {
  const { activeWorkspace, inviteMember, updateWorkspaceName } = useWorkspace();
  const [workspaceNameInput, setWorkspaceNameInput] = useState(activeWorkspace.name);
  
  // Modals / states
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");
  
  // Feedback alerts
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWorkspaceNameInput(activeWorkspace.name);
    }, 0);
  }, [activeWorkspace.id, activeWorkspace.name]);

  const handleSaveProfile = () => {
    if (workspaceNameInput.trim()) {
      updateWorkspaceName(workspaceNameInput.trim());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteName.trim()) {
      inviteMember(inviteName.trim(), inviteRole);
      setInviteName("");
      setIsInviteOpen(false);
    }
  };

  const getWorkspaceInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 4);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-24 relative">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Workspace Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your team, roles, and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start font-bold bg-muted/60 text-foreground rounded-lg text-xs h-9">
            <Building className="mr-2 h-4 w-4 text-primary" /> General Profile
          </Button>
          <Button variant="ghost" className="justify-start font-semibold text-muted-foreground hover:text-foreground rounded-lg text-xs h-9">
            <Users className="mr-2 h-4 w-4" /> Team Members
          </Button>
          <Button variant="ghost" className="justify-start font-semibold text-muted-foreground hover:text-foreground rounded-lg text-xs h-9">
            <Shield className="mr-2 h-4 w-4" /> Roles & Permissions
          </Button>
        </div>

        {/* Configurations Forms */}
        <div className="md:col-span-9 flex flex-col gap-8">
          
          {/* Workspace profile section */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold text-foreground">Workspace Profile</CardTitle>
              <CardDescription className="text-xs">Update your brand workspace name and logo details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center text-primary font-black text-sm cursor-pointer hover:bg-primary/20 transition-all select-none">
                  {getWorkspaceInitials(activeWorkspace.name)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-foreground">Workspace Logo</h4>
                  <p className="text-[10px] text-muted-foreground">Recommended size: 256x256px. PNG, JPG formats.</p>
                  <Button variant="outline" size="sm" className="mt-2 text-[10px] font-bold rounded-lg border-border/80 h-7">Upload Image</Button>
                </div>
              </div>
              
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-bold text-muted-foreground leading-none">Workspace Name</label>
                <Input 
                  value={workspaceNameInput} 
                  onChange={(e) => setWorkspaceNameInput(e.target.value)}
                  className="bg-secondary/20 border-border/80 text-xs rounded-lg mt-1"
                />
              </div>
            </CardContent>
            
            <CardFooter className="border-t border-border/40 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={handleSaveProfile} className="text-xs font-bold h-9 rounded-lg bg-primary">
                  Save Changes
                </Button>
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-emerald-600 flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Workspace updated
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </CardFooter>
          </Card>

          {/* Workspace members section */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-bold text-foreground">Team Members</CardTitle>
                <CardDescription className="text-xs">Manage who has access to this brand workspace.</CardDescription>
              </div>
              <Button onClick={() => setIsInviteOpen(true)} size="sm" className="h-8 text-[10px] font-bold rounded-lg cursor-pointer bg-primary">
                <Plus className="mr-1 h-3.5 w-3.5" /> Invite Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeWorkspace.members.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border/40">
                        <AvatarFallback className={`${member.color} text-[10px] font-black`}>
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold text-foreground">{member.name}</p>
                        <p className="text-[10px] text-muted-foreground font-semibold">
                          {member.name.toLowerCase().replace(/\s+/g, "")}@contentflow.ai
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-[9px] font-bold tracking-wider px-2 py-0.5 border bg-background text-muted-foreground border-border/80">
                        {member.role}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-lg cursor-pointer">
                        <Settings className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* POPUP MODAL: INVITE MEMBER */}
      <AnimatePresence>
        {isInviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsInviteOpen(false)}
            />
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-card border border-border shadow-2xl p-6 rounded-2xl w-full max-w-md z-10"
            >
              <button 
                onClick={() => setIsInviteOpen(false)}
                className="absolute top-4 right-4 p-1.5 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <form onSubmit={handleSendInvite} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground">Invite Workspace Member</h3>
                  <p className="text-xs text-muted-foreground">Grant access to collaborate in {activeWorkspace.name}.</p>
                </div>

                <div className="h-px bg-border/60" />

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Full Name</label>
                    <Input 
                      placeholder="e.g. Steve Jobs"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      className="text-xs h-9 rounded-lg"
                      required
                      autoFocus
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Role Selection</label>
                    <Select value={inviteRole} onValueChange={(val) => setInviteRole(val || "Editor")}>
                      <SelectTrigger className="w-full text-xs h-9 rounded-lg">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner" className="text-xs">Owner (Full access)</SelectItem>
                        <SelectItem value="Admin" className="text-xs">Admin (Manage settings)</SelectItem>
                        <SelectItem value="Editor" className="text-xs">Editor (Create & edit)</SelectItem>
                        <SelectItem value="Viewer" className="text-xs">Viewer (Read-only)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsInviteOpen(false)}
                    className="text-xs font-bold h-9 rounded-lg border-border/80 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="text-xs font-bold h-9 rounded-lg bg-primary cursor-pointer"
                  >
                    Send Invitation
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
