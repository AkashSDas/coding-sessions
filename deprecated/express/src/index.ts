import { app } from "./api";

const port = process.env.PORT ?? 8000;
app.listen(port, function initApp() {
    console.log(`App listening on port http://localhost:${port}`);
});
