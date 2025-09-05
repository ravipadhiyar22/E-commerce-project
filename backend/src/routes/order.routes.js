import express from "express"
import { placeorder } from "../controller/order.controller.js";

const router = express.Router();


router.post("/placeorder", placeorder)