import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    tickets: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'tickets'
        }
    ]
})

export const userModel = mongoose.model(userCollection, userSchema)