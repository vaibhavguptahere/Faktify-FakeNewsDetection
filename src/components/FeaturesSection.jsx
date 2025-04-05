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

const Hero = () => {
  const nav = useNavigate();

  return (
    <div className="mt-0 pt-0 relative min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden flex flex-col items-center justify-center px-6 py-32">
      <Particles />

      <div className="w-full max-w-6xl text-center space-y-16 relative z-10 mt-0 pt-0">
        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-8 text-white tracking-tight">
            How Faktify Works
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="/assets/ai-flow-diagram.png"
              alt="AI Verification Flow"
              className="w-full rounded-xl border border-white/10 shadow-2xl"
            />
            <div className="space-y-5 text-left text-lg text-gray-300">
              <p>
                Faktify uses powerful machine learning models like BERT, SVM,
                and Random Forest to break down each article and find the truth.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Spots dramatic, clickbait, or misleading phrases</li>
                <li>Cross-checks information with verified sources</li>
                <li>
                  Assigns a credibility score based on accuracy and tone
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Steps Section */}
        <div className="grid md:grid-cols-4 gap-6">
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
              icon: <ShieldCheck className="text-green-400 drop-shadow" size={38} />,
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
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Demo Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-xl max-w-2xl mx-auto space-y-6"
        >
          <p className="text-white font-medium text-xl">
            Give it a try 👇
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Paste a headline or news snippet here..."
              className="flex-1 w-full px-5 py-3 rounded-xl bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
              Check Score <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
