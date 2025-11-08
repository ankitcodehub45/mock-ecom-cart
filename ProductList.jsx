import React, { useEffect, useState } from "react";
import { getProducts, addToCart } from "../api";

export default function ProductList({ onCartChange }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAdd = async (id) => {
    await addToCart(id);
    onCartChange();
  };

  return (
    <div>
      <h2>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem"
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
              textAlign: "center"
            }}
          >
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => handleAdd(p._id)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}
