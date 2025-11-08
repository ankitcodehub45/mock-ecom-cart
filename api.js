const API = "http://localhost:5000/api";

export async function getProducts() {
  const res = await fetch(`${API}/products`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API}/cart`);
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  await fetch(`${API}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty })
  });
}

export async function removeFromCart(id) {
  await fetch(`${API}/cart/${id}`, { method: "DELETE" });
}

export async function checkout(cartItems) {
  const res = await fetch(`${API}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cartItems })
  });
  return res.json();
}
