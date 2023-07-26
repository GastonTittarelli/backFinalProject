import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    password: String,
});

export const userModel = mongoose.model("users", userSchema);