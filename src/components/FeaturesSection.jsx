import React from "react";
import {
  ChevronRight,
  Search,
  FileText,
  ShieldCheck,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Particles from "../components/ui/particles";
import axios from "axios";

function Feature() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckNews = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        text: input,
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setResult({ label: "Error", reason: "Could not reach backend." });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black px-4 sm:px-6 lg:px-12 py-20 text-white mt-0 pt-0">

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-white tracking-tight text-center pb-5">
          How Faktify Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <img
            src="/assets/ai-flow-diagram.png"
            alt="AI Verification Flow"
            className="w-full rounded-xl border border-white/10 shadow-2xl"
          />
          <div className="space-y-4 sm:space-y-5 text-left text-base sm:text-lg text-gray-300">
            <p>
              Faktify uses powerful machine learning models like BERT, SVM, and
              Random Forest to break down each article and find the truth.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Spots dramatic, clickbait, or misleading phrases</li>
              <li>Cross-checks information with verified sources</li>
              <li>Assigns a credibility score based on accuracy and tone</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {[
          {
            icon: <Search className="text-yellow-400 drop-shadow" size={38} />,
            title: "1. Spot a News Article",
            desc: "Come across something suspicious online? Just copy the headline or paragraph.",
          },
          {
            icon: <FileText className="text-blue-400 drop-shadow" size={38} />,
            title: "2. Paste It Here",
            desc: "Drop the copied text into Faktify’s input box and click ‘Check Score’.",
          },
          {
            icon: (
              <ShieldCheck className="text-green-400 drop-shadow" size={38} />
            ),
            title: "3. Let the AI Work",
            desc: "Our smart AI tools go to work—analyzing tone, facts, and credibility.",
          },
          {
            icon: <Rocket className="text-purple-400 drop-shadow" size={38} />,
            title: "4. Get Your Verdict",
            desc: "You’ll get a trust score, verdict, and clear suggestion within seconds.",
          },
        ].map((step, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl text-white shadow-lg space-y-4 transition-all hover:border-white/20"
          >
            <div className="flex justify-center">{step.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
              {step.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 text-center sm:text-left">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white/5 border border-white/10 rounded-3xl shadow-xl backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          📝 Check it now!
        </h2>
        <textarea
          className="w-full bg-black/40 border border-gray-700 placeholder-gray-400 text-white p-4 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste a news article here..."
          rows="6"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button
          className={`w-full font-semibold px-6 py-3 rounded-xl mt-4 transition-all duration-200 ${
            loading
              ? "bg-blue-400/50 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white shadow-md`}
          onClick={handleCheckNews}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check News"}
        </button>

        {/* Result Box */}
        {result && (
          <div className="mt-6 p-5 bg-white/10 border border-white/10 rounded-xl shadow-inner">
            <p className="text-lg text-white">
              <span className="font-bold text-blue-400">📝 Verdict:</span>{" "}
              {result.label}
            </p>
            <p className="mt-2 text-gray-300">
              <span className="font-bold text-blue-300">📌 Reason:</span>{" "}
              {result.reason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feature;
