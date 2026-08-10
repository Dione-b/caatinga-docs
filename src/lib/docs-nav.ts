import { getCollection, type CollectionEntry } from "astro:content";

export interface NavPage {
  title: string;
  href: string;
}

export interface NavSection {
  title: string;
  pages: NavPage[];
}

function humanize(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function entryHref(entry: CollectionEntry<"docs">): string {
  return `/docs/${entry.id}`;
}

function entrySection(entry: CollectionEntry<"docs">): string {
  const [first] = entry.id.split("/");
  return humanize(first);
}

const SECTION_ORDER: string[] = [
  "Getting Started",
  "Concepts",
  "Configuration",
  "Cli",
  "Client",
  "Reference",
];

export async function getNav(): Promise<NavSection[]> {
  const entries = await getCollection("docs");
  const filtered = entries.filter((e) => e.id !== "index");

  const sections = new Map<string, CollectionEntry<"docs">[]>();
  for (const entry of filtered) {
    const section = entrySection(entry);
    const list = sections.get(section) ?? [];
    list.push(entry);
    sections.set(section, list);
  }

  return Array.from(sections.entries())
    .sort(([a], [b]) => {
      const indexA = SECTION_ORDER.indexOf(a);
      const indexB = SECTION_ORDER.indexOf(b);
      const posA = indexA === -1 ? SECTION_ORDER.length : indexA;
      const posB = indexB === -1 ? SECTION_ORDER.length : indexB;
      return posA - posB;
    })
    .map(([title, sectionEntries]) => ({
      title,
      pages: sectionEntries
        .sort((a, b) => a.data.sidebar.order - b.data.sidebar.order)
        .map((entry) => ({
          title: entry.data.sidebar.label ?? entry.data.title,
          href: entryHref(entry),
        })),
    }));
}

export async function getFlatNav(): Promise<NavPage[]> {
  const sections = await getNav();
  return sections.flatMap((section) => section.pages);
}

export function normalizePath(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  const withoutBase =
    base !== "/" && pathname.startsWith(base) ? "/" + pathname.slice(base.length) : pathname;
  return withoutBase.replace(/\/$/, "") || "/";
}

export interface Breadcrumb {
  title: string;
  href: string;
}

export async function getBreadcrumb(pathname: string): Promise<Breadcrumb[]> {
  const current = normalizePath(pathname);
  const trail: Breadcrumb[] = [
    { title: "Docs", href: "/docs/getting-started/introduction" },
  ];
  const sections = await getNav();

  for (const section of sections) {
    const page = section.pages.find((p) => normalizePath(p.href) === current);
    if (!page) continue;
    if (normalizePath(section.pages[0].href) !== normalizePath(page.href)) {
      trail.push({ title: section.title, href: section.pages[0].href });
    }
    trail.push({ title: page.title, href: page.href });
    return trail;
  }

  return trail;
}

export interface PrevNext {
  prev: NavPage | null;
  next: NavPage | null;
}

export async function getPrevNext(pathname: string): Promise<PrevNext> {
  const current = normalizePath(pathname);
  const flat = await getFlatNav();
  const index = flat.findIndex((page) => normalizePath(page.href) === current);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}
