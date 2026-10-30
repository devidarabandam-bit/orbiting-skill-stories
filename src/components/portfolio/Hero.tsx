import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, FolderGit2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { profile, skillGroups } from "@/config/site";
import { Button } from "@/components/ui/button";

const allSkills = Array.from(new Set(skillGroups.flatMap((g) => g.skills)));

function TechOrb() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]" aria-hidden>
      <div className="absolute inset-[18%] rounded-full bg-gradient-brand opacity-40 blur-3xl" />
      <div className={`absolute inset-0 rounded-full border border-primary/25 ${reduce ? "" : "animate-spin-slow"}`}>
        {allSkills.map((s, i) => {
          const a = (i / allSkills.length) * Math.PI * 2;
          return (
            <span
              key={s}
              className="glass absolute flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl font-mono text-xs text-foreground"
              style={{ left: `${50 + 48 * Math.cos(a)}%`, top: `${50 + 48 * Math.sin(a)}%` }}
            >
              {s}
            </span>
          );
        })}
      </div>
      <div className="absolute inset-[22%] rounded-full border border-dashed border-violet/40" />
      <div className="glass absolute inset-[32%] flex items-center justify-center rounded-3xl shadow-glow-violet animate-float">
        <span className="font-display text-4xl font-bold text-gradient sm:text-5xl">DSL</span>
      </div>
    </div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.heroStatements.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 pb-16 sm:px-8">
      <div aria-hidden className="bg-grid animate-grid absolute inset-0 -z-10" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-cyan" /><span className="relative size-2 rounded-full bg-cyan" /></span>
            {profile.status}
          </motion.span>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-6 font-mono text-sm tracking-[0.25em] text-cyan">
            HELLO, WORLD! I'M
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            DARABANDAM <span className="text-gradient">DEVI SRI LAKSHMI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-5 text-lg text-foreground/90">
            {profile.title}
          </motion.p>
          <div className="mt-3 h-8 font-mono text-base text-violet sm:text-lg" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="inline-block">
                {"> "}{profile.heroStatements[i]}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-5 max-w-xl text-muted-foreground">
            {profile.heroDescription}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl"><Link to="/" hash="projects"><FolderGit2 /> Explore My Projects</Link></Button>
            <Button asChild variant="glass" size="xl"><Link to="/" hash="resume"><Download /> Download My Resume</Link></Button>
            <Button asChild variant="glass" size="xl"><Link to="/" hash="contact"><MessageCircle /> Let's Connect</Link></Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.3, duration: 1 }}>
          <TechOrb />
        </motion.div>
      </div>
      <Link to="/" hash="terminal" aria-label="Scroll down" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground">
        <span className="font-mono">scroll</span>
        <ArrowDown className="size-4 animate-bounce" />
      </Link>
    </section>
  );
}
