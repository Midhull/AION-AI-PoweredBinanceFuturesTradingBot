import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "./Particles";
import { Orb } from "./Orb";

const STATUSES = [
  "Loading market streams",
  "Syncing execution engine",
  "Validating futures environment",
  "Connecting Binance Futures Testnet",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0: black + particles forming orb
  // 1: scanline + initializing text + statuses
  // 2: orb expand + brand reveal
  // 3: camera through orb -> exit
  const [statusIdx, setStatusIdx] = useState(0);
  const [price, setPrice] = useState(71284.55);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 5200);
    const t3 = setTimeout(() => setPhase(3), 8200);
    const t4 = setTimeout(() => onDone(), 9600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    if (phase !== 1) return;
    const id = setInterval(() => setStatusIdx((i) => Math.min(i + 1, STATUSES.length)), 700);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    const id = setInterval(() => setPrice((p) => p + (Math.random() - 0.5) * 12), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
        className="fixed inset-0 z-[200] overflow-hidden bg-black"
        style={{ perspective: 1200 }}
      >
        {/* deep fog */}
        <div className="absolute inset-0 fog opacity-60" />
        <div className="absolute inset-0 grid-bg opacity-20" />

        {/* particles */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 0 ? 1 : 0 }}
          transition={{ duration: 2 }}
        >
          <Particles density={120} />
        </motion.div>

        {/* faint floating financial symbols */}
        <div className="absolute inset-0 pointer-events-none font-mono text-[10px] text-cyan/15 select-none">
          {["BTC", "ETH", "SOL", "USDT", "PERP", "LONG", "SHORT", "0x", "△", "▽"].map((s, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={{ left: `${(i * 97) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.3 }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* AI Orb — forms then expands */}
        <motion.div
          className="absolute inset-0 grid place-items-center"
          initial={{ scale: 0.2, opacity: 0, filter: "blur(40px)" }}
          animate={{
            scale: phase >= 3 ? 14 : phase >= 2 ? 1.25 : 1,
            opacity: 1,
            filter: phase >= 3 ? "blur(30px)" : "blur(0px)",
          }}
          transition={{ duration: phase >= 3 ? 1.4 : 2.2, ease: [0.7, 0, 0.3, 1] }}
        >
          <div className="relative">
            <Orb size={260} />
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{ width: 260, height: 260 }}
              >
                <div className="absolute inset-0 grid-bg opacity-50 animate-spin-slow" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Scanline sweep at phase 1 */}
        {phase === 1 && (
          <motion.div
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: "110%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
            style={{ boxShadow: "0 0 40px oklch(0.85 0.16 200 / 0.9)" }}
          />
        )}

        {/* Initializing text + statuses */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="init"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[14%] text-center"
            >
              <div className="font-mono text-[11px] tracking-[0.4em] text-cyan/80 animate-flicker">
                INITIALIZING AI TRADING SYSTEM
              </div>
              <div className="mt-6 space-y-1.5 font-mono text-[11px] text-foreground/60 min-h-[120px]">
                {STATUSES.slice(0, statusIdx).map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 justify-center"
                  >
                    <span className="text-signal">▸</span>
                    <span>{s}</span>
                    <span className="text-signal/80">[OK]</span>
                  </motion.div>
                ))}
                {statusIdx < STATUSES.length && (
                  <div className="flex items-center gap-3 justify-center text-cyan/70">
                    <span className="animate-blink">▸</span>
                    <span>{STATUSES[statusIdx]}…</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand reveal — phase 2 */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="text-center">
                <motion.div
                  initial={{ letterSpacing: "0.1em", opacity: 0, y: 20 }}
                  animate={{ letterSpacing: "0.5em", opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
                  className="text-[11px] md:text-xs font-mono text-cyan/80 uppercase"
                >
                  Binance Futures
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="mt-4 text-5xl md:text-7xl font-light tracking-[0.2em] glow-cyan"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, oklch(0.98 0.01 240), oklch(0.7 0.05 240))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AI TRADING BOT
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-6 text-sm text-foreground/55 tracking-wide"
                >
                  Professional-grade automated futures execution system.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan/30 bg-cyan/5 backdrop-blur-md font-mono text-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                  <span className="text-cyan/90">BTCUSDT</span>
                  <span className="text-foreground/80">{price.toFixed(2)}</span>
                  <span className="text-signal">▲ LIVE</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vignette + chromatic aberration feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, black 100%)",
          }}
        />
        <div className="scanlines absolute inset-0 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
