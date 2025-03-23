import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  GraduationCap,
  BookOpen,
  Shield,
  Info,
  Wifi,
  Award,
  CheckCircle
} from "lucide-react";
import Particles from "../components/ui/particles";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TradingDisclaimer = ({ onAccept }) => {
  const [isRead, setIsRead] = useState(false);

  const Section = ({ icon: Icon, title, children, variant = 'default' }) => {
    const variants = {
      red: 'bg-red-900/20 border-red-800/50',
      blue: 'bg-blue-900/20 border-blue-800/50',
      yellow: 'bg-yellow-900/20 border-yellow-800/50',
      default: 'bg-gray-800/50'
    };

    return (
      <div className={`rounded-lg p-3 ${variant !== 'default' ? `border ${variants[variant]}` : variants.default}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0" />
          <h2 className="text-sm sm:text-base font-semibold text-white">{title}</h2>
        </div>
        {children}
      </div>
    );
  };

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 z-50">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="w-full max-w-2xl bg-gray-950 rounded-lg border border-gray-700 p-4 space-y-4 shadow-lg"
  >
    <div className="flex items-center gap-2 border-b border-gray-700 pb-3">
      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <div>
        <h1 className="text-lg font-bold text-white">Fake News Disclaimer</h1>
        <p className="text-xs text-gray-400">Please read this carefully before proceeding.</p>
      </div>
    </div>

    <Section icon={BookOpen} title="Platform Overview" variant="blue">
      <p className="text-sm text-gray-200">This platform assists in detecting fake news using AI but does not guarantee 100% accuracy. Users must verify news from credible sources before sharing.</p>
    </Section>

    

    <Section icon={Info} title="Important Notices">
      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300">
        <li>AI predictions are not always accurate.</li>
        <li>Always cross-check news with trusted sources.</li>
        <li>This tool is for educational purposes only and should not be used for critical decisions.</li>
        <li>News flagged as "fake" may not always be misinformation but could require further verification.</li>
      </ul>
    </Section>

    <Section icon={Shield} title="User Responsibility" variant="red">
      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-200">
        <li>Refrain from spreading misinformation.</li>
        <li>Always double-check results before sharing.</li>
        <li>We are not responsible for misuse of this platform.</li>
        <li>AI models are trained on past data and may not detect new forms of misinformation.</li>
      </ul>
    </Section>

    <div className="border-t border-gray-700 pt-3 space-y-3">
      <label className="flex items-start gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={isRead}
          onChange={() => setIsRead(!isRead)}
          className="w-4 h-4 rounded border-gray-500 bg-gray-800 text-blue-400 flex-shrink-0"
        />
        <span className="text-xs text-gray-300 group-hover:text-white">
          I understand that AI-based fake news detection is not 100% accurate and I will verify information independently before sharing.
        </span>
      </label>

      <motion.button
        onClick={onAccept}
        disabled={!isRead}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Accept and Continue
      </motion.button>

      <p className="text-center text-xs text-gray-400">
        By continuing, you agree to use this tool responsibly and verify all information before sharing.
      </p>
    </div>
  </motion.div>
</div>

  );
};


const BitcoinTradingGraph = () => {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    const generateCandles = () => {
      let lastPrice = 50000;
      const newCandles = Array.from({ length: 25 }, (_, index) => {
        const open = lastPrice;
        const volatility = Math.random() * 2000;
        const close = open + (Math.random() > 0.5 ? volatility : -volatility);
        const high = Math.max(open, close) + Math.random() * 1000;
        const low = Math.min(open, close) - Math.random() * 1000;
        const color = close > open ? "green" : "red";
        lastPrice = close;

        return { open, close, high, low, color };
      });
      setCandles(newCandles);
    };

    generateCandles();
    const interval = setInterval(generateCandles, 5000);
    return () => clearInterval(interval);
  }, []);

  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minPrice = Math.min(...candles.map((c) => c.low));

  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <svg viewBox="0 0 2000 300" className="w-full h-full">
        <defs>
          <linearGradient>
            <stop offset="0%" stopColor="rgba(30,40,60,0.3)" />
            <stop offset="100%" stopColor="rgba(30,40,60,0.6)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="2000"
          height="300"
          fill="url(#graphGradient)"
        />
        {candles.map((candle, index) => {
          const x = index * 80 + 40;
          const width = 30;
          const scaleY = 250 / (maxPrice - minPrice);
          const bodyHeight = Math.abs(candle.close - candle.open) * scaleY;
          const bodyY = 300 - (candle.close - minPrice) * scaleY;
          const wickHeight = (candle.high - candle.low) * scaleY;
          const wickY = 300 - (candle.high - minPrice) * scaleY;

          return (
            <g key={index} className="transition-all duration-500 ease-in-out">
              <line
                x1={x}
                y1={wickY}
                x2={x}
                y2={wickY + wickHeight}
                stroke={candle.color === "green" ? "#10B981" : "#EF4444"}
                strokeWidth="3"
              />
              <rect
                x={x - width / 2}
                y={bodyY}
                width={width}
                height={bodyHeight}
                fill={candle.color === "green" ? "#10B981" : "#EF4444"}
                className="transition-all duration-500 ease-in-out"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Hero = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const nav = useNavigate();

  return (
    <>
      {showDisclaimer && (
        <TradingDisclaimer onAccept={() => setShowDisclaimer(false)} />
      )}
      <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center py-40 px-6">
        <Particles
          className="absolute inset-0"
          quantity={50}
          color="#ffffff"
          refresh={false}
        />

        <div className="w-full max-w-4xl text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">
            Breaking News?
            </h1>
            <p className="text-2xl text-gray-300">
            Let’s Check the Facts with AI!
            </p>
            <div className="flex justify-center gap-4 text-gray-300 mt-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>Guarding Truth, One Click at a Time</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>AI-Powered News Verification</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
          <SignInButton afterSignInUrl="/about">
  <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all" onClick={()=>nav('/about')}>
    Start Now <ChevronRight className="ml-2 w-6 h-6" />
  </button>
</SignInButton>

            <SignInButton afterSignInUrl="/services">
  <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-all duration-300" onClick={()=>nav('/services')}>
  <TrendingUp className="mr-2 w-6 h-6" /> Other Services
  </button>
</SignInButton>
          </div>
        </div>

        <div className="mt-16 w-full max-w-6xl relative">
          {/* Aura effect layers */}
          <div className="absolute -inset-1 bg-white/20 rounded-3xl blur-2xl" />
          <div className="absolute -inset-2 bg-white/10 rounded-3xl blur-3xl" />
          <div className="absolute -inset-3 bg-white/5 rounded-3xl blur-3xl" />

        </div>
      </div>
    </>
  );
};

export default Hero;
