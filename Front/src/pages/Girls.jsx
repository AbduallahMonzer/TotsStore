import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Girls = () => {
  const [girlsProducts, setGirlsProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (p) => p.category && p.category.toLowerCase().includes("girl")
        );
        setGirlsProducts(filtered);
      })
      .catch((err) => console.error("Failed to fetch girls products:", err));
  }, []);

  return (
    <section
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        padding: "2.5em 0 1em 0",
        minHeight: "70vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#ff7d7d",
          fontSize: "2.1rem",
          marginBottom: "32px",
          letterSpacing: "1.2px",
          fontWeight: 700,
        }}
      >
        Girls Collection
      </h2>
      <div className="product-list">
        {girlsProducts.length ? (
          girlsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            No girls products available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Girls;
