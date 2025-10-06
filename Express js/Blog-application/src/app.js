import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes imports
import healthCheckRouter from './routes/healthChekc.router.js';
import userRouter from "./routes/user.router.js"

// routes declaration
export const BASE_API = "/api/v1";

// health -check controller
app.use(`${BASE_API}/health-check`, healthCheckRouter)

// user controllers
app.use(`${BASE_API}/user`, userRouter)

export { app };