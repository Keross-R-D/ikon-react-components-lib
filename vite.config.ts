// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     port: 3000,
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// Read package.json to grab all dependencies automatically
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const externalDeps = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
  "react/jsx-runtime"
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    minify: "esbuild", // 1. Explicitly enable minification (disabled by default in lib mode)
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "IkonComponentsReact",
      fileName: (format) => `ikon-react-components-lib.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      // 2. Externalize all dependencies to prevent them from inflating the bundle
      // The RegExp ensures that subpath imports (like "lucide-react/icons") are also externalized
      external: externalDeps.map((pkg) => new RegExp(`^${pkg}(/.*)?$`)),
    },
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});