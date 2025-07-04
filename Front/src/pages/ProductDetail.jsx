// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useOrderOpnForm } from "../hooks/userOrderOpnForm";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const orderWithOpnForm = useOrderOpnForm();

  const product = products.find((p) => String(p.id) === String(id));
  const images = product?.images || (product?.image ? [product.image] : []);
  const [mainIndex, setMainIndex] = useState(0);

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Product not found</h2>
        <button className="order-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  function handleOrderClick() {
    orderWithOpnForm({
      "Product Name": product.name,
      "Product Price": product.price,
      Color: product.color,
      // Add any more hidden fields you set in OpnForm
    });
  }

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "2.5em auto",
        padding: "1.5em 1.2em",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px #eee",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3em" }}>
        <div style={{ flex: "0 0 350px", minWidth: 280 }}>
          <img
            src={images[mainIndex]}
            alt={product.name}
            style={{
              width: 330,
              maxWidth: "90vw",
              borderRadius: 14,
              border: "2.5px solid #ffe082",
              boxShadow: "0 3px 18px #ffe08244",
            }}
          />
          {images.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 16,
                justifyContent: "center",
              }}
            >
              {images.map((img, idx) => (
                <img
                  key={img}
                  src={img}
                  alt={`thumb-${idx}`}
                  style={{
                    width: 54,
                    height: 54,
                    objectFit: "cover",
                    borderRadius: 7,
                    border:
                      mainIndex === idx
                        ? "2px solid #72cdfa"
                        : "1.5px solid #eee",
                    cursor: "pointer",
                    opacity: mainIndex === idx ? 1 : 0.72,
                    transition: "border 0.14s, opacity 0.13s",
                  }}
                  onClick={() => setMainIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h2 style={{ color: "#ff7d7d", fontSize: "1.4em" }}>
            {product.name}
          </h2>
          <p style={{ marginBottom: 18 }}>{product.description}</p>
          <div style={{ marginBottom: 6 }}>
            <b>Price:</b> {product.price}
          </div>
          <div style={{ marginBottom: 6 }}>
            <b>Color:</b> {product.color} &nbsp; <b>Material:</b>{" "}
            {product.material}
          </div>
          <div style={{ marginBottom: 6 }}>
            <b>Sizes:</b> {product.sizes && product.sizes.join(", ")}
          </div>
          <div style={{ margin: "2em 0 0.7em 0" }}>
            <button
              className="order-btn"
              style={{ fontSize: "1.14em", marginTop: 10 }}
              onClick={handleOrderClick}
            >
              Order Now
            </button>
          </div>
          <button
            className="order-btn"
            style={{
              background: "#eee",
              color: "#333",
              marginTop: 10,
              fontSize: "0.98em",
            }}
            onClick={() => navigate(-1)}
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
