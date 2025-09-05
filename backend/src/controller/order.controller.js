

const placeorder = async (req, res) => {
    try {

        const { userid, paytype, toatalquantity, total, address } = req.body;


        if ([userid, paytype, address].some(val => !val?.trim()) || total == null) {
            return res.status(400).json({ success: false, message: "all fields are required" })
        }

        console.log("this place order controller", userid, paytype, toatalquantity, total, "tis is affess", address);
        return res.status(200).json({ success: true })


    } catch (error) {
        return res.status(400).json({ success: false, message: "error while place order", error })
    }
}

export { placeorder };