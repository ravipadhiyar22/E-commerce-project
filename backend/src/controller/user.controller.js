import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"

//--------------------------------usersignup controller------------------------------------

const usersingup = async (req, res) => {
    try {
        //get data from body
        const { username, email, password } = req.body;

        //validate field-not empty
        if ([username, email, password].some((value) => !value?.trim())) {
            return res.status(400).json({ message: "all fields are required" });
        }

        //check if user is already exist
        const existinguser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existinguser) {
            return res.status(409).json({ message: "user alread exists please login" });
        }

        //crete new user in database
        const userref = await User.create({
            username,
            email,
            password
        })

        const userobj = userref.toObject();
        delete userobj.password;
        return res.status(201).json({ message: "user successfully created", user: userobj });

    } catch (error) {
        console.log("user controller error", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//--------------------------------userlogin controller------------------------------------


const generateaccesstokenandrefreshtoken = async (user) => {
    try {
        const refreshtoken = user.generateRefreshtoken();
        const accesstoken = user.generateAccesstoken();
        user.refreshToken = refreshtoken;
        await user.save({ validateBeforeSave: false });

        return { accesstoken, refreshtoken };

    } catch (error) {
        console.log("generate access and refresh token error", error);
        throw error
    }
}


const userlogin = async (req, res) => {
    try {
        //get data of user from form
        const { username, email, password } = req.body;

        //check fields is not empty
        if ((!username && !email) || !password?.trim()) {
            return res.status(400).json({ message: "Username or email and password are required" });
        }

        //find user is exists
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (!user) {
            return res.status(404).json({ message: "user not exists" });
        }

        //check if password is correct
        const ispasswordvalid = await user.comparepassword(password)
        if (!ispasswordvalid) {
            return res.status(401).json({ message: "user password incurect" });
        }


        //generate access and refresh token
        const { accesstoken, refreshtoken } = await generateaccesstokenandrefreshtoken(user);

        //options for cookies
        const ONE_DAY = 24 * 60 * 60 * 1000;
        const THIRTY_DAY = 30 * ONE_DAY;
        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"
        }

        //create user obj for send responce
        const userobj = user.toObject();
        delete userobj.password


        res.status(200)
            .cookie("accesstoken", accesstoken, { ...options, maxAge: ONE_DAY })
            .cookie("refreshtoken", refreshtoken, { ...options, maxAge: THIRTY_DAY })
            .json({
                message: "user logged in successfully",
                user: userobj,
                token: accesstoken, refreshtoken,
            })

    } catch (error) {
        console.log("user controller error", error);
        return res.status(500).json({ message: "Internal Server Error while userlogin" });
    }
}


//--------------------------------userlogout controller------------------------------------

const userlogout = async (req, res) => {
    try {
        const userid = req.user._id;
        console.log("logout userid", userid);
        const updateduser = await User.findByIdAndUpdate(userid, { $set: { refreshToken: null } }, { new: true })
        console.log("logout updated user", updateduser);

        //options for  cookies

        const options = {
            httpOnly: true,
            secure: false,
            sameSite: "Strict"

        }

        return res.status(200)
            .clearCookie("accesstoken", options)
            .clearCookie("refreshtoken", options)
            .json({ message: "user logout successfully", user: updateduser })


    } catch (error) {
        console.log("user controller error", error);
        return res.status(500).json({ message: "Internal Server Error while userlogout" });
    }
}

//--------------------------------refreshtoken controller------------------------------------


const refreshaccesstoke = async (req, res) => {

    try {
        //get refreshtoken from cookie
        const refreshtoken = req.cookies.refreshtoken;

        if (!refreshtoken) {
            return res.status(401).json({ message: "Refresh token missing" });
        }

        //decode refreshtoken
        let decodeduser;
        try {
            decodeduser = jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET);

        } catch (error) {
            return res.status(401).json({ message: "Refresh token expired or invalid" });
        }


        //find user in db using decode info
        const user = await User.findById(decodeduser._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        //check if both refreshtoken are not same than throw error
        if (refreshtoken !== user?.refreshToken) {
            return res.status(401).json({ message: "refreshtoken is expired" });
        }

        const newaccesstoken = user.generateAccesstoken();

        const ONE_DAY = 24 * 60 * 60 * 1000;
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: ONE_DAY
        }

        return res.status(200)
            .cookie("accesstoken", newaccesstoken, options)
            .json({ message: "accesstoken is refreshed" });



    } catch (error) {
        console.log("Refresh token controller error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

//--------------------------------getcurentuser controller------------------------------------

const getcurentuser = async (req, res) => {
    try {
        return res.status(200).json({ user: req.user });

    } catch (error) {
        console.log("get current user error:", error);
        return res.status(500).json({ message: "Internal Server Error while get curen user" });
    }
}


export { usersingup, userlogin, userlogout, refreshaccesstoke, getcurentuser };