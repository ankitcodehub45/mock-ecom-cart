import React, { useState } from "react";
import { checkout } from "../api";

export default function CheckoutModal({ cartItems, onClose }) {
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await checkout(cartItems);
    setReceipt(data);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 8 }}>
        {!receipt ? (
          <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <input
              placeholder="Name"
              required
              style={{ display: "block", margin: "8px 0", padding: 6 }}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              placeholder="Email"
              required
              style={{ display: "block", margin: "8px 0", padding: 6 }}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <button type="submit">Confirm</button>
            <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <h3>Receipt</h3>
            <p>Total: ${receipt.total}</p>
            <p>{new Date(receipt.timestamp).toLocaleString()}</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
