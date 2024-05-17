import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "host-app",
            remotes: {
                // key:value
                // key is the name of the remote (vite.config.ts federation config name)
                // value is the url of the remote entry file
                JamesUILibrary: "http://localhost:4173/assets/remoteEntry.js",
            },
            shared: ["react", "react-dom"],
        }),
    ],
    build: {
        target: "esnext",
    },
});
