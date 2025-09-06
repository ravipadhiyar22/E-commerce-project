import express from "express"
import { fetchorders, placeorder } from "../controller/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/placeorder", placeorder);

router.get("/allorders", verifyJWT, fetchorders);

export default router;