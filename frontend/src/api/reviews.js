import api from "./axios";

export async function fetchReviews(productId) {
    const { data } = await api.get(`/products/${productId}/reviews`);
    return data; // { success, reviews }
}

export async function addOrUpdateReview(productId, { rating, comment }) {
    const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
    return data; // { success, review }
}


