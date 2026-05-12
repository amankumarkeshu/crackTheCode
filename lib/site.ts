export const siteConfig = {
  name: "CrackTheLoop",
  shortName: "CTL",
  domain: "cracktheloop.in",
  url: "https://cracktheloop.in",
  description:
    "Crack your big-tech interview loop, system design, LLD, DSA and real interview deep-dives from a senior big-tech engineer. Free articles + the System Design Vault.",
  tagline: "Crack Your Big-Tech Interview Loop",
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
    title: "Senior Software Engineer · Big Tech",
    bio: "Senior software engineer with years of experience designing and shipping large-scale distributed systems at big-tech companies. I help engineers crack senior and staff-level interviews at Google, Meta, Amazon, Atlassian, and beyond.",
    interviewedAt: [
      "Google",
      "Meta",
      "Amazon",
      "Atlassian",
      "Microsoft",
      "Salesforce",
      "Walmart",
      "Adobe",
      "Uber",
      "Oracle",
      "LinkedIn",
    ],
  },
  nav: [
    { title: "Blog", href: "/blog" },
    { title: "System Design", href: "/blog/system-design" },
    { title: "LLD", href: "/blog/lld" },
    { title: "DSA", href: "/blog/dsa" },
    { title: "Interview Stories", href: "/blog/interview-experiences" },
    { title: "Interview Questions", href: "/interview-questions" },
    { title: "Leaderboard", href: "/leaderboard" },
    { title: "Mentorship", href: "/mentorship" },
    { title: "About", href: "/about" },
  ],
};

export type SiteConfig = typeof siteConfig;
