import * as db from "./db.js";

export async function newNote(content: string, tags: string[]) {
    const id = await db.insertDB({ content, tags });
    return id;
}

export async function getAllNotes() {
    const { notes } = await db.getDB();
    return notes;
}

export async function findNotes(filter: string) {
    const { notes } = await db.getDB();
    return notes.filter((note) => {
        return note.content.toLowerCase().includes(filter.toLowerCase());
    });
}

export async function removeNote(id: string) {
    const { notes } = await db.getDB();
    const newNotes = notes.filter((note: db.Note & { id: string }) => {
        return note.id !== id;
    });
    await db.saveDB({ notes: newNotes });
}

export async function removeAll() {
    return db.saveDB({ notes: [] });
}
