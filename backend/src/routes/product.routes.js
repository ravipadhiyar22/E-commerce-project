import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { addproduct, deleteproduct, getallproduct } from "../controller/product.controller.js"
import { authorizeRoles } from "../middlewares/authrole.middleware.js"
const router = express.Router()


router.get("/allproduct", getallproduct);

//protected routes


//admin routers
router.post("/addproduct",
    verifyJWT,
    authorizeRoles("admin"),
    upload.single("image"),
    addproduct
)

router.delete("deleteproduct/:id",
    verifyJWT,
    authorizeRoles("admin"),
    deleteproduct
)

export default router;