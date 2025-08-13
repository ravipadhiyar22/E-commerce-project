import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js"


export const verifyJWT = async (req, res, next) => {
    try {
        const accesstoken = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log("verifyjwt accesstoken", accesstoken);

        if (!accesstoken) {
            return res.status(403).json({ message: "unauthorized" });
        }

        const decoded = jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET);
        console.log("verify jwt decoded data", decoded);
        console.log("varify jwt done");
        req.user = decoded;
        next();

    } catch (error) {
        // if (error.name === "TokenExpiredError") {

        //     return res.status(401).json({ message: "Access token expired" });
        // }
        return res.status(403).json({ message: "unauthorized" });
    }
}