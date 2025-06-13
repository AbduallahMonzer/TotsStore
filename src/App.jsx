import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
