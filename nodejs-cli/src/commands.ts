import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    newNote,
    findNotes,
    getAllNotes,
    removeAll,
    removeNote,
} from "./notes.js";
import { start } from "./server.js";

// Angle brackets in command means that argument is required
// Square brackets in command means that argument is optional

function printNotes(notes: Awaited<ReturnType<typeof getAllNotes>>) {
    notes.forEach((note, idx) => {
        console.log(`ID: ${note.id}`);
        console.log(`Tags: [${note.tags.join(", ")}]`);
        console.log(`Content: ${note.content}`);

        if (idx !== notes.length - 1) {
            console.log(``);
        }
    });
}

yargs(hideBin(process.argv))
    .command(
        "new <note>",
        "Create a new note",
        function (yargs) {
            return yargs.positional("note", {
                type: "string",
                description: "The content of the note to create.",
            });
        },
        function (argv) {
            if (argv.note) {
                let tags: string[] = [];

                if (typeof argv.tags === "string") {
                    tags = argv.tags.split(", ");
                }

                newNote(argv.note, tags);
            }
        }
    )
    .option("tags", {
        alias: "t",
        type: "string",
        description: "Tags to add to the note",
    })
    .command(
        "all",
        "Get all notes",
        function () {},
        async function (argv) {
            const notes = await getAllNotes();
            printNotes(notes);
        }
    )
    .command(
        "find <filter>",
        "Get matching notes",
        function (yargs) {
            return yargs.positional("filter", {
                type: "string",
                description:
                    "The search term to filter notes by, will be applied to note.content",
            });
        },
        async function (argv) {
            if (argv.filter) {
                const matches = await findNotes(argv.filter);
                printNotes(matches);
            }
        }
    )
    .command(
        "remove <id>",
        "Remove a note by id",
        function (yargs) {
            return yargs.positional("id", {
                type: "string",
                description: "The id of the note you to remove",
            });
        },
        async function (argv) {
            if (typeof argv.id === "string") {
                await removeNote(argv.id);
            }
        }
    )
    .command(
        "web [port]",
        "Launch website to see notes",
        function (yargs) {
            return yargs.positional("port", {
                type: "number",
                default: 5000,
                description: "Port to bind on",
            });
        },
        async function (argv) {
            const notes = await getAllNotes();
            // argv.port is optional
            start({ notes });
        }
    )
    .command(
        "clean",
        "Remove all notes",
        function () {},
        async function (argv) {
            await removeAll();
        }
    )
    .demandCommand(1)
    .parse();
