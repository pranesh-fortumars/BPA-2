// @ts-check

import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Optimized integrations for the BPA PRO platform.
  // Using React for complex interactive islands.
  integrations: [
      react(),
      tailwind()
	]
});