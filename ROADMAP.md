# Caatinga Documentation 2.0 — Roadmap

Objetivo: reconstruir a documentação do Caatinga como um developer portal próprio, com controle total de layout, mantendo o conteúdo técnico em uma fonte de verdade e gerando também `llms-full.txt`.

A documentação deve continuar refletindo o modelo atual do Caatinga: deployment orchestration + versioned artifacts para Soroban, com o fluxo `init → build → deploy → generate → invoke/read`.

Fonte de consulta para a documentação atual (para migração/paridade): https://dione-b.github.io/caatinga/for-llms.html

## Stack

```
Astro
├── MDX
├── TypeScript
├── Tailwind CSS
├── Vue Islands
├── Shiki
└── Mermaid / diagramas customizados

Build
├── Website
└── llms-full.txt

Deploy
└── GitHub Pages
```

## Decisões do Sprint 0

- Nome do pacote: `@caatinga/docs`
- Repositório: separado do monorepo `caatinga` (não aninhado)
- Licença: MIT
- Node mínimo: 22
- Deploy: GitHub Pages em novo repositório — `dione-b.github.io/caatinga-docs`
- Versionamento da documentação: adiado até o projeto sair de Alpha (ver Sprint 31)

## Priorização

Não executar as 45 sprints linearmente como se todas tivessem o mesmo peso. Quatro fases:

```
FASE 1 — Foundation           Sprint 0 → 8
FASE 2 — Documentation        Sprint 9 → 27
FASE 3 — Developer Experience Sprint 28 → 35
FASE 4 — Production           Sprint 36 → 45
```

O primeiro MVP pode terminar na Sprint 16: documentação já superior à atual, com identidade visual própria, Getting Started, Concepts, configuração, artifacts e boa parte da CLI.

Evitar começar pelo playground, busca sofisticada ou componentes Vue. O maior ganho inicial está em arquitetura da informação + design system + MDX + navegação + conteúdo reestruturado. Vue entra depois, só para as partes que realmente precisam de interação.

`llms-full.txt` é artefato de build, não documento mantido manualmente — gerado a partir do mesmo conteúdo MDX que alimenta o site, para site e agentes nunca divergirem.

```
                 CAATINGA DOCS 2.0
                         │
             ┌───────────┴───────────┐
             │                       │
          Humans                   Agents
             │                       │
         Astro/MDX              llms-full.txt
             │                       │
             └───────────┬───────────┘
                         │
                  Single Source
                    of Truth
```

## Estrutura de navegação final (alvo)

```
CAATINGA
├── Home
├── Getting Started
│   ├── Introduction
│   ├── Requirements
│   ├── Installation
│   ├── Setup
│   └── First Deployment
├── Concepts
│   ├── Architecture
│   ├── Deployment Orchestration
│   ├── Deployment Graph
│   ├── Artifacts
│   └── Bindings
├── Guides
│   ├── Contracts
│   ├── Dependencies
│   ├── Upgrades
│   ├── Wallets
│   ├── React
│   ├── CI/CD
│   └── ZK
├── Recipes
│   ├── Deploy
│   ├── Multi-contract
│   ├── Upgrade
│   ├── CI
│   └── Testing
├── CLI
│   ├── setup / init / build / deploy
│   ├── generate / invoke / read / upgrade
│   └── ...
├── API
│   ├── @caatinga/client
│   ├── WalletAdapter
│   └── Runtime
├── Reference
│   ├── Configuration
│   ├── Artifacts
│   ├── Errors
│   └── Compatibility
└── Resources
    ├── GitHub
    ├── npm
    ├── Examples
    └── Ecosystem
```

## Sprints

### Fase 1 — Foundation

**Sprint 0 — Definição do projeto.** Nome, repositório, README, licença, Node mínimo, versão inicial, domínio/path, estratégia de deploy, política de versionamento. Deliverable: `README.md`, `package.json`, `LICENSE`, `docs/`.

**Sprint 1 — Bootstrap Astro.** Projeto Astro, TypeScript, MDX, Tailwind, ESLint, Prettier, aliases, páginas `/`, `/docs`, 404, build de produção. Deliverable: `npm run dev` / `build` / `preview`.

**Sprint 2 — Design system.** Tipografia, escala de fontes, espaçamentos, border radius, sombras, backgrounds, cores, dark mode, tokens CSS, ícones, componentes base (`Button`, `Badge`, `Card`, `Alert`, `Tabs`, `Divider`, `Link`, `Code`, `Heading`, `Container`). Deliverable: página `/design-system`.

**Sprint 3 — Layout principal.** Navbar, sidebar, content container, table of contents, breadcrumb, previous/next, footer, navegação mobile, drawer, breakpoints.

**Sprint 4 — Sistema de documentação MDX.** Content collections, frontmatter schema, título/descrição automáticos, TOC automático, metadados de sidebar, previous/next, links externos/internos, code blocks, syntax highlighting.

**Sprint 5 — Componentes de documentação.** `Callout`, `Warning`, `Note`, `Tip`, `Command`, `Terminal`, `CodeTabs`, `Steps`, `Step`, `Tabs`, `Tab`, `Badge`, `Package`.

**Sprint 6 — Code experience.** Syntax highlighting, copy button, terminal blocks, line highlighting, file tabs, language labels, command prompt, output blocks, suporte Bash/TypeScript/Rust/JSON, temas dark/light. Componentes: `CodeBlock`, `Terminal`, `FileCode`, `Command`.

**Sprint 7 — Homepage.** Hero → What is Caatinga? → Deployment workflow → Features → Architecture → Code example → Why Caatinga? → Ecosystem → CTA.

**Sprint 8 — Hero interativo.** Componente Vue clicável mostrando os estágios `init → build → deploy → generate → invoke → read`, cada um com Command/Purpose/Input/Output.

### Fase 2 — Documentation

**Sprint 9 — Getting Started.** Introduction, Requirements, Installation, Setup, Create a project, Build, Deploy, Invoke — cobrindo `npx caatinga init my-dapp` → `doctor` → `build` → `deploy` → `invoke`.

**Sprint 10 — Concepts.** What is Caatinga?, Deployment Orchestration, Deployment Graph, Versioned Artifacts, Generated Bindings, Networks, Environments. Diagrama Source → Build → WASM → Deploy → Artifact → Bindings → Application.

**Sprint 11 — Project structure.** `caatinga.config.ts`, `caatinga.artifacts.json`, contracts/, src/, generated bindings, frontend integration.

**Sprint 12 — Configuration documentation.** Overview, Project, Contracts, Networks, Frontend, Dependencies, Deploy arguments, postDeploy, postDeployRead, Smoke tests, ZK. Cada propriedade com Name/Type/Required/Default/Description/Example/Restrictions.

**Sprint 13 — Artifacts.** What are artifacts?, `caatinga.artifacts.json`, Schema v2, ContractArtifact, Network artifacts, Dependency graph, Upgrade history, Migration, Version control.

**Sprint 14 — CLI reference (1ª metade).** setup, init, doctor, build, deploy, generate, invoke — Usage/Arguments/Flags/Examples/Output/Errors/Related commands.

**Sprint 15 — CLI reference (2ª metade).** read, status, wire, sync-env, upgrade, rollback, inspect, estimate, smoke, regression, ci.

**Sprint 16 — CLI reference: identity.** `identity export` / `identity import`. Atenção especial a `--source`: deve ser um alias de identidade do Stellar CLI, nunca uma chave `G...`/`S...` ou seed phrase. Componente visual: `✓ alice` / `✗ GABC...` / `✗ SABC...` / `✗ seed phrase`.

> MVP: o primeiro release utilizável termina aqui (Sprint 16).

**Sprint 17 — Deployment Graph.** `dependsOn`, resolução de dependências, ordem de deploy, placeholders, cycles, missing artifacts, graph validation.

**Sprint 18 — Upgrade system.** Comparação visual IN-PLACE (mesma ID) vs REDEPLOY (nova ID). `caatinga upgrade`, `deploy --upgrade`, rollback, history.

**Sprint 19 — Client.** `@caatinga/client`: Installation, `createCaatingaClient`, read, simulate, invoke, buildXdr, wallet adapters, error handling.

**Sprint 20 — Wallets.** Wallet architecture, `WalletAdapter`, wallet session, Freighter, Stellar Wallets Kit, React, Vite. Diagrama Application → Caatinga Client → Wallet Adapter → Freighter/SWK.

**Sprint 21 — React integration.** Tutorial: Install → Generate bindings → Create client → Configure wallet → Connect → Read → Invoke.

**Sprint 22 — Error reference.** Transformar os `CAATINGA_*` em referência pesquisável (Category/Description/Common causes/How to fix/Related). Os códigos de erro são API pública — automação deve depender do código, não da mensagem.

**Sprint 23 — Troubleshooting.** Stellar CLI not found, Unsupported Stellar CLI, Build failed, Deploy failed, Binding is stale, Artifact missing, Wallet rejected, Network unavailable, Wrong source account, Dependency cycle, Contract upgrade failed. Formato Problem/Symptoms/Cause/Solution/Verification.

**Sprint 24 — Templates.** `react-vite-counter` (padrão), `zk-starter`, `minimal`, `empty`.

**Sprint 25 — ZK documentation.** Overview, `zk init`/`build`/`prove`/`invoke`, Circom, Groth16, dev ceremony, restrições mainnet, limitations — seção separada da documentação principal.

**Sprint 26 — Recipes.** Deploy a contract, Deploy multiple contracts, Contract dependencies, Upgrade a contract, Generate bindings, React + wallet, CI deployment, Testnet deployment, Smoke tests, Environment synchronization.

**Sprint 27 — CI/CD.** GitHub Actions, reproducible versions, Stellar identity export/import, doctor, smoke, regression, `ci run`. Pipeline: GitHub → Install → Doctor → Test → Build → Deploy → Generate → Smoke.

### Fase 3 — Developer Experience

**Sprint 28 — Interactive playground.** Editar `caatinga.config.ts` e visualizar o deployment graph sem executar deploy real.

**Sprint 29 — CLI interactive explorer.** Escolher um comando e ver Usage/Flags/Examples/Output/Errors, com busca.

**Sprint 30 — Search.** Busca global. Começar com busca estática/local antes de qualquer infraestrutura adicional.

**Sprint 31 — Versioning.** Preparar `/docs`, `/docs/v3`, `/docs/v4` (ou Latest/3.x/Next). Relevante porque o projeto está em Alpha e `3.x` não representa estabilidade de API ainda.

**Sprint 32 — LLM documentation pipeline.** Gerador de `llms.txt` e `llms-full.txt` a partir do mesmo conteúdo do site, ordem determinística, sem elementos visuais, com exemplos/comandos/regras críticas, validado em CI.

**Sprint 33 — SEO e metadata.** `<title>`, description, OpenGraph, Twitter/X, canonical URLs, sitemap, robots.txt, favicon, structured data.

**Sprint 34 — GitHub integration.** Links GitHub/npm/Discord/Stellar no header/footer; "Edit this page", "Report an issue", "View source".

**Sprint 35 — Accessibility.** Navegação por teclado, focus states, ARIA, contraste, headings, screen reader, reduced motion, acessibilidade mobile.

### Fase 4 — Production

**Sprint 36 — Performance.** Static HTML first, JS mínimo, Vue só quando necessário. Lighthouse, bundle analysis, otimização de imagem/fonte, JS/CSS audit, lazy loading.

**Sprint 37 — Automated documentation tests.** CI checando links quebrados, páginas faltantes, frontmatter inválido, code blocks inválidos, referências de CLI inválidas, `llms-full.txt` gerado, build.

**Sprint 38 — Content audit.** Comparar a nova documentação com a implementação real (CLI, Configuration, Artifacts, Client, Wallets, ZK, Errors, Templates, Deployment, Upgrade, CI) e mapear divergências.

**Sprint 39 — Migration.** Migrar conteúdo restante da documentação antiga sem copiar cegamente: Old page → Review → Rewrite → Split if necessary → MDX → New components → Review.

**Sprint 40 — Redirects.** Redirects das URLs antigas para as novas, para não quebrar links existentes.

**Sprint 41 — Beta release.** Deploy em `docs-beta`. Checklist: build, mobile, links, search, dark mode, code examples, CLI commands, GitHub, npm, LLM files.

**Sprint 42 — Developer testing.** Testar com 3 perfis (Beginner → primeiro deploy; Stellar developer → projeto existente + Caatinga; Advanced developer → graph + CI + upgrades) e medir onde ficam bloqueados.

**Sprint 43 — Correções do beta.** Navegação confusa, conteúdo duplicado, exemplos quebrados, links quebrados, terminologia inconsistente, CLI desatualizada, problemas mobile.

**Sprint 44 — Production release.** Astro build → GitHub Actions → GitHub Pages → Production.

**Sprint 45 — Documentation governance.** Regra: `Feature sem documentação = incomplete`. Fluxo: New CLI feature → Implementation → Tests → CLI docs → Recipe → LLM docs.
