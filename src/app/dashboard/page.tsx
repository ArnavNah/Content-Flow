import { KPICards } from "@/components/dashboard/kpi-cards";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John. Here's what's happening with your content.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/generator" className={buttonVariants({ className: "rounded-full shadow-sm" })}>
            <Sparkles className="mr-2 h-4 w-4" /> New Generation
          </Link>
        </div>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <ActivityChart />
        <RecentActivity />
      </div>
    </div>
  );
}
