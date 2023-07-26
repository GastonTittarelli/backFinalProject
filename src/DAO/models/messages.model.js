import mongoose from "mongoose";

const messagesCollection = 'messages';

const MessageSchema = new mongoose.Schema({
    Mensaje: {
        type: String,
        required: true
    }
}, { versionKey: false })

export const messageModel = mongoose.model(messagesCollection, MessageSchema)