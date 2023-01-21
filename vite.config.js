import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tenzies-app/",
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
});
