"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const performanceData = [
  { date: "Jan", linkedin: 4000, twitter: 2400, newsletter: 2400 },
  { date: "Feb", linkedin: 3000, twitter: 1398, newsletter: 2210 },
  { date: "Mar", linkedin: 2000, twitter: 9800, newsletter: 2290 },
  { date: "Apr", linkedin: 2780, twitter: 3908, newsletter: 2000 },
  { date: "May", linkedin: 1890, twitter: 4800, newsletter: 2181 },
  { date: "Jun", linkedin: 2390, twitter: 3800, newsletter: 2500 },
  { date: "Jul", linkedin: 3490, twitter: 4300, newsletter: 2100 },
];

const engagementData = [
  { name: "Mon", likes: 400, comments: 240, shares: 100 },
  { name: "Tue", likes: 300, comments: 139, shares: 80 },
  { name: "Wed", likes: 500, comments: 380, shares: 150 },
  { name: "Thu", likes: 280, comments: 190, shares: 90 },
  { name: "Fri", likes: 590, comments: 480, shares: 200 },
  { name: "Sat", likes: 800, comments: 600, shares: 300 },
  { name: "Sun", likes: 700, comments: 500, shares: 250 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into your content performance and growth.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Audience Reach</CardTitle>
            <CardDescription>Total impressions across all connected platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLinkedin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="linkedin" stroke="#2563eb" fillOpacity={1} fill="url(#colorLinkedin)" />
                  <Area type="monotone" dataKey="twitter" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTwitter)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Engagement Breakdown</CardTitle>
            <CardDescription>Likes, comments, and shares by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="likes" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="comments" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="shares" stackId="a" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Newsletter Subscriber Growth</CardTitle>
            <CardDescription>Cumulative new subscribers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="newsletter" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
