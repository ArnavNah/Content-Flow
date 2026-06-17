"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/workspace-context";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Layers, 
  Check, 
  Mail, 
  Play, 
  Rocket, 
  Users, 
  Target,
  ArrowRight,
  AtSign
} from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { Button } from "@/components/ui/button";

export function OnboardingWizard() {
  const { onboardingCompleted, setOnboardingCompleted } = useWorkspace();
  const [step, setStep] = useState(1);
  
  // Selections
  const [persona, setPersona] = useState<string>("Founder");
  const [channels, setChannels] = useState<string[]>(["linkedin", "twitter"]);
  const [defaultTone, setDefaultTone] = useState<string>("bold");

  if (onboardingCompleted) return null;

  const handleToggleChannel = (ch: string) => {
    setChannels(prev => 
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  const handleComplete = () => {
    try {
      // Complete onboarding
      setOnboardingCompleted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4 sm:p-6">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main glass card */}
      <div className="relative w-full max-w-xl bg-card border border-border/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 md:p-10 z-10">
        
        {/* Header Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-xl border border-primary/20">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <span className="font-black text-sm text-foreground">ContentFlow<span className="text-primary">.ai</span></span>
          </div>
          
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step 
                    ? "w-6 bg-primary" 
                    : s < step 
                      ? "w-2 bg-primary/40" 
                      : "w-2 bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Wizard Step Contents */}
        <div className="flex-1 flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/15 text-xs font-black text-primary uppercase tracking-wider">
                    <Rocket className="h-3 w-3" /> Get Started
                  </div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Tell us about yourself</h2>
                  <p className="text-sm text-muted-foreground">Select your primary role to customize your brand workspace templates.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "Founder", title: "Founder / CEO", desc: "Build authority and launch SaaS products", icon: Rocket },
                    { id: "Creator", title: "Solo Creator", desc: "Grow email lists and monetize platforms", icon: Target },
                    { id: "Marketer", title: "Growth Marketer", desc: "Scale channel reach and engagement rates", icon: Users }
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = persona === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setPersona(opt.id)}
                        className={`flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "bg-primary/5 border-primary text-primary" 
                            : "bg-secondary/20 border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-3 ${
                          isSelected ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                        }`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-bold text-foreground mb-1">{opt.title}</span>
                        <span className="text-xs text-muted-foreground leading-normal">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/15 text-xs font-black text-primary uppercase tracking-wider">
                    <Target className="h-3 w-3" /> Channels
                  </div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Select your active channels</h2>
                  <p className="text-sm text-muted-foreground">Which platforms do you actively write or schedule content for?</p>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {[
                    { id: "linkedin", title: "LinkedIn", desc: "Professional storytelling & hooks", icon: LinkedinIcon, color: "text-blue-600 bg-blue-600/10" },
                    { id: "twitter", title: "Twitter / X", desc: "Short threads & hot takes", icon: AtSign, color: "text-foreground bg-foreground/10" },
                    { id: "newsletter", title: "Newsletter", desc: "Long-form editorial recaps", icon: Mail, color: "text-orange-500 bg-orange-500/10" },
                    { id: "script", title: "Video Script", desc: "Short video scripts & briefs", icon: Play, color: "text-purple-500 bg-purple-500/10" }
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = channels.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleToggleChannel(opt.id)}
                        className={`flex items-center gap-3.5 p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-primary/5 border-primary" 
                            : "bg-secondary/20 border-border/60 hover:bg-secondary/40"
                        }`}
                      >
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${opt.color}`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate leading-none mb-1">{opt.title}</p>
                          <p className="text-xs text-muted-foreground truncate leading-none">{opt.desc}</p>
                        </div>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary border-primary text-primary-foreground" : "border-border/80 bg-background"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/15 text-xs font-black text-primary uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" /> Voice
                  </div>
                  <h2 className="text-2xl font-black text-foreground tracking-tight">Pick a default Brand Voice</h2>
                  <p className="text-sm text-muted-foreground">Select your primary writing style parameters to prefill generators.</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: "bold", title: "Bold & Contrarian", desc: "Short punchy hooks, argues points directly, highly controversial hooks." },
                    { id: "professional", title: "Professional & Data-driven", desc: "Clear metrics, authority frameworks, business growth and marketing ROI focus." },
                    { id: "casual", title: "Friendly & Conversational", desc: "Straightforward terms, direct tone, write like you talk to a friend." }
                  ].map((opt) => {
                    const isSelected = defaultTone === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setDefaultTone(opt.id)}
                        className={`w-full flex flex-col gap-1 p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? "bg-primary/5 border-primary" 
                            : "bg-secondary/20 border-border/60 hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-foreground">{opt.title}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <span className="text-xs text-muted-foreground leading-normal mt-0.5">{opt.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer buttons controls */}
        <div className="flex items-center justify-between border-t border-border/40 pt-6 mt-8">
          <button
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`text-sm font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${
              step === 1 ? "invisible" : ""
            }`}
          >
            Back
          </button>
          
          <Button
            onClick={() => {
              if (step < 3) {
                setStep(prev => prev + 1);
              } else {
                handleComplete();
              }
            }}
            className="text-sm font-bold h-9 px-5 rounded-lg cursor-pointer bg-primary"
            disabled={step === 2 && channels.length === 0}
          >
            {step === 3 ? (
              <span className="flex items-center gap-1.5">
                Complete Setup <Check className="h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Continue <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
