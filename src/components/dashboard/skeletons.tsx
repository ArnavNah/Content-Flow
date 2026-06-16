"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted-foreground/10 rounded-md ${className}`} />
  );
}

export function KPICardsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="shadow-sm border border-border/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <SkeletonPulse className="h-4 w-28" />
            <SkeletonPulse className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent className="space-y-2.5">
            <SkeletonPulse className="h-8 w-20" />
            <div className="flex gap-2 items-center">
              <SkeletonPulse className="h-3 w-10" />
              <SkeletonPulse className="h-3 w-20" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="col-span-1 lg:col-span-2 shadow-sm border border-border/60">
        <CardHeader className="space-y-2">
          <div className="flex justify-between items-center">
            <SkeletonPulse className="h-5 w-48" />
            <div className="flex gap-1">
              <SkeletonPulse className="h-7 w-16 rounded-full" />
              <SkeletonPulse className="h-7 w-16 rounded-full" />
            </div>
          </div>
          <SkeletonPulse className="h-4 w-72" />
        </CardHeader>
        <CardContent className="pt-2">
          <SkeletonPulse className="h-[300px] w-full rounded-xl" />
        </CardContent>
      </Card>
      <Card className="shadow-sm border border-border/60">
        <CardHeader className="space-y-2">
          <SkeletonPulse className="h-5 w-32" />
          <SkeletonPulse className="h-4 w-44" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pt-2">
          <SkeletonPulse className="h-48 w-48 rounded-full" />
          <div className="flex justify-center gap-4 mt-6 w-full">
            <SkeletonPulse className="h-4 w-12" />
            <SkeletonPulse className="h-4 w-12" />
            <SkeletonPulse className="h-4 w-12" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ContentPipelineSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonPulse className="h-6 w-32" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, colIdx) => (
          <Card key={colIdx} className="bg-secondary/20 border-dashed border-border/80 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <SkeletonPulse className="h-4.5 w-16" />
                <SkeletonPulse className="h-4 w-6 rounded-full" />
              </div>
              <SkeletonPulse className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, cardIdx) => (
                <Card key={cardIdx} className="bg-card shadow-sm border border-border/60 hover:none hover:translate-y-0">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <SkeletonPulse className="h-4.5 w-12 rounded-full" />
                      <SkeletonPulse className="h-3 w-10" />
                    </div>
                    <SkeletonPulse className="h-4 w-full" />
                    <SkeletonPulse className="h-4 w-2/3" />
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex -space-x-1.5">
                        <SkeletonPulse className="h-5 w-5 rounded-full border border-card" />
                        <SkeletonPulse className="h-5 w-5 rounded-full border border-card" />
                      </div>
                      <SkeletonPulse className="h-3 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AISuggestionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonPulse className="h-6 w-36" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-sm border border-border/60">
            <CardContent className="p-5 space-y-4">
              <div className="flex justify-between">
                <SkeletonPulse className="h-4.5 w-16 rounded-full" />
                <SkeletonPulse className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <SkeletonPulse className="h-4 w-full" />
                <SkeletonPulse className="h-4 w-5/6" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <SkeletonPulse className="h-8.5 w-16 rounded-lg" />
                <SkeletonPulse className="h-8.5 w-24 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function RecentContentSkeleton() {
  return (
    <Card className="shadow-sm border border-border/60">
      <CardHeader className="space-y-2">
        <SkeletonPulse className="h-5 w-32" />
        <SkeletonPulse className="h-4 w-48" />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div className="border-b border-border pb-3 flex justify-between">
            {[...Array(5)].map((_, i) => (
              <SkeletonPulse key={i} className={`h-4.5 ${i === 0 ? 'w-48' : 'w-16'}`} />
            ))}
          </div>
          {[...Array(5)].map((_, rowIdx) => (
            <div key={rowIdx} className="flex justify-between py-3.5 border-b border-border/40 last:border-0">
              <div className="space-y-1 w-48">
                <SkeletonPulse className="h-4.5 w-full" />
                <SkeletonPulse className="h-3 w-16" />
              </div>
              <SkeletonPulse className="h-4.5 w-16 rounded-full" />
              <SkeletonPulse className="h-4.5 w-12 rounded-full" />
              <SkeletonPulse className="h-4.5 w-20" />
              <div className="flex gap-2">
                <SkeletonPulse className="h-7 w-7 rounded-md" />
                <SkeletonPulse className="h-7 w-7 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkspaceSnapshotSkeleton() {
  return (
    <Card className="shadow-sm border border-border/60">
      <CardHeader className="space-y-2">
        <SkeletonPulse className="h-5 w-44" />
        <SkeletonPulse className="h-4 w-28" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <SkeletonPulse className="h-8 w-14" />
            <SkeletonPulse className="h-3 w-28" />
          </div>
          <SkeletonPulse className="h-16 w-16 rounded-full" />
        </div>
        <div className="h-px bg-border/40 w-full" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-1 border border-border/60 rounded-xl p-3 bg-secondary/10">
              <SkeletonPulse className="h-3 w-14" />
              <SkeletonPulse className="h-5 w-12" />
            </div>
          ))}
        </div>
        <div className="h-px bg-border/40 w-full" />
        <div className="space-y-3">
          <SkeletonPulse className="h-4 w-32" />
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <SkeletonPulse key={i} className="h-7 w-7 rounded-full border border-card" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
