import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./src/config/config.js";
import logMiddleware from "./src/middleware/logMiddleware.js";
import route from "./src/routes/route.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(logMiddleware);

route(app);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
