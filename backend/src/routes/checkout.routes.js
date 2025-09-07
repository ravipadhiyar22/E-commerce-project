import express from "express";
import { addaddress, getaddress, deleteaddress } from "../controller/address.controller.js";
import { updateOrderStatus } from "../controller/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Address routes
router.post("/addaddress", verifyJWT, addaddress);
router.get("/getaddress", verifyJWT, getaddress);
router.delete("/deleteaddress", verifyJWT, deleteaddress);

// Order status update route
router.put("/orders/:orderId", verifyJWT, updateOrderStatus);

export default router;
