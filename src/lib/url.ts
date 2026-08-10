/**
 * Resolves a config/content-authored href against the site's configured
 * `base` (e.g. "/caatinga-docs/"). Root-relative hrefs ("/docs") get
 * prefixed; absolute URLs and already-prefixed hrefs pass through
 * unchanged, so this is safe to apply more than once.
 */
export function resolveHref(href: string): string {
  const base = import.meta.env.BASE_URL;
  const isRootRelative = href.startsWith("/") && !href.startsWith("//");
  const isAlreadyPrefixed = isRootRelative && href.startsWith(base);
  return isRootRelative && !isAlreadyPrefixed ? base + href.slice(1) : href;
}
