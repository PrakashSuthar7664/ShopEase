import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/mongoose.js";
import userAuth from "./routes/userAuth.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api/v1/auth", userAuth);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ShopEase");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
