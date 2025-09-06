import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productname: {
                type: String
            },
            image: {
                type: String,
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            selling_price: {
                type: Number,
                required: true
            }
        }
    ],
    paytype: {
        type: String,
        enum: ["cod", "card"],
        default: "cod"
    },
    orderstatus: {
        type: String,
        enum: ["pending", "dispatched", "delivered", "cancelled"],
        default: "pending"
    },
    // totalquantity: {
    //     type: Number,
    //     required: true
    // },
    total: {
        type: Number,
        required: true,
    },
    savings: {
        type: Number,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    orderdate: {
        type: Date,
        default: () => {
            const now = new Date();
            return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        }
    },
    expectedDelivery: {
        type: Date,
        default: () => {
            const now = new Date();
            return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 4));
        }
    },


}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema)