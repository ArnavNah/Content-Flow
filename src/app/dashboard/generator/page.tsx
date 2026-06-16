"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, RefreshCw, Download, FileVideo, MessageSquare, Briefcase, Mail, Wand2 } from "lucide-react";

// Mock Generated Content
const mockGenerated = {
  linkedin: "Excited to share my latest thoughts on AI content generation! 🚀\n\nMany founders struggle with keeping up across platforms. You write a great blog, but who has the time to chop it into 5 different formats?\n\nThat's where the new wave of AI comes in.\n\nHere are 3 ways AI is changing the game:\n1️⃣ Tone preservation: It doesn't sound like a robot anymore.\n2️⃣ Format adaptation: A blog structure is different from a thread. AI knows this.\n3️⃣ Speed to market: What took 3 days now takes 3 minutes.\n\nAre you using AI to repurpose content yet? Let me know below. 👇\n\n#AI #ContentCreator #SaaS #Marketing",
  twitter: "1/ Most founders are wasting 10+ hours a week formatting content.\n\nYou write a 2,000 word blog. Then you spend all day trying to turn it into a Twitter thread.\n\nStop doing this manually. 🛑👇\n\n2/ The secret? Tone-aware AI repurposing.\n\nIt analyzes your source material, extracts the core arguments, and rewrites them using platform-specific best practices.\n\n3/ End result:\n- 5x more output\n- Consistent voice\n- Zero blank-page syndrome\n\nWork smarter, not harder. 🧠⚡️",
  newsletter: "Hi team,\n\nThis week, I want to talk about something that's been draining my energy for years: content repurposing.\n\nWe all know we need to be omni-channel. But rewriting the same concept for LinkedIn, Twitter, and TikTok is exhausting. \n\nI recently discovered a new workflow using AI that analyzes my long-form blogs and automatically generates the short-form assets. The crazy part? It actually sounds like me.\n\nIf you're feeling the content treadmill burnout, I highly recommend looking into AI repurposing tools. It's given me back my weekends.\n\nBest,\nJohn",
  script: "[HOOK - 0:00-0:03]\nStop wasting your weekends trying to write Twitter threads.\n\n[BODY - 0:03-0:25]\nIf you're a founder, your time is your most valuable asset. Writing a blog post is great, but spending another 3 hours chopping it up for social media is a terrible ROI.\nInstead, you should be using AI to repurpose your content. You paste the URL, and it instantly generates your LinkedIn posts, Twitter threads, and even newsletter drafts.\n\n[CTA - 0:25-0:30]\nWork smarter. Link in bio to see the exact tool I use for this."
};

export default function GeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2500); // Fake delay for realism
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Generator</h1>
        <p className="text-muted-foreground mt-1">Turn one piece of content into dozens of platform-ready assets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Source Content</CardTitle>
              <CardDescription>Paste your blog, video transcript, or notes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Paste your source text or a URL here..." 
                  className="min-h-[250px] resize-none"
                  defaultValue="Content creation is taking up too much of my time as a founder. I want to build a tool that solves this..."
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                className="w-full h-12 text-base font-semibold" 
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Generate Assets
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-8">
          <Card className="shadow-sm h-full flex flex-col">
            {!hasGenerated && !isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Ready to create magic</h3>
                <p className="text-muted-foreground max-w-sm">
                  Add your source content on the left and hit generate to see your assets appear here.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
                <RefreshCw className="h-10 w-10 text-primary animate-spin mb-6" />
                <h3 className="text-xl font-bold mb-2">Processing your content...</h3>
                <p className="text-muted-foreground max-w-sm">
                  Applying tone profile, extracting key hooks, and formatting for 4 platforms.
                </p>
              </div>
            )}

            {hasGenerated && !isGenerating && (
              <Tabs defaultValue="linkedin" className="flex-1 flex flex-col">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Generated Assets</CardTitle>
                      <CardDescription>Review and edit your ready-to-publish content.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export All
                      </Button>
                    </div>
                  </div>
                  <TabsList className="mt-4 grid grid-cols-4 w-full h-12">
                    <TabsTrigger value="linkedin" className="data-[state=active]:text-blue-600"><Briefcase className="h-4 w-4 mr-2 hidden sm:block" /> LinkedIn</TabsTrigger>
                    <TabsTrigger value="twitter" className="data-[state=active]:text-sky-500"><MessageSquare className="h-4 w-4 mr-2 hidden sm:block" /> Twitter</TabsTrigger>
                    <TabsTrigger value="newsletter" className="data-[state=active]:text-orange-500"><Mail className="h-4 w-4 mr-2 hidden sm:block" /> Newsletter</TabsTrigger>
                    <TabsTrigger value="script" className="data-[state=active]:text-purple-500"><FileVideo className="h-4 w-4 mr-2 hidden sm:block" /> Video Script</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  {Object.entries(mockGenerated).map(([key, content]) => (
                    <TabsContent key={key} value={key} className="flex-1 flex flex-col m-0 data-[state=active]:flex">
                      <Textarea 
                        className="flex-1 min-h-[300px] text-base leading-relaxed p-4 bg-muted/30 border-transparent focus-visible:bg-background resize-none"
                        defaultValue={content}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xs text-muted-foreground">
                          {content.length} characters • {content.split(' ').length} words
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" /> Rewrite
                          </Button>
                          <Button size="sm">
                            <Copy className="mr-2 h-4 w-4" /> Copy Text
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </CardContent>
              </Tabs>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
