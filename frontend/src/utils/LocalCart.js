

const CART_KEY = "cart";

function readcart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        return [];
    }
}

function writecart(items) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (error) {

    }
    try {
        const totalItems = items.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
        window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items, totalItems } }));
    } catch (e) { }
    console.log("this is writecart items:", items);
    return items;
}

function toCartItemFromProduct(product, quantity = 1) {
    const id = product._id;
    const name = product.name;
    const price = product.price;
    const selling_price = product.selling_price;
    const stock = typeof product.stock === "number" ? product.stock : undefined
    const image = product.image

    return {
        productid: id,
        id,
        name,
        price,
        selling_price,
        stock,
        quantity: Math.max(1, Number(quantity) || 1),
        image

    };
}

function readLocalCart() {
    return readcart();
}


function addLocalItem(product, quantity = 1) {
    const items = readcart();
    const newitem = toCartItemFromProduct(product, quantity);

    const idx = items.findIndex(i => i.id === newitem.id);

    if (idx >= 0) {
        const maxQty = typeof items[idx].stock === "number" ? items[idx].stock : Infinity;
        const nextQty = Math.min(items[idx].quantity + newitem.quantity, maxQty);
        items[idx] = {
            ...items[idx],
            quantity: nextQty,
            price: newitem.price,
            selling_price: newitem.selling_price,
            stock: newitem.stock,
        }
    } else {
        items.push(newitem);
    }
    return writecart(items);
}

function setLocalQuantity(id, quantity) {
    const items = readcart();

    const newitems = items.map(item => {
        if (item.id !== id) return item;
        const maxQty = typeof item.stock === "number" ? item.stock : Infinity;
        const qty = Math.max(1, Math.min(Number(quantity) || 1, maxQty));

        return { ...item, quantity: qty };
    }).filter(i => i.quantity > 0);
    console.log("step 3 -call updatae local set :");
    return writecart(newitems);
}

function removeLocalItem(id) {
    const items = readcart();

    const newitems = items.filter(data => data.id !== id);
    return writecart(newitems);

}


function clearLocalCart() {
    return writecart([]);
}

export { readLocalCart, addLocalItem, setLocalQuantity, removeLocalItem, clearLocalCart, toCartItemFromProduct }