import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Particles } from "@/components/cinematic/Particles";
import { Ticker } from "@/components/cinematic/Ticker";
import { Orb } from "@/components/cinematic/Orb";
import { Candles } from "@/components/cinematic/Candles";
import { Preloader } from "@/components/cinematic/Preloader";
import { useTrading, TradeRequest } from "@/hooks/useTrading";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "AION — AI-Powered Binance Futures Trading Bot" },
      { name: "description", content: "A cinematic AI trading system. Built for intelligent automated execution on Binance Futures." },
    ],
  }),
});

function useTyped(text: string, speed = 40, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

function Index() {
  const [booted, setBooted] = useState(false);
  useEffect(() => {
    if (booted) document.documentElement.style.overflow = "";
    else document.documentElement.style.overflow = "hidden";
  }, [booted]);
  return (
    <main className="relative bg-[oklch(0.08_0.02_250)] text-foreground overflow-hidden selection:bg-cyan/30">
      {!booted && <Preloader onDone={() => setBooted(true)} />}
      <div className="grain" />
      <SystemStatus />
      <MarketRealtime />
      <Scene1 />
      <Ticker />
      <Scene2 />
      <Scene3 />
      <Scene4 />
      <Scene5 />
      <Scene6 />
      <Scene7 />
      <Scene8 />
    </main>
  );
}

function SystemStatus() {
  const { logs } = useTrading();
  const uptime = useTyped("02:14:55:08", 100);
  
  return (
    <div className="fixed top-6 left-6 z-50 flex gap-4">
      <div className="hud-glass px-4 py-2 rounded-lg flex items-center gap-3">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-signal blur-sm animate-ping" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">Network Status</span>
          <span className="text-xs font-mono text-signal uppercase tracking-widest">Binance Cloud Online</span>
        </div>
      </div>
      <div className="hud-glass px-4 py-2 rounded-lg hidden md:flex flex-col">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">Engine Uptime</span>
        <span className="text-xs font-mono text-cyan uppercase tracking-widest">{uptime}</span>
      </div>
      <div className="hud-glass px-4 py-2 rounded-lg hidden lg:flex flex-col">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">System Integrity</span>
        <span className="text-xs font-mono text-signal uppercase tracking-widest">100% Secured</span>
      </div>
    </div>
  );
}

/* SCENE 1 ─ AI MARKET AWAKENING */
function Scene1() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* layered backdrops */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.18_0.04_250)_0%,oklch(0.06_0.02_250)_60%,oklch(0.04_0.01_250)_100%)]" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-[70vh] grid-floor [transform:perspective(1200px)_rotateX(65deg)] origin-bottom scale-125" />
        <div className="absolute inset-0"><Particles density={100} /></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] fog opacity-60" />
        {/* scan line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent animate-scan opacity-70" />
      </motion.div>

      {/* center orb */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }} 
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} 
          transition={{ duration: 2, ease: "easeOut" }}
          className="animate-float"
        >
          <Orb size={320} pulse />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8 }} 
          className="mt-16 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-cyan/30 bg-cyan/5 text-[10px] font-mono tracking-[0.4em] text-cyan uppercase shadow-[0_0_20px_oklch(0.85_0.16_200_/_0.2)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-flicker shadow-[0_0_8px_var(--signal)]" />
          Neural Pipeline Synchronized · Binance Futures
        </motion.div>

        <h1 className="mt-8 max-w-6xl text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] perspective-1000">
          {"AI-Powered Binance Futures Trading Bot".split(" ").map((w, i) => (
            <motion.span 
              key={i} 
              initial={{ opacity: 0, y: 40, rotateX: -30, filter: "blur(20px)" }} 
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }} 
              transition={{ delay: 0.8 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
              className="inline-block mr-4 glow-cyan"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1.2 }} 
          className="mt-10 max-w-2xl text-muted-foreground text-xl font-light tracking-wide leading-relaxed"
        >
          A cinematic high-frequency execution layer engineered for autonomous quantitative strategy. Sub-84ms routing. Institutional-grade discipline.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.8, duration: 0.8 }} 
          className="mt-14 flex flex-wrap justify-center gap-6"
        >
          <button className="btn-cinematic px-10 py-4 text-lg">Initialize Core</button>
          <button className="btn-ghost px-10 py-4 text-lg">View Whitepaper</button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2.2 }} 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground tracking-[0.5em] uppercase flex flex-col items-center gap-4"
      >
        <div className="w-px h-12 bg-gradient-to-b from-cyan/40 to-transparent" />
        ↓ scroll to enter market
      </motion.div>
    </section>
  );
}

 /* SCENE 2 ─ NEURAL LIQUIDITY PIPELINE */
function Scene2() {
  const { marketData } = useTrading();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden bg-background/40">
      <div className="container mx-auto px-6">
        <SectionLabel index="02" title="Neural Liquidity Pipeline" sub="Sub-84ms routing latency across aggregate global orderbooks" />
        <motion.div style={{ y }} className="mt-12 glass rounded-3xl p-12 relative overflow-hidden h-[450px] group">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 opacity-40 group-hover:opacity-70 transition-opacity duration-1000">
            <Candles count={100} currentPrice={marketData ? parseFloat(marketData.p) : undefined} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-block px-3 py-1 rounded bg-cyan/10 border border-cyan/20 text-[10px] font-mono text-cyan mb-6 uppercase tracking-widest">Aggregate Orderbook</div>
            <div className="text-4xl font-bold tracking-tight mb-6">Autonomous Liquidity Provisioning</div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AION's execution layer utilizes a proprietary neural bridge to Binance Cloud, ensuring that your automated strategies benefit from the deepest liquidity pools on the planet with zero manual intervention. Every tick is calculated. Every spread is optimized.
            </p>
            <div className="mt-10 flex gap-12 text-sm font-mono uppercase tracking-[0.2em]">
              <div>
                <div className="text-muted-foreground mb-1">Fill Rate</div>
                <div className="text-xl font-bold text-signal">99.98%</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Execution</div>
                <div className="text-xl font-bold text-cyan">Neural</div>
              </div>
            </div>
          </div>
          {/* Decorative scanline */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan/50 via-transparent to-cyan/50" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, v, tone }: { label: string; v: string; tone: "signal" | "destructive" | "muted" | "cyan" }) {
  const c = { signal: "text-signal", destructive: "text-destructive", muted: "text-muted-foreground", cyan: "text-cyan" }[tone];
  return (
    <div className="rounded-md bg-background/40 border border-border/50 p-2">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono ${c}`}>{v}</div>
    </div>
  );
}

/* SCENE 3 ─ QUANTITATIVE DISCIPLINE */
function Scene3() {
  const { marketData } = useTrading();
  const price = marketData ? parseFloat(marketData.p) : 71240;
  const isUp = price > 71000;

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionLabel index="03" title="Institutional Quant Core" sub="Engineered for high-frequency discipline" />
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 space-y-8 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
              <svg viewBox="0 0 24 24" className="w-24 h-24 text-cyan" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2v20M2 12h20M12 2l10 10-10 10L2 12 12 2z" />
              </svg>
            </div>
            <div className="text-5xl font-bold tracking-tighter leading-tight">Zero-Lag Execution <br/><span className="text-cyan">Sub-84ms Integrity.</span></div>
            <p className="text-muted-foreground text-xl leading-relaxed">
              In the world of high-frequency futures, every millisecond is a profit boundary. AION is architected for stability under extreme volatility, maintaining sub-100ms execution integrity even during peak liquidity events.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="px-6 py-3 rounded-2xl bg-cyan/10 border border-cyan/20 text-cyan font-mono text-sm uppercase tracking-widest flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                Adaptive Edge Active
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="relative h-[550px] glass rounded-3xl overflow-hidden group shadow-[0_40px_100px_-20px_oklch(0_0_0_/_0.8)]"
          >
            <div className="absolute inset-0 opacity-10"><Particles density={60} /></div>
            <div className="absolute inset-x-0 bottom-0 h-[300px] opacity-40 group-hover:opacity-80 transition-opacity duration-700">
              <Candles count={50} currentPrice={price} />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <Orb size={240} side={isUp ? "BUY" : "SELL"} pulse />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[400px] h-[400px] bg-cyan/5 blur-[120px] animate-pulse" />
              </div>
            </div>
            <div className="absolute top-10 left-10">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Live Neural Telemetry</div>
              <div className="text-3xl font-mono tracking-tighter text-cyan">{price.toFixed(2)}</div>
            </div>
            <div className="absolute bottom-10 right-10 text-right">
              <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">Execution Status</div>
              <div className="text-xs font-mono text-signal">OPT-01-NOMINAL</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* SCENE 4 — ADVANCED EXECUTION */
function Scene4() {
  const { executeTrade, isExecuting } = useTrading();
  const [sym, setSym] = useState("BTCUSDT");
  const [qty, setQty] = useState(0.01);
  const [executed, setExecuted] = useState<any>(null);
  const [sequence, setSequence] = useState<string[]>([]);

  const handleTrade = async (side: "BUY" | "SELL") => {
    setSequence(["Initializing Terminal...", "Validating Pydantic Schema...", "Connecting Binance Cloud..."]);
    try {
      const req: TradeRequest = {
        symbol: sym,
        side,
        order_type: "MARKET",
        quantity: qty
      };
      
      await new Promise(r => setTimeout(r, 300));
      setSequence(prev => [...prev, "Order Packet Dispatched..."]);
      
      const res = await executeTrade(req);
      setSequence(prev => [...prev, `Execution Confirmed @ ${res.avgPrice}`]);
      setExecuted(res);
      toast.success(`EXECUTION CONFIRMED: ${res.symbol} ${res.side} @ ${res.avgPrice}`);
      
      setTimeout(() => {
        setExecuted(null);
        setSequence([]);
      }, 6000);
    } catch (e: any) {
      setSequence(prev => [...prev, `ERROR: ${e.message}`]);
      toast.error(e.message);
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionLabel index="04" title="Advanced Execution Layer" sub="High-frequency institutional execution pipeline" />

        <div className="mt-12 grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent pointer-events-none" />
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">Asset Symbol</label>
                  <input 
                    value={sym} 
                    onChange={(e) => setSym(e.target.value.toUpperCase())}
                    className="w-full bg-background/40 border border-border/40 rounded-xl px-5 py-3 font-mono text-cyan focus:outline-none focus:border-cyan/50 transition-all text-lg"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-2">Contract Quantity</label>
                  <input 
                    type="number"
                    value={qty} 
                    onChange={(e) => setQty(parseFloat(e.target.value))}
                    className="w-full bg-background/40 border border-border/40 rounded-xl px-5 py-3 font-mono text-cyan focus:outline-none focus:border-cyan/50 transition-all text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => handleTrade("BUY")}
                  disabled={isExecuting}
                  className="btn-cinematic bg-signal/20 border border-signal/40 text-signal hover:bg-signal/30 disabled:opacity-50 group/btn overflow-hidden"
                >
                  <span className="relative z-10">{isExecuting ? "ROUTING..." : "MARKET BUY"}</span>
                  <div className="absolute inset-0 bg-signal/10 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                </button>
                <button 
                  onClick={() => handleTrade("SELL")}
                  disabled={isExecuting}
                  className="btn-cinematic bg-destructive/20 border border-destructive/40 text-destructive hover:bg-destructive/30 disabled:opacity-50 group/btn overflow-hidden"
                >
                  <span className="relative z-10">{isExecuting ? "ROUTING..." : "MARKET SELL"}</span>
                  <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                </button>
              </div>
            </motion.div>

            <div className="glass rounded-xl p-6 font-mono text-[11px] space-y-2 border-cyan/10">
              <div className="text-muted-foreground flex justify-between uppercase tracking-widest">
                <span>Execution Sequence</span>
                <span className="text-cyan animate-pulse">Live Pulse</span>
              </div>
              <div className="h-24 overflow-hidden space-y-1">
                {sequence.map((line, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={line.startsWith("ERROR") ? "text-destructive" : "text-cyan"}>
                    → {line}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 glass rounded-2xl p-12 relative h-[500px] overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 holo-grid" />
            
            {/* execution beams */}
            {isExecuting && Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="execution-beam animate-beam" style={{ top: `${20 + i * 15}%`, left: "-10%", width: "100px", animationDelay: `${i * 0.2}s` }} />
            ))}

            {executed && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[oklch(0.08_0.02_250_/_0.9)] backdrop-blur-xl"
              >
                <div className="absolute inset-0 animate-shockwave border-4 border-cyan rounded-full" />
                <motion.div 
                  initial={{ scale: 0.8, y: 20 }} 
                  animate={{ scale: 1, y: 0 }} 
                  className="text-cyan text-5xl font-bold mb-6 glow-cyan tracking-tighter"
                >
                  CONFIRMED
                </motion.div>
                <div className="text-2xl font-mono text-foreground flex gap-4 items-center">
                  <span className={executed.side === "BUY" ? "text-signal" : "text-destructive"}>{executed.side}</span>
                  <span className="text-muted-foreground">/</span>
                  <span>{executed.symbol}</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-12 text-center">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Fill Price</div>
                    <div className="text-xl font-mono text-cyan">{executed.avgPrice}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Status</div>
                    <div className="text-xl font-mono text-signal">{executed.status}</div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="relative z-10">
              <Orb size={220} pulse={isExecuting} side={executed?.side} />
              {isExecuting && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan/10 blur-[100px] animate-pulse" />
              )}
            </div>

            <div className="mt-12 font-mono text-xs text-muted-foreground tracking-[0.4em] uppercase relative z-10">
              {isExecuting ? "Quantum Routing Dispatched" : "Execution Core Idle"}
            </div>
            
            {/* floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              <Particles density={30} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketRealtime() {
  const { marketData } = useTrading();
  if (!marketData) return null;
  
  const price = parseFloat(marketData.p);
  const isUp = price > 70000; // Simplified for BTC
  
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="hud-glass rounded-xl p-5 min-w-[240px] relative overflow-hidden group">
        <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${isUp ? 'bg-signal' : 'bg-destructive'}`} />
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Aggregate Stream</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-flicker" />
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-2xl font-bold tracking-tighter">BTCUSDT</span>
          <span className={`text-2xl font-mono glow-text-${isUp ? 'signal' : 'destructive'} transition-colors duration-500`}>
            {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center text-[10px] font-mono border-t border-border/20 pt-3">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Vol (24h)</span>
            <span className="text-foreground">{parseFloat(marketData.q).toFixed(3)} BTC</span>
          </div>
          <div className="text-right flex flex-col">
            <span className="text-muted-foreground">Latency</span>
            <span className="text-cyan">84ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SCENE 5 — INSTITUTIONAL TERMINAL */
function Scene5() {
  const { logs } = useTrading();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  return (
    <section className="relative py-32 overflow-hidden bg-background/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.16_0.05_240)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionLabel index="05" title="Institutional Quant Terminal" sub="Real-time proprietary backend execution telemetry" />

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }} 
          whileInView={{ opacity: 1, y: 0, scale: 1 }} 
          viewport={{ once: true }} 
          className="mt-12 mx-auto max-w-5xl group"
        >
          <div className="rounded-2xl overflow-hidden glass shadow-[0_50px_150px_-30px_oklch(0.05_0.02_250_/_1)] border-cyan/20">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-background/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/50" />
                  <span className="w-3 h-3 rounded-full bg-orange-500/50" />
                  <span className="w-3 h-3 rounded-full bg-signal/50" />
                </div>
                <div className="h-4 w-px bg-border/40 mx-2" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="text-cyan">●</span> aion@futures-node-01 — ssh
                </span>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground tracking-widest hidden md:block">
                PID: 84920 · THREADS: 12 · CPU: 4.2%
              </div>
            </div>
            <div 
              ref={containerRef}
              className="p-8 font-mono text-[12px] leading-relaxed space-y-1 bg-[oklch(0.04_0.01_250)]/95 h-[450px] overflow-y-auto terminal-scroll selection:bg-cyan/40"
            >
              <div className="text-muted-foreground mb-4 opacity-50">
                [SYSTEM REBOOT COMPLETE] - SECURE UPLINK ESTABLISHED<br/>
                [KERNEL] AION-ENGINE v1.4.2-STABLE<br/>
                [NETWORK] NODE-ID: AS-821-XP<br/>
                ------------------------------------------------------------
              </div>
              
              {logs.length === 0 && (
                <div className="text-cyan animate-pulse">→ Synchronizing execution buffers...</div>
              )}
              
              {logs.map((line, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -5 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 group/line"
                >
                  <span className="text-muted-foreground/30 select-none w-4">{i + 1}</span>
                  <span className={line.includes("ERROR") ? "text-destructive" : line.includes("INFO") ? "text-cyan" : "text-muted-foreground"}>
                    {line}
                  </span>
                </motion.div>
              ))}
              <div className="pt-2 flex items-center gap-2">
                <span className="text-cyan select-none">$</span>
                <span className="text-cyan animate-blink h-4 w-2 bg-cyan block" />
              </div>
            </div>
            <div className="bg-background/80 px-6 py-3 border-t border-border/20 flex justify-between items-center text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              <span>Latency: 84ms</span>
              <span>Memory: 124.5MB / 512.0MB</span>
              <span className="text-signal">Status: Nominal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* SCENE 6 — SECURITY VAULT */
function Scene6() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 holo-grid opacity-5" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionLabel index="06" title="Security & Integrity Vault" sub="Military-grade encryption for every trade packet" />
        <div className="mt-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[480px] glass rounded-3xl flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 grid-bg opacity-10" />
            
            {/* encrypted rings */}
            <div className="relative w-80 h-80">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`absolute inset-0 rounded-full border border-cyan/20 ${i % 2 ? "animate-spin-slow" : "animate-spin-rev"}`} 
                  style={{ 
                    inset: `${i * 15}px`, 
                    borderStyle: i % 2 ? "dashed" : "solid", 
                    opacity: 1 - i * 0.15,
                    borderWidth: i === 0 ? '2px' : '1px'
                  }} 
                />
              ))}
              
              {/* rotating hex grid */}
              <div className="absolute inset-0 opacity-20 scale-150 animate-spin-slow">
                <div className="w-full h-full holo-grid" />
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <motion.div 
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  className="w-28 h-28 rounded-3xl glass grid place-items-center text-cyan shadow-[0_0_50px_oklch(0.85_0.16_200_/_0.3)] border-cyan/40"
                >
                  <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2 L20 6 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V6 Z" />
                    <path d="M9 12 L11 14 L15 10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </div>

              {/* scanner */}
              <div className="absolute inset-x-0 h-px bg-cyan/50 blur-[2px] animate-scan top-0 z-20" />
            </div>
          </div>

          <div className="space-y-6">
            {[
              { t: "Quant Execution Boundaries", d: "Isolated runtime environments for every execution strategy." },
              { t: "Cryptographic Verification", d: "Request signing with HMAC-SHA256 for absolute packet integrity." },
              { t: "Vault Environment Control", d: "Secrets injected via secure Docker-level env variables, never exposed." },
              { t: "Anomaly AI Detection", d: "Real-time threat monitoring on order frequency and slippage variance." },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 50 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                transition={{ delay: i * 0.1 }} 
                viewport={{ once: true }} 
                className="glass rounded-2xl p-6 flex gap-6 hover:border-cyan/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-cyan/5 border border-cyan/20 grid place-items-center text-cyan font-mono text-xl group-hover:scale-110 transition-transform">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="text-xl font-bold tracking-tight mb-2 group-hover:text-cyan transition-colors">{f.t}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{f.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* SCENE 7 — FUTURE EXPANSION */
function Scene7() {
  const cards = [
    { t: "STOP-LIMIT Orders", d: "Conditional triggers with dynamic offsets." },
    { t: "Grid Trading", d: "Range-bound automated profit cycles." },
    { t: "TWAP Execution", d: "Slice large orders, minimize impact." },
    { t: "AI Prediction Engine", d: "Forecast micro-trends with neural ensembles." },
    { t: "Portfolio Risk AI", d: "Dynamic VaR with cross-asset correlation." },
    { t: "Real-time Analytics", d: "Latency-zero dashboards across venues." },
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,oklch(0.16_0.05_260)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <SectionLabel index="07" title="Future Expansion System" sub="Modules assembling into a platform" />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30, rotateX: -10 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: i * 0.08, duration: 0.6 }} viewport={{ once: true }} className="group glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl group-hover:bg-cyan/30 transition-colors" />
              <div className="relative">
                <div className="font-mono text-xs text-cyan mb-3">/ MODULE.{String(i + 1).padStart(2, "0")}</div>
                <div className="text-xl font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground mt-2">{c.d}</div>
                <div className="mt-6 h-px bg-gradient-to-r from-cyan/60 via-primary/40 to-transparent" />
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>STATUS: <span className="text-warn">QUEUED</span></span>
                  <span className="group-hover:text-cyan transition">DEPLOY →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* SCENE 8 — CINEMATIC ENDING */
function Scene8() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.12_0.04_250)_0%,oklch(0.04_0.01_250)_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0"><Particles density={50} /></div>
      <motion.div initial={{ scale: 1.2, opacity: 0.4 }} whileInView={{ scale: 0.8, opacity: 1 }} transition={{ duration: 2 }} viewport={{ once: true }}>
        <Orb size={160} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1.2 }} viewport={{ once: true }} className="mt-12 text-4xl md:text-6xl font-bold text-center max-w-3xl px-6 glow-cyan">
        Built for intelligent automated trading.
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1.4 }} viewport={{ once: true }} className="mt-6 font-mono text-sm tracking-[0.3em] uppercase text-muted-foreground">
        Powered by Python &amp; Binance Futures Testnet
      </motion.p>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 2, duration: 2 }} viewport={{ once: true }} className="mt-16 h-px w-72 bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <div className="mt-8 font-mono text-xs text-muted-foreground/60">© AION SYSTEMS · v1.0</div>
    </section>
  );
}

/* shared */
function SectionLabel({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
        <span>scene {index}</span>
        <span className="h-px flex-1 max-w-[80px] bg-cyan/40" />
      </div>
      <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-muted-foreground">{sub}</p>
    </motion.div>
  );
}
