import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
        build: {
            // workaround bug "index" file
            // @link https://github.com/withastro/astro/issues/3805
            rollupOptions: {
                output: {
                    entryFileNames: "entry.[hash].js",
                    chunkFileNames: "chunks/chunk.[hash].js",
                },
            },
        },
    },
});