"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, Users, Shield, Building } from "lucide-react";

const members = [
  { name: "John Doe", email: "john@example.com", role: "Owner", initials: "JD" },
  { name: "Sarah Smith", email: "sarah@example.com", role: "Admin", initials: "SS" },
  { name: "Mike Johnson", email: "mike@example.com", role: "Editor", initials: "MJ" },
  { name: "Emma Wilson", email: "emma@example.com", role: "Viewer", initials: "EW" }
];

export default function WorkspaceSettings() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your team, roles, and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start font-medium bg-muted/50 text-foreground">
            <Building className="mr-2 h-4 w-4" /> General
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Users className="mr-2 h-4 w-4" /> Members
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Shield className="mr-2 h-4 w-4" /> Roles & Permissions
          </Button>
        </div>

        <div className="md:col-span-9 flex flex-col gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Workspace Profile</CardTitle>
              <CardDescription>Update your workspace name and logo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center text-primary font-bold text-xl cursor-pointer hover:bg-primary/20 transition-colors">
                  ACME
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Workspace Logo</h4>
                  <p className="text-xs text-muted-foreground">Recommended size: 256x256px.</p>
                  <Button variant="outline" size="sm" className="mt-2">Upload Image</Button>
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-sm font-medium leading-none">Workspace Name</label>
                <Input defaultValue="Acme Corp Marketing" />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to this workspace.</CardDescription>
              </div>
              <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Invite Member</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">{member.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                        {member.role}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
