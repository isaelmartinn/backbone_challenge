import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@atoms": fileURLToPath(
        new URL("./src/components/atoms", import.meta.url)
      ),
      "@molecules": fileURLToPath(
        new URL("./src/components/molecules", import.meta.url)
      ),
      "@organisms": fileURLToPath(
        new URL("./src/components/organisms", import.meta.url)
      ),
      "@templates": fileURLToPath(
        new URL("./src/components/templates", import.meta.url)
      ),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
    },
  },
});
