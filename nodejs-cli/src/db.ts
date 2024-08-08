import * as fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export type Note = { content: string; tags: string[] };
type DbNote = Note & { id: string };

export async function getDB(): Promise<{ notes: DbNote[] }> {
    const db = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
}

export async function saveDB(db: {
    notes: DbNote[];
}): Promise<{ notes: DbNote[] }> {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
    return db;
}

export async function insertDB(note: Note): Promise<DbNote> {
    const db = await getDB();
    const id = Date.now().toString();
    db.notes.push({ ...note, id });
    await saveDB(db);
    return { ...note, id };
}
