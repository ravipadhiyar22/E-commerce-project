import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

// import m1 from "../../public/temp"
// CLOUDINARY_URL=cloudinary://185312179622433:ps0II8Oizc-oymEooU1mTT8w81A@ravipadhiyar

cloudinary.config({

    cloud_name: "ravipadhiyar",
    api_key: "185312179622433",
    api_secret: "ps0II8Oizc-oymEooU1mTT8w81A"
});

const uploadfile = async (localpath) => {

    try {

        if (!localpath) return null;

        //upload file on cloudinary
        const res = await cloudinary.uploader.upload(localpath, {
            resource_type: "auto",
        })

        //file upload successfully
        fs.unlink(localpath, (err) => {
            if (err) console.error("Error removing local file:", err);
            else console.log("Local file removed");
        });

        console.log("remove local file");

        return res;
    } catch (error) {

        //remove localfile uploaded by user if upload is failed
        console.log("error while upload on cloudinary", error);

        try {

            if (fs.existsSync(localpath)) {
                fs.unlinkSync(localpath, (err) => {
                    if (err) console.error("Error removing local file:", err);
                    else console.log("Local file removed");
                });

                console.log("temp file removed:", localpath);
            }

        } catch (e) {
            
            console.warn("failed to remove temp file:", e);
        }
        return null;
    }
}
export { uploadfile };