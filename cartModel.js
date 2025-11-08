import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  qty: Number
});

export default mongoose.model("CartItem", cartItemSchema);
