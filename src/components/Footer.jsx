import React from "react";
import {
  Linkedin,
  Code,
  Layout,
  BookOpen,
  TrendingUp,
  Shield,
  Database,
  Palette,
  Users,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Side - Main Footer Content */}
          <div className="lg:w-1/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features & Quick Links Combined */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Quick Access
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <a
                    href="/verify"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400"
                  >
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span>Verify</span>
                  </a>
                  <a
                    href="/news"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400"
                  >
                    <Code className="w-4 h-4 text-blue-400" />
                    <span>News</span>
                  </a>
                  <a
                    href="/community"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400"
                  >
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Community</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Creators Section */}
          <div className=" lg:border-l lg:border-gray-800 lg:pl-11">
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-white">
                Meet the Creators
              </h2>
              <p className="text-sm text-gray-400">
                Design and development experts
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Vaibhav's Card */}
              <div className="flex-1 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mb-3">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Layout className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Vaibhav
                  </h3>
                  <p className="text-sm text-blue-400 font-medium">
                    UI/UX Designer
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                  </p>
                  <a
                    href="https://www.linkedin.com/in/vaibhavguptahere-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
              {/* GiriRaj's Card */}
              <div className="flex-1 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1 mb-3">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Database className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Giriraj</h3>
                  <p className="text-sm text-green-400 font-medium">
                    AI/ML Expert
                  </p>
                  <p className="text-xs text-gray-400 mb-2"></p>
                  <a
                    href="https://www.linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

                            {/* Isha's Card */}
                            <div className="flex-1 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1 mb-3">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Database className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Isha</h3>
                  <p className="text-sm text-green-400 font-medium">
                    Backend Developer
                  </p>
                  <p className="text-xs text-gray-400 mb-2"></p>
                  <a
                    href="https://www.linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

                            {/* Nishika's Card */}
                            <div className="flex-1 bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mb-3">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Layout className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Nishika
                  </h3>
                  <p className="text-sm text-blue-400 font-medium">
                    Frontend Developer
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                  </p>
                  <a
                    href="https://www.linkedin.com/in/vaibhavguptahere-/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Trading Education Platform. All
              rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-gray-400">
              <span className="hover:text-blue-400 cursor-pointer">Terms</span>
              <span className="hover:text-blue-400 cursor-pointer">
                Privacy
              </span>
              <span className="hover:text-blue-400 cursor-pointer">
                Disclaimer
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
