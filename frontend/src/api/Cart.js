import api from "./axios.js"


//--------------fetch the full cart from database-------------
// get/ api / cart
async function fetchcart() {
    const { data } = await api.get("/cart");
    return data;
}

//--------------add or update cart to database----------------
// post / api / cart
async function addtocart(productid, quantity) {
    const { data } = await api.post("/cart", { productid, quantity });
    return data;
}

//--------------upadate quantity to cart database-------------
// patch / api / :productid

async function upadateservercartquantity(productid, quantity) {
    const { data } = await api.patch(`/cart/${productid}`, { quantity });
    console.log("step3- call updata api call:", data);
    return data;
}

//--------------- remove items from cart---------------------
// delete / cart /:productid 

async function deleteservercartitem(productid) {
    const { data } = await api.delete(`/cart/${productid}`, { productid });
    console.log("cart remove api call,", data)
    return data;
}

//------------------clear cart -----------------------------
// delete / cart
async function clearservercart() {
    const { data } = await api.delete("/cart");
    return data;
}

//----------------- merge cart ------------------------------
// post / cart / merge

async function mergeservercart(items) {
    const { data } = await api.post("/cart/merge", { items })
}

export { fetchcart, addtocart, upadateservercartquantity, deleteservercartitem, clearservercart, mergeservercart };