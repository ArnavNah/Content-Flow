"use client";

import { AISuggestions } from "@/components/dashboard/ai-suggestions";
import { useWorkspace } from "@/context/workspace-context";

export default function AIIdeasPage() {
  const { activeWorkspace } = useWorkspace();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">AI Ideas & Suggestions</h1>
        <p className="text-muted-foreground mt-1">
          Explore content opportunities tailored for the <span className="font-bold text-foreground">{activeWorkspace.name}</span> workspace.
        </p>
      </div>

      <div className="max-w-4xl">
        <AISuggestions />
      </div>
    </div>
  );
}
