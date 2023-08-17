// import mongoose from "mongoose";
// import { userModel } from "./models/user2.js";
// import config from "../config/libreria.config.js";

// const MONGO_CONNECTION_STRING = config.MONGO_CONNECTION_STRING;

// mongoose.connect(MONGO_CONNECTION_STRING)

export const getByEmail = async email =>{
    let result;
    try{
        result = await userModel.findOne({ email })
    }catch (error) {
        console.log(error)
    }
    return result;
}

export const createUser = async user =>{
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }
    return result;
}