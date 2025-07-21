import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Universal API URL for Vite/CRA
const BASE_URL =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : typeof process !== "undefined" && process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:5000";

export default function Order() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + `/api/products/${id}`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject("Product not found")
      )
      .then(setProduct)
      .catch(() => setProduct(false));
  }, [id]);

  if (product === false)
    return <div style={{ color: "red" }}>Product not found.</div>;
  if (!product) return <div>Loading...</div>;

  // Collect images from array or fallback to imageUrl
  const images =
    product.images && product.images.length > 0
      ? product.images.map((img) =>
          img.imageUrl.startsWith("/assets/")
            ? img.imageUrl
            : `/assets/${img.imageUrl.replace(/^\/+/, "")}`
        )
      : product.imageUrl
      ? [
          product.imageUrl.startsWith("/assets/")
            ? product.imageUrl
            : `/assets/${product.imageUrl.replace(/^\/+/, "")}`,
        ]
      : [];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus("");
    fetch(BASE_URL + "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        customerAddress: form.address,
        productId: product.id,
        quantity: form.quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSending(false);
        if (data.success) {
          setStatus("Order submitted successfully! Check your email.");
        } else {
          setStatus("Failed to submit order. Please try again.");
        }
      })
      .catch(() => {
        setSending(false);
        setStatus("Error sending order.");
      });
  };

  return (
    <div
      style={{
        maxWidth: 850,
        margin: "40px auto",
        padding: 20,
        borderRadius: 14,
        boxShadow: "0 4px 24px #eee",
        background: "#fff",
        display: "flex",
        gap: 36,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: "0 0 320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={images[mainIndex]}
          alt={product.name}
          style={{
            maxWidth: 310,
            maxHeight: 420,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 10,
            background: "#f6f6f6",
          }}
        />
        {images.length > 1 && (
          <div style={{ marginTop: 10, display: "flex", gap: 7 }}>
            {images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`thumb-${idx}`}
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "cover",
                  borderRadius: 8,
                  border:
                    mainIndex === idx
                      ? "2.5px solid #60c2e1"
                      : "2px solid #eee",
                  cursor: "pointer",
                }}
                onClick={() => setMainIndex(idx)}
              />
            ))}
          </div>
        )}
        <div style={{ marginTop: 18, fontWeight: 500, color: "#1e1e1e" }}>
          <div style={{ fontSize: 19 }}>{product.name}</div>
          <div style={{ color: "#64c3e4", fontSize: 22, fontWeight: 700 }}>
            {product.price} EGP
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 260 }}>
        <h2 style={{ marginBottom: 6 }}>{product.name}</h2>
        <p style={{ color: "#444", marginBottom: 16 }}>{product.description}</p>
        <div
          className="product-meta"
          style={{ fontSize: 16, marginBottom: 24 }}
        >
          <div>
            <b>Color:</b> {product.color || "N/A"}
          </div>
          <div>
            <b>Material:</b> {product.material || "N/A"}
          </div>
          <div>
            <b>Sizes:</b>{" "}
            {product.sizes && product.sizes.length > 0
              ? product.sizes.join(", ")
              : "One Size"}
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
          <div style={{ marginBottom: 10 }}>
            <label>Name:</label>
            <input
              required
              type="text"
              value={form.name}
              style={{
                width: "100%",
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Phone:</label>
            <input
              required
              type="tel"
              value={form.phone || ""}
              style={{
                width: "100%",
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Address:</label>
            <textarea
              required
              value={form.address || ""}
              rows={2}
              style={{
                width: "100%",
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Email:</label>
            <input
              required
              type="email"
              value={form.email}
              style={{
                width: "100%",
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Notes:</label>
            <textarea
              required
              value={form.notes || ""}
              rows={2}
              style={{
                width: "100%",
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Quantity:</label>
            <input
              required
              type="number"
              min={1}
              value={form.quantity}
              style={{
                width: 80,
                padding: 7,
                borderRadius: 7,
                border: "1px solid #ddd",
              }}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            style={{
              width: "100%",
              background: "#60c2e1",
              color: "#fff",
              fontWeight: 700,
              fontSize: 19,
              padding: "13px 0",
              border: "none",
              borderRadius: 7,
              cursor: sending ? "not-allowed" : "pointer",
            }}
          >
            {sending ? "Sending..." : `Order for ${product.price} EGP`}
          </button>
        </form>
        <div
          style={{
            marginTop: 14,
            color: status.startsWith("Order") ? "green" : "red",
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
}
