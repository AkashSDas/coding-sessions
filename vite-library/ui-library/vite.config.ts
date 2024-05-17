import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src/components"],
        }),
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/components"),
            name: "JamesUILibrary",
            fileName: "jamesuilib",
            // formats: ["es", "cjs", "umd", "iife"],
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React", // assume that react lib is imported by consuming app
                    "react-dom": "ReactDOM", // same as above
                    "react/jsx-runtime": "jsxRuntime",
                },
            },
        },
    },
});
