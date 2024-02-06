import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    static async connect() {
        try {
            if (!process.env.DB_URI) {
                throw new Error("DB_URI environment variable is not defined.");
            }

            await mongoose.connect( process.env.DB_URI );

            return {
                message: 'Successfully connected to database'
            };
        } catch (error) {
            throw new Error("Error connecting to MongoDB: " + error.message);
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            return "Disconnected from MongoDB using Mongoose";
        } catch (error) {
            throw new Error("Error disconnecting from MongoDB: " + error.message);
        }
    }
}

export default Database;
