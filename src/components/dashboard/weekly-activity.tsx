"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Calendar, CheckCircle } from "lucide-react";

const weeklyData = [
  { day: "Mon", assets: 12 },
  { day: "Tue", assets: 8 },
  { day: "Wed", assets: 15 },
  { day: "Thu", assets: 9 },
  { day: "Fri", assets: 18 }
];

// 5 weeks of mock data, each week having 7 days (0 to 4 assets per day)
const heatmapData = [
  [2, 0, 1, 3, 2, 0, 0], // Week 1
  [1, 3, 0, 2, 4, 1, 0], // Week 2
  [3, 2, 1, 0, 3, 0, 0], // Week 3
  [0, 2, 4, 2, 3, 1, 0], // Week 4
  [2, 1, 3, 2, 4, 0, 0]  // Week 5 (Current Week)
];

const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

export function WeeklyActivity() {
  const totalThisWeek = weeklyData.reduce((acc, curr) => acc + curr.assets, 0);

  // Helper to color heatmap squares based on asset volume
  const getHeatColor = (value: number) => {
    switch (value) {
      case 0: return "bg-border/30";
      case 1: return "bg-emerald-500/10 border-emerald-500/5";
      case 2: return "bg-emerald-500/30 border-emerald-500/10";
      case 3: return "bg-emerald-500/60 border-emerald-500/15";
      case 4: return "bg-emerald-500 border-emerald-600/20";
      default: return "bg-border/30";
    }
  };

  return (
    <Card className="border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold text-foreground">Weekly Activity</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Asset creation consistency and schedule distribution
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 flex-1 flex flex-col justify-between pt-4">
        {/* Simple Bar Chart */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Weekly Output</span>
            <span className="text-xs font-bold text-foreground">{totalThisWeek} Assets Created</span>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={5}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.06)",
                    fontSize: "10px",
                    color: "hsl(var(--foreground))",
                    fontWeight: "600"
                  }}
                  cursor={{ fill: "hsl(var(--secondary)/0.3)", radius: 4 }}
                />
                <Bar 
                  dataKey="assets" 
                  radius={[4, 4, 0, 0]}
                  fill="#047857"
                >
                  {weeklyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      className="fill-primary hover:fill-primary/80 transition-colors cursor-pointer" 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GitHub style heatmap grid */}
        <div className="space-y-3 pt-3 border-t border-border/30">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Consistency Map</span>
            <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Last 5 Weeks</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Days label column */}
            <div className="flex flex-col gap-1 text-[8px] font-bold text-muted-foreground w-3 text-right">
              {daysOfWeek.map((d, i) => i % 2 === 0 ? <span key={i}>{d}</span> : <span key={i} className="h-2" />)}
            </div>

            {/* Grid squares */}
            <div className="flex gap-1.5 flex-1">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((val, dIdx) => (
                    <div 
                      key={dIdx} 
                      className={`h-2.5 w-2.5 rounded-sm border ${getHeatColor(val)} transition-all duration-200 hover:scale-110 cursor-pointer`}
                      title={`${val} assets created`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground shrink-0 self-end">
              <span>Less</span>
              <div className="h-2 w-2 rounded-sm bg-border/30" />
              <div className="h-2 w-2 rounded-sm bg-emerald-500/20" />
              <div className="h-2 w-2 rounded-sm bg-emerald-500/50" />
              <div className="h-2 w-2 rounded-sm bg-emerald-500" />
              <span>More</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
