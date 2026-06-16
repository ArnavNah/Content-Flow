export function SocialProof() {
  return (
    <section className="py-12 border-y border-border/40 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6">
          Trusted by forward-thinking teams at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
          <div className="flex items-center gap-2 text-xl font-bold font-mono tracking-tighter"><div className="w-4 h-4 bg-foreground rounded-sm" /> Acme Corp</div>
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight"><div className="w-5 h-5 rounded-full border-2 border-foreground" /> Globex</div>
          <div className="flex items-center gap-2 text-xl font-bold italic"><div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-foreground" /> Soylent</div>
          <div className="flex items-center gap-2 text-xl font-black"><div className="w-5 h-5 bg-foreground rounded-tl-lg rounded-br-lg" /> Initech</div>
          <div className="flex items-center gap-2 text-xl font-medium tracking-widest"><div className="w-4 h-4 rounded-full bg-foreground" /> UMBRELLA</div>
        </div>
      </div>
    </section>
  );
}
