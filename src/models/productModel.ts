import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

export default model("Product", productSchema);
