import express from "express";
import cors from "cors";

const app = express(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

import healthCheckRouter from "./routes/healthCheck.router.js";
import authRouter from "./routes/auth.router.js";

app.use(healthCheckRouter);
app.use("/auth", authRouter);

export { app };
