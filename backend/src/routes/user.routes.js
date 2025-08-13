import express from "express";
import { usersingup, userlogin, userlogout, refreshaccesstoke, getcurentuser } from "../controller/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", usersingup);
router.post("/login", userlogin);

//protected routes 
router.post("/logout", verifyJWT, userlogout)

router.post("/refresh-token", refreshaccesstoke);

router.get("/me", verifyJWT, getcurentuser);

// router.post("/admin/add")

// router.get("/getuser",verifyJWT, async (req, res) => {
//     res.send("this is ok")
// })
export default router;