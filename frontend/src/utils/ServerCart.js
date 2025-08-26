import {
    fetchcart,
    addtocart as apiaddtoservercart,
    upadateservercartquantity as apisetqty,
    deleteservercartitem,
    clearservercart,
    mergeservercart,
    addtocart,
} from "../api/Cart.js";

import {
    readLocalCart, clearLocalCart, addLocalItem, setLocalQuantity, removeLocalItem
} from "./LocalCart.js";


function normalizeserveritems(items) {
    return items.map((i) => ({
        id: i.product,
        productid: i.product,
        name: i.name,
        price: i.price,
        selling_price: i.selling_price,
        quantity: i.quantity,
        stock: i.stock,
        image: i.image
    }))
}

async function loadservercart(user) {
    if (user) {
        const data = await fetchcart();
        return { items: normalizeserveritems(data.items), subtotal: data.subtotal, totalitems: data.totalItems };
    }

    return { items: readLocalCart(), subtotal: 0, totalitems: 0 };
}

async function addtocartservice(product, quantity, user) {
    if (user) {
        console.log(product._id);
        const data = await apiaddtoservercart(product._id, quantity);
        return { items: normalizeserveritems(data.items || []), subtotal: data.subtotal, totalitems: data.totalItems };
    }
    const data = addLocalItem(product, quantity);
    return data;
}

async function updatecartservice(productid, quantity, user) {
    if (user) {
        const data = await apisetqty(productid, quantity);
        console.log("step2-call- updatateserver call:", data);
        return { items: normalizeserveritems(data.items), subtotal: data.subtotal, totalitems: data.totalItems };
    }
    const data = setLocalQuantity(productid, quantity);
    console.log("step2-call- upadate local call:", data);

    return { items: data };
}


async function removeitemsfromcart(id, user) {
    if (user) {
        const data = await deleteservercartitem(id);
        return { items: normalizeserveritems(data.items), subtotal: data.subtotal, totalitems: data.totalItems };
    }

    const data = removeLocalItem(id);
    return { items: data };

}

async function mergeLocalToServerOnLogin() {
    const localcart = readLocalCart();

    if (localcart.length > 0) {
        const items = localcart.map((i) => ({
            productid: i.productid || i.id,
            quantity: i.quantity
        }))
        await mergeservercart(items);
        clearLocalCart();
    }
    const data = await fetchcart();
    return { items: normalizeserveritems(data.items || []), subtotal: data.subtotal, totalitems: data.totalItems };

}


export { loadservercart, addtocartservice, updatecartservice, mergeLocalToServerOnLogin, removeitemsfromcart };