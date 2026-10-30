import { useEffect, useRef, useState, type ReactNode } from "react";
import { profile, projects, skillGroups } from "@/config/site";
import { Section, SectionHeading, Reveal } from "./ui";

type Line = { id: number; node: ReactNode };

const COMMANDS: Record<string, string> = {
  help: "Display available commands",
  about: "Learn about Devi Sri Lakshmi",
  skills: "Explore technical skills",
  projects: "View featured projects",
  github: "Open GitHub profile",
  contact: "Display contact information",
  clear: "Clear terminal output",
};

const K = ({ children }: { children: ReactNode }) => <span className="text-cyan">{children}</span>;
const V = ({ children }: { children: ReactNode }) => <span className="text-violet">{children}</span>;

export function run(cmd: string): ReactNode | "clear" {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "":
      return null;
    case "help":
      return (
        <div className="grid gap-0.5">
          {Object.entries(COMMANDS).map(([k, v]) => (
            <div key={k}><K>{k.padEnd(10, "\u00a0")}</K> <span className="text-muted-foreground">{v}</span></div>
          ))}
        </div>
      );
    case "about":
      return <div className="space-y-1"><div><V>name</V>: "{profile.name}"</div><div><V>role</V>: "{profile.title}"</div><div className="text-muted-foreground">{profile.about[0]}</div></div>;
    case "skills":
      return <div>{skillGroups.map((g) => <div key={g.category}><V>{g.category}</V>: [{g.skills.map((s) => `"${s}"`).join(", ")}]</div>)}</div>;
    case "projects":
      return (
        <div>
          {projects.map((p) => <div key={p.slug}><K>▸</K> {p.title} <span className="text-muted-foreground">({p.tech.join(", ")})</span></div>)}
          <div className="mt-1 text-muted-foreground">Scroll to "Things I've Built" for details.</div>
        </div>
      );
    case "github":
      if (typeof window !== "undefined") window.open(profile.github, "_blank", "noopener");
      return <div>Opening <a className="text-cyan underline" href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a> …</div>;
    case "contact":
      return (
        <div>
          <div><V>email</V>: {profile.email || <span className="text-muted-foreground">not added yet</span>}</div>
          <div><V>github</V>: <a className="text-cyan underline" href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></div>
          {profile.linkedin && <div><V>linkedin</V>: {profile.linkedin}</div>}
        </div>
      );
    case "clear":
      return "clear";
    default:
      return <span className="text-destructive">command not found: {cmd.trim()}. Type <K>help</K> to see available commands.</span>;
  }
}

const welcome = (): Line[] => [
  { id: 0, node: <span className="text-foreground">Welcome to Devi's Developer Terminal.</span> },
  { id: 1, node: <span className="text-muted-foreground">Type <K>'help'</K> to explore my digital world.</span> },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(welcome);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const idRef = useRef(2);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const exec = (cmd: string) => {
    const out = run(cmd);
    if (out === "clear") return setLines([]);
    const prompt: Line = { id: idRef.current++, node: <span><span className="text-primary">devi@portfolio</span>:<span className="text-violet">~</span>$ {cmd}</span> };
    setLines((l) => [...l, prompt, ...(out ? [{ id: idRef.current++, node: out }] : [])]);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setHIdx(-1);
  };

  return (
    <Section id="terminal">
      <SectionHeading eyebrow="interactive" title="Developer Terminal" subtitle="Go ahead — type a command." />
      <Reveal>
        <div className="glass mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-glow" onClick={() => inputRef.current?.focus()}>
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-destructive/80" />
            <span className="size-3 rounded-full bg-violet/80" />
            <span className="size-3 rounded-full bg-cyan/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">devi@portfolio — bash</span>
          </div>
          <div ref={bodyRef} className="h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm" role="log" aria-live="polite">
            {lines.map((l) => <div key={l.id} className="mb-1 break-words">{l.node}</div>)}
            <form
              onSubmit={(e) => { e.preventDefault(); exec(input); setInput(""); }}
              className="flex items-center gap-2"
            >
              <label htmlFor="term-input" className="shrink-0"><span className="text-primary">devi@portfolio</span>:<span className="text-violet">~</span>$</label>
              <input
                id="term-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" && history.length) { e.preventDefault(); const n = Math.min(hIdx + 1, history.length - 1); setHIdx(n); setInput(history[n]); }
                  if (e.key === "ArrowDown") { e.preventDefault(); const n = hIdx - 1; setHIdx(n); setInput(n >= 0 ? history[n] : ""); }
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command"
                className="min-w-0 flex-1 bg-transparent caret-cyan outline-none"
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {Object.keys(COMMANDS).map((c) => (
              <button key={c} onClick={(e) => { e.stopPropagation(); exec(c); }} className="rounded-md border border-border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground">
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
