    import multer from "multer";
    // import img from "../../"

    const storage = multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, "../public/temp")
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        }
    )

    export const upload = multer({ storage: storage });