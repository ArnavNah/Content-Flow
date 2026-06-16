"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

// Mock data representing growth over time
const mockData = {
  reach: [
    { name: "Week 1", LinkedIn: 12400, Twitter: 8200, Newsletter: 4100 },
    { name: "Week 2", LinkedIn: 18200, Twitter: 11400, Newsletter: 4800 },
    { name: "Week 3", LinkedIn: 24600, Twitter: 15900, Newsletter: 5900 },
    { name: "Week 4", LinkedIn: 32000, Twitter: 19800, Newsletter: 6500 },
    { name: "Week 5", LinkedIn: 45000, Twitter: 26400, Newsletter: 7800 },
    { name: "Week 6", LinkedIn: 54000, Twitter: 31200, Newsletter: 9200 },
  ],
  views: [
    { name: "Week 1", LinkedIn: 25000, Twitter: 41000, Newsletter: 5000 },
    { name: "Week 2", LinkedIn: 38000, Twitter: 52000, Newsletter: 5800 },
    { name: "Week 3", LinkedIn: 49000, Twitter: 68000, Newsletter: 7200 },
    { name: "Week 4", LinkedIn: 62000, Twitter: 84000, Newsletter: 8500 },
    { name: "Week 5", LinkedIn: 85000, Twitter: 112000, Newsletter: 9800 },
    { name: "Week 6", LinkedIn: 104000, Twitter: 138000, Newsletter: 12000 },
  ],
  engagement: [
    { name: "Week 1", LinkedIn: 1050, Twitter: 780, Newsletter: 620 },
    { name: "Week 2", LinkedIn: 1480, Twitter: 920, Newsletter: 710 },
    { name: "Week 3", LinkedIn: 1980, Twitter: 1250, Newsletter: 890 },
    { name: "Week 4", LinkedIn: 2540, Twitter: 1640, Newsletter: 940 },
    { name: "Week 5", LinkedIn: 3620, Twitter: 2180, Newsletter: 1120 },
    { name: "Week 6", LinkedIn: 4530, Twitter: 2840, Newsletter: 1420 },
  ]
};

export function PerformanceChart() {
  const [activeMetric, setActiveMetric] = useState<"reach" | "views" | "engagement">("reach");

  const currentData = mockData[activeMetric];

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value.toString();
  };

  const getMetricLabel = () => {
    switch (activeMetric) {
      case "reach": return "Audience Reach";
      case "views": return "Total Views";
      case "engagement": return "Total Engagements";
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2 border border-border/60 shadow-[0_10px_40px_-15px_rgba(30,30,30,0.03)] bg-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-base font-bold text-foreground">Content Performance</CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Monitor your brand growth across channels over time
          </CardDescription>
        </div>
        
        {/* Metric Selector Tabs */}
        <div className="flex bg-secondary p-0.5 rounded-full border border-border/80 text-xs w-fit">
          {(["reach", "views", "engagement"] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-semibold capitalize transition-all duration-200 cursor-pointer",
                activeMetric === metric 
                  ? "bg-card text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {metric}
            </button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="h-[320px] w-full pr-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNewsletter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                dx={-5}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)',
                  color: 'hsl(var(--foreground))',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
                labelStyle={{ fontWeight: '700', marginBottom: '4px' }}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ 
                  fontSize: '11px', 
                  fontWeight: '600',
                  color: 'hsl(var(--muted-foreground))',
                  paddingBottom: '20px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="LinkedIn" 
                stroke="#047857" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorLinkedIn)" 
                name="LinkedIn"
              />
              <Area 
                type="monotone" 
                dataKey="Twitter" 
                stroke="#0284c7" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTwitter)" 
                name="Twitter / X"
              />
              <Area 
                type="monotone" 
                dataKey="Newsletter" 
                stroke="#ea580c" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNewsletter)" 
                name="Newsletter"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
