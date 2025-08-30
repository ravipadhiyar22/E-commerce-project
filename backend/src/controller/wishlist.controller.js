import { Wishlist } from "../models/wishlist.models.js";
import { Product } from "../models/product.models.js";

async function getOrCreateWishlist(userId) {
    let wl = await Wishlist.findOne({ user: userId });
    if (!wl) wl = await Wishlist.create({ user: userId, items: [] });
    return wl;
}

export const getWishlist = async (req, res) => {
    try {
        const wl = await getOrCreateWishlist(req.user._id);
        return res.status(200).json({ items: wl.items });
    } catch {
        return res.status(500).json({ message: "Failed to get wishlist" });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ message: "productId is required" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const wl = await getOrCreateWishlist(req.user._id);
        const already = wl.items.some(i => String(i.product) === String(productId));
        if (!already) {
            wl.items.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: Number(product.selling_price ?? product.price ?? 0)
            });
            await wl.save();
        }
        return res.status(200).json({ items: wl.items });
    } catch {
        return res.status(500).json({ message: "Failed to add to wishlist" });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const wl = await getOrCreateWishlist(req.user._id);
        wl.items = wl.items.filter(i => String(i.product) !== String(productId));
        await wl.save();
        return res.status(200).json({ items: wl.items });
    } catch {
        return res.status(500).json({ message: "Failed to remove from wishlist" });
    }
};

export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ message: "productId is required" });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const wl = await getOrCreateWishlist(req.user._id);
        const idx = wl.items.findIndex(i => String(i.product) === String(productId));
        if (idx >= 0) {
            wl.items.splice(idx, 1);
            await wl.save();
            return res.status(200).json({ status: "removed", items: wl.items });
        } else {
            wl.items.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: Number(product.selling_price ?? product.price ?? 0)
            });
            await wl.save();
            return res.status(200).json({ status: "added", items: wl.items });
        }
    } catch {
        return res.status(500).json({ message: "Failed to toggle wishlist" });
    }
};


