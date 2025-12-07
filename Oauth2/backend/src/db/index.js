import mongoose from "mongoose";
import { DB_NAME } from "../utils/constance.js";

const databaseName = process.env.MONGODB_URI;

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${databaseName}/${DB_NAME}`);
        console.log(`\nMongodb connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit();
    }
}
