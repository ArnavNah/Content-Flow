"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-secondary border-b border-border shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-xl border border-primary/20">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">ContentFlow<span className="text-primary">.ai</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors hidden sm:block">
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants()}>Start Free Trial</Link>
        </div>
      </div>
    </header>
  );
}
