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
import wishlistRouter from "./routes/wishlist.routes.js"
import cartrouter from "./routes/cart.routes.js"
import address from "./routes/checkout.routes.js"

//declare routes

//authentication route
app.use("/api/users", userRouter);

//admin product manage route
app.use("/api/products", product);

//user whishlist  route
app.use("/api/wishlist", wishlistRouter);


//user cart rotute
app.use("/api/cart", cartrouter);

//user checkout route
app.use("/api/checkout", address);
export { app };

