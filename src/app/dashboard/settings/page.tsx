"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { User, Bell, Palette, Lock, CheckCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { currentUser, loginUser } = useWorkspace();

  const nameParts = currentUser.name.split(" ");
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts.slice(1).join(" ") || "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [prevName, setPrevName] = useState(currentUser.name);

  if (currentUser.name !== prevName) {
    setPrevName(currentUser.name);
    const parts = currentUser.name.split(" ");
    setFirstName(parts[0] || "");
    setLastName(parts.slice(1).join(" ") || "");
  }

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const handleSaveProfile = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (fullName) {
      loginUser(currentUser.email, fullName);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Personal Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account profile, preferences, and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3 flex flex-col gap-2">
          <Button variant="ghost" className="justify-start font-bold bg-muted/60 text-foreground rounded-lg text-xs h-9">
            <User className="mr-2 h-4 w-4 text-primary" /> Profile
          </Button>
          <Button variant="ghost" className="justify-start font-semibold text-muted-foreground hover:text-foreground rounded-lg text-xs h-9">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </Button>
          <Button variant="ghost" className="justify-start font-semibold text-muted-foreground hover:text-foreground rounded-lg text-xs h-9">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="justify-start font-semibold text-muted-foreground hover:text-foreground rounded-lg text-xs h-9">
            <Lock className="mr-2 h-4 w-4" /> Security
          </Button>
        </div>

        <div className="md:col-span-9 flex flex-col gap-8">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-foreground">Profile Details</CardTitle>
              <CardDescription className="text-xs">Update your personal information associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground leading-none">First Name</label>
                  <Input 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-secondary/20 border-border/80 text-xs rounded-lg mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground leading-none">Last Name</label>
                  <Input 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-secondary/20 border-border/80 text-xs rounded-lg mt-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground leading-none">Email Address</label>
                <Input value={currentUser.email} disabled className="bg-secondary/10 border-border/40 text-xs rounded-lg mt-1" />
                <p className="text-[10px] text-muted-foreground">To change your email, please contact support.</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/40 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button onClick={handleSaveProfile} className="text-xs font-bold h-9 rounded-lg bg-primary">
                  Save Profile
                </Button>
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs font-bold text-emerald-600 flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Profile updated
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </CardFooter>
          </Card>

          <Card className="border border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-foreground">Appearance</CardTitle>
              <CardDescription className="text-xs">Customize the look and feel of the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground leading-none">Theme Preference</label>
                {mounted && (
                  <div className="flex gap-4 mt-2">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="flex-1 text-xs rounded-lg"
                    >
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="flex-1 text-xs rounded-lg"
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'}
                      onClick={() => setTheme('system')}
                      className="flex-1 text-xs rounded-lg"
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
