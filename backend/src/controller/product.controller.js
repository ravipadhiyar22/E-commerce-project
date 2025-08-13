import { Product } from "../models/product.models.js";
import { uploadfile } from "../utils/claudinary.js";
import { v2 as claudinary } from "cloudinary";
// import ok from "

const addproduct = async (req, res) => {
    try {
        console.log("app start");
        const {
            name,
            description,
            price,
            selling_price,
            stock,
            inStock,
            category,

        } = req.body;

        const notes = req.body.notes ? JSON.parse(req.body.notes) : {};
        const details = req.body.details ? JSON.parse(req.body.details) : {};

        //check if required fields is not empty
        if (!name?.trim() || price == null || selling_price == null || stock == null) {
            return res.status(400).json({ message: "please enter requred fields" })
        }

        //get image url from multer and upload in claudinary and get imageurl
        const productlocalimage = req.file.path
        const productimage = await uploadfile(productlocalimage);
        console.log("this is product image", productimage.secure_url);

        //check if image urlnot exists
        if (!productimage) {
            return res.status(400).json({ message: "image is not provided" });
        }

        const productref = await Product.create({
            name,
            description,
            price,
            selling_price,
            image: productimage.secure_url,
            stock,
            inStock,
            notes,
            details,
            category
        })

        return res.status(200).json({
            success: true,
            message: "product add successfully",
            product: productref
        })

    } catch (error) {
        console.log("error while add product", error);
        return res.status(400).json({ message: "error while add prduct" })
    }
}


const deleteproduct = async (req, res) => {
    try {

        const { id } = req.params;

        //find product from database
        const product = await Product.findById(id);

        //check the product
        if (!product) {
            return res.status(400).json({ message: "product not find" });
        }

        console.log("product from params:", product);
        //detete image from claudinary
        if (product?.image) {
            await claudinary.uploader.destroy(product.image)
        }

        //delete data from database
        await Product.findOneAndDelete(id);

        return res.status(200).json({ message: "product deleted successfully" });


    } catch (error) {
        console.log("error while delete the product :", error);
        return res.status(500).json({ message: "server error" })

    }
}


const getallproduct = async (req, res) => {
    try {
        const products = await Product.find().lean();

        if (!products) {
            return res.status(400).json({ message: "product not get from db" })
        }

        return res.status(200).json({ success: true, products })
    } catch (error) {
        console.log("error while get all products:", error);
        return res.status(500).json({ message: "error while get all products" })
    }
}

export { addproduct, deleteproduct,getallproduct };