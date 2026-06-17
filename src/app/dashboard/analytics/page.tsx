"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useWorkspace } from "@/context/workspace-context";

// Base performance data (Week/Month based)
const baseMonthlyPerformance = [
  { date: "Jan", linkedin: 4000, twitter: 2400, newsletter: 2400 },
  { date: "Feb", linkedin: 5500, twitter: 3900, newsletter: 2800 },
  { date: "Mar", linkedin: 7200, twitter: 9800, newsletter: 3300 },
  { date: "Apr", linkedin: 9100, twitter: 11400, newsletter: 4100 },
  { date: "May", linkedin: 11800, twitter: 14200, newsletter: 5400 },
  { date: "Jun", linkedin: 15400, twitter: 18600, newsletter: 6800 },
  { date: "Jul", linkedin: 19500, twitter: 24200, newsletter: 8100 },
];

const baseWeeklyPerformance = [
  { date: "Wk 1", linkedin: 850, twitter: 600, newsletter: 500 },
  { date: "Wk 2", linkedin: 1200, twitter: 950, newsletter: 550 },
  { date: "Wk 3", linkedin: 1500, twitter: 1400, newsletter: 620 },
  { date: "Wk 4", linkedin: 1950, twitter: 2100, newsletter: 720 },
];

const baseDailyPerformance = [
  { date: "Mon", linkedin: 120, twitter: 80, newsletter: 0 },
  { date: "Tue", linkedin: 180, twitter: 110, newsletter: 0 },
  { date: "Wed", linkedin: 220, twitter: 190, newsletter: 500 },
  { date: "Thu", linkedin: 190, twitter: 150, newsletter: 0 },
  { date: "Fri", linkedin: 310, twitter: 280, newsletter: 0 },
  { date: "Sat", linkedin: 90, twitter: 60, newsletter: 0 },
  { date: "Sun", linkedin: 70, twitter: 40, newsletter: 0 },
];

// Engagement breakdown base data
const baseEngagementDaily = [
  { name: "Mon", likes: 400, comments: 240, shares: 100 },
  { name: "Tue", likes: 300, comments: 139, shares: 80 },
  { name: "Wed", likes: 500, comments: 380, shares: 150 },
  { name: "Thu", likes: 280, comments: 190, shares: 90 },
  { name: "Fri", likes: 590, comments: 480, shares: 200 },
  { name: "Sat", likes: 800, comments: 600, shares: 300 },
  { name: "Sun", likes: 700, comments: 500, shares: 250 },
];

export default function AnalyticsPage() {
  const { activeWorkspace } = useWorkspace();
  const [timeframe, setTimeframe] = useState("30");

  const scaleFactor = useMemo(() => {
    switch (activeWorkspace.id) {
      case "agency": return 4.5;
      case "startup": return 2.0;
      default: return 1.0;
    }
  }, [activeWorkspace.id]);

  // Adjust performance chart points dynamically based on timeframe
  const currentPerformanceData = useMemo(() => {
    let rawData = baseWeeklyPerformance; // Default 30 days (4 weeks)
    
    if (timeframe === "7") {
      rawData = baseDailyPerformance;
    } else if (timeframe === "90") {
      rawData = baseMonthlyPerformance.slice(4, 7); // Last 3 months (May, Jun, Jul)
    } else if (timeframe === "365") {
      rawData = baseMonthlyPerformance; // 12 Months
    }

    return rawData.map(item => ({
      ...item,
      linkedin: Math.round(item.linkedin * scaleFactor),
      twitter: Math.round(item.twitter * scaleFactor),
      newsletter: Math.round(item.newsletter * scaleFactor),
    }));
  }, [timeframe, scaleFactor]);

  // Adjust engagement breakdown chart points
  const currentEngagementData = useMemo(() => {
    // Generate different aggregates or scale daily base
    const multiplier = timeframe === "7" ? 0.3 : timeframe === "90" ? 3.0 : timeframe === "365" ? 12.0 : 1.0;
    
    return baseEngagementDaily.map(item => ({
      name: item.name,
      likes: Math.round(item.likes * scaleFactor * multiplier),
      comments: Math.round(item.comments * scaleFactor * multiplier),
      shares: Math.round(item.shares * scaleFactor * multiplier),
    }));
  }, [timeframe, scaleFactor]);

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value.toString();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Deep dive into <span className="font-bold text-foreground">{activeWorkspace.name}</span> performance and growth.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={(val) => setTimeframe(val || "30")}>
            <SelectTrigger className="w-[180px] bg-card border-border/80 h-9 text-xs rounded-lg shadow-sm">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7" className="text-xs">Last 7 days</SelectItem>
              <SelectItem value="30" className="text-xs">Last 30 days</SelectItem>
              <SelectItem value="90" className="text-xs">Last 90 days</SelectItem>
              <SelectItem value="365" className="text-xs">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audience Reach Chart */}
        <Card className="border border-border/60 shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Audience Reach</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Total impressions across all connected channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLinkedin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dy={5} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatYAxis} dx={-5} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: '600' }} />
                  <Area type="monotone" dataKey="linkedin" stroke="#047857" strokeWidth={2} fillOpacity={1} fill="url(#colorLinkedin)" name="LinkedIn" />
                  <Area type="monotone" dataKey="twitter" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorTwitter)" name="Twitter / X" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Breakdown Chart */}
        <Card className="border border-border/60 shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Engagement Breakdown</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Likes, comments, and shares distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentEngagementData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dy={5} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatYAxis} dx={-5} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: '600' }} />
                  <Bar dataKey="likes" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} name="Likes" />
                  <Bar dataKey="comments" stackId="a" fill="#0284c7" name="Comments" />
                  <Bar dataKey="shares" stackId="a" fill="#ea580c" radius={[4, 4, 0, 0]} name="Shares" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Subscriber Growth Chart */}
        <Card className="border border-border/60 shadow-sm bg-card col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-bold text-foreground">Newsletter Subscriber Growth</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Cumulative new newsletter subscribers over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pr-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.3)" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} dy={5} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatYAxis} dx={-5} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.06)', fontSize: '11px', fontWeight: '600' }} />
                  <Line type="monotone" dataKey="newsletter" stroke="#ea580c" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Email Subscribers" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
