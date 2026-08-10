export interface NavPage {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  pages: NavPage[];
}

/**
 * Sidebar / docs navigation tree. Sections and pages are added as content
 * lands sprint by sprint (roadmap Sprint 9+) — this is intentionally a
 * subset of the target IA in ROADMAP.md, not the full future tree.
 */
export const nav: NavSection[] = [
  {
    title: "Getting Started",
    pages: [
      { title: "Overview", href: "/docs" },
      { title: "Introduction", href: "/docs/getting-started/introduction" },
      { title: "Installation", href: "/docs/getting-started/installation" },
    ],
  },
];

export const flatNav: NavPage[] = nav.flatMap((section) => section.pages);
