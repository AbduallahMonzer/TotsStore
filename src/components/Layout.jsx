import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="brand">
            <img
              src="/assets/Logo.jpg"
              alt="Tots Logo"
              style={{ height: 38, marginRight: 8, verticalAlign: "middle" }}
            />
            <span
              style={{
                fontWeight: 700,
                fontSize: "1.3rem",
                verticalAlign: "middle",
                color: "#72cdfa",
              }}
            >
              <span style={{ fontWeight: 400 }}>Store</span>
            </span>
          </Link>
          <div className="nav-links">
            <Link to="/products">Products</Link>
            <a href="/#contact">Contact us</a>
            <a
              href="https://www.facebook.com/profile.php?id=61557566966686"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} style={{ color: "#3b5998" }} />
            </a>
            <a
              href="https://www.instagram.com/totsstoreofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ marginLeft: 8 }}
            >
              <FaInstagram size={22} style={{ color: "#E1306C" }} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
          }}
        >
          <div style={{ marginTop: 5, display: "flex", gap: 14 }}>
            <a
              href="https://www.facebook.com/profile.php?id=61557566966686"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF size={22} style={{ color: "#3b5998" }} />
            </a>
            <a
              href="https://www.instagram.com/totsstoreofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={22} style={{ color: "#E1306C" }} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
