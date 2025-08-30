import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import {
    addproduct,
    deleteproduct,
    getallproduct,
    getproductcard,
    singleproduct,
    updateproduct,
    searchproduct
} from "../controller/product.controller.js"
import { authorizeRoles } from "../middlewares/authrole.middleware.js"
const router = express.Router()


router.get("/allproduct", getallproduct);
router.get("/productcard", getproductcard);

router.get("/search", searchproduct);
router.get("/:slug", singleproduct);


//protected routes


//admin routers
router.post("/addproduct",
    verifyJWT,
    authorizeRoles("admin"),
    upload.single("image"),
    addproduct
)
router.put("/update/:id",
    verifyJWT,
    authorizeRoles("admin"),
    upload.single("image"),
    updateproduct
);

router.delete("/deleteproduct/:id",
    verifyJWT,
    authorizeRoles("admin"),
    deleteproduct
)

export default router;