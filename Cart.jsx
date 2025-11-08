import React, { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../api";

export default function Cart({ onCheckout }) {
  const [cartData, setCartData] = useState({ cart: [], total: 0 });

  const refresh = () => getCart().then(setCartData);

  useEffect(() => {
    refresh();
  }, []);

  const handleRemove = async (id) => {
    await removeFromCart(id);
    refresh();
  };

  return (
    <div style={{ minWidth: 250 }}>
      <h2>Cart</h2>
      {cartData.cart.length === 0 && <p>Cart is empty.</p>}
      {cartData.cart.map((item) => (
        <div key={item._id} style={{ marginBottom: 8 }}>
          {item.name} × {item.qty} = ${item.price * item.qty}
          <button
            onClick={() => handleRemove(item._id)}
            style={{ marginLeft: 8 }}
          >
            ❌
          </button>
        </div>
      ))}
      <h3>Total: ${cartData.total}</h3>
      {cartData.cart.length > 0 && (
        <button onClick={() => onCheckout(cartData.cart)}>Checkout</button>
      )}
    </div>
  );
}
