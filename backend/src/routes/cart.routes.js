import express from "express";
import { addOrUpdateItem, clearCart, getCart, mergecart, removeItem, updateItemQuantity } from "../controller/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


//protected route
router.use(verifyJWT);
router.get("/", getCart);
router.post("/", addOrUpdateItem);
router.post("/merge", mergecart);
router.patch("/:productid", updateItemQuantity);
router.delete("/:productid", removeItem);
router.delete("/", clearCart);




export default router;