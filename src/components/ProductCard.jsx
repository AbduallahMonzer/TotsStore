import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <a
        href={`mailto:youremail@example.com?subject=Order: ${encodeURIComponent(
          product.name
        )}&body=I want to order ${product.name} (${
          product.price
        }). Please contact me.`}
        className="order-btn"
      >
        Order Now
      </a>
    </div>
  );
};

export default ProductCard;
