import express from "express";
import { addaddress, getaddress, deleteaddress } from "../controller/address.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();



router.post("/addaddress", verifyJWT, addaddress);

router.get("/getaddress", verifyJWT, getaddress);

router.delete("/deleteaddress", verifyJWT, deleteaddress);

export default router;
