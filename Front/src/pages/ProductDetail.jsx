import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    let isMounted = true;
    setError(null);
    setProduct(null); // reset product on id change
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product data");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      });

    return () => {
      isMounted = false;
    };
  }, [id, BASE_URL]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

  // Image handling
  const images = product.images?.length
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

  return (
    <section className="product-detail">
      <div className="product-imgs">
        {images.length > 0 ? (
          <>
            <div className="main-img-wrapper">
              <img
                src={images[mainIndex]}
                alt={product.name}
                className="product-img"
                style={{
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "contain",
                  borderRadius: "14px",
                }}
              />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumbnail-${idx}`}
                    className={`product-thumb${
                      mainIndex === idx ? " selected" : ""
                    }`}
                    onClick={() => setMainIndex(idx)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div>No images available.</div>
        )}
      </div>

      <div className="product-content">
        <h2>{product.name}</h2>
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
            {product.sizes?.length ? product.sizes.join(", ") : "One Size"}
          </span>
        </div>
        <button
          className="order-btn"
          onClick={() => navigate(`/order/${product.id}`)}
        >
          Order Now
        </button>
      </div>
    </section>
  );
}
