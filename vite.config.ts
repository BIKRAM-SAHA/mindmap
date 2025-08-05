import { defineConfig as testConfig } from "vitest/config";
import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
const config = defineConfig({
    base: "/",
    plugins: [react()],
    preview: {
        port: 8080,
        strictPort: true,
    },
    server: {
        port: 8080,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8080",
    },
    resolve: {
        alias: [
            {
                find: "@assets",
                replacement: path.resolve(__dirname, "src/assets"),
            },
            {
                find: "@modules",
                replacement: path.resolve(__dirname, "src/modules"),
            },
            {
                find: "@screens",
                replacement: path.resolve(__dirname, "src/screens"),
            },
            {
                find: "@contexts",
                replacement: path.resolve(__dirname, "src/contexts"),
            },
            {
                find: "@appTypes",
                replacement: path.resolve(__dirname, "src/appTypes"),
            },
        ],
    },
});

const tstConfig = testConfig({
    test: {
        environment: "jsdom",
    },
});

export default { ...config, ...tstConfig };
