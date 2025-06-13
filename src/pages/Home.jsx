import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Home = () => (
  <div>
    <h2>Our Products</h2>
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default Home;
