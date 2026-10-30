// ─────────────────────────────────────────────────────────────
// Central content config — edit everything about the portfolio here.
// Anything marked "PLACEHOLDER" is waiting for your real details.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Darabandam Devi Sri Lakshmi",
  shortName: "Devi Sri Lakshmi",
  initials: "DSL",
  title: "Student Developer | Exploring the World of Technology",
  status: "Currently Learning & Building",
  github: "https://github.com/devidarabandam-bit",
  githubUser: "devidarabandam-bit",
  email: "", // PLACEHOLDER: e.g. "you@example.com"
  linkedin: "", // PLACEHOLDER
  instagram: "", // PLACEHOLDER
  otherSocials: [] as { label: string; url: string }[],
  /** Put your PDF in /public (e.g. /public/resume.pdf) and set "/resume.pdf" here. */
  resumeUrl: "" as string,
  /** Put a photo in /public and set e.g. "/profile.jpg". */
  photoUrl: "" as string,
  tagline: "Curiosity Drives Innovation. Code Creates Possibilities.",
  heroStatements: [
    "Building Ideas Into Reality.",
    "Learning. Creating. Innovating.",
    "Exploring the World of Code.",
    "Turning Curiosity Into Creativity.",
  ],
  heroDescription:
    "I'm a passionate student developer who enjoys exploring programming languages, experimenting with new technologies, and building creative digital experiences. From writing my first lines of code to developing meaningful projects, I'm continuously learning, improving, and discovering new possibilities in technology.",
  about: [
    "Hey! I'm Darabandam Devi Sri Lakshmi, a student developer passionate about programming, technology, and innovation.",
    "I enjoy exploring different programming languages, understanding how software works, and turning ideas into functional applications.",
    "My journey is driven by curiosity and a desire to learn something new every day. I believe that every project, challenge, and experiment helps me become a better developer.",
    "I'm continuously exploring new technologies, improving my problem-solving abilities, and looking forward to creating meaningful digital experiences.",
  ],
};

export const skillGroups = [
  { category: "Programming Languages", skills: ["C", "C++", "Java", "Python", "JavaScript"] },
  { category: "Web Technologies", skills: ["HTML", "CSS", "JavaScript"] },
];

export type ProjectCategory = "Web Development" | "Programming" | "Java" | "Python" | "Other";

export type Project = {
  slug: string;
  placeholder: boolean;
  featured: boolean;
  title: string;
  category: ProjectCategory;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  learnings: string;
  screenshots: string[];
};

const ph = (what: string) => `PLACEHOLDER — describe the ${what} here.`;

export const projects: Project[] = [
  {
    slug: "sample-web-project",
    placeholder: true,
    featured: true,
    title: "Your Web Project (Sample)",
    category: "Web Development",
    description: "Sample placeholder card. Replace with a real web project built with HTML, CSS and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "",
    demo: "",
    overview: ph("project overview"),
    problem: ph("problem you set out to solve"),
    solution: ph("solution you built"),
    features: ["PLACEHOLDER feature one", "PLACEHOLDER feature two"],
    challenges: ph("challenges you faced"),
    learnings: ph("lessons you learned"),
    screenshots: [],
  },
  {
    slug: "sample-python-project",
    placeholder: true,
    featured: false,
    title: "Your Python Project (Sample)",
    category: "Python",
    description: "Sample placeholder card. Replace with a Python script, tool or experiment you've made.",
    tech: ["Python"],
    github: "",
    demo: "",
    overview: ph("project overview"),
    problem: ph("problem"),
    solution: ph("solution"),
    features: ["PLACEHOLDER feature"],
    challenges: ph("challenges"),
    learnings: ph("learnings"),
    screenshots: [],
  },
  {
    slug: "sample-java-project",
    placeholder: true,
    featured: false,
    title: "Your Java Project (Sample)",
    category: "Java",
    description: "Sample placeholder card. Replace with a Java program or application you've built.",
    tech: ["Java"],
    github: "",
    demo: "",
    overview: ph("project overview"),
    problem: ph("problem"),
    solution: ph("solution"),
    features: ["PLACEHOLDER feature"],
    challenges: ph("challenges"),
    learnings: ph("learnings"),
    screenshots: [],
  },
  {
    slug: "sample-c-cpp-project",
    placeholder: true,
    featured: false,
    title: "Your C / C++ Program (Sample)",
    category: "Programming",
    description: "Sample placeholder card. Replace with a C or C++ program — algorithms, data structures, etc.",
    tech: ["C", "C++"],
    github: "",
    demo: "",
    overview: ph("project overview"),
    problem: ph("problem"),
    solution: ph("solution"),
    features: ["PLACEHOLDER feature"],
    challenges: ph("challenges"),
    learnings: ph("learnings"),
    screenshots: [],
  },
];

export const journey = [
  { title: "Beginning my programming journey", text: "PLACEHOLDER — when and why you wrote your first line of code.", when: "Add date" },
  { title: "Learning programming fundamentals", text: "PLACEHOLDER — variables, loops, logic and problem solving.", when: "Add date" },
  { title: "Exploring C and C++", text: "PLACEHOLDER — what you built or learned with C and C++.", when: "Add date" },
  { title: "Learning Java and Python", text: "PLACEHOLDER — your experience with Java and Python.", when: "Add date" },
  { title: "Exploring HTML, CSS and JavaScript", text: "PLACEHOLDER — your first steps into the web.", when: "Add date" },
  { title: "Building personal projects", text: "PLACEHOLDER — the projects you've started building.", when: "Add date" },
  { title: "Future learning goals", text: "PLACEHOLDER — what you want to learn next.", when: "Next" },
];

export const education = [
  {
    institution: "PLACEHOLDER — Institution name",
    degree: "PLACEHOLDER — Degree / course",
    field: "PLACEHOLDER — Field of study",
    duration: "PLACEHOLDER — Start – End",
    status: "PLACEHOLDER — e.g. Currently pursuing",
    achievements: ["PLACEHOLDER — add achievements or remove this line"],
  },
];

export const achievements = [
  { type: "Technical Certification", title: "PLACEHOLDER — Certificate title", issuer: "Issuer", date: "Date", link: "", image: "" },
  { type: "Online Course", title: "PLACEHOLDER — Course name", issuer: "Platform", date: "Date", link: "", image: "" },
  { type: "Hackathon", title: "PLACEHOLDER — Hackathon name", issuer: "Organiser", date: "Date", link: "", image: "" },
  { type: "Coding Competition", title: "PLACEHOLDER — Competition", issuer: "Organiser", date: "Date", link: "", image: "" },
  { type: "Academic Achievement", title: "PLACEHOLDER — Achievement", issuer: "Institution", date: "Date", link: "", image: "" },
  { type: "Other", title: "PLACEHOLDER — Accomplishment", issuer: "—", date: "Date", link: "", image: "" },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "education", label: "Education" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
