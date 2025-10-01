import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port: ${process.env.PORT}`)
            console.log(`Server URL: http://localhost:${process.env.PORT || 8000}${process.env.BASE_URL}`)
        })
    })
    .catch((error) => {
        console.log(`Something wrong on server: ${error?.message || 'MongoDB Connection Fiald'}`)
    })