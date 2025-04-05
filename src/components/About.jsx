import React, { useState, useEffect } from "react";
import { BookOpen, Shield, Info, CheckCircle, Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  useEffect(() => {
    document.title = "About | Faktify";
  }, []);
  
  const navigate = useNavigate();

  const Section = ({ icon: Icon, title, children, variant = "default" }) => {
    const variants = {
      red: "bg-red-900/40 border-red-700",
      blue: "bg-blue-900/40 border-blue-700",
      yellow: "bg-yellow-900/40 border-yellow-700",
      default: "bg-gray-900/70 border-gray-700"
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`rounded-xl p-6 border shadow-xl transition ${variants[variant]}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <Icon className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        {children}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-black text-white p-8 space-y-10"
    >
      <h1 className="text-5xl font-extrabold mb-6 mt-20 text-center">About Faktify</h1>

      <Section icon={BookOpen} title="Our Mission" variant="blue">
        <p className="text-lg text-gray-300">Faktify leverages AI models to combat misinformation by providing real-time verification and analysis. Our platform empowers users to make informed decisions.</p>
      </Section>

      <Section icon={Shield} title="How It Works" variant="yellow">
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-300">
          <li>AI models analyze news content and provide a credibility score.</li>
          <li>Real-time fact-checking with trusted news databases.</li>
          <li>Interactive scorecards and detailed analysis for each article.</li>
        </ul>
      </Section>

      <Section icon={Info} title="User Guidelines" variant="red">
        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-300">
          <li>Always cross-verify news flagged as false.</li>
          <li>Exercise caution before sharing unverified information.</li>
          <li>Understand that AI predictions are not absolute.</li>
        </ul>
      </Section>

      <Section icon={CheckCircle} title="Why Faktify?">
        <p className="text-lg text-gray-300">We make the internet a more reliable space by effectively combating fake news. Stay informed, stay aware!</p>
      </Section>

      <div className="p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-4">Market Insights</h1>
        <p className="text-gray-300">Stay tuned for insightful analysis and market trends that impact the world around us.</p>
      </div>
    </motion.div>
  );
};

export default AboutSection;