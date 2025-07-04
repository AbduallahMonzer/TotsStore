import React from "react";

const Hero = () => (
  <section
    style={{
      padding: "3.5rem 0 2.2rem 0",
      background: "linear-gradient(90deg, #72cdfa 0%, #ffe082 100%)",
      textAlign: "center",
      borderRadius: "0 0 32px 32px",
      marginBottom: "2.4rem",
      boxShadow: "0 2px 12px rgba(114,205,250,0.12)",
    }}
  >
    <img
      src="/assets/Logo.jpg"
      alt="Tots Kids Clothing Logo"
      style={{
        maxWidth: 150,
        marginBottom: 18,
        boxShadow: "0 1.5px 14px #ffe08244",
        borderRadius: "24px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    />
    <h1
      style={{
        fontWeight: 700,
        fontSize: "2.5rem",
        margin: "0 0 0.4em 0",
        color: "#ff7d7d",
        letterSpacing: "2px",
      }}
    >
      Cute, Comfy, and Ready for Fun!
    </h1>
    <p
      style={{
        color: "#333",
        fontWeight: 500,
        fontSize: "1.1em",
        margin: 0,
        letterSpacing: "0.7px",
      }}
    >
      Discover adorable outfits for kids.
      <br />
      Fast delivery. Easy cash or Instapay orders.
    </p>
  </section>
);

export default Hero;
