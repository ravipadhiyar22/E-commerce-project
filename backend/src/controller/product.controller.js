import { Product } from "../models/product.models.js";
import { uploadfile } from "../utils/claudinary.js";
import { v2 as claudinary } from "cloudinary";


//-------------------------------add product---------------------------------------
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
            return res.status(400).json({ message: "please enter requred fields" });
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
            image_public_id: productimage.public_id,
            stock,
            inStock,
            notes,
            details,
            category
        });

        return res.status(200).json({
            success: true,
            message: "product add successfully",
            product: productref
        });

    } catch (error) {
        console.log("error while add product", error);
        return res.status(400).json({ message: "error while add prduct" });
    }
}

//-------------------------------deleteproduct product---------------------------------------

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
            await claudinary.uploader.destroy(product.image);
        }

        //delete data from database
        await Product.findOneAndDelete(id);

        return res.status(200).json({ message: "product deleted successfully" });


    } catch (error) {
        console.log("error while delete the product :", error);
        return res.status(500).json({ message: "server error" });

    }
}


//-------------------------------get all product---------------------------------------


const getallproduct = async (req, res) => {
    try {
        const products = await Product.find().lean();

        if (!products) {
            return res.status(400).json({ message: "product not get from db" });
        }

        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.log("error while get all products:", error);
        return res.status(500).json({ message: "error while get all products" });
    }
}

//-------------------------------card data ---------------------------------------

const getproductcard = async (req, res) => {
    try {

        const product = await Product.find().lean().select("-description -notes -details");
        // console.log("this is product card:", product);

        if (!product) {
            return res.status(401).json({ success: false, message: "can not get product" });
        }

        return res.status(200).json({ success: true, product });

    } catch (error) {
        console.log("errro while get card data of product", error);
        return res.status(500).json({ success: false, message: error });
    }
}

const singleproduct = async (req, res) => {
    try {
        const { slug } = req.params;
        // console.log("backend sulg",slug);
        const productdata = await Product.findOne({ slug });

        if (!productdata) {
            return res.status(401).json({ success: false, message: "can not find prouct" });
        }

        return res.status(200).json({ success: true, productdata });

    } catch (error) {
        console.log("error while find single product", error);
        return res.status(500).json({ success: false, message: "error" });
    }
}


export { addproduct, deleteproduct, getallproduct, getproductcard, singleproduct };