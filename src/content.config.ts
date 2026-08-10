import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sidebar: z
      .object({
        order: z.number().default(0),
        label: z.string().optional(),
      })
      .default({ order: 0 }),
  }),
});

export const collections = { docs };
