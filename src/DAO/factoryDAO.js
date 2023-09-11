import config from "../config/libreria.config.js"
import mongoose from "mongoose";


switch(config.ENV){
    case "production":
    await mongoose.connect();
        break;


    default:
        await mongoose.connect();
}