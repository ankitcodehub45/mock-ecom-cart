import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

const mockProducts = [
  { name: "T-Shirt", price: 25 },
  { name: "Sneakers", price: 75 },
  { name: "Jeans", price: 50 },
  { name: "Cap", price: 15 },
  { name: "Jacket", price: 90 }
];

router.get("/seed", async (_, res) => {
  await Product.deleteMany();
  await Product.insertMany(mockProducts);
  res.json({ message: "Seeded mock products" });
});

router.get("/", async (_, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
