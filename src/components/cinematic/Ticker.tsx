const SYMS = [
  { s: "BTCUSDT", p: 71284.55, c: 1.24 },
  { s: "ETHUSDT", p: 3845.12, c: -0.42 },
  { s: "SOLUSDT", p: 184.66, c: 3.87 },
  { s: "BNBUSDT", p: 612.04, c: 0.61 },
  { s: "XRPUSDT", p: 0.6234, c: -1.05 },
  { s: "DOGEUSDT", p: 0.1521, c: 4.32 },
  { s: "ARBUSDT", p: 1.184, c: -2.18 },
  { s: "AVAXUSDT", p: 38.92, c: 0.94 },
];

export function Ticker() {
  const items = [...SYMS, ...SYMS];
  return (
    <div className="relative w-full overflow-hidden border-y border-primary/20 bg-background/40 backdrop-blur-md py-3">
      <div className="flex gap-12 whitespace-nowrap animate-ticker font-mono text-sm">
        {items.map((it, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-cyan/90 font-semibold">{it.s}</span>
            <span className="text-foreground/90">{it.p.toLocaleString()}</span>
            <span className={it.c >= 0 ? "text-signal" : "text-destructive"}>
              {it.c >= 0 ? "▲" : "▼"} {Math.abs(it.c).toFixed(2)}%
            </span>
            <span className="text-primary/40">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
