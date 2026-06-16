"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Bookmark, ArrowRight, Zap, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialSuggestions = [
  {
    id: 1,
    title: "Top 5 LinkedIn Hooks For Founders",
    description: "Repurpose your recent 'bootstrapping' thesis into high-engagement hook frameworks.",
    type: "Inspiration",
    source: "Based on trending founder posts this week",
    difficulty: "Fast"
  },
  {
    id: 2,
    title: "Convert Recent Newsletter To Thread",
    description: "Transform 'Scaling to 10k subscribers' into a 7-part high-value Twitter/X thread.",
    type: "Repurpose",
    source: "Based on newsletter 'Edition #43'",
    difficulty: "Medium"
  },
  {
    id: 3,
    title: "Repurpose Blog Into Video Script",
    description: "Rebuild '5 copywriting rules' into a 60-second engaging short-form video outline.",
    type: "Video",
    source: "Based on website blog",
    difficulty: "High"
  },
  {
    id: 4,
    title: "Create Weekly Content Roundup",
    description: "Assemble a digest post of your published assets to share as a weekly recap.",
    type: "Curation",
    source: "Based on 3 published assets",
    difficulty: "Fast"
  }
];

export function AISuggestions() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleDismiss = (id: number) => {
    setSuggestions(suggestions.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setSuggestions(initialSuggestions);
  };

  return (
    <div className="space-y-4 flex flex-col h-full justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-primary fill-primary/10" />
            <span>AI Ideas & Suggestions</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">High-impact opportunities based on your content history</p>
        </div>
        
        {suggestions.length < initialSuggestions.length && (
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Refresh List</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <AnimatePresence mode="popLayout">
          {suggestions.map((s) => (
            <motion.div
              key={s.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="h-full border border-border/60 hover:border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.03)] bg-card rounded-xl flex flex-col justify-between group overflow-hidden relative">
                {/* Dismiss Button Top Right */}
                <button
                  onClick={() => handleDismiss(s.id)}
                  className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                  title="Dismiss suggestion"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <CardContent className="p-5 flex flex-col justify-between h-full gap-4">
                  {/* Top Category and Metadata */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      s.type === "Inspiration" ? "bg-amber-500/10 text-amber-600" :
                      s.type === "Repurpose" ? "bg-blue-500/10 text-blue-600" :
                      s.type === "Video" ? "bg-indigo-500/10 text-indigo-600" :
                      "bg-emerald-500/10 text-emerald-600"
                    }`}>
                      {s.type}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold px-2 py-0.5 rounded bg-secondary/80 mr-6 group-hover:mr-0 transition-all">
                      ⚡ {s.difficulty}
                    </span>
                  </div>

                  {/* Suggestion Copy */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-foreground leading-snug">
                      {s.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                      {s.description}
                    </p>
                  </div>

                  {/* Footer metadata & buttons */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30 gap-2 mt-auto">
                    <span className="text-[10px] text-muted-foreground italic truncate max-w-[130px]" title={s.source}>
                      {s.source}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Save Button */}
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 px-2.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary bg-transparent cursor-pointer"
                        title="Save to drafts"
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </Button>
                      
                      {/* Generate Button */}
                      <Button
                        size="sm"
                        className="h-8 px-3 rounded-lg text-xs font-semibold shadow-sm cursor-pointer"
                      >
                        <span>Generate</span>
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {suggestions.length === 0 && (
          <div className="col-span-2 flex flex-col items-center justify-center p-8 bg-secondary/10 border-dashed border border-border/80 rounded-2xl text-center py-14">
            <Zap className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-xs font-bold text-foreground">All ideas cleared</p>
            <p className="text-[11px] text-muted-foreground mt-1 mb-4">Click Refresh to reload content ideas.</p>
            <Button 
              size="sm"
              variant="outline" 
              onClick={handleReset}
              className="rounded-lg h-8 cursor-pointer"
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Reload Suggestions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
