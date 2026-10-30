import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Linkedin, Share2, Twitter } from "lucide-react";
import { formatDate, posts, readingTime } from "@/config/blog";
import { profile } from "@/config/site";
import { BlogCard, BlogCover } from "@/components/portfolio/Sections";
import { PlaceholderTag } from "@/components/portfolio/ui";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | Devi Sri Lakshmi` },
          { name: "description", content: loaderData.post.description },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Article not found</h1>
      <Link to="/blog" className="text-cyan">Back to blog</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = typeof window !== "undefined" ? window.location.href : "";
  return (
    <article className="px-5 pt-32 pb-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> All articles</Link>
        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-cyan">{post.category}</span>·<span>{formatDate(post.date)}</span>·<span>{readingTime(post)} min read</span>
          {post.placeholder && <PlaceholderTag />}
        </div>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-muted-foreground">By {profile.name}</p>
        <BlogCover cover={post.cover} title={post.title} className="mt-8 aspect-[21/9] rounded-2xl" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Contents</p>
            <ul className="space-y-2 text-sm">{post.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="text-muted-foreground hover:text-cyan">{s.heading}</a></li>)}</ul>
            <p className="mt-8 mb-3 flex items-center gap-1 font-mono text-xs uppercase tracking-widest text-muted-foreground"><Share2 className="size-3" /> Share</p>
            <div className="flex gap-3">
              <a aria-label="Share on X" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`}><Twitter className="size-5 text-muted-foreground hover:text-cyan" /></a>
              <a aria-label="Share on LinkedIn" target="_blank" rel="noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}><Linkedin className="size-5 text-muted-foreground hover:text-cyan" /></a>
            </div>
          </aside>
          <div className="space-y-10">
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold">{s.heading}</h2>
                {s.paragraphs.map((p, i) => <p key={i} className="mt-4 leading-relaxed text-foreground/85">{p}</p>)}
              </section>
            ))}
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 text-2xl font-semibold">Related articles</h2>
            <div className="grid gap-6 md:grid-cols-2">{related.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          </div>
        )}
      </div>
    </article>
  );
}
