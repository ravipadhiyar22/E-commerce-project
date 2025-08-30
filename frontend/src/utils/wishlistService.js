import { fetchWishlist, toggleWishlist as apiToggle } from "../api/wishlist";
import { readLocalWishlist, toggleLocalWishlist } from "./wishlistLocal";

export async function loadWishlist(user) {
    if (user) {
        const { items } = await fetchWishlist();
        const ids = items.map(i => String(i.product));
        return { ids, items };
    }
    const ids = readLocalWishlist();
    return { ids, items: [] };
}

export async function toggleWishlistService(product, user) {
    const productId = product._id || product.id || product.productId || product.slug;
    if (!productId) throw new Error("Missing product id to toggle");

    if (user) {
        const { items } = await apiToggle(productId);
        const ids = items.map(i => String(i.product));
        return { ids, items };
    } else {
        toggleLocalWishlist(productId);
        const ids = readLocalWishlist();
        return { ids, items: [] };
    }
}


