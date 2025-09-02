import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        houseno: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
        building: {
            type: String,
            required: true,
        },
        socity: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }

    },
    { timestamps: true });

export const Address = mongoose.model("Address", AddressSchema);