"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Download, ExternalLink } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Usage</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription plan, payment methods, and invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card className="shadow-sm border-primary/20">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Pro Plan</CardTitle>
                  <CardDescription>You are currently on the Pro tier.</CardDescription>
                </div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-extrabold tracking-tight">$79</span>
                <span className="text-muted-foreground font-medium mb-1">/ month</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Unlimited AI Generations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Advanced Virality Scoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Custom Tone Profiles</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-between bg-muted/10">
              <Button variant="outline">Cancel Plan</Button>
              <Button>Upgrade to Agency</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Download past invoices for your records.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Oct 1, 2026", amount: "$79.00", status: "Paid" },
                  { date: "Sep 1, 2026", amount: "$79.00", status: "Paid" },
                  { date: "Aug 1, 2026", amount: "$79.00", status: "Paid" }
                ].map((invoice, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{invoice.date}</p>
                      <Badge variant="outline" className="mt-1 text-emerald-500 bg-emerald-500/10 border-transparent">{invoice.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm">{invoice.amount}</span>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Current Usage</CardTitle>
              <CardDescription>Your current billing cycle usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">AI Generations</span>
                  <span className="text-muted-foreground">Unlimited</span>
                </div>
                <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Active Workspaces</span>
                  <span className="text-muted-foreground">2 / 3</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[66%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your primary payment method.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="p-2 bg-background rounded shadow-sm">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/28</p>
                </div>
              </div>
              <Button variant="link" className="px-0 mt-4 h-auto flex items-center gap-2">
                Update payment method <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
