import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        name: { type: String },
        image: { type: String }
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
        items: { type: [cartItemSchema], default: [] }
    },
    { timestamps: true }
);

cartSchema.methods.totals = function () {
    const subtotal = this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = this.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, totalItems };
};

export const Cart = mongoose.model("Cart", cartSchema);

import mongoose from "mongoose";
import { StrictMode } from "react";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number, required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
    },
    image: {
        type: String
    },

}, { _id: false })

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
        index: true
    },
    items: {
        type: [cartItemSchema],
        default: []

    }
})

cartSchema.methods.totals = async function () {
    const subtotal = this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = this.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, totalItems };
}

export const Cart = mongoose.model("Cart", cartSchema);