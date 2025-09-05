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
    address: {
        orderaddress: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    orderdate: {
        type: Date,
        default: Date.now,
    },
    expectedDelivery: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 4);
            return date;
        }
    },


}, { timestamps: true })