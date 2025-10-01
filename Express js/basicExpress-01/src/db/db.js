import mongoose from "mongoose"

const mongodbURI = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DATABASE_NAME

export default async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${mongodbURI}/${dbName}`)

        console.log('\nMongoDB connected: ', connectionInstance.connection.host)
    } catch (error) {
        console.log(`Mongodb Connection error: ${error}`)
        process.exit(1)
    }
}