import mongoose from "mongoose";

const databaseName = process.env.DB_NAME;
const mongodbURI = process.env.MONGODB_URI;

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${mongodbURI}/${databaseName}`);
        console.log(`\nMongodb connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit();
    }
}
