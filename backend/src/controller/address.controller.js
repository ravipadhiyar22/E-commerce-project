import { Address } from "../models/Address.models.js";


const addaddress = async (req, res) => {
    try {
        console.log("address sgtart");
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
        const address = await Address.find({ user: req.user._id });

        if (!address) {
            return res.status(400).json({ success: false, message: "please add address" })
        }

        return res.status(200).json({ success: true, message: "adderss finded", address })
    } catch (error) {
        res.status(500).json({ success: false, message: "server error while add address", error });
    }
}

const deleteaddress = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Address.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "address deleted successfully", deleted });

    } catch (error) {
        return res.status(400).json({ success: false, message: "error while delete address", error })
    }
}

export { addaddress, getaddress, deleteaddress };