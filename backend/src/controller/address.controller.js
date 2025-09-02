import { Address } from "../models/Address.models.js";


const addaddress = async (req, res) => {
    try {

        const {
            houseno,
            street,
            building,
            socity,
            city,
            pincode
        } = req.body;

        if ([houseno, street, building, socity, city].some(val => !val.trim()) || !pincode) {
            return res.status(400).json({ success: false, message: "all fields are required" })
        }

        const address = await Address.create({
            user: req.user._id,
            houseno,
            street,
            building,
            socity,
            city,
            pincode
        });

        return res.status(200).json({ success: true, massage: "address add successfully", address })

    } catch (error) {
        res.status(500).json({ success: false, message: "server error while add address", error });
    }
};


const getaddress = async (req, res) => {
    try {
        const address = await Address.findOne({ user: req.user._id });

        if (!address) {
            return res.status(400).json({ success: false, message: "please add address" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "server error while add address", error });
    }
}

const deleteaddress=async (req,res)=>{
    try {
        const {id}=req.params;

        const address=await Address.findOne({})

    } catch (error) {
        
    }
}

export { addaddress, getaddress };