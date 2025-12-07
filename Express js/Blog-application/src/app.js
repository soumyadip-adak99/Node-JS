import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes imports
import healthCheckRouter from "./routes/healthChekc.router.js";
import publicRoute from "./routes/public.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

// routes declaration
export const BASE_API = "/api/v1";

// health -check controller
app.use(`${BASE_API}/health-check`, healthCheckRouter);

// public controllers
app.use(`${BASE_API}/public`, publicRoute);

// user controllers
app.use(`${BASE_API}/user`, userRoute);

//auth controllers
app.use(`${BASE_API}/auth`, authRoute);

export { app };
