import Link from "@components/Link.astro";
import Code from "@components/Code.astro";
import Note from "@components/Note.astro";
import Tip from "@components/Tip.astro";
import Warning from "@components/Warning.astro";
import Callout from "@components/Callout.astro";
import Command from "@components/Command.astro";
import Terminal from "@components/Terminal.astro";
import CodeBlock from "@components/CodeBlock.astro";
import CodeTabs from "@components/CodeTabs.astro";
import Steps from "@components/Steps.astro";
import Step from "@components/Step.astro";
import Package from "@components/Package.astro";
import Tabs from "@components/Tabs.astro";
import Tab from "@components/Tab.astro";
import Badge from "@components/Badge.astro";
import IdentityRules from "@components/IdentityRules.astro";

/**
 * Passed to <Content components={mdxComponents} /> in pages/docs/[...slug].astro.
 * `a` and `code` override the plain tags markdown produces; everything
 * else is available in .mdx content without a per-file import.
 */
export const mdxComponents = {
  a: Link,
  Code,
  Note,
  Tip,
  Warning,
  Callout,
  Command,
  Terminal,
  CodeBlock,
  CodeTabs,
  Steps,
  Step,
  Package,
  Tabs,
  Tab,
  Badge,
  IdentityRules,
};



