import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BookOpen, Brain, Code2, ExternalLink, Github, GraduationCap, Lightbulb, Rocket, Search, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { achievements, education, journey, profile, projects, skillGroups, type Project } from "@/config/site";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GlassCard, PlaceholderTag, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/utils";

/* ───────── About ───────── */
const highlights = [
  { icon: Search, title: "Curious Learner", text: "Always exploring how things work." },
  { icon: Lightbulb, title: "Creative Thinker", text: "Turning ideas into experiments." },
  { icon: Brain, title: "Problem Solver", text: "Breaking big problems into small steps." },
  { icon: Rocket, title: "Future Software Developer", text: "Building toward a career in tech." },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="about" title="Beyond The Code" subtitle="Get to know the person behind the projects." />
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-brand opacity-30 blur-2xl" />
            <div className="glass relative flex h-full items-center justify-center overflow-hidden rounded-[2rem]">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" loading="lazy" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <User className="mx-auto size-16 text-primary" />
                  <p className="mt-3 text-sm">Your photo goes here</p>
                  <div className="mt-2"><PlaceholderTag /></div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal className="space-y-4 text-muted-foreground">
            {profile.about.map((p, i) => <p key={i} className={i === 0 ? "text-lg text-foreground" : ""}>{p}</p>)}
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <GlassCard className="h-full p-5">
                  <h.icon className="size-6 text-cyan" />
                  <h3 className="mt-3 font-semibold">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ───────── Skills ───────── */
const glyph: Record<string, string> = { C: "C", "C++": "C++", Java: "☕", Python: "Py", JavaScript: "JS", HTML: "</>", CSS: "{ }" };

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="skills" title="My Tech Arsenal" subtitle="Languages, technologies, and tools I'm exploring." />
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.category} delay={gi * 0.1}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-3">
                <Code2 className="size-5 text-primary" />
                <h3 className="text-lg font-semibold">{g.category}</h3>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {g.skills.map((s) => (
                  <div key={s} className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background/40 p-4 transition-all hover:-translate-y-1 hover:border-cyan/50">
                    <span className="flex size-12 items-center justify-center rounded-lg bg-gradient-brand font-mono text-sm font-bold text-primary-foreground">{glyph[s] ?? s.slice(0, 2)}</span>
                    <span className="text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ───────── Projects ───────── */
const filters = ["All Projects", "Web Development", "Programming", "Java", "Python", "Other"] as const;

function Thumb({ p, big }: { p: Project; big?: boolean }) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-xl bg-navy", big ? "aspect-[16/9]" : "aspect-[16/10]")}>
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-[20%] rounded-full bg-gradient-brand opacity-30 blur-3xl" />
      {p.screenshots[0] ? (
        <img src={p.screenshots[0]} alt={`${p.title} screenshot`} loading="lazy" className="relative h-full w-full object-cover" />
      ) : (
        <span className="relative font-mono text-sm text-muted-foreground">{p.tech.join(" · ")}</span>
      )}
    </div>
  );
}

function LinkOrDisabled({ href, children }: { href: string; children: React.ReactNode }) {
  return href ? (
    <Button asChild variant="glow" size="sm"><a href={href} target="_blank" rel="noreferrer">{children}</a></Button>
  ) : (
    <Button variant="glow" size="sm" disabled title="Link not added yet">{children}</Button>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All Projects");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => filter === "All Projects" || p.category === filter);

  return (
    <Section id="projects">
      <SectionHeading eyebrow="projects" title="Things I've Built" subtitle="Every project is another step in my development journey." />
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
        {filters.map((f) => (
          <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={cn("relative rounded-full px-4 py-2 text-sm transition-colors", filter === f ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
            {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-primary/20 ring-1 ring-primary/40" />}
            {f}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn("glass glow-border flex flex-col rounded-2xl p-4 transition-shadow hover:shadow-glow", p.featured && filter === "All Projects" && "md:col-span-2 lg:col-span-2 lg:row-span-2")}
            >
              <Thumb p={p} big={p.featured} />
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs text-cyan">{p.category}</span>
                {p.featured && <span className="flex items-center gap-1 text-xs text-violet"><Sparkles className="size-3" /> Featured</span>}
                {p.placeholder && <PlaceholderTag />}
              </div>
              <h3 className={cn("mt-2 font-semibold", p.featured ? "text-2xl" : "text-lg")}>{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.map((t) => <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">{t}</span>)}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="hero" onClick={() => setOpen(p)}>View Details</Button>
                <LinkOrDisabled href={p.github}><Github /> Code</LinkOrDisabled>
                <LinkOrDisabled href={p.demo}><ExternalLink /> Demo</LinkOrDisabled>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="mt-6 text-center text-muted-foreground">No projects in this category yet — coming soon.</p>}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="glass max-h-[90vh] overflow-y-auto border-glass-border bg-navy sm:max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2"><span className="font-mono text-xs text-cyan">{open.category}</span>{open.placeholder && <PlaceholderTag />}</div>
                <DialogTitle className="text-2xl">{open.title}</DialogTitle>
                <DialogDescription>{open.overview}</DialogDescription>
              </DialogHeader>
              <Thumb p={open} big />
              {[["Problem", open.problem], ["Solution", open.solution], ["Challenges", open.challenges], ["Learning outcomes", open.learnings]].map(([h, t]) => (
                <div key={h}><h4 className="font-semibold">{h}</h4><p className="mt-1 text-sm text-muted-foreground">{t}</p></div>
              ))}
              <div><h4 className="font-semibold">Key features</h4><ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">{open.features.map((f) => <li key={f}>{f}</li>)}</ul></div>
              <div><h4 className="font-semibold">Technologies</h4><div className="mt-2 flex flex-wrap gap-1.5">{open.tech.map((t) => <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">{t}</span>)}</div></div>
              <div>
                <h4 className="font-semibold">Screenshots</h4>
                {open.screenshots.length ? (
                  <div className="mt-2 grid grid-cols-2 gap-2">{open.screenshots.map((s) => <img key={s} src={s} alt={`${open.title} screenshot`} loading="lazy" className="rounded-lg" />)}</div>
                ) : <p className="mt-1 text-sm text-muted-foreground">No screenshots added yet.</p>}
              </div>
              <div className="flex gap-2">
                <LinkOrDisabled href={open.github}><Github /> GitHub repository</LinkOrDisabled>
                <LinkOrDisabled href={open.demo}><ExternalLink /> Live demo</LinkOrDisabled>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
}

/* ───────── Journey ───────── */
export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading eyebrow="journey" title="My Journey So Far" subtitle="A story of growth, one step at a time." />
      <ol className="relative mx-auto max-w-3xl">
        <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary via-violet to-cyan sm:left-1/2" />
        {journey.map((j, i) => (
          <li key={j.title} className={cn("relative mb-10 pl-12 sm:w-1/2 sm:pl-0", i % 2 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right")}>
            <span className={cn("absolute top-2 left-[11px] size-3 rounded-full bg-cyan shadow-glow sm:left-auto", i % 2 ? "sm:-left-1.5" : "sm:-right-1.5")} />
            <Reveal delay={0.05}>
              <GlassCard className="p-5">
                <p className="font-mono text-xs text-cyan">{j.when}</p>
                <h3 className="mt-1 font-semibold">{j.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{j.text}</p>
              </GlassCard>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ───────── Education ───────── */
export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="education" title="My Academic Journey" />
      <div className="mx-auto grid max-w-3xl gap-6">
        {education.map((e) => (
          <Reveal key={e.institution}>
            <GlassCard>
              <div className="flex items-start gap-4">
                <GraduationCap className="size-8 shrink-0 text-violet" />
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{e.institution}</h3>
                  <p>{e.degree} — <span className="text-muted-foreground">{e.field}</span></p>
                  <p className="font-mono text-xs text-cyan">{e.duration} · {e.status}</p>
                  <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">{e.achievements.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-28">
        <SectionHeading eyebrow="achievements" title="Milestones & Recognition" subtitle="Certificates and achievements will appear here as they're earned." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.type} delay={i * 0.05}>
              <GlassCard className="h-full p-5">
                {a.image ? <img src={a.image} alt={a.title} loading="lazy" className="mb-4 rounded-lg" /> : <Award className="size-7 text-cyan" />}
                <p className="mt-3 font-mono text-xs text-violet">{a.type}</p>
                <h3 className="mt-1 font-semibold">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.issuer} · {a.date}</p>
                {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-cyan">Verify <ExternalLink className="size-3" /></a>}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ───────── Blog preview ───────── */
import { formatDate, posts, readingTime } from "@/config/blog";
export function BlogCover({ cover, title, className }: { cover: string; title: string; className?: string }) {
  return cover ? (
    <img src={cover} alt={title} loading="lazy" className={cn("w-full object-cover", className)} />
  ) : (
    <div className={cn("relative flex items-center justify-center overflow-hidden bg-navy", className)} role="img" aria-label={title}>
      <div className="bg-grid absolute inset-0" />
      <div className="absolute size-40 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
      <BookOpen className="relative size-10 text-cyan" />
    </div>
  );
}

export function BlogCard({ post }: { post: (typeof posts)[number] }) {
  return (
    <article className="glass glow-border flex h-full flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:shadow-glow">
      <BlogCover cover={post.cover} title={post.title} className="aspect-[16/9]" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-cyan">{post.category}</span>·<span>{formatDate(post.date)}</span>·<span>{readingTime(post)} min read</span>
          {post.placeholder && <PlaceholderTag />}
        </div>
        <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.description}</p>
        <Button asChild variant="glow" size="sm" className="mt-4 self-start">
          <Link to="/blog/$slug" params={{ slug: post.slug }}>Read More</Link>
        </Button>
      </div>
    </article>
  );
}

export function BlogPreview() {
  return (
    <Section id="blog">
      <SectionHeading eyebrow="blog" title="Thoughts & Discoveries" subtitle="Learning, experimenting, and sharing my knowledge." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 0.08}><BlogCard post={p} /></Reveal>)}
      </div>
      <div className="mt-10 text-center"><Button asChild variant="glass" size="xl"><Link to="/blog">View all articles</Link></Button></div>
    </Section>
  );
}
