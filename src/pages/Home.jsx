import React from "react";
//import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      {/* HERO/BANNER */}
      <section
        style={{
          padding: "0 0 2em 0",
          background: "linear-gradient(90deg, #aee6fc 0%, #ffe082 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            padding: "2.5em 0 1.7em 0",
            textAlign: "center",
          }}
        >
          <img
            src="/assets/Logo.jpg"
            alt="Tots Logo"
            style={{ width: 115, marginBottom: 18 }}
          />
          <h1
            style={{
              fontSize: "2.2rem",
              color: "#ff7d7d",
              margin: "0.5em 0 0.2em 0",
              fontWeight: 700,
            }}
          >
            Cute, Comfy, and Ready for Fun!
          </h1>
          <p style={{ color: "#777", fontSize: "1.12em", marginBottom: 7 }}>
            Discover adorable outfits for kids.
            <br />
            Fast delivery. Easy cash or Instapay orders.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2
          style={{
            textAlign: "center",
            color: "#72cdfa",
            fontWeight: 700,
            fontSize: "1.45em",
            margin: "1.6em 0 1em 0",
            letterSpacing: "0.8px",
          }}
        >
          Shop by Category
        </h2>
        <div className="category-cards">
          <a href="/girls" className="category-card">
            <div className="category-img-wrapper">
              <img
                src="/public/assets/girl avatar.jpg"
                alt="Girls Collection"
              />
            </div>
            <h3 className="category-title girls">Girls Collection</h3>
            <p>Explore cute dresses, tops, and outfits for girls.</p>
            <button className="category-btn">View Collection</button>
          </a>
          <a href="/boys" className="category-card">
            <div className="category-img-wrapper">
              <img src="/public/assets/boy avatar.jpg" alt="Boys Collection" />
            </div>
            <h3 className="category-title boys">Boys Collection</h3>
            <p>Browse comfy t-shirts, pants, and sets for boys.</p>
            <button className="category-btn">View Collection</button>
          </a>
        </div>
      </section>

      <footer
        style={{
          background: "#f7f7f7",
          marginTop: "3em",
          fontSize: ".96em",
          color: "#999",
          textAlign: "center",
          padding: "1.7em 0 0.8em 0",
        }}
      >
        © 2025 Tots Kids Clothing. All rights reserved.
      </footer>
    </main>
  );
}
