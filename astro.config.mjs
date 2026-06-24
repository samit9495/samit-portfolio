import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Served from https://samit9495.github.io/samit-portfolio/ via GitHub Pages.
export default defineConfig({
  site: "https://samit9495.github.io",
  base: "/samit-portfolio",
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ["three", "@react-three/fiber", "@react-three/drei"],
    },
  },
});
