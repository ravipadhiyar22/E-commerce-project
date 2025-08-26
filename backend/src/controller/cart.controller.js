import { Cart } from "../models/cart.models.js"
import { Product } from "../models/product.models.js"

//---------------------- get or create cart------------------------
async function getOrCreateCart(userId) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });
    return cart;
}


//---------------------- get  cart------------------------

const getCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.user._id);
        const { subtotal, totalItems } = cart.totals();
        return res.status(200).json({ items: cart.items, subtotal, totalItems });
    } catch (e) {
        return res.status(500).json({ message: "Failed to get cart" });
    }
};

//---------------------- get or update or set cart------------------------

const addOrUpdateItem = async (req, res) => {
    try {

        const { productid, quantity = 1 } = req.body;
        if (!productid) return res.status(400).json({ success: false, message: "product id is required" });
        //find product from database
        const product = await Product.findById(productid);
        if (!product) return res.status(400).json({ success: false, message: "product not found" });

        const stock = product.stock;
        if (stock <= 0) return res.status(400).json({ success: false, message: "out of stock" });

        const qty = Math.max(1, Math.min(Number(quantity) || 1, stock));
        //get cart details
        const cart = await getOrCreateCart(req.user._id);
        //check index of cart product if exists
        const idx = cart.items.findIndex((i) => String(i.product) === String(productid));

        const snapshot = {
            price: product.price,
            selling_price: product.selling_price,
            name: product.name,
            image: product.image,
            stock: product.stock
        }
        if (idx >= 0) {
            const curent = cart.items[idx];
            const newqty = Math.max(1, Math.min(curent.quantity + qty, stock));
            cart.items[idx].quantity = newqty;
            cart.items[idx].price = snapshot.price;
            cart.items[idx].selling_price = snapshot.selling_price;
            cart.items[idx].name = snapshot.name;
            cart.items[idx].image = snapshot.image;
            cart.items[idx].stock = snapshot.stock;
        } else {
            cart.items.push({
                product: product._id,
                quantity: qty,
                ...snapshot
            })
        }
        await cart.save();
        const { subtotal, totalItems } = cart.totals();

        return res.status(200).json({ success: true, items: cart.items, subtotal, totalItems });

    } catch (error) {
        return res.status(500).json({ message: "Failed to add item" });
    }
}

//---------------------- get or update cart------------------------

const updateItemQuantity = async (req, res) => {
    try {
        const { productid } = req.params;
        const { quantity } = req.body;

        if (!productid) return res.status(400).json({ message: "productid is required" });
        //find product from db
        const product = await Product.findById(productid);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const stock = product.stock;
        if (stock <= 0) return res.status(400).json({ message: "Out of stock" });
        //check quatntity
        const qty = Math.max(1, Math.min(Number(quantity) || 1, stock));
        //get cart
        const cart = await getOrCreateCart(req.user._id);
        //get index for existing cart
        const idx = cart.items.findIndex(i => String(i.product) === String(productid));

        if (idx < 0) return res.status(404).json({ message: "Item not in cart" });

        cart.items[idx].quantity = qty;
        await cart.save();

        const { subtotal, totalItems } = cart.totals();

        return res.status(200).json({ items: cart.items, subtotal, totalItems });

    } catch (error) {
        return res.status(500).json({ message: "Failed to update quantity" });
    }
}

//---------------------- remove cart------------------------

const removeItem = async (req, res) => {
    try {

        const { productid } = req.params;
        console.log("this is removeitem controller params product id:", productid);
        const cart = await getOrCreateCart(req.user._id);

        cart.items = cart.items.filter(i => String(i.product) !== String(productid));
        await cart.save();
        console.log("this is cart after delete product", cart);
        const { subtotal, totalItems } = cart.totals();
        return res.status(200).json({ items: cart.items, subtotal, totalItems });
    } catch {
        return res.status(500).json({ message: "Failed to remove item" });
    }
}

//---------------------- clrear  cart------------------------

const clearCart = async (req, res) => {
    try {
        const cart = await getOrCreateCart(req.user._id);
        cart.items = [];
        await cart.save();
        return res.status(200).json({ items: [], subtotal: 0, totalItems: 0 });
    } catch {
        return res.status(500).json({ message: "Failed to clear cart" });
    }
};

//---------------------- merge  cart------------------------


const mergecart = async (req, res) => {
    try {
        const { items = [] } = req.body;
        const cart = await getOrCreateCart(req.user._id);

        for (const clinetitems of items) {
            const product = await Product.findById(clinetitems.productid);

            if (!product) continue;
            const stock = product.stock;
            if (stock <= 0) continue;
            const qty = Math.max(1, Math.min(Number(clinetitems.quantity) || 1, stock));
            const idx = cart.items.findIndex(i => String(i.product) === String(product._id));
            const snapshot = {
                price: product.price,
                selling_price: product.selling_price,
                name: product.name,
                image: product.image,
                stock: product.stock
            };
            if (idx >= 0) {
                const curent = cart.items[idx];
                const newqty = Math.max(1, Math.min(curent.quantity + qty, stock));
                cart.items[idx].quantity = newqty;
                cart.items[idx].price = snapshot.price;
                cart.items[idx].selling_price = snapshot.selling_price;
                cart.items[idx].name = snapshot.name;
                cart.items[idx].image = snapshot.image;
                cart.items[idx].stock = snapshot.stock;
            } else {
                cart.items.push({
                    product: product._id,
                    quantity: qty,
                    ...snapshot
                })
            }
        }
        await cart.save();
        const { subtotal, totalItems } = cart.totals();
        return res.status(200).json({ items: cart.items, subtotal, totalItems });

    } catch (error) {
        return res.status(500).json({ message: "Failed to merge cart" });
    }
}

export { getCart, getOrCreateCart, addOrUpdateItem, updateItemQuantity, removeItem, clearCart, mergecart };