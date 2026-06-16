"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { User, Bell, Palette, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Personal Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account profile, preferences, and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start font-medium bg-muted/50 text-foreground">
            <User className="mr-2 h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="justify-start font-medium text-muted-foreground hover:text-foreground">
            <Lock className="mr-2 h-4 w-4" /> Security
          </Button>
        </div>

        <div className="md:col-span-9 flex flex-col gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="john@example.com" disabled />
                <p className="text-xs text-muted-foreground">To change your email, please contact support.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save Profile</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Theme Preference</label>
                {mounted && (
                  <div className="flex gap-4 mt-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="flex-1"
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="flex-1"
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'}
                      onClick={() => setTheme('system')}
                      className="flex-1"
                    >
                      System
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
