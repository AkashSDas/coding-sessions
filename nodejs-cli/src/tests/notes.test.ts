import { jest, beforeEach, test, expect, describe } from "@jest/globals";
import { insertDB, getDB, saveDB } from "../db";
import { newNote, getAllNotes, removeNote } from "../notes";

jest.mock("../db", () => ({
    insertDB: jest.fn(),
    getDB: jest.fn().mockImplementation(() => ({ notes: [] })),
    saveDB: jest.fn(),
}));

describe("Notes", () => {
    beforeEach(() => {
        // @ts-ignore
        insertDB.mockClear();
        // @ts-ignore
        getDB.mockClear();
        // @ts-ignore
        saveDB.mockClear();
    });

    test("newNote", async () => {
        const id = await newNote("test", []);
        expect(insertDB).toBeCalledWith({ content: "test", tags: [], id });
    });

    test("getAllNotes", async () => {
        await getAllNotes();
        expect(getDB).toBeCalled();
    });

    test("removeNote", async () => {
        await removeNote("test");
        expect(saveDB).toBeCalledWith({ notes: [] });
    });
});
