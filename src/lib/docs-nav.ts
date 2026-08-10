import { nav, flatNav, type NavPage } from "@/config/nav";

/**
 * Astro.url.pathname includes the configured `base` (e.g. "/caatinga-docs/…"),
 * while nav.ts hrefs are base-agnostic ("/docs/…") so the config stays
 * portable. Strip the base before comparing the two.
 */
export function normalize(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  const withoutBase =
    base !== "/" && pathname.startsWith(base) ? "/" + pathname.slice(base.length) : pathname;
  return withoutBase.replace(/\/$/, "") || "/";
}

export interface Breadcrumb {
  title: string;
  href: string;
}

export function getBreadcrumb(pathname: string): Breadcrumb[] {
  const current = normalize(pathname);
  const trail: Breadcrumb[] = [{ title: "Docs", href: "/docs" }];

  for (const section of nav) {
    const page = section.pages.find((p) => normalize(p.href) === current);
    if (!page) continue;
    if (section.pages[0].href !== page.href) {
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

export function getPrevNext(pathname: string): PrevNext {
  const current = normalize(pathname);
  const index = flatNav.findIndex((page) => normalize(page.href) === current);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flatNav[index - 1] : null,
    next: index < flatNav.length - 1 ? flatNav[index + 1] : null,
  };
}
