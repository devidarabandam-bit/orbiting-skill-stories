import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./ui";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);

  const current = onHome ? active : pathname.startsWith("/blog") ? "blog" : "";

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5" aria-label="Main">
        <Link to="/" hash="home" aria-label="Home"><Logo /></Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <Link
                to="/"
                hash={n.id}
                className={cn(
                  "relative rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  current === n.id && "text-foreground",
                )}
              >
                {current === n.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-primary/15 ring-1 ring-primary/30" />}
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="glow" className="hidden sm:inline-flex">
            <Link to="/" hash="resume"><Download /> Resume</Link>
          </Button>
          <button className="rounded-lg p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-3 lg:hidden"
          >
            {navItems.map((n) => (
              <Link key={n.id} to="/" hash={n.id} onClick={() => setOpen(false)} className={cn("block rounded-lg px-4 py-3 text-base", current === n.id ? "bg-primary/15 text-foreground" : "text-muted-foreground")}>
                {n.label}
              </Link>
            ))}
            <Link to="/" hash="resume" onClick={() => setOpen(false)} className="mt-1 block rounded-lg bg-gradient-brand px-4 py-3 text-center font-medium text-primary-foreground">
              Download Resume
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">{profile.name}</span>
    </header>
  );
}
