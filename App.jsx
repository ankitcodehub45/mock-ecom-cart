import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🛍️ Mock E-Com Cart</h1>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <ProductList onCartChange={() => {}} />
        <Cart
          onCheckout={(cart) => {
            setCartItems(cart);
            setShowCheckout(true);
          }}
        />
      </div>
      {showCheckout && (
        <CheckoutModal
          cartItems={cartItems}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
