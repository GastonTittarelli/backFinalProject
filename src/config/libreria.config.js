import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT,
    USER_COLLECTION: process.env.USER_COLLECTION,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    PASSPORT_CLIENT_ID: process.env.PASSPORT_CLIENT_ID,
    PASSPORT_CLIENT_SECRET: process.env.PASSPORT_CLIENT_SECRET,
    PASSPORT_CALLBACK_URL: process.env.PASSPORT_CALLBACK_URL
}