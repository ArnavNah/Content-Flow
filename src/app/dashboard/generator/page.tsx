"use client";

import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  FileVideo, 
  MessageSquare, 
  Briefcase, 
  Mail, 
  Wand2, 
  Link2, 
  Video, 
  FileText, 
  AlignLeft,
  CheckCircle,
  FolderPlus,
  ArrowRight,
  BookOpen,
  Trash2,
  X
} from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Tone option interface
interface ToneOption {
  id: "professional" | "casual" | "bold" | "inspiring" | "witty";
  name: string;
  description: string;
}

const TONE_OPTIONS: ToneOption[] = [
  { id: "bold", name: "Bold", description: "Contrarian, strong hooks, high punch." },
  { id: "inspiring", name: "Inspiring", description: "Story-driven, motivational, relational." },
  { id: "witty", name: "Witty", description: "Cheeky, funny, hooks that stand out." },
  { id: "professional", name: "Professional", description: "Clear, authoritative, metrics-oriented." },
  { id: "casual", name: "Casual", description: "Friendly, direct, simple terms." }
];

const PREDEFINED_TEMPLATES = [
  {
    id: "sys-1",
    name: "Contrarian Tech Hook",
    prompt: "Write about why standard MVPs are dead and why visual premium layouts convert better.",
    tone: "bold",
    source: "text"
  },
  {
    id: "sys-2",
    name: "Product Update Thread",
    prompt: "Outline our new local state operations and Command Palette feature for the SaaS dashboard.",
    tone: "professional",
    source: "notes"
  },
  {
    id: "sys-3",
    name: "Creator Story Hook",
    prompt: "Tell the story of how we launched ContentFlow AI in public, got our first 10 B2B users, and saved creators 14 hours a week.",
    tone: "inspiring",
    source: "text"
  }
];

// Source type option interface
interface SourceOption {
  id: "url" | "video" | "notes" | "text";
  name: string;
  icon: React.ElementType;
}

const SOURCE_OPTIONS: SourceOption[] = [
  { id: "url", name: "Blog URL", icon: Link2 },
  { id: "video", name: "YouTube Transcript", icon: Video },
  { id: "notes", name: "Raw Notes", icon: FileText },
  { id: "text", name: "Paste Text", icon: AlignLeft }
];

// Rich Content Generation Matrix (Tone x Platform)
const GENERATED_MATRIX = {
  bold: {
    linkedin: "Stop shipping generic Tailwind templates.\n\nYour B2B audience doesn't want another cookie-cutter dashboard that looks like a cheap SaaS boilerplate. They want premium experiences. They want product personality.\n\nWe designed ContentFlow AI with custom HSL tailored colors and glassmorphic micro-animations for one reason: premium feel converts. \n\nIf your startup is built on low-cost aesthetics, don't be surprised when customers pay low-tier prices.\n\nAgree? Disagree? Let's discuss in the comments. 👇",
    twitter: "1/ Stop shipping generic dashboards.\n\nIf your SaaS looks like every other Tailwind template, you are losing users. Visual excellence is a feature, not an afterthought. 🧵👇\n\n2/ Premium UI builds trust. Trust drives conversion. We built ContentFlow AI to prove that portfolio-grade designs don't need a massive team.\n\n3/ Just HSL-tailored colors, spacious layouts, and micro-interactions. Work in public. Ship with personality.\n\n4/ The minimum viable product is dead. It's time for the Minimum Awesome Product. ⚡️",
    newsletter: "Hey founders,\n\nI'm going to be blunt today: your product looks cheap.\n\nMost developers think that using Tailwind and copy-pasting standard Shadcn blocks is enough. It's not. In a crowded market, your UI is your handshake. If your design feels lazy, people assume your codebase is too.\n\nAt ContentFlow AI, we decoupled client states, injected custom Recharts visual tools, and focused on design tokens. The result? Users feel the value instantly.\n\nStop settling for 'good enough' designs. Start shipping premium assets.\n\nTalk next week,\nJohn",
    script: "[HOOK - 0:00-0:04]\nStop shipping boring designs. It's literally costing you sales.\n\n[BODY - 0:04-0:25]\nIf your website looks like a basic Tailwind template, you're telling your customers you don't care about quality. You need custom typography, rich glassmorphism, and responsive micro-interactions. People buy products that feel expensive. Decoupled states and rich color systems are how you stand out.\n\n[CTA - 0:25-0:30]\nWant to see how? Link in bio to try ContentFlow AI."
  },
  inspiring: {
    linkedin: "Six months ago, I was spending 14 hours a week manual-formatting content.\n\nI was writing a newsletter, then manually rewriting it for LinkedIn, then breaking it into threads, then scripting videos. It was exhausting. I felt like a slave to the algorithm rather than building my product.\n\nThat's why we built ContentFlow AI. Not to replace the creative spark, but to free it.\n\nToday, we generated 20+ assets from a single transcript in under 2 minutes. Seeing the system scale without losing our brand voice is a game changer.\n\nNever let distribution burn you out. Let technology work for you. ✨",
    twitter: "1/ Six months ago, content formatting was eating 14 hours of my week. \n\nI was stuck on the content treadmill, struggling to grow across LinkedIn, X, and YouTube. Here's how we automated it without losing our voice: 🧵👇\n\n2/ The key is tone-aware translation. You don't just dump text. You extract core concepts and format them specifically for each channel's layout rules.\n\n3/ LinkedIn needs storytelling. X needs tight threads. Newsletters need editorial depth.\n\n4/ Automating this gave me back my weekends. Don't let marketing distract you from building. Focus on value, leverage automation.",
    newsletter: "Hi team,\n\nI wanted to share a personal milestone with you.\n\nFor a long time, I struggled to build in public. I had the ideas, but rewriting them across 4 different platforms felt like a full-time job. I was constantly burnt out and ready to quit social channels entirely.\n\nThat's when we designed the ContentFlow processor. By automating the formatting process, we kept our authentic voice while multiplying our reach by 5x.\n\nIf you're feeling overwhelmed, remember: you don't need to work harder. You just need better leverage.\n\nBest,\nJohn",
    script: "[HOOK - 0:00-0:05]\nI was ready to quit content creation forever. Then I built this.\n\n[BODY - 0:05-0:23]\nWriting newsletters, LinkedIn posts, and scripts was taking 15 hours a week. I was completely burnt out. So, I built ContentFlow AI. It takes my raw thoughts and translates them into ready-to-use threads and video outlines in seconds. It kept my brand voice alive and saved my mental health.\n\n[CTA - 0:23-0:30]\nIf you're burnt out, try it for free. Link in bio."
  },
  witty: {
    linkedin: "I checked the manual. Turns out, content repurposing isn't a crime.\n\nBut writing a 2,000-word blog post and just copy-pasting the introduction to LinkedIn? That should definitely be illegal. 👮‍♂️\n\nB2B marketing has become a competition of who can write the most boring summary. We decided to rebel. We built ContentFlow AI to turn raw notes into wittier threads and video scripts that actually keep people awake.\n\nYour readers deserve better hooks. Your content team deserves their weekends back. Let's make content fun again.",
    twitter: "1/ Copy-pasting your blog intro to social media is a crime against copywriting.\n\nYour readers are bored. Your engagement is dying. Here's the antidote: 🧵👇\n\n2/ Standard AI writers sound like corporate robots. They say things like 'In this fast-paced digital era.' Please, stop.\n\n3/ Tone matching is the real game. We trained ContentFlow to write like humans, not PR departments.\n\n4/ Save time, save your brand reputation, and save your followers from falling asleep. 😴💤",
    newsletter: "Hey friends,\n\nIf I see one more newsletter starting with 'I hope this email finds you well,' I might delete my inbox.\n\nWhy does corporate communication have to be so... beige? We've traded personality for safety, and our metrics are paying the price. At ContentFlow, we've programmed a Witty tone profile that cuts through the noise like a hot knife through butter.\n\nYour audience doesn't want another textbook. They want a conversation.\n\nStay witty,\nJohn",
    script: "[HOOK - 0:00-0:03]\nYour social media posts are putting people to sleep.\n\n[BODY - 0:03-0:24]\nSeriously. Copying your blog post outline and pasting it into X isn't marketing—it's a sleep aid. You need sharp hooks, wittier setups, and formatting that actually fits the scroll speed. ContentFlow AI does this automatically in 3 seconds, so you don't look like a corporate robot.\n\n[CTA - 0:24-0:30]\nStop being boring. Try the tool. Link in bio."
  },
  professional: {
    linkedin: "Content distribution is a core driver of modern B2B SaaS growth.\n\nHowever, manually converting core assets into multiple marketing formats represents a significant resource drain. At ContentFlow AI, we analyzed client workflows and found content formatting consumes up to 35% of marketing teams' weekly schedules.\n\nBy leveraging tone-aware automation, organizations can scale their asset volume by 240% while preserving brand authority.\n\nOptimizing your distribution pipeline is no longer optional—it is a critical efficiency metric for scaling brands.",
    twitter: "1/ Content distribution is a primary growth channel for B2B startups.\n\nYet, manually adapting long-form assets for multiple social channels is a major operational bottleneck. Our data-backed breakdown: 🧵👇\n\n2/ High-growth teams increase asset volume by repurposing blogs into multi-channel threads, LinkedIn insights, and newsletters.\n\n3/ Preserving editorial standards is crucial. Standard AI generators fail tone checks. ContentFlow solves this via custom design token setups.\n\n4/ Scale output, maintain compliance, and increase pipeline efficiency. 📊📈",
    newsletter: "Dear subscriber,\n\nIn modern SaaS growth models, multi-channel content distribution is essential for organic lead generation. However, operational inefficiencies in formatting and adaptation often lead to wasted engineering and creative resources.\n\nContentFlow AI optimizes this pipeline by converting documentation, video transcripts, and blogs into highly structured social assets. Our benchmarks show a 4.5x improvement in output speed for teams on our Pro tier.\n\nFor a detailed operational analysis, visit our documentation page.\n\nSincerely,\nJohn Doe",
    script: "[HOOK - 0:00-0:04]\nHere is the operational bottleneck killing your marketing ROI.\n\n[BODY - 0:04-0:25]\nMost scaling startups lose valuable hours manually formatting newsletters and blogs into social posts. To optimize distribution, teams must automate asset repurposing. ContentFlow AI adapts a single raw transcript into platform-compliant copy, increasing marketing velocity by 240% while preserving brand parameters.\n\n[CTA - 0:25-0:30]\nReview our case studies. Link in bio."
  },
  casual: {
    linkedin: "Let's be honest: writing content for 4 different platforms is a pain.\n\nYou write a newsletter, then you have to rewrite it for LinkedIn, then chop it up for Twitter, then script a video. By the time you're done, you don't even want to look at the posts anymore.\n\nWe built ContentFlow AI to do the boring formatting work for us. Paste a link, pick a tone, and you get all your assets in one place.\n\nIt's simple, it's fast, and it gives you your weekends back. How are you handling content right now?",
    twitter: "1/ Writing the same content for 4 different channels is exhausting.\n\nYou write a blog, then spend hours turning it into a thread. Here's a simpler way to do it: 🧵👇\n\n2/ Instead of rewriting everything manually, use tone-aware AI. It takes your raw notes and formats them for the X timeline in seconds.\n\n3/ No robot speak, just clean formatting and solid hooks.\n\n4/ Give it a try and see how much time you save. Link below! 👇⚡️",
    newsletter: "Hi guys,\n\nJust wanted to talk about a quick hack that's been saving me tons of time lately.\n\nI used to spend half my Friday trying to format my weekly newsletter into LinkedIn posts and Twitter threads. It was super repetitive. Now, I just run it through ContentFlow, clean up the drafts, and I'm done in 5 minutes.\n\nIf you're feeling stuck on the content treadmill, definitely check this out. It's a lifesaver.\n\nCheers,\nJohn",
    script: "[HOOK - 0:00-0:03]\nHere's how I stopped wasting hours on social media copy.\n\n[BODY - 0:03-0:22]\nSeriously, writing posts for LinkedIn, Twitter, and TikTok is super tedious. So I built ContentFlow AI to do the heavy lifting. You paste your notes, and it gives you clean posts and scripts that sound totally natural in just a few seconds. It saves a ton of time.\n\n[CTA - 0:22-0:30]\nCheck it out for yourself. Link in bio."
  }
};

interface CustomTemplate {
  id: string;
  name: string;
  prompt: string;
  tone: string;
  source: string;
}

export default function GeneratorPage() {
  const { addAsset, updateAsset } = useWorkspace();
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [selectedSource, setSelectedSource] = useState<"url" | "video" | "notes" | "text">("notes");
  const [selectedTone, setSelectedTone] = useState<"professional" | "casual" | "bold" | "inspiring" | "witty">("bold");
  const [inputText, setInputText] = useState("Content creation is taking up too much of my time as a founder. I want to build a tool that solves this by repurposing one post into dozens of platform formats. Premium design and dynamic state management are key requirements.");
  
  // Templates Drawer state
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [saveTemplateName, setSaveTemplateName] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [progressText, setProgressText] = useState("Ready");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("linkedin");

  const saveTemplate = (name: string, prompt: string, tone: string, source: string) => {
    const newTemplate: CustomTemplate = {
      id: "tmpl-" + Date.now(),
      name,
      prompt,
      tone,
      source
    };
    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem("cf_custom_templates", JSON.stringify(updated));
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem("cf_custom_templates", JSON.stringify(updated));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const prefill = localStorage.getItem("cf_prefill_generator");
        const prefillPlatform = localStorage.getItem("cf_prefill_platform");
        const prefillSource = localStorage.getItem("cf_prefill_source");
        const storedTemplates = localStorage.getItem("cf_custom_templates");

        if (prefill) {
          setTimeout(() => {
            setInputText(prefill);
            setSelectedSource("text");
          }, 0);
          localStorage.removeItem("cf_prefill_generator");
        }

        if (prefillPlatform && ["linkedin", "twitter", "newsletter", "script"].includes(prefillPlatform)) {
          setTimeout(() => {
            setActiveTab(prefillPlatform);
          }, 0);
          localStorage.removeItem("cf_prefill_platform");
        }

        if (prefillSource && ["url", "video", "notes", "text"].includes(prefillSource)) {
          setTimeout(() => {
            setSelectedSource(prefillSource as "url" | "video" | "notes" | "text");
          }, 0);
          localStorage.removeItem("cf_prefill_source");
        }

        if (storedTemplates) {
          setTimeout(() => {
            setTemplates(JSON.parse(storedTemplates));
          }, 0);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Custom textareas value state to support edits
  const [outputs, setOutputs] = useState({
    linkedin: "",
    twitter: "",
    newsletter: "",
    script: ""
  });

  // Custom Toast State
  const [toast, setToast] = useState<{ show: boolean; title: string; assetId?: number } | null>(null);

  // Trigger loading updates
  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentProgress(5);
    setProgressText("Initializing AI engine...");

    const intervals = [
      { progress: 25, text: "Analyzing source tone & core arguments...", delay: 600 },
      { progress: 55, text: `Applying '${selectedTone}' tone profile parameters...`, delay: 1200 },
      { progress: 85, text: "Generating platform-compliant formats...", delay: 1800 },
      { progress: 100, text: "Polishing drafts...", delay: 2400 }
    ];

    intervals.forEach((step) => {
      setTimeout(() => {
        setCurrentProgress(step.progress);
        setProgressText(step.text);
        
        if (step.progress === 100) {
          setTimeout(() => {
            setIsGenerating(false);
            setHasGenerated(true);
            // Set dynamic outputs based on tone matrix
            const generated = GENERATED_MATRIX[selectedTone];
            setOutputs({
              linkedin: generated.linkedin,
              twitter: generated.twitter,
              newsletter: generated.newsletter,
              script: generated.script
            });
            // Do not reset activeTab to "linkedin" to respect user's preselection
          }, 300);
        }
      }, step.delay);
    });
  };

  const handleSaveToLibrary = () => {
    let title = "";
    let type: "LinkedIn Post" | "Twitter Thread" | "Newsletter" | "Video Script" = "LinkedIn Post";

    if (activeTab === "linkedin") {
      title = outputs.linkedin.split("\n")[0].slice(0, 50) || "LinkedIn Post Draft";
      type = "LinkedIn Post";
    } else if (activeTab === "twitter") {
      title = outputs.twitter.split("\n")[0].slice(0, 50) || "Twitter Thread Draft";
      type = "Twitter Thread";
    } else if (activeTab === "newsletter") {
      title = outputs.newsletter.split("\n")[0].slice(0, 50) || "Newsletter Draft";
      type = "Newsletter";
    } else if (activeTab === "script") {
      title = outputs.script.split("\n")[2]?.slice(0, 50) || "Video Script Draft";
      type = "Video Script";
    }

    const savedAsset = addAsset(title, type, "Draft", 0);

    // Apply prefill scheduled date if present
    if (typeof window !== "undefined") {
      try {
        const prefillDate = localStorage.getItem("cf_prefill_date");
        if (prefillDate) {
          updateAsset(savedAsset.id, { date: prefillDate });
          localStorage.removeItem("cf_prefill_date");
        }
      } catch (e) {
        console.error(e);
      }
    }
    
    // Show Toast
    setToast({
      show: true,
      title: title.length > 30 ? title.slice(0, 30) + "..." : title,
      assetId: savedAsset.id
    });
  };

  // Auto-hide toast after 6 seconds
  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleOutputChange = (tab: "linkedin" | "twitter" | "newsletter" | "script", val: string) => {
    setOutputs(prev => ({
      ...prev,
      [tab]: val
    }));
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple inline alert or temporary toast update
    setToast({
      show: true,
      title: "Content copied to clipboard!"
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-24 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">AI Generator</h1>
          <p className="text-muted-foreground mt-1">Turn one piece of content into dozens of platform-ready assets.</p>
        </div>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsTemplatesOpen(true)}
            className="h-9 text-xs font-bold rounded-xl cursor-pointer bg-background hover:bg-secondary/40"
          >
            <BookOpen className="mr-1.5 h-4 w-4 text-primary" /> Saved Templates
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Input Selection */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Source Type Selector */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">1. Source Content Type</CardTitle>
              <CardDescription className="text-xs">Choose your raw content format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2.5">
                {SOURCE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedSource === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedSource(opt.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        isSelected 
                          ? "bg-primary/5 border-primary text-primary" 
                          : "bg-card border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5 shrink-0" />
                      <span>{opt.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Tone Profile Selector */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">2. Tone Profile</CardTitle>
              <CardDescription className="text-xs">Select the voice configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {TONE_OPTIONS.map((tone) => {
                const isSelected = selectedTone === tone.id;
                return (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`w-full flex flex-col gap-0.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-primary/5 border-primary text-primary shadow-[0_4px_12px_rgba(var(--primary-rgb),0.02)]" 
                        : "bg-card border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground capitalize">{tone.name}</span>
                      {isSelected && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground leading-normal mt-0.5">{tone.description}</span>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Source Text Input */}
          <Card className="border border-border/60 shadow-sm flex-1">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content" className="text-xs font-bold">3. Source Text</Label>
                <Textarea 
                  id="content" 
                  placeholder={
                    selectedSource === "url" ? "Enter blog post URL (e.g. https://myblog.com/post-name)..." :
                    selectedSource === "video" ? "Paste YouTube video URL or transcript text..." :
                    "Paste your raw ideas, newsletters or blogs here..."
                  }
                  className="min-h-[160px] text-xs leading-relaxed resize-none bg-muted/20 border-border/60 focus:bg-background rounded-xl p-3"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                className="w-full h-11 text-xs font-bold cursor-pointer rounded-xl bg-primary shadow-lg shadow-primary/10" 
                disabled={isGenerating || !inputText.trim()}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Assets...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Marketing Assets
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Output Preview */}
        <div className="lg:col-span-7">
          <Card className="border border-border/60 shadow-sm h-full min-h-[480px] flex flex-col justify-between">
            {/* INITIAL EMPTY STATE */}
            {!hasGenerated && !isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 border border-primary/20">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1.5">Unleash the multi-channel engine</h3>
                <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                  Configure your source text and tone on the left, then hit Generate to process platform assets simultaneously.
                </p>
              </div>
            )}

            {/* GENERATING LOADING STATE */}
            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="relative mb-6">
                  <div className="h-12 w-12 rounded-xl border border-border flex items-center justify-center bg-card shadow-sm animate-pulse">
                    <Wand2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute inset-0 h-12 w-12 rounded-xl border-2 border-primary border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{progressText}</h3>
                <p className="text-[10px] text-muted-foreground max-w-xs mb-4">
                  Translating hooks and layout constraints...
                </p>
                <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-out" 
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* OUTPUT PREVIEW TABS */}
            {hasGenerated && !isGenerating && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <CardHeader className="border-b border-border/40 pb-3 bg-secondary/10">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-sm font-bold">Processed Assets</CardTitle>
                      <CardDescription className="text-[11px] text-muted-foreground mt-0.5">
                        Generated in <span className="font-bold capitalize text-primary">{selectedTone}</span> voice
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-[10px] font-bold rounded-lg border-border/80 cursor-pointer"
                        onClick={handleSaveToLibrary}
                      >
                        <FolderPlus className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Save Current Draft
                      </Button>
                    </div>
                  </div>
                  <TabsList className="mt-4 grid grid-cols-4 w-full h-9 bg-secondary p-0.5 rounded-lg border border-border/60">
                    <TabsTrigger value="linkedin" className="text-[10px] font-bold rounded-md data-[state=active]:text-blue-600 data-[state=active]:bg-card"><Briefcase className="h-3 w-3 mr-1.5 hidden sm:inline" /> LinkedIn</TabsTrigger>
                    <TabsTrigger value="twitter" className="text-[10px] font-bold rounded-md data-[state=active]:text-indigo-600 data-[state=active]:bg-card"><MessageSquare className="h-3 w-3 mr-1.5 hidden sm:inline" /> Twitter / X</TabsTrigger>
                    <TabsTrigger value="newsletter" className="text-[10px] font-bold rounded-md data-[state=active]:text-orange-600 data-[state=active]:bg-card"><Mail className="h-3 w-3 mr-1.5 hidden sm:inline" /> Email</TabsTrigger>
                    <TabsTrigger value="script" className="text-[10px] font-bold rounded-md data-[state=active]:text-purple-600 data-[state=active]:bg-card"><FileVideo className="h-3 w-3 mr-1.5 hidden sm:inline" /> Video Script</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col m-0">
                  {Object.entries(outputs).map(([key, content]) => (
                    <TabsContent key={key} value={key} className="flex-1 flex flex-col m-0 data-[state=active]:flex">
                      <Textarea 
                        className="flex-1 min-h-[260px] text-xs leading-relaxed p-4 bg-muted/20 border border-transparent focus-visible:bg-background focus:border-border/60 rounded-xl resize-none font-medium"
                        value={content}
                        onChange={(e) => handleOutputChange(key as "linkedin" | "twitter" | "newsletter" | "script", e.target.value)}
                      />
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-[10px] text-muted-foreground font-semibold">
                          {content.length} chars • {content.split(/\s+/).filter(Boolean).length} words
                        </p>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-[10px] font-bold rounded-lg border-border/80 cursor-pointer"
                            onClick={() => handleCopyText(content)}
                          >
                            <Copy className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" /> Copy text
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 text-[10px] font-bold rounded-lg cursor-pointer bg-primary"
                            onClick={handleSaveToLibrary}
                          >
                            <FolderPlus className="mr-1.5 h-3.5 w-3.5" /> Save Asset
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

      {/* FLOAT SUCCESS TOAST (Framer Motion popup) */}
      <AnimatePresence>
        {toast?.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-card border border-border shadow-[0_15px_45px_-10px_rgba(0,0,0,0.12)] p-4 rounded-2xl flex items-start gap-3.5 backdrop-blur-md bg-card/90"
          >
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/15">
              <CheckCircle className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-bold text-foreground">Action Completed</p>
              <p className="text-xs text-muted-foreground leading-normal font-medium">
                {toast.assetId ? `Saved "${toast.title}" into workspace content library.` : toast.title}
              </p>
              {toast.assetId && (
                <div className="pt-2">
                  <Link 
                    href="/dashboard/library" 
                    className={cn(
                      buttonVariants({ size: "sm", variant: "secondary" }),
                      "h-8 text-xs font-bold px-3 rounded-md border bg-secondary/80 hover:bg-secondary cursor-pointer inline-flex items-center gap-1"
                    )}
                  >
                    <span>Go to Library</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-sm text-muted-foreground hover:text-foreground font-semibold px-1 cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SAVED TEMPLATES DRAWER */}
      <AnimatePresence>
        {isTemplatesOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsTemplatesOpen(false)}
            />

            {/* Drawer Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-card border-l border-border shadow-2xl flex flex-col h-full bg-card/95"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-border/45 flex items-center justify-between bg-secondary/15">
                  <div className="space-y-0.5">
                    <h3 className="text-base font-black text-foreground flex items-center gap-2">
                      <BookOpen className="h-4.5 w-4.5 text-primary" /> Prompt Templates
                    </h3>
                    <p className="text-xs text-muted-foreground font-semibold">Predefined setups & custom prompts</p>
                  </div>
                  <button 
                    onClick={() => setIsTemplatesOpen(false)}
                    className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-secondary rounded-lg transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Save Current Prompt Panel */}
                  <div className="border border-border/65 rounded-2xl p-4 bg-secondary/10 space-y-3">
                    <h4 className="text-xs uppercase font-bold text-foreground tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3 text-primary animate-pulse" /> Save Current Setup
                    </h4>
                    
                    {inputText.trim() ? (
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed bg-background/40 p-2 rounded-lg border border-border/40 font-medium">
                          <span className="font-bold text-foreground">Prompt:</span> &ldquo;{inputText}&rdquo;
                        </p>
                        
                        <div className="space-y-1">
                          <Label htmlFor="template-name" className="text-[10px] uppercase font-bold text-muted-foreground">Template Name</Label>
                          <input 
                            id="template-name"
                            placeholder="e.g. My Newsletter Framework..." 
                            value={saveTemplateName}
                            onChange={(e) => setSaveTemplateName(e.target.value)}
                            className="text-sm bg-background border border-border/80 px-2.5 py-1.5 rounded-lg text-foreground focus:outline-none focus:border-primary w-full font-bold"
                          />
                        </div>
                        
                        <Button
                          onClick={() => {
                            if (saveTemplateName.trim()) {
                              saveTemplate(saveTemplateName.trim(), inputText, selectedTone, selectedSource);
                              setSaveTemplateName("");
                              setToast({
                                show: true,
                                title: `Template "${saveTemplateName.trim()}" saved!`
                              });
                            }
                          }}
                          disabled={!saveTemplateName.trim()}
                          className="w-full text-sm font-bold h-8 cursor-pointer rounded-lg bg-primary"
                        >
                          Save current configuration
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground leading-normal font-medium">
                        Type some prompt text on the left generator side to save it as a custom template.
                      </p>
                    )}
                  </div>

                  {/* Predefined Templates */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-black text-muted-foreground tracking-wider">System Templates</h4>
                    <div className="space-y-2.5">
                      {PREDEFINED_TEMPLATES.map((tmpl) => (
                        <div 
                          key={tmpl.id}
                          onClick={() => {
                            setInputText(tmpl.prompt);
                            setSelectedTone(tmpl.tone as "professional" | "casual" | "bold" | "inspiring" | "witty");
                            setSelectedSource(tmpl.source as "url" | "video" | "notes" | "text");
                            setIsTemplatesOpen(false);
                            setToast({ show: true, title: `Template "${tmpl.name}" applied!` });
                          }}
                          className="border border-border/60 hover:border-primary/55 rounded-xl p-3.5 bg-card hover:bg-secondary/20 transition-all cursor-pointer text-left space-y-1.5 group"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{tmpl.name}</span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/40 font-mono">system</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                            {tmpl.prompt}
                          </p>
                          <div className="flex gap-1.5 pt-0.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/5 text-primary capitalize border border-primary/10">{tmpl.tone} voice</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground capitalize border border-border/40">source: {tmpl.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom Templates */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-black text-muted-foreground tracking-wider">Your Custom Templates</h4>
                    
                    {templates.length > 0 ? (
                      <div className="space-y-2.5">
                        {templates.map((tmpl) => (
                          <div 
                            key={tmpl.id}
                            className="border border-border/60 hover:border-primary/55 rounded-xl p-3.5 bg-card hover:bg-secondary/20 transition-all cursor-pointer text-left space-y-1.5 group relative pr-10 animate-none"
                            onClick={() => {
                              setInputText(tmpl.prompt);
                              setSelectedTone(tmpl.tone as "professional" | "casual" | "bold" | "inspiring" | "witty");
                              setSelectedSource(tmpl.source as "url" | "video" | "notes" | "text");
                              setIsTemplatesOpen(false);
                              setToast({ show: true, title: `Template "${tmpl.name}" applied!` });
                            }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{tmpl.name}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                              {tmpl.prompt}
                            </p>
                            <div className="flex gap-1.5 pt-0.5">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/5 text-primary capitalize border border-primary/10">{tmpl.tone} voice</span>
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground capitalize border border-border/45">source: {tmpl.source}</span>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTemplate(tmpl.id);
                              }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-red-500 p-1.5 hover:bg-secondary/50 rounded-lg transition-colors border-0 bg-transparent cursor-pointer animate-none"
                              title="Delete template"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center border border-dashed border-border/60 rounded-xl bg-secondary/5">
                        <p className="text-xs text-muted-foreground font-semibold">No custom templates saved yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
