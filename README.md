# @caatinga/docs

Documentation 2.0 for [Caatinga](https://github.com/Dione-b/caatinga) — deployment orchestration and versioned artifacts for Soroban.

This repository is a standalone developer portal, separate from the `caatinga` monorepo. It is a custom Astro site that also generates `llms.txt` / `llms-full.txt` from the same content — one source of truth for humans and agents.

## Status

Live at **[caatinga.xyz](https://caatinga.xyz)** — the official Caatinga documentation (deployed from `main`). Agent-friendly versions: [caatinga.xyz/llms.txt](https://caatinga.xyz/llms.txt) and [caatinga.xyz/llms-full.txt](https://caatinga.xyz/llms-full.txt).

## Stack

- [Astro](https://astro.build) + MDX + TypeScript
- Tailwind CSS
- Vue islands (for interactive components)
- Shiki (syntax highlighting)

## Development

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # production build
pnpm preview   # preview the production build
```

## License

MIT — see [LICENSE](./LICENSE).
