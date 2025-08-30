const WISHLIST_KEY = "wishlist";

function read() {
    try {
        const raw = localStorage.getItem(WISHLIST_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function write(ids) {
    try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch { }
    try {
        window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: { ids } }));
    } catch { }
    return ids;
}

export function readLocalWishlist() {
    return read();
}

export function addLocalWishlist(productId) {
    const ids = read();
    if (!ids.includes(productId)) ids.push(productId);
    return write(ids);
}

export function removeLocalWishlist(productId) {
    const ids = read().filter(id => id !== productId);
    return write(ids);
}

export function toggleLocalWishlist(productId) {
    const ids = read();
    const idx = ids.indexOf(productId);
    if (idx >= 0) ids.splice(idx, 1);
    else ids.push(productId);
    return write(ids);
}


