import { defineConfig, Plugin } from "vite";
import Markdown from "markdown-it";
import { readFile } from "fs/promises";

const markdown = new Markdown();

async function renderMarkdown(file: string) {
    const md = await readFile(file, "utf-8");
    return markdown.render(md);
}

// plugin - has to be regular because inside Rollup it has to have access ot this
// and using arrow function would break it
function markdownToHTML(): Plugin {
    return {
        name: "markdown-to-html",

        // resolveId tells we're handling .md files
        resolveId(id) {
            if (id.endsWith(".md")) {
                return id;
            }
            return null; // or undefined, we don't resolve this one
        },

        async load(id) {
            if (id.endsWith(".md")) {
                const rendered = await renderMarkdown(id);
                return `export default ${JSON.stringify(rendered)}`;

                // return something that Vite understands, and Vite understand ES Modules
                // you could also move this to another file and interpolate it here
                //
                // this is basically taking the markdown file and turning it into a HTML string

                // You can use plugins to remove all data-* attributes from the HTML
                // You can also remove all console.log statements
            }
        },
    };
}

export default defineConfig({
    plugins: [markdownToHTML()],
});
