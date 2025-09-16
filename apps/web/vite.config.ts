import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "../../");
  const env = loadEnv(mode, envDir, "");
  const apiTarget = env.VITE_API_BASE_URL;

  return {
    plugins: [react(), TanStackRouterVite()],
    envDir,
    envPrefix: ["VITE_", "PUBLIC_"],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: {
        "/api": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
        "/trpc": {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    optimizeDeps: { exclude: ["pdfjs-dist"] },
    assetsInclude: ["**/*.wasm"],
  };
});
