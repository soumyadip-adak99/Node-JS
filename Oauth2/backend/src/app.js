import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheck.router.js";
import authRouter from "./routes/auth.router.js";

const app = express(); 

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Routes
app.use("/health-check", healthCheckRouter); 
app.use("/auth", authRouter); 

export { app };
