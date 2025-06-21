import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const boysProducts = products.filter(
  (p) => p.category && p.category.toLowerCase().includes("boy")
);

const Boys = () => (
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
        color: "#72cdfa",
        fontSize: "2.1rem",
        marginBottom: "32px",
        letterSpacing: "1.2px",
        fontWeight: 700,
      }}
    >
      Boys Collection
    </h2>
    <div className="product-list">
      {boysProducts.length ? (
        boysProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No boys products available yet.</p>
      )}
    </div>
  </section>
);

export default Boys;
