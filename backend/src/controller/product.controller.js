import { Product } from "../models/product.models.js";
import { Review } from "../models/review.models.js";
import { uploadfile } from "../utils/claudinary.js";
import { v2 as claudinary } from "cloudinary";


//-------------------------------add product---------------------------------------
const addproduct = async (req, res) => {
    try {
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

//-------------------------------update prouduct---------------------------------------------
const updateproduct = async (req, res) => {
    try {

        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "product not found" });
        }

        const notes = req.body?.notes ? JSON.parse(req.body.notes) : {};
        const details = req.body?.details ? JSON.parse(req.body.details) : {};
        const data = ["name", "price", "selling_price", "description", "stock", "category"];

        for (const fields of data) {
            console.log("fielsd:", req.body[fields]);
            if (req.body[fields] !== undefined && req.body[fields] !== "") {
                product[fields] = req.body[fields];
            }
        }
        if (notes !== undefined && notes !== "") {
            product.notes = notes;
        }

        if (details !== undefined && details !== "") {
            product.details = details;
        }

        const image = req?.file?.path;
        console.log('image', image);
        if (image !== undefined && image !== "") {
            await claudinary.uploader.destroy(product.image_public_id);
            const newimage = await uploadfile(image);
            if (!newimage) {
                return res.status(404).json({ success: false, message: "coudinary image not provided" })
            }
            product.image = newimage.secure_url;
            product.image_public_id = newimage.public_id;
        }

        await product.save();

        return res.status(200).json({ success: true, message: "product update success fully" });


    } catch (error) {
        return res.status(500).json({ success: false, message: "server error while update product" });
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

        //detete image from claudinary
        if (product?.image) {
            await claudinary.uploader.destroy(product.image_public_id);
        }

        //delete data from database
        await Product.findOneAndDelete({ _id: id });

        return res.status(200).json({ message: "product deleted successfully", product });


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

        const productIds = products.map(p => p._id);
        const stats = await Review.aggregate([
            { $match: { product: { $in: productIds } } },
            { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        const map = Object.fromEntries(stats.map(s => [String(s._id), { avg: s.avg, count: s.count }]));
        const withRatings = products.map(p => ({
            ...p,
            averageRating: map[String(p._id)] ? Number(map[String(p._id)].avg || 0) : 0,
            numReviews: map[String(p._id)]?.count || 0
        }));

        return res.status(200).json({ success: true, products: withRatings });
    } catch (error) {
        console.log("error while get all products:", error);
        return res.status(500).json({ message: "error while get all products" });
    }
}

//-------------------------------card data ---------------------------------------

const getproductcard = async (req, res) => {
    try {

        const products = await Product.find().lean().select("-description -notes -details");

        const productIds = products.map(p => p._id);
        const stats = await Review.aggregate([
            { $match: { product: { $in: productIds } } },
            { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        const map = Object.fromEntries(stats.map(s => [String(s._id), { avg: s.avg, count: s.count }]));
        const withRatings = products.map(p => ({
            ...p,
            averageRating: map[String(p._id)] ? Number(map[String(p._id)].avg || 0) : 0,
            numReviews: map[String(p._id)]?.count || 0
        }));

        if (!withRatings) {
            return res.status(401).json({ success: false, message: "can not get product" });
        }

        return res.status(200).json({ success: true, product: withRatings });

    } catch (error) {
        console.log("errro while get card data of product", error);
        return res.status(500).json({ success: false, message: error });
    }
}

//-------------------------------get single product ---------------------------------------

const singleproduct = async (req, res) => {
    try {
        const { slug } = req.params;
        const productdata = await Product.findOne({ slug });
        console.log("this route call");
        if (!productdata) {
            return res.status(401).json({ success: false, message: "can not find prouct" });
        }

        const stats = await Review.aggregate([
            { $match: { product: productdata._id } },
            { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        const averageRating = stats[0]?.avg || 0;
        const numReviews = stats[0]?.count || 0;

        return res.status(200).json({ success: true, productdata: { ...productdata.toObject(), averageRating, numReviews } });

    } catch (error) {
        console.log("error while find single product", error);
        return res.status(500).json({ success: false, message: "error" });
    }
}

//--------------------------------search product -------------------------------------------

const searchproduct = async (req, res) => {
    try {
        console.log("search start");
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, message: "please provide proper name" });
        }
        console.log("query", query);
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { notes: { $regex: query, $options: 'i' } },
                { details: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        }).lean();

        if (!products) {
            return res.status(400).json({ success: false, message: "product not found" });
        }

        const productIds = products.map(p => p._id);
        const stats = await Review.aggregate([
            { $match: { product: { $in: productIds } } },
            { $group: { _id: "$product", avg: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        const map = Object.fromEntries(stats.map(s => [String(s._id), { avg: s.avg, count: s.count }]));
        const withRatings = products.map(p => ({
            ...p,
            averageRating: map[String(p._id)] ? Number(map[String(p._id)].avg || 0) : 0,
            numReviews: map[String(p._id)]?.count || 0
        }));

        return res.status(200).json({
            success: true,
            message: "product find successfully",
            product: withRatings
        });


    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error while find product" });
    }
}

const findname = async (req, res) => {
    try {
        console.log("search start");
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ success: false, message: "please provide proper name" });
        }
        console.log("query", query);
        const product = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
            ]
        }).select("name -_id")
            .limit(5)
            .lean();

        if (!product) {
            return res.status(400).json({ success: false, message: "product not found" });
        }

        return res.status(200).json({
            success: true,
            message: "product find successfully",
            product
        });


    } catch (error) {
        return res.status(500).json({ success: false, message: "internal server error while find product" });
    }
}

// -------------------------------suggested (first 3) products without aggregate -----------------------

const suggestedproducts = async (req, res) => {
    try {
        const products = await Product.find()
            .select("name slug image price selling_price category")
            .limit(3)
            .lean();

        return res.status(200).json({ success: true, products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "failed to load suggestions" });
    }
}
export {
    addproduct,
    deleteproduct,
    getallproduct,
    getproductcard,
    singleproduct,
    updateproduct,
    searchproduct,
    findname,
    suggestedproducts
};