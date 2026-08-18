# Product

## Register

product

## Users

Soroban/Stellar smart-contract developers using the Caatinga CLI, ranging from first-time users deploying their first contract to advanced users managing multi-contract dependency graphs, upgrades, and CI pipelines. They arrive in two modes: **learning** (following Getting Started end-to-end, reading in order) and **referencing** (jumping straight to a CLI flag, config property, or error code while mid-task in their own terminal/editor). The site is also read by LLM agents via the generated `llms-full.txt`, so structure and terminology must stay unambiguous even outside the visual UI. Some of those agents run inside Claude Code with Caatinga's skill installed — listed as a community skill on [skills.stellar.org](https://skills.stellar.org/) (source: [`ctg-skills`](https://github.com/Dione-b/caatinga-skill)) — which encodes Caatinga's hard rules directly, so the docs and the skill must not diverge on terminology or invariants.

## Product Purpose

Replace the current VitePress-based docs with a purpose-built developer portal for Caatinga (deployment orchestration + versioned artifacts for Soroban). Success looks like: a developer can go from zero to a deployed, invokable contract without leaving the docs, and later find any CLI flag, config property, or error code in seconds. The site and `llms-full.txt` are generated from the same MDX content, so humans and agents never see diverging information.

## Brand Personality

Calm, precise, engineering-grade confidence — a considered tool built by people who deploy contracts themselves, not a marketing wrapper around a CLI. Reference: Vercel / Astro docs — minimal, generous whitespace, monospace accents for anything technical (flags, paths, hashes), a near-monochrome UI carried by a single deliberate accent color rather than decoration.

The site has one deliberate exception: the homepage (Sprint 7) is brand-register — a real hero, a short "why Caatinga" narrative, a CTA — while everything past it (docs, CLI reference, config reference) is product-register: restrained, familiar, disappears into the task.

## Anti-references

- The current docs' VitePress default theme — generic framework-docs look is exactly what this rebuild replaces.
- Generic corporate SaaS: blue-gradient hero, stock-photo icons, enterprise-landing-page tone.
- Any AI-generated-interface tells: cream/sand body backgrounds, gradient text, side-stripe card borders, tiny uppercase tracked eyebrows on every section, numbered 01/02/03 scaffolding where the content isn't actually a sequence.

## Design Principles

1. **The tool disappears into the task.** Docs are read while coding; nothing should compete with the content, code blocks, or CLI output for attention.
2. **One accent, used deliberately.** A single cobalt-blue primary carries links, active nav, and primary actions. Color is never decorative.
3. **Dark by default, light fully supported.** The audience is developers; most reach for dark mode first, but light mode gets equal design attention, not a hasty invert.
4. **Consistency over surprise.** Same button shape, same code-block chrome, same badge vocabulary everywhere — density and familiarity earn trust in reference material.
5. **Practice what you preach.** The design system itself (tokens, components) is documented on `/design-system` using the same components it defines — no separate "marketing" polish applied only to that page.

## Accessibility & Inclusion

WCAG AA baseline for the whole product register: body text ≥4.5:1 (target ≥7:1, verified against OKLCH-derived colors), UI text/icons ≥4.5:1, all interactive states (hover/focus/active/disabled) visually distinct with a visible focus ring. `prefers-reduced-motion` respected everywhere motion is used. Full keyboard-nav / ARIA / screen-reader audit is scheduled as its own pass (roadmap Sprint 35); this document sets the floor all work up to that point must already clear.
