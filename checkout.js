import express from "express";
import CartItem from "../models/cartModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const receipt = {
    total,
    timestamp: new Date()
  };

  await CartItem.deleteMany();
  res.json(receipt);
});

export default router;
