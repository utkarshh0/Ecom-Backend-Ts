import { Request, Response } from "express";
import Order from "../models/orderModel";
import Product from "../models/productModel";

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<any> => {
  const { name, category, price, stock } = req.body;
  
  // Validate input
  if (!name || !category || !price || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  // Create a new product
  const product = new Product({
    name,
    category,
    price,
    stock
  });

  await product.save();
  res.status(201).json(product);
};


// Update an existing product
export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { name, category, price, stock } = req.body;
  const productId = req.params.id;

  // Find the product by ID and update
  const product = await Product.findByIdAndUpdate(
    productId,
    { name, category, price, stock },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json(product);
};


// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  const products = await Product.find();
  res.status(200).json(products);
};


// Get Product By Id
export const getProductById = async (req : Request, res: Response): Promise<any> => {
  const productId = req.params.id
  const product = await Product.findById(productId)

  if(!product) return res.status(404).json({ message: "Product not found" });

  res.status(201).json(product);
}

// Get User by products
export const getUsersByProduct = async (req: Request, res: Response): Promise<any> => {
  const productId = req.params.id;

  console.log(productId)
  // Find orders for the specific product
  const orders = await Order.find({ product: productId }).populate("user", "name email");

  if (!orders.length) {
    return res.status(404).json({ message: "No users found for this product" });
  }

  // Extract unique users from orders
  const users = Array.from(new Set(orders.map(order => order.user)));

  res.status(200).json(users);
};

// Get total stock quantity for all products combined
export const getTotalStock = async (req: Request, res: Response) => {
  try {
    // Fetch all products
    const products = await Product.find();

    // Traverse and calculate the total stock
    const totalStock = products.reduce((total, product) => total + product.stock, 0);

    res.status(200).json({ totalStock });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total stock", error });
  }
};