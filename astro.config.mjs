import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// Deployed to Cloudflare Pages, served at the domain root.
export default defineConfig({
  site: "https://samit.pages.dev",
  integrations: [react()],

  vite: {
    ssr: {
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },

  adapter: cloudflare()
});