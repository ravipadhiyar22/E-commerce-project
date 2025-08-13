import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
import connectDB from "./database/index.js";
import { app } from "./app.js";


connectDB().then(() => {
    app.on("error", (error) => {
        console.log("error", error);
        throw error;
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log("app listen at port:", process.env.PORT);
    });
}).catch((error) => {
    console.log("error while db connect", error);
});
















/*
import { DB_NAME } from "./constants";
import mongoose from "mongoose";
(async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log(error);
            throw error;
        });


        app.listen(process.env.PORT, () => {
            console.log("app llisten ");
        });

    } catch (error) {
        console.log("error while db connection", error);
        throw error;
    }
})();
*/

