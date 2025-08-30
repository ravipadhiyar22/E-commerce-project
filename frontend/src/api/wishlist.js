import api from "./axios";

export async function fetchWishlist() {
    const { data } = await api.get("/wishlist");
    return data; // { items }
}

export async function addToWishlist(productId) {
    const { data } = await api.post("/wishlist", { productId });
    return data;
}

export async function removeFromWishlist(productId) {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
}

export async function toggleWishlist(productId) {
    const { data } = await api.post("/wishlist/toggle", { productId });
    return data; // { status, items }
}


