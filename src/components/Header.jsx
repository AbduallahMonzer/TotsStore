import React from "react";

const Header = () => {
  return (
    <header>
      <img src="/assets/Logo.jpg" alt="Tots Logo" className="logo-img" />
      <nav>
        <ul>
          <li>
            <a href="#products">Products</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
