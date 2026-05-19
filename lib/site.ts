export const siteConfig = {
  name: "CrackTheLoop",
  shortName: "CTL",
  domain: "cracktheloop.in",
  url: "https://cracktheloop.in",
  description:
    "Master system design, low-level design, and algorithms with structured learning paths from a senior engineer with experience at top tech companies. Access comprehensive guides and practical interview preparation.",
  tagline: "Master Tech Interviews with Structured Learning",
  email: "hello@cracktheloop.in",
  social: {
    twitter: "https://twitter.com/amankumarkeshu",
    linkedin: "https://www.linkedin.com/in/amankumarkeshu/",
    github: "https://github.com/amankumarkeshu",
    topmate: "https://topmate.io/amankumarkeshu",
    youtube: "https://www.youtube.com/@amankumarkeshu",
  },
  author: {
    name: "Aman Kumar Keshu",
    title: " Software Engineer · Big Tech",
    bio: "A software engineer with proven experience building distributed systems at leading technology companies. I provide structured guidance for engineers preparing for senior and staff-level technical interviews.",
    interviewedAt: [
      "Linkedin",
      "Uber",
      "Amazon",
      "Atlassian",
      "Microsoft",
      "Salesforce",
      "Walmart",
      "Adobe",
      "Oracle",
    ],
  },
  nav: [
    { title: "How to Use", href: "/how-to-use" },
    { title: "Learning Resources", href: "/blog" },
    { title: "System Design", href: "/blog/system-design" },
    { title: "LLD", href: "/blog/lld" },
    { title: "DSA", href: "/blog/dsa" },
    { title: "Interview Stories", href: "/blog/interview-experiences" },
    { title: "Courses", href: "/courses/system-design-vault" },
    { title: "About", href: "/about" },
  ],
};

export type SiteConfig = typeof siteConfig;
