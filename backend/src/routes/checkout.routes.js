import express from "express";
import { addaddress, getaddress } from "../controller/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();



router.post("/addaddress", verifyJWT, addaddress);

router.get("/getaddress", verifyJWT, getaddress);

export default router;
