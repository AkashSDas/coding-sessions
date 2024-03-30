import express from "express";
import cors from "cors";

/** Express app */
export const app = express();

// ==============================
// Middlewares
// ==============================

app.use(cors({ origin: true }));

// ==============================
// Routes
// ==============================

app.get("/api/test", function testRoute(req, res) {
    res.status(200).json({ msg: "Express test application" });
});

app.get("/api/secret-agent", function (req, res) {
    res.status(200).json({
        msg: "The secret agent is James Bond",
        agentInfo: {
            name: "James Bond",
            age: 40,
            isSecret: true,
        },
    });
});
