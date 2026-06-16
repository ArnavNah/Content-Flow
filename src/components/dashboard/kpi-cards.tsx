import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Eye, MousePointerClick, FileText, Share2 } from "lucide-react";

const kpis = [
  {
    title: "Total Posts Generated",
    value: "1,248",
    change: "+12.5%",
    trend: "up",
    icon: FileText
  },
  {
    title: "Total Reach",
    value: "48.2k",
    change: "+24.1%",
    trend: "up",
    icon: Eye
  },
  {
    title: "Avg. Engagement",
    value: "4.8%",
    change: "-1.2%",
    trend: "down",
    icon: MousePointerClick
  },
  {
    title: "Shares",
    value: "842",
    change: "+8.2%",
    trend: "up",
    icon: Share2
  }
];

export function KPICards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs flex items-center mt-1">
              <span className={`flex items-center font-medium ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {kpi.change}
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
