import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [mainIndex, setMainIndex] = useState(0);
  const navigate = useNavigate();

  // Handle both images array and single imageUrl
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

  const handleOrderClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/order/${product.id}`);
  };

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
            <b>Color:</b> {product.color || "N/A"}
          </span>
          <span>
            <b>Material:</b> {product.material || "N/A"}
          </span>
          <span>
            <b>Sizes:</b>{" "}
            {product.sizes && product.sizes.length > 0
              ? product.sizes.join(", ")
              : "One Size"}
          </span>
        </div>

        <span
          className="order-btn"
          onClick={handleOrderClick}
          style={{ cursor: "pointer", opacity: 1 }}
        >
          Order Now
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
