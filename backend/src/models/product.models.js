import mongoose from "mongoose";
// import slugify from "slugify"
import { nanoid } from "nanoid"

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },
        description: {
            type: String
        },
        price: {
            type: Number,
            required: true

        },
        selling_price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            // default: [],
            // required: true

        },
        stock: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            default: true
        },
        notes: {
            top: { type: [String], default: [] },
            middle: { type: [String], default: [] },
            base: { type: [String], default: [] },
        },
        details: {
            sizeMl: { type: String, default: "" },
            concentration: { type: String, default: "" },
            longevity: { type: String, default: "" },
            sillage: { type: String, default: "" },
            season: { type: String, default: "" },
            occasion: { type: String, default: "" },
        },
        category: {
            type: String,
            default: ""
        },
        createdAt: {
            type: Date,
            default: Date.now

        },
    },
    {
        timestamps: true
    }
)


productSchema.pre("save", function (next) {
    if (!this.isModified("name")) return next();

    const slugBase = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // replace spaces & symbols
        .replace(/(^-|-$)+/g, "");

    const uniqueid = nanoid(6);
    this.slug = `${slugBase}-${uniqueid}`;
    next();
})

export const Product = mongoose.model("Product", productSchema)