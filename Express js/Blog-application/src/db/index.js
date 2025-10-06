import mongoose from "mongoose";
import { DB_NAME } from "../constans.js";

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\nMongodb connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`MongoDb Connection error: ${error}`);
        process.exit(1);
    }
}