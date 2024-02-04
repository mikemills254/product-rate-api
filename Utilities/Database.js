import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.DB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

class Database {
    static async connect() {
        try {
            const client = await mongoose.connect(uri, clientOptions);
            return {
                user: client,
                message: "Successfully connected to the database"
            };
        } catch (error) {
            throw new Error(`Error connecting to the database: ${error.message}`);
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB using Mongoose");
        } catch (error) {
            console.error("Error disconnecting from MongoDB:", error.message);
        }
    }
}

export default Database;
