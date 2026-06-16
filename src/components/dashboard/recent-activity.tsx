import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Briefcase, MessageSquare, Mail } from "lucide-react";

const activities = [
  {
    title: "10 LinkedIn hooks generated",
    source: "From 'Q3 Marketing Trends' blog",
    time: "2 hours ago",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-600/10"
  },
  {
    title: "Twitter thread published",
    source: "5 tools for indie hackers",
    time: "5 hours ago",
    icon: MessageSquare,
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  {
    title: "Newsletter draft created",
    source: "Weekly recap edition",
    time: "Yesterday",
    icon: Mail,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "5 LinkedIn posts generated",
    source: "From YouTube video transcript",
    time: "2 days ago",
    icon: Briefcase,
    color: "text-blue-600",
    bg: "bg-blue-600/10"
  }
];

export function RecentActivity() {
  return (
    <Card className="col-span-1 lg:col-span-3 shadow-sm">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest generations and exports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.bg}`}>
                <activity.icon className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.source}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
