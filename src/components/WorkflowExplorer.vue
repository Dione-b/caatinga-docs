<script setup lang="ts">
import { ref } from "vue";

interface Stage {
  id: string;
  name: string;
  command: string;
  purpose: string;
  input: string;
  output: string;
  icon: string;
}

const stages: Stage[] = [
  {
    id: "init",
    name: "init",
    command: "npx ctg init my-dapp",
    purpose: "Scaffold a new Soroban project with caatinga.config.ts, contracts workspace, and ready-to-use tooling.",
    input: "Project name, template selection (react-vite-counter, minimal, zk-starter)",
    output: "my-dapp/ directory structure, caatinga.config.ts, contracts/",
    icon: "sparkles",
  },
  {
    id: "build",
    name: "build",
    command: "npx ctg build",
    purpose: "Compile Rust smart contracts into optimized Soroban WebAssembly (.wasm) bytecode binaries.",
    input: "contracts/ Rust source code & caatinga.config.ts",
    output: "Optimized .wasm contract binaries in target output directory",
    icon: "hammer",
  },
  {
    id: "deploy",
    name: "deploy",
    command: "npx ctg deploy --network testnet",
    purpose: "Deploy compiled WASM binaries to Stellar networks following dependency graph resolution.",
    input: "Compiled WASM binaries, network specs, identity alias (--source)",
    output: "Deployed Contract IDs & metadata in caatinga.artifacts.json",
    icon: "rocket",
  },
  {
    id: "generate",
    name: "generate",
    command: "npx ctg generate",
    purpose: "Generate type-safe TypeScript client bindings directly from deployed contract artifacts.",
    input: "caatinga.artifacts.json contract definitions",
    output: "TypeScript bindings (src/contracts/*) with typed methods & XDR helpers",
    icon: "code",
  },
  {
    id: "invoke",
    name: "invoke",
    command: "npx ctg invoke token transfer --arg to=G... --arg amount=1000",
    purpose: "Execute state-changing contract functions via signed Stellar network transactions.",
    input: "Contract name, function, typed arguments, signing identity",
    output: "On-chain transaction hash, event logs, and return value",
    icon: "terminal",
  },
  {
    id: "read",
    name: "read",
    command: "npx ctg read token balance --arg id=G...",
    purpose: "Simulate contract execution and query state without submitting on-chain transactions.",
    input: "Contract name, getter function name, query arguments",
    output: "Decoded JSON response with current contract state",
    icon: "eye",
  },
];

const activeStage = ref<Stage>(stages[0]);
const copied = ref(false);

function selectStage(stage: Stage) {
  activeStage.value = stage;
  copied.value = false;
}

function copyCommand() {
  navigator.clipboard.writeText(activeStage.value.command);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <div class="w-full rounded-xl border border-border bg-surface p-4 sm:p-6 shadow-md transition-all">
    <div class="mb-4 flex flex-col gap-1">
      <h3 class="text-base sm:text-lg font-semibold text-ink">Interactive Workflow Pipeline</h3>
      <p class="text-xs sm:text-sm text-muted">
        Click through the Caatinga execution stages to see how orchestration flows from init to read.
      </p>
    </div>

    <!-- Stepper Buttons -->
    <div class="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      <button
        v-for="(stage, idx) in stages"
        :key="stage.id"
        @click="selectStage(stage)"
        :class="[
          'flex flex-col items-center justify-center rounded-lg border p-2.5 sm:p-3 text-xs sm:text-sm font-medium transition-all cursor-pointer',
          activeStage.id === stage.id
            ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold scale-[1.02]'
            : 'border-border bg-bg/50 text-muted hover:border-border/80 hover:text-ink',
        ]"
      >
        <span class="text-[10px] sm:text-xs text-muted mb-0.5">0{{ idx + 1 }}</span>
        <span class="font-mono text-xs sm:text-sm">{{ stage.name }}</span>
      </button>
    </div>

    <!-- Stage Detail View -->
    <div class="rounded-lg border border-border bg-bg p-4 sm:p-5 flex flex-col gap-4">
      <!-- Command block -->
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted">Command</span>
          <button
            @click="copyCommand"
            class="text-xs font-mono text-muted hover:text-primary transition-colors cursor-pointer flex items-center gap-1 shrink-0"
          >
            <span v-if="copied" class="text-success font-semibold">✓ Copied</span>
            <span v-else>Copy</span>
          </button>
        </div>
        <div class="rounded-md border border-border bg-surface/80 px-3 py-2.5 sm:px-4 sm:py-3 font-mono text-xs sm:text-sm text-ink flex items-center justify-between overflow-x-auto min-w-0">
          <code class="whitespace-pre-wrap break-all sm:whitespace-normal sm:break-normal">{{ activeStage.command }}</code>
        </div>
      </div>

      <!-- Purpose, Input, Output -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-border/50">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted">Purpose</span>
          <p class="text-xs sm:text-sm text-ink leading-relaxed">{{ activeStage.purpose }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted">Input</span>
          <p class="text-xs sm:text-sm text-muted font-mono leading-relaxed break-words">{{ activeStage.input }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <span class="text-xs font-semibold uppercase tracking-wider text-muted">Output</span>
          <p class="text-xs sm:text-sm text-muted font-mono leading-relaxed break-words">{{ activeStage.output }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
