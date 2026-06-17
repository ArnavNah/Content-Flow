"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AtSign, Mail, Play } from "lucide-react";
import { LinkedinIcon } from "@/components/dashboard/icons";
import { useWorkspace } from "@/context/workspace-context";

export function ContentMix() {
  const { assets, activeWorkspace } = useWorkspace();
  const workspaceAssets = assets.filter(a => a.workspaceId === activeWorkspace.id);
  const total = workspaceAssets.length;

  const countType = (type: string) => workspaceAssets.filter(a => a.type === type).length;

  const lCount = countType("LinkedIn Post");
  const tCount = countType("Twitter Thread");
  const nCount = countType("Newsletter");
  const vCount = countType("Video Script");

  const getPercentage = (count: number, fallback: number) => {
    if (total === 0) return fallback;
    return Math.round((count / total) * 100);
  };

  const mixData = [
    { name: "LinkedIn", value: getPercentage(lCount, 42), color: "#047857", icon: LinkedinIcon },
    { name: "Twitter / X", value: getPercentage(tCount, 25), color: "#6366f1", icon: AtSign },
    { name: "Newsletter", value: getPercentage(nCount, 18), color: "#ea580c", icon: Mail },
    { name: "Video Script", value: getPercentage(vCount, 15), color: "#061f1a", icon: Play }
  ];

  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card flex flex-col justify-between h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-base font-bold text-foreground">Content Mix</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Distribution of content formats in active campaigns
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-6 pt-0">
        {/* Donut Chart */}
        <div className="h-[180px] w-[180px] relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
                  fontSize: "11px",
                  color: "hsl(var(--foreground))",
                  fontWeight: "600"
                }}
              />
              <Pie
                data={mixData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {mixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Centered Total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-foreground">{total}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold mt-0.5">Assets</span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-col gap-3.5 w-full max-w-[200px]">
          {mixData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group">
                <div className="flex items-center gap-2">
                  <div 
                    className="h-6 w-6 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <span className="font-bold text-foreground">{item.value}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
