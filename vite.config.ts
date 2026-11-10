import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isGitHubActions = Boolean(
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.GITHUB_ACTIONS,
);

export default defineConfig({
  // GitHub Pages serves this project at /pcardosu-manus-test/; local Preview stays at /.
  base: isGitHubActions ? "/pcardosu-manus-test/" : "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
});
