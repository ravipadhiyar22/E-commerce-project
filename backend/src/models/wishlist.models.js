import mongoose from "mongoose";

const wishlistItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String },
        image: { type: String },
        price: { type: Number }
    },
    { _id: false }
);

const wishlistSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
        items: { type: [wishlistItemSchema], default: [] }
    },
    { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);


