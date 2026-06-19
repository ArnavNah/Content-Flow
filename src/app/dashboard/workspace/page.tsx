"use client";

import { WorkspaceSnapshot } from "@/components/dashboard/workspace-snapshot";
import { useWorkspace } from "@/context/workspace-context";

export default function WorkspaceSnapshotPage() {
  const { activeWorkspace } = useWorkspace();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">Workspace Snapshot</h1>
        <p className="text-muted-foreground mt-1">
          Detailed status, members, and health analysis for workspace: <span className="font-bold text-foreground">{activeWorkspace.name}</span>.
        </p>
      </div>

      <div className="max-w-4xl">
        <WorkspaceSnapshot />
      </div>
    </div>
  );
}
