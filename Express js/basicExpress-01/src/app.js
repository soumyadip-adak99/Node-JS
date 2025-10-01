import express from "express";

const app = express()

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

import userRouter from './routes/user.router.js'

app.use(process.env.BASE_URL, userRouter)

export { app }