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

// Admin function to fetch all orders
const fetchAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("address").populate("items.productid", "slug").sort({ createdAt: -1 });
        return res.status(200).json({ orders });
    } catch (error) {
        return res.status(400).json({ success: false, message: "error while fetching all orders", error });
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderstatus } = req.body;

        // Validate order status
        const validStatuses = ["pending", "dispatched", "delivered", "cancelled"];
        if (!validStatuses.includes(orderstatus)) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid order status. Valid statuses: " + validStatuses.join(", ") 
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { 
                orderstatus,
                updatedAt: new Date()
            },
            { new: true }
        ).populate("address").populate("items.productid", "slug");

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Order status updated successfully",
            order: updatedOrder 
        });
    } catch (error) {
        console.log("Error updating order status:", error);
        return res.status(500).json({ success: false, message: "Error while updating order status", error });
    }
}

export { placeorder, fetchorders, fetchAllOrders, updateOrderStatus };