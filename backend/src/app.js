import express, { urlencoded } from "express"
import cors from "cors";
import cookieparser from "cookie-parser"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieparser());


//routes import
import userRouter from "./routes/user.routes.js"
import product from "./routes/product.routes.js"
import cartrouter from "./routes/cart.routes.js"
//declare routes
app.use("/api/users", userRouter);

app.use("/api/products", product);

app.use("/api/cart", cartrouter);
export { app };

