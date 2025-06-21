import React from "react";
import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Girls from "./pages/Girls";
import Boys from "./pages/Boys";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;
