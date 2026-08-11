// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: process.env.NETLIFY ? "https://docs-caatinga.netlify.app" : "https://dione-b.github.io",
  base: process.env.NETLIFY ? "/" : "/caatinga-docs/",
  integrations: [mdx(), vue(), icon()],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
