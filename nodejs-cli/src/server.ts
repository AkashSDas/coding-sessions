import http from "node:http";
import fs from "node:fs/promises";
import open from "open";
import type { getDB } from "./db.js";

function isKeyOf<T extends object>(
    obj: T,
    key: string | number | symbol
): key is keyof T {
    return key in obj;
}

function formatNotes(notes: Awaited<ReturnType<typeof getDB>>["notes"]) {
    return notes
        .map((note) => {
            return `<li>${note.content}</li>`;
        })
        .join("");
}

function interpolate(html: string, data: Awaited<ReturnType<typeof getDB>>) {
    // {{ notes }} => data.notes
    return html.replace(
        /\{\{\s*(\w+)\s*\}\}/g,
        function (matches, placeholder) {
            if (isKeyOf(data, placeholder)) {
                if (placeholder === "notes") {
                    return formatNotes(data[placeholder]);
                } else {
                    return "";
                }
            } else {
                return "";
            }
        }
    );
}

function createServer(payload: Awaited<ReturnType<typeof getDB>>) {
    return http.createServer(async function (req, res) {
        const HTML_PATH = new URL("./template.html", import.meta.url).pathname;
        const template = await fs.readFile(HTML_PATH, "utf-8");
        const html = interpolate(template, payload);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
}

export function start(payload: Awaited<ReturnType<typeof getDB>>) {
    const server = createServer(payload);

    server.listen(8000, function () {
        console.log("Server is listening on port 8000");
        open("http://localhost:8000");
    });
}
