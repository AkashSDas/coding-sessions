import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            include: ["src/components"],
        }),
        federation({
            name: "JamesUILibrary",

            // when we go and ask for a component, there have to be file that kind of
            // file that's generated and will give the component
            filename: "remoteEntry.js",

            // expose the components
            exposes: {
                "./Button": "./src/components/Button.tsx",
                "./Input": "./src/components/Input.tsx",
            },
            shared: ["react", "react-dom"],
        }),
    ],
    build: {
        target: "esnext",

        // NOTE: Remove all of the line below this to create library using module federation
        // otherwise it'll give an error
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
