import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

import node from "@astrojs/node";

const mode = import.meta.env.MODE;

const adapter = mode.toLowerCase() == "production" ? node({ mode: "standalone" }) : vercel()

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: adapter,
  integrations: [tailwind(), prefetch()]
});