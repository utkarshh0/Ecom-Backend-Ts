import { Request, Response } from "express";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import User from "../models/userModel";
import { subDays } from "date-fns";

// Create an order
export const createOrder = async (req: Request, res: Response): Promise<any> => {
  const { userId, productId, quantity, orderDate } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({ message: "Product Not Found" });
  }
  console.log(product.stock + " " + quantity)
  if (product.stock < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const order = await Order.create({
    user: userId,
    product: productId,
    quantity,
    orderDate
  });

  product.stock -= quantity;
  await product.save();

  res.status(201).json(order);
};

// Get orders from the last 7 days
export const getRecentOrders = async (_req: Request, res: Response): Promise<any> => {
  const sevenDaysAgo = subDays(new Date(), 7);
  const orders = await Order.find({ orderDate: { $gte: sevenDaysAgo } });
  res.status(200).json(orders);
};

// Get orders of a specific user
export const getUserOrders = async (req: Request, res: Response): Promise<any> => {
  const orders = await Order.find({ user: req.params.userId }).populate("product");
  res.status(200).json(orders);
};
