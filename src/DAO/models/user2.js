import mongoose from "mongoose";
import config from "../../config/libreria.config.js";

const userCollection = config.USER_COLLECTION;

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {type: String, unique: true},
    password: String,

});

export const userModel = mongoose.model(userCollection, userSchema);