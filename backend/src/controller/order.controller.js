import { Order } from "../models/order.models.js";


const placeorder = async (req, res) => {
    try {

        const { user, paytype, toatalquantity, total, address, items, savings } = req.body;

        console.log("this i sordr controller::::::", items);
        console.log("this place order controller", user, paytype, toatalquantity, total, "tis is affess", address);
        if ([user, paytype, address].some(val => !val?.trim()) || total == null) {
            return res.status(400).json({ success: false, message: "all fields are required" });
        }


        const newaddress = await Order.create({
            user,
            items,
            paytype,
            total,
            savings,
            address

        });
        console.log("this is responce of order db", newaddress.orderdate);
        return res.status(200).json({ success: true });


    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ success: false, message: "error while place order", error });
    }
}

const fetchorders = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user._id }).populate("address").populate("items.productid", "slug");

        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(400).json({ success: false, message: "error while get order", error });

    }
}

export { placeorder, fetchorders };