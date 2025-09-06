import { Review } from "../models/review.models.js";
import { Product } from "../models/product.models.js";

export const addOrUpdateReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment = "" } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "rating must be 1-5" });
        }

        const product = await Product.findById(productId).select("_id");
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" });
        }

        const review = await Review.findOneAndUpdate(
            { product: productId, user: req.user._id },
            { $set: { rating, comment } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({ success: true, review });
    } catch (error) {
        return res.status(500).json({ success: false, message: "failed to add review" });
    }
}

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).select("_id");
        if (!product) return res.status(404).json({ success: false, message: "product not found" });

        const reviews = await Review.find({ product: productId })
            .populate("user", "username email")
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({ success: true, reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: "failed to fetch reviews" });
    }
}


