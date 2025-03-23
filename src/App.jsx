import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import News from "./components/News";
import Services from "./components/Services";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
};

export default App;