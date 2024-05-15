/// <reference types="vite/client" />

type Vitest = import("vitest");

interface ImportMetaEnv {
    readonly VITE_USERNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly vitest: Vitest;
}
