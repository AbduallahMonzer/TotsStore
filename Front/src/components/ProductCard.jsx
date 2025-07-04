import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const images = product.images || (product.image ? [product.image] : []);

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product-img-wrapper">
        <img
          src={images[mainIndex]}
          alt={product.name}
          className="product-img"
        />
      </div>
      {images.length > 1 && (
        <div className="thumbnail-row" onClick={(e) => e.preventDefault()}>
          {images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`thumbnail-${idx}`}
              className={`product-thumb${mainIndex === idx ? " selected" : ""}`}
              onClick={(ev) => {
                ev.stopPropagation();
                setMainIndex(idx);
              }}
            />
          ))}
        </div>
      )}
      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-meta">
          <span>
            <b>Price:</b> {product.price}
          </span>
          <span>
            <b>Color:</b> {product.color}
          </span>
          <span>
            <b>Material:</b> {product.material}
          </span>
          <span>
            <b>Sizes:</b> {product.sizes && product.sizes.join(", ")}
          </span>
        </div>
        <span
          className="order-btn"
          style={{ pointerEvents: "none", opacity: 0.65 }}
        >
          Order Now
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
