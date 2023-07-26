import mongoose from "mongoose";

const carritosCollection = 'carritos';

const CarritoSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    }
}, { versionKey: false })

export const carritoModel = mongoose.model(carritosCollection, CarritoSchema)