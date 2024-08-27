import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { remarkModifiedTime } from './utils/remark-modified-time.mjs';
import { remarkReadingTime } from './utils/remark-reading-time.mjs';
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
  site: 'https://hitorilabs.com/',
  output: 'static',
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx({
    remarkPlugins: [remarkModifiedTime, remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex]
  }),
  sitemap()],
});
