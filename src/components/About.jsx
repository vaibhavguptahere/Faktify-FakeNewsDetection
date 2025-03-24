import React, { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const Market = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold"></h1>
      {/* Add Market Data Here */}
      <Footer />
    </div>
  );
};

export default Market;
