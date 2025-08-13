import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectioninstance = await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`);
        console.log(`\n mongodb connect DB host :${connectioninstance.connection.host} and connectioninstance:${connectioninstance}`);

    } catch (error) {
        console.log("database connection error:", error);
        process.exit(1);
    }
}
export default connectDB;