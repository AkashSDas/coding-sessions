// vite.config.ts
import { defineConfig } from "file:///Users/akashdas/Desktop/quick/dev/coding-sessions/vite-library/ui-library/node_modules/.pnpm/vite@5.2.11_@types+node@20.12.12/node_modules/vite/dist/node/index.js";
import react from "file:///Users/akashdas/Desktop/quick/dev/coding-sessions/vite-library/ui-library/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.11/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import dts from "file:///Users/akashdas/Desktop/quick/dev/coding-sessions/vite-library/ui-library/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.12.12_typescript@5.4.5_vite@5.2.11/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/akashdas/Desktop/quick/dev/coding-sessions/vite-library/ui-library";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/components"]
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/components"),
      name: "JamesUILibrary",
      fileName: "jamesuilib"
      // formats: ["es", "cjs", "umd", "iife"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          // assume that react lib is imported by consuming app
          "react-dom": "ReactDOM",
          // same as above
          "react/jsx-runtime": "jsxRuntime"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWthc2hkYXMvRGVza3RvcC9xdWljay9kZXYvY29kaW5nLXNlc3Npb25zL3ZpdGUtbGlicmFyeS91aS1saWJyYXJ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWthc2hkYXMvRGVza3RvcC9xdWljay9kZXYvY29kaW5nLXNlc3Npb25zL3ZpdGUtbGlicmFyeS91aS1saWJyYXJ5L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9ha2FzaGRhcy9EZXNrdG9wL3F1aWNrL2Rldi9jb2Rpbmctc2Vzc2lvbnMvdml0ZS1saWJyYXJ5L3VpLWxpYnJhcnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICBkdHMoe1xuICAgICAgICAgICAgaW5jbHVkZTogW1wic3JjL2NvbXBvbmVudHNcIl0sXG4gICAgICAgIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgY29weVB1YmxpY0RpcjogZmFsc2UsXG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jb21wb25lbnRzXCIpLFxuICAgICAgICAgICAgbmFtZTogXCJKYW1lc1VJTGlicmFyeVwiLFxuICAgICAgICAgICAgZmlsZU5hbWU6IFwiamFtZXN1aWxpYlwiLFxuICAgICAgICAgICAgLy8gZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIiwgXCJ1bWRcIiwgXCJpaWZlXCJdLFxuICAgICAgICB9LFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC9qc3gtcnVudGltZVwiXSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhY3Q6IFwiUmVhY3RcIiwgLy8gYXNzdW1lIHRoYXQgcmVhY3QgbGliIGlzIGltcG9ydGVkIGJ5IGNvbnN1bWluZyBhcHBcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFjdC1kb21cIjogXCJSZWFjdERPTVwiLCAvLyBzYW1lIGFzIGFib3ZlXG4gICAgICAgICAgICAgICAgICAgIFwicmVhY3QvanN4LXJ1bnRpbWVcIjogXCJqc3hSdW50aW1lXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WSxTQUFTLG9CQUFvQjtBQUMxYSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUhoQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixJQUFJO0FBQUEsTUFDQSxTQUFTLENBQUMsZ0JBQWdCO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUMxQyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUE7QUFBQSxJQUVkO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDWCxVQUFVLENBQUMsU0FBUyxhQUFhLG1CQUFtQjtBQUFBLE1BQ3BELFFBQVE7QUFBQSxRQUNKLFNBQVM7QUFBQSxVQUNMLE9BQU87QUFBQTtBQUFBLFVBQ1AsYUFBYTtBQUFBO0FBQUEsVUFDYixxQkFBcUI7QUFBQSxRQUN6QjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
