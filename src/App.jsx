import React from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Routes, Route } from "react-router-dom";
import Verify from "./components/Verify";
import News from "./components/News";
import Community from "./components/Community";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/news" element={<News />} />
        <Route path="/services" element={<Community />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;