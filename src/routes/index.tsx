import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Terminal } from "@/components/portfolio/Terminal";
import { About, BlogPreview, Education, Journey, Projects, Skills } from "@/components/portfolio/Sections";
import { Contact, GitHubSection, Resume } from "@/components/portfolio/Connect";
import { Loader } from "@/components/portfolio/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Darabandam Devi Sri Lakshmi — Student Developer Portfolio" },
      { name: "description", content: "Portfolio of Darabandam Devi Sri Lakshmi, a student developer exploring C, C++, Java, Python, HTML, CSS and JavaScript." },
      { property: "og:title", content: "Darabandam Devi Sri Lakshmi — Student Developer" },
      { property: "og:description", content: "Projects, learning journey, blog and an interactive developer terminal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <Hero />
      <Terminal />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Education />
      <GitHubSection />
      <BlogPreview />
      <Resume />
      <Contact />
    </>
  );
}
