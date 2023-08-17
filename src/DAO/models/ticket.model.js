import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    number: Number,
    business: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "business"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users"
    },
    products: [],
    totalPrice: Number
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);