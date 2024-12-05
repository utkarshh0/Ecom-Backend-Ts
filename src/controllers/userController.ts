import { Request, Response } from "express";
import User from "../models/userModel";

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, phone } = req.body;

  // Validate input
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new User({ name, email, phone });
    await user.save();

    // Ensure response is returned
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, unable to create user" });
  }
};

// Update an existing user
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { name, phone } = req.body;
  const userId = req.params.id;

  // Validate input
  if (!name && !phone) {
    return res.status(400).json({ message: "At least one field (name or phone) is required" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user details
    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, unable to update user" });
  }
};

// Get user by ID
export const getUser = async (req: Request, res: Response): Promise<any> => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, unable to fetch user" });
  }
};
