"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [providerLoading, setProviderLoading] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !agree) return;
    
    setLoading(true);

    const initials = name.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2) || "U";
    
    try {
      localStorage.setItem("cf_current_user", JSON.stringify({
        name: name,
        email: email,
        initials: initials
      }));
    } catch (err) {
      console.error(err);
    }

    // Simulate API call
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setProviderLoading(provider);
    
    const providerEmail = `${provider}@company.com`;
    const providerName = provider.charAt(0).toUpperCase() + provider.slice(1) + " User";
    const initials = providerName.split(" ").map(p => p[0]).join("").toUpperCase().slice(0, 2) || "U";

    try {
      localStorage.setItem("cf_current_user", JSON.stringify({
        name: providerName,
        email: providerEmail,
        initials: initials
      }));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none -z-10" />

      {/* Left side: Premium Branding (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-card border-r border-border/50 relative overflow-hidden flex-col justify-between p-12 lg:p-16">
        {/* Background grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Top brand logo */}
        <Link href="/" className="flex items-center gap-2 relative z-10 self-start">
          <div className="bg-primary/10 p-1.5 rounded-xl border border-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">ContentFlow<span className="text-primary">.ai</span></span>
        </Link>

        {/* Center content */}
        <div className="relative z-10 my-auto max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            <span>Free 14-day trial • No credit card</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Start Repurposing Content in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Seconds</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Create an account to automatically convert blog posts, YouTube videos, and podcasts into social platform formats.
          </p>

          <div className="space-y-4 pt-4 border-t border-border/30 text-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">Unlimited content drafts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">All 4 channels: LinkedIn, Twitter, Newsletter, Video Scripts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-1 rounded-full text-primary">
                <Check className="h-4 w-4" />
              </div>
              <span className="font-medium text-foreground">Custom tone profile generation</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-muted-foreground flex justify-between">
          <span>© 2026 ContentFlow AI Inc.</span>
          <Link href="#privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>

      {/* Right side: Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 relative">
        <Link href="/" className="md:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-xl border border-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">ContentFlow</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[400px] space-y-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 rounded-lg px-3"
                disabled={loading || !!providerLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 rounded-lg px-3"
                disabled={loading || !!providerLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10 rounded-lg px-3"
                disabled={loading || !!providerLoading}
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Checkbox
                id="agree"
                checked={agree}
                onCheckedChange={(checked) => setAgree(!!checked)}
                disabled={loading || !!providerLoading}
              />
              <Label htmlFor="agree" className="text-xs text-muted-foreground leading-snug cursor-pointer select-none">
                I agree to the{" "}
                <Link href="#terms" className="text-primary hover:underline font-medium">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-10 rounded-lg font-medium shadow-sm transition-all"
              disabled={loading || !!providerLoading || !name || !email || !password || !agree}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full border-2 border-background border-t-transparent animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5">
                  <span>Get started for free</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-border/50" />
            <span className="absolute bg-background px-3 text-xs text-muted-foreground uppercase tracking-wider">
              Or sign up with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              className="h-10 rounded-lg gap-2 font-medium"
              onClick={() => handleSocialLogin("google")}
              disabled={loading || !!providerLoading}
            >
              {providerLoading === "google" ? (
                <div className="size-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              ) : (
                <GoogleIcon className="h-4 w-4" />
              )}
              <span className="text-sm">Google</span>
            </Button>
            <Button
              variant="outline"
              type="button"
              className="h-10 rounded-lg gap-2 font-medium"
              onClick={() => handleSocialLogin("github")}
              disabled={loading || !!providerLoading}
            >
              {providerLoading === "github" ? (
                <div className="size-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
              ) : (
                <GithubIcon className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm">GitHub</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
