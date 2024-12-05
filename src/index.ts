import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRotues"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to DB and Start Server
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
