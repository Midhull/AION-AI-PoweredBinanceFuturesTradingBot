export function Orb({ size = 100, pulse = false, side }: { size?: number; pulse?: boolean; side?: "BUY" | "SELL" }) {
  const glowClass = side === "BUY" ? "oklch(0.78 0.18 150)" : side === "SELL" ? "oklch(0.62 0.24 25)" : "oklch(0.78 0.16 230)";
  const orbClass = side === "BUY" ? "bg-signal/20" : side === "SELL" ? "bg-destructive/20" : "";

  return (
    <div className="relative group" style={{ width: size, height: size }}>
      <div className={`absolute inset-0 rounded-full blur-3xl opacity-40 transition-colors duration-1000 ${pulse ? "animate-pulse" : ""}`} style={{ backgroundColor: glowClass }} />
      <div className="absolute -inset-4 rounded-full border border-primary/20 animate-spin-slow opacity-30" />
      <div className="absolute -inset-8 rounded-full border border-primary/10 animate-spin-rev opacity-20" />
      
      <div className={`relative w-full h-full rounded-full orb flex items-center justify-center overflow-hidden transition-all duration-500 ${orbClass}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_0%,transparent_50%)] opacity-20" />
        <div className={`w-2/3 h-2/3 rounded-full blur-xl opacity-50 ${pulse ? "animate-pulse" : ""}`} style={{ backgroundColor: glowClass }} />
      </div>
    </div>
  );
}
