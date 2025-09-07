import express from "express"
import { fetchorders, placeorder, fetchAllOrders, updateOrderStatus } from "../controller/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Place order
router.post("/placeorder", placeorder);

// Get user's orders
router.get("/allorders", verifyJWT, fetchorders);

// Admin routes
router.get("/admin/orders", verifyJWT, fetchAllOrders);
router.put("/admin/orders/:orderId/status", verifyJWT, updateOrderStatus);

// Alternative route for order status update
router.put("/orders/:orderId", verifyJWT, updateOrderStatus);

export default router;