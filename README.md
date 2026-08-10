# @caatinga/docs

Documentation 2.0 for [Caatinga](https://github.com/Dione-b/caatinga) — deployment orchestration and versioned artifacts for Soroban.

This repository is a standalone developer portal, separate from the `caatinga` monorepo. It replaces the current VitePress docs with a custom Astro site, while still generating `llms-full.txt` as a build artifact from the same content — one source of truth for humans and agents.

## Status

Early bootstrap (Sprint 0/1 of the [rebuild plan](./ROADMAP.md)). Not yet deployed. The current, authoritative Caatinga documentation lives at [dione-b.github.io/caatinga](https://dione-b.github.io/caatinga/) and [for-llms.html](https://dione-b.github.io/caatinga/for-llms.html) until this project reaches parity.

## Stack

- [Astro](https://astro.build) + MDX + TypeScript
- Tailwind CSS
- Vue islands (for interactive components)
- Shiki (syntax highlighting)

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build
npm run preview   # preview the production build
```

## License

MIT — see [LICENSE](./LICENSE).
