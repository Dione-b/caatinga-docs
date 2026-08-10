// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://dione-b.github.io",
  base: "/caatinga-docs/",
  integrations: [mdx(), vue(), icon()],

  vite: {
    plugins: [tailwindcss()],
  },
});
