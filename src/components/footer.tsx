import Link from "next/link";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Layers className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">ContentFlow<span className="text-primary">.ai</span></span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Turn one piece of content into dozens. The premier AI repurposing engine for fast-growing brands.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors text-muted-foreground hover:text-primary">𝕏</div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors text-muted-foreground hover:text-primary">in</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Guides</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ContentFlow AI. All rights reserved.</p>
          <p>Designed with ♥ for creators.</p>
        </div>
      </div>
    </footer>
  );
}
