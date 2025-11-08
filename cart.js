import express from "express";
import CartItem from "../models/cartModel.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (_, res) => {
  const cart = await CartItem.find();
  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  res.json({ cart, total });
});

router.post("/", async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existing = await CartItem.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
  } else {
    await CartItem.create({
      productId,
      name: product.name,
      price: product.price,
      qty
    });
  }

  res.json({ message: "Added to cart" });
});

router.delete("/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

export default router;

