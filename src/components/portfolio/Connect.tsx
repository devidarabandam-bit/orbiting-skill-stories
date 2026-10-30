import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowUp, CheckCircle2, Download, ExternalLink, FileText, Github, Instagram, Linkedin, Loader2, Mail, Send, Star } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { navItems, profile } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard, Logo, PlaceholderTag, Reveal, Section, SectionHeading } from "./ui";

/* ───────── GitHub (live public data) ───────── */
type GhUser = { avatar_url: string; name: string | null; login: string; bio: string | null; public_repos: number; followers: number; following: number; html_url: string };
type GhRepo = { id: number; name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number; fork: boolean; updated_at: string };

async function fetchGitHub() {
  const u = profile.githubUser;
  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${u}`).then((r) => { if (!r.ok) throw new Error("gh"); return r.json() as Promise<GhUser>; }),
    fetch(`https://api.github.com/users/${u}/repos?sort=updated&per_page=12`).then((r) => { if (!r.ok) throw new Error("gh"); return r.json() as Promise<GhRepo[]>; }),
  ]);
  return { user, repos };
}

export function GitHubSection() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["github", profile.githubUser], queryFn: fetchGitHub, staleTime: 10 * 60_000, retry: 1 });

  return (
    <Section id="github">
      <SectionHeading eyebrow="github" title="My Coding Footprint" subtitle="Live, public data from my GitHub profile." />
      {isLoading && <div className="flex justify-center py-10"><Loader2 className="size-6 animate-spin text-primary" /></div>}
      {isError && (
        <GlassCard className="mx-auto max-w-xl text-center">
          <Github className="mx-auto size-10 text-primary" />
          <p className="mt-3 text-muted-foreground">GitHub data couldn't load right now. Visit the profile directly.</p>
        </GlassCard>
      )}
      {data && (
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <GlassCard className="text-center">
              <img src={data.user.avatar_url} alt={`${data.user.login} avatar`} loading="lazy" className="mx-auto size-24 rounded-full ring-2 ring-primary/50" />
              <h3 className="mt-4 text-lg font-semibold">{data.user.name ?? data.user.login}</h3>
              <p className="font-mono text-sm text-cyan">@{data.user.login}</p>
              {data.user.bio && <p className="mt-2 text-sm text-muted-foreground">{data.user.bio}</p>}
              <div className="mt-5 grid grid-cols-3 gap-2 text-sm">
                {[["Repos", data.user.public_repos], ["Followers", data.user.followers], ["Following", data.user.following]].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-background/40 p-2"><div className="text-lg font-semibold">{v}</div><div className="text-xs text-muted-foreground">{k}</div></div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {data.repos.length === 0 && <p className="text-muted-foreground">No public repositories yet — they'll appear here automatically.</p>}
            {data.repos.map((r) => (
              <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="glass glow-border block rounded-xl p-4 transition-all hover:-translate-y-1 hover:shadow-glow">
                <div className="flex items-center justify-between gap-2"><span className="truncate font-mono text-sm font-semibold">{r.name}</span><ExternalLink className="size-3.5 shrink-0 text-muted-foreground" /></div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description ?? "No description"}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  {r.language && <span className="text-cyan">● {r.language}</span>}
                  <span className="flex items-center gap-1"><Star className="size-3" />{r.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-10 text-center">
        <Button asChild variant="hero" size="xl"><a href={profile.github} target="_blank" rel="noreferrer"><Github /> Explore My GitHub</a></Button>
      </div>
    </Section>
  );
}

/* ───────── Resume ───────── */
export function Resume() {
  const has = !!profile.resumeUrl;
  return (
    <Section id="resume">
      <SectionHeading eyebrow="resume" title="Explore My Resume" subtitle="A snapshot of my education, skills and projects." />
      <Reveal>
        <GlassCard className="mx-auto grid max-w-4xl items-center gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-xl border border-border bg-background/40">
            {has ? (
              <iframe src={`${profile.resumeUrl}#toolbar=0`} title="Resume preview" className="h-full w-full" loading="lazy" />
            ) : (
              <div className="p-6 text-center text-muted-foreground"><FileText className="mx-auto size-14 text-violet" /><p className="mt-3 text-sm">Resume coming soon</p><div className="mt-2"><PlaceholderTag /></div></div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">{profile.name}</h3>
            <p className="mt-2 text-muted-foreground">{profile.title}. My resume covers my studies, the languages I'm learning and the projects I'm building.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {has ? (
                <>
                  <Button asChild variant="hero" size="xl"><a href={profile.resumeUrl} download><Download /> Download Resume</a></Button>
                  <Button asChild variant="glass" size="xl"><a href={profile.resumeUrl} target="_blank" rel="noreferrer"><ExternalLink /> View Resume</a></Button>
                </>
              ) : (
                <>
                  <Button variant="hero" size="xl" disabled><Download /> Download Resume</Button>
                  <Button variant="glass" size="xl" disabled><ExternalLink /> View Resume</Button>
                  <p className="w-full text-sm text-muted-foreground">The resume hasn't been uploaded yet.</p>
                </>
              )}
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}

/* ───────── Contact ───────── */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  subject: z.string().trim().min(2, "Please add a subject").max(150),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
});

function socials() {
  return [
    { icon: Mail, label: "Email", value: profile.email, href: profile.email ? `mailto:${profile.email}` : "" },
    { icon: Github, label: "GitHub", value: "devidarabandam-bit", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: profile.linkedin, href: profile.linkedin },
    { icon: Instagram, label: "Instagram", value: profile.instagram, href: profile.instagram },
    ...profile.otherSocials.map((s) => ({ icon: ExternalLink, label: s.label, value: s.url, href: s.url })),
  ];
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // honeypot — bots fill hidden field
    const r = contactSchema.safeParse(form);
    if (!r.success) {
      setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message])));
      return;
    }
    setErrors({});
    if (!profile.email) { setState("error"); return; }
    setState("sending");
    const body = `${r.data.message}\n\n— ${r.data.name} (${r.data.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(r.data.subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => setState("done"), 700);
  };

  const field = (k: keyof typeof form) => ({
    id: `c-${k}`,
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value }),
    "aria-invalid": !!errors[k],
    className: "bg-background/40",
  });

  return (
    <Section id="contact">
      <SectionHeading eyebrow="contact" title="Let's Connect & Create Something Amazing" subtitle="Have an idea, opportunity, or collaboration in mind? I'd love to hear from you." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-3">
          {socials().map((s) => (
            <GlassCard key={s.label} className="flex items-center gap-4 p-4">
              <s.icon className="size-5 text-cyan" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                {s.href ? <a href={s.href} target="_blank" rel="noreferrer" className="truncate text-sm hover:text-cyan">{s.value}</a> : <span className="text-sm text-muted-foreground">Not added yet</span>}
              </div>
            </GlassCard>
          ))}
        </Reveal>
        <Reveal>
          <GlassCard>
            {state === "done" ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto size-12 text-cyan" />
                <h3 className="mt-4 text-xl font-semibold">Your email app has opened</h3>
                <p className="mt-2 text-muted-foreground">Hit send there and your message is on its way. Thank you!</p>
                <Button variant="glow" className="mt-6" onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "", message: "", website: "" }); }}>Write another</Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label htmlFor="c-name" className="mb-1 block text-sm">Full Name</label><Input {...field("name")} />{errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}</div>
                  <div><label htmlFor="c-email" className="mb-1 block text-sm">Email Address</label><Input type="email" {...field("email")} />{errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}</div>
                </div>
                <div><label htmlFor="c-subject" className="mb-1 block text-sm">Subject</label><Input {...field("subject")} />{errors["subject"] && <p className="mt-1 text-xs text-destructive">{errors["subject"]}</p>}</div>
                <div><label htmlFor="c-message" className="mb-1 block text-sm">Message</label><Textarea rows={6} {...field("message")} />{errors["message"] && <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>}</div>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} name="website" />
                {state === "error" && <p className="text-sm text-destructive">Messaging isn't set up yet — please reach out on GitHub for now.</p>}
                <Button type="submit" variant="hero" size="xl" disabled={state === "sending"}>
                  {state === "sending" ? <Loader2 className="animate-spin" /> : <Send />} Send Message
                </Button>
              </form>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────── Footer ───────── */
export function Footer() {
  return (
    <footer className="relative border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <Logo className="text-3xl" />
          <p className="mt-2 font-semibold">{profile.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{profile.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {navItems.map((n) => <Link key={n.id} to="/" hash={n.id} className="text-muted-foreground hover:text-foreground">{n.label}</Link>)}
        </nav>
        <div className="space-y-3 text-sm">
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Github className="size-4" /> GitHub</a>
          {profile.email && <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Mail className="size-4" /> {profile.email}</a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Linkedin className="size-4" /> LinkedIn</a>}
          {profile.instagram && <a href={profile.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground"><Instagram className="size-4" /> Instagram</a>}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between border-t border-border pt-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="glass flex items-center gap-1 rounded-full px-3 py-1.5 hover:text-foreground" aria-label="Back to top"><ArrowUp className="size-3" /> Top</button>
      </div>
    </footer>
  );
}
