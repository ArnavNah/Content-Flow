"use client";

import { useState, useEffect, useRef } from "react";
import { useWorkspace } from "@/context/workspace-context";
import { ArrowRight, ArrowLeft, X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  position: "bottom" | "top" | "left" | "right" | "center";
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "header-switcher",
    title: "Workspace Switcher 🔄",
    description: "Switch between Personal Brand, Growth Agency, and SaaS Startup workspaces instantly. Each workspace stores separate assets, team members, and reach metrics.",
    position: "bottom"
  },
  {
    targetId: "kpi-cards",
    title: "Dynamic KPI metrics 📈",
    description: "Monitor total audience reach, engagement rates, and drafts. The metrics adjust automatically whenever you generate, publish, or delete assets.",
    position: "bottom"
  },
  {
    targetId: "content-mix",
    title: "Content Mix Distribution 🎨",
    description: "A donut chart showing the share of each content format in active campaigns, calculated dynamically from your actual Content Library.",
    position: "left"
  },
  {
    targetId: "ai-suggestions",
    title: "AI Suggestion prompts ✨",
    description: "Get daily inspiration prompts. Click 'Bookmark' to save ideas directly into the library, or click 'Generate' to prefill inputs in the AI Generator.",
    position: "top"
  },
  {
    targetId: "quick-actions",
    title: "Quick Shortcuts ⚡️",
    description: "Rapid shortcuts to prefill platform generator templates, invite team members, or populate full demo data sets.",
    position: "top"
  }
];

export function ProductTour() {
  const { onboardingCompleted, tourCompleted, setTourCompleted, addNotification } = useWorkspace();
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Only run tour if onboarding is complete and tour is not complete
  const shouldRun = onboardingCompleted && !tourCompleted;

  useEffect(() => {
    if (!shouldRun) return;

    // Recalculate anchor element position
    const updatePosition = () => {
      const step = TOUR_STEPS[currentStep];
      const el = document.getElementById(step.targetId);
      
      if (el) {
        // Scroll element into view smoothly if needed
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          setCoords({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
          });
        }, 300);
      } else {
        setCoords(null); // Fallback to center
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [currentStep, shouldRun]);

  if (!shouldRun) return null;

  const step = TOUR_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setTourCompleted(true);
    addNotification("Onboarding tour completed! Press Ctrl+K to open the Command Palette.", "success");
  };

  // Get positioning for the tooltip relative to highlighted element
  const getTooltipStyle = () => {
    if (!coords) {
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "fixed" as const
      };
    }

    const margin = 12;

    switch (step.position) {
      case "bottom":
        return {
          top: `${coords.top + coords.height + margin}px`,
          left: `${coords.left + coords.width / 2}px`,
          transform: "translateX(-50%)",
          position: "absolute" as const
        };
      case "top":
        return {
          top: `${coords.top - margin - 200}px`, // approximate height fallback
          left: `${coords.left + coords.width / 2}px`,
          transform: "translateX(-50%)",
          position: "absolute" as const
        };
      case "left":
        return {
          top: `${coords.top + coords.height / 2}px`,
          left: `${coords.left - margin - 320}px`, // approximate width fallback
          transform: "translateY(-50%)",
          position: "absolute" as const
        };
      case "right":
        return {
          top: `${coords.top + coords.height / 2}px`,
          left: `${coords.left + coords.width + margin}px`,
          transform: "translateY(-50%)",
          position: "absolute" as const
        };
      default:
        return {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "fixed" as const
        };
    }
  };

  return (
    <div className="fixed inset-0 z-45 pointer-events-none">
      {/* Dimmed backdrop overlay with hole cutout */}
      <div 
        className="fixed inset-0 bg-background/60 backdrop-blur-[1.5px] pointer-events-auto transition-all"
        style={{
          clipPath: coords 
            ? `polygon(
                0% 0%, 
                0% 100%, 
                ${coords.left}px 100%, 
                ${coords.left}px ${coords.top}px, 
                ${coords.left + coords.width}px ${coords.top}px, 
                ${coords.left + coords.width}px ${coords.top + coords.height}px, 
                ${coords.left}px ${coords.top + coords.height}px, 
                ${coords.left}px 100%, 
                100% 100%, 
                100% 0%
              )`
            : "none"
        }}
      />

      {/* Pulsing Border highlight around element */}
      {coords && (
        <div 
          className="absolute border-2 border-primary rounded-xl ring-8 ring-primary/10 animate-pulse transition-all duration-300"
          style={{
            top: `${coords.top - 4}px`,
            left: `${coords.left - 4}px`,
            width: `${coords.width + 8}px`,
            height: `${coords.height + 8}px`
          }}
        />
      )}

      {/* Floating tooltip box */}
      <div 
        ref={tooltipRef}
        style={getTooltipStyle()}
        className="w-full max-w-[320px] bg-card border border-border shadow-2xl rounded-2xl p-5 pointer-events-auto z-50 select-none flex flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-primary shrink-0" />
            <h4 className="text-sm font-bold text-foreground truncate">{step.title}</h4>
          </div>
          <button 
            onClick={handleComplete}
            className="text-muted-foreground hover:text-foreground p-1 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-normal font-medium">
          {step.description}
        </p>

        {/* Step indicator footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-border/40 mt-1">
          <span className="text-xs text-muted-foreground font-semibold">
            Step {currentStep + 1} of {TOUR_STEPS.length}
          </span>

          <div className="flex gap-1.5">
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBack}
                className="h-8 text-xs font-bold px-2.5 rounded-md border-border/80 cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="h-3 w-3" /> Back
              </Button>
            )}
            
            <Button 
              size="sm" 
              onClick={handleNext}
              className="h-8 text-xs font-bold px-3 rounded-md cursor-pointer flex items-center gap-1 bg-primary"
            >
              {currentStep === TOUR_STEPS.length - 1 ? (
                <span>Finish</span>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
