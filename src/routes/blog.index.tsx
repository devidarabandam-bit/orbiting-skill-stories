import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { blogCategories, posts } from "@/config/blog";
import { BlogCard } from "@/components/portfolio/Sections";
import { Section, SectionHeading } from "@/components/portfolio/ui";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Thoughts & Discoveries | Devi Sri Lakshmi" },
      { name: "description", content: "Articles on programming, web development, Python, Java and learning experiences by Devi Sri Lakshmi." },
      { property: "og:title", content: "Thoughts & Discoveries — Devi Sri Lakshmi's Blog" },
      { property: "og:description", content: "Learning, experimenting, and sharing knowledge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<string>("All");
  const list = posts.filter((p) => cat === "All" || p.category === cat);
  return (
    <Section id="blog" className="pt-36">
      <SectionHeading eyebrow="blog" title="Thoughts & Discoveries" subtitle="Learning, experimenting, and sharing my knowledge." />
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {["All", ...blogCategories].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-4 py-1.5 text-sm transition-colors", cat === c ? "border-primary/50 bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground")}>{c}</button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      {list.length === 0 && <p className="text-center text-muted-foreground">No articles in this category yet.</p>}
    </Section>
  );
}
