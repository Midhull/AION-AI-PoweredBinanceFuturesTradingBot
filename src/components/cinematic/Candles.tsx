import { useMemo, useState, useEffect } from "react";

export function Candles({ count = 60, currentPrice }: { count?: number; currentPrice?: number }) {
  const [data, setData] = useState<{ o: number; c: number; h: number; l: number }[]>([]);

  useEffect(() => {
    let p = 71000;
    const initial = Array.from({ length: count }, () => {
      const o = p;
      const c = p + (Math.random() - 0.48) * 20;
      const h = Math.max(o, c) + Math.random() * 10;
      const l = Math.min(o, c) - Math.random() * 10;
      p = c;
      return { o, c, h, l };
    });
    setData(initial);
  }, [count]);

  useEffect(() => {
    if (currentPrice && data.length > 0) {
      setData(prev => {
        const last = prev[prev.length - 1];
        const updated = {
          ...last,
          c: currentPrice,
          h: Math.max(last.h, currentPrice),
          l: Math.min(last.l, currentPrice)
        };
        return [...prev.slice(0, -1), updated];
      });
    }
  }, [currentPrice]);

  const min = Math.min(...data.map((c) => c.l), currentPrice || 0);
  const max = Math.max(...data.map((c) => c.h), currentPrice || 0);
  const range = (max - min) || 100;
  const W = 800, H = 240, cw = W / count;
  const norm = (v: number) => H - ((v - min) / range) * H;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full preserve-3d">
      <defs>
        <linearGradient id="up" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.18 150)" />
          <stop offset="100%" stopColor="oklch(0.6 0.2 160)" />
        </linearGradient>
        <linearGradient id="dn" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.22 25)" />
          <stop offset="100%" stopColor="oklch(0.5 0.22 25)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {data.map((k, i) => {
        const x = i * cw + cw / 2;
        const up = k.c >= k.o;
        return (
          <g key={i} className="transition-all duration-300">
            <line x1={x} x2={x} y1={norm(k.h)} y2={norm(k.l)} stroke={up ? "oklch(0.78 0.18 150)" : "oklch(0.65 0.22 25)"} strokeWidth="1.5" opacity="0.6" />
            <rect 
              x={x - cw * 0.35} 
              y={norm(Math.max(k.o, k.c))} 
              width={cw * 0.7} 
              height={Math.max(2, Math.abs(norm(k.o) - norm(k.c)))} 
              fill={up ? "url(#up)" : "url(#dn)"}
              className="rx-sm"
              filter={i === data.length - 1 ? "url(#glow)" : ""}
            />
          </g>
        );
      })}
    </svg>
  );
}
