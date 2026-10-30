import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">{`// ${eyebrow}`}</p>
      <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-xl font-bold tracking-tight", className)}>
      DSL<span className="text-cyan">.</span>
    </span>
  );
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("glass glow-border rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow", className)}>{children}</div>;
}

export function PlaceholderTag() {
  return <span className="rounded-full border border-dashed border-cyan/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">Placeholder</span>;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-brand" />;
}

export function AmbientBackground() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-violet/15 blur-[120px]" />
      <div
        className="absolute h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[100px] transition-transform duration-300 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.8, duration: 0.3 }}
      className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-background"
    >
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
        <Logo className="text-5xl text-gradient" />
        <div className="mx-auto mt-4 h-0.5 w-24 overflow-hidden rounded bg-muted">
          <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 0.8, repeat: Infinity }} className="h-full w-full bg-gradient-brand" />
        </div>
      </motion.div>
    </motion.div>
  );
}
