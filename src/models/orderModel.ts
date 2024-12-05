import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderDate: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
});

export default model("Order", orderSchema);
