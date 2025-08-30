import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getWishlist, addToWishlist, removeFromWishlist, toggleWishlist } from "../controller/wishlist.controller.js";

const router = express.Router();

router.use(verifyJWT);
router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);
router.post("/toggle", toggleWishlist);

export default router;


