import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, default: "" }
    },
    { timestamps: true }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);


