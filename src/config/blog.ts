// Blog posts. Add a new object to publish an article.
// The sample post is a clearly labeled placeholder — replace it with your own writing.

export const blogCategories = [
  "Programming",
  "Web Development",
  "Python",
  "Java",
  "Technology",
  "Learning Experiences",
  "Project Development",
] as const;

export type BlogSection = { id: string; heading: string; paragraphs: string[] };

export type BlogPost = {
  slug: string;
  placeholder: boolean;
  title: string;
  description: string;
  category: (typeof blogCategories)[number];
  date: string; // YYYY-MM-DD
  cover: string; // image URL, or "" for a generated gradient cover
  sections: BlogSection[];
};

export const posts: BlogPost[] = [
  {
    slug: "sample-my-first-post",
    placeholder: true,
    title: "Sample Post: Write About Your First Program",
    description: "A placeholder article showing how posts look. Replace it with your own story.",
    category: "Learning Experiences",
    date: "2026-01-01",
    cover: "",
    sections: [
      { id: "intro", heading: "Introduction", paragraphs: ["PLACEHOLDER — This is a sample article. Write the opening of your post here."] },
      { id: "what-i-learned", heading: "What I learned", paragraphs: ["PLACEHOLDER — Share what you learned along the way."] },
      { id: "next", heading: "What's next", paragraphs: ["PLACEHOLDER — Close with what you plan to explore next."] },
    ],
  },
  {
    slug: "sample-python-notes",
    placeholder: true,
    title: "Sample Post: Notes From Learning Python",
    description: "Another placeholder showing a second category. Replace or delete it.",
    category: "Python",
    date: "2026-01-02",
    cover: "",
    sections: [
      { id: "intro", heading: "Introduction", paragraphs: ["PLACEHOLDER — Your Python notes go here."] },
      { id: "takeaways", heading: "Takeaways", paragraphs: ["PLACEHOLDER — Key takeaways."] },
    ],
  },
];

export function readingTime(post: BlogPost) {
  const words = post.sections.flatMap((s) => s.paragraphs).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
