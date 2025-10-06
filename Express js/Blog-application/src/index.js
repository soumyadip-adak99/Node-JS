import dotenv from "dotenv";
import { app, BASE_API } from "./app.js"
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT || 8000, () => {
            console.log(`Server running on: http://localhost:${PORT || 8000}${BASE_API}`)
        });
    })
    .catch((error) => {
        throw new Error("MongoDB connection faild:", error)
    })

