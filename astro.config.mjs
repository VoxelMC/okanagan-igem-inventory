import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    react({
      include: ['**/react/*']
    }),
    tailwind(),
    prefetch(),
  ],
});