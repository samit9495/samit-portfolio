import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Deployed to Cloudflare Pages, served at the domain root.
export default defineConfig({
  site: "https://samitpawar.pages.dev",
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
});
