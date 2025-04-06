import React, { useState } from "react";
import { Info, ShieldCheck, AlertTriangle } from "lucide-react"; // Optional: Icon pack like lucide-react

const safeDomains = [
  "google.com", "youtube.com", "facebook.com", "twitter.com", "instagram.com", "linkedin.com", "wikipedia.org",
  "amazon.com", "apple.com", "microsoft.com", "netflix.com", "reddit.com", "paypal.com", "github.com", "stackoverflow.com",
  "medium.com", "zoom.us", "whatsapp.com", "slack.com", "quora.com", "dropbox.com", "drive.google.com", "docs.google.com",
  "nytimes.com", "bbc.com", "cnn.com", "forbes.com", "bloomberg.com", "huffpost.com", "buzzfeed.com", "indiatimes.com",
  "ndtv.com", "theguardian.com", "economist.com", "timesofindia.indiatimes.com", "hindustantimes.com", "mint.com",
  "businessinsider.com", "aljazeera.com", "reuters.com", "techcrunch.com", "wired.com", "cnet.com", "verge.com",
  "engadget.com", "mozilla.org", "adobe.com", "oracle.com", "ibm.com", "intel.com", "coursera.org", "udemy.com",
  "edx.org", "khanacademy.org", "nasa.gov", "who.int", "cdc.gov", "nih.gov", "gov.uk", "gov.in", "usa.gov",
  "unsplash.com", "pexels.com", "canva.com", "figma.com", "notion.so", "airbnb.com", "booking.com", "uber.com",
  "ola.com", "swiggy.com", "zomato.com", "flipkart.com", "snapdeal.com", "myntra.com", "ajio.com", "shopify.com",
  "bigbasket.com", "jiomart.com", "hotstar.com", "sonyliv.com", "voot.com", "zee5.com", "primevideo.com", "disneyplus.com",
  "crunchyroll.com", "9anime.to", "vimeo.com", "dailymotion.com", "soundcloud.com", "spotify.com", "gaana.com",
  "wynk.in", "jiosaavn.com", "open.spotify.com", "music.youtube.com", "bilibili.com", "tmz.com", "espn.com",
  "bleacherreport.com", "nba.com", "fifa.com", "icc-cricket.com", "bcci.tv", "cricbuzz.com", "espncricinfo.com"
];

const LinkVerifier = () => {
  const [url, setUrl] = useState("");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  const verifyLink = () => {
    try {
      const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
      const hostname = parsed.hostname.replace(/^www\./, "");
      const isSafe = safeDomains.includes(hostname);

      const info = {
        fullURL: parsed.href,
        origin: parsed.origin,
        hostname: parsed.hostname,
        domain: hostname,
        protocol: parsed.protocol,
        path: parsed.pathname || "/",
        query: parsed.search || "None",
        port: parsed.port || "Default",
        checkedAt: new Date().toLocaleString(),
        isSafe: isSafe
      };

      setDetails(info);
      setError("");
    } catch (err) {
      setError("❌ Invalid URL format");
      setDetails(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="w-full max-w-3xl space-y-10 mt-0 pt-0">
        {/* Header */}
        <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-2">🔗 Link Verifier</h1>
          <p className="text-gray-400 text-sm">
            Check if a URL is from a trusted domain or potentially suspicious
          </p>
        </div>

        {/* How To Use Section */}
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl space-y-3">
          <h2 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
            <Info size={18} /> How to Use
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
            <li>Paste or type any URL in the input box.</li>
            <li>Click on the <span className="text-blue-400 font-medium">Check</span> button.</li>
            <li>We analyze the URL structure and match the domain against a known safe list.</li>
            <li>If it’s a well-known site (like Google, YouTube, etc.), you’ll see a <span className="text-green-400 font-medium">Safe Domain</span> label.</li>
            <li>Otherwise, a <span className="text-red-500 font-medium">Suspicious Domain</span> warning will appear.</li>
          </ul>
        </div>


        {/* Input Section */}
        <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a URL (e.g. https://example.com)"
              className="flex-1 p-4 rounded-lg bg-zinc-800 text-white placeholder-gray-400 border border-zinc-600 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={verifyLink}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Check
            </button>
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        {/* Result Section */}
        {details && (
  <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-2xl space-y-4 text-sm">
    {/* Domain Preview */}
    <div>
      <h3 className="text-blue-400 font-medium mb-1">🔎 Domain Overview:</h3>
      <p>
        You’re checking: <span className="text-white font-semibold">{details.domain}</span>
      </p>
    </div>

    {/* Reputation or Safety Status */}
    <div>
      <h3 className="text-blue-400 font-medium mb-1">📊 Domain Status:</h3>
      {details.isSafe ? (
        <p className="text-green-400 font-bold">✅ Trusted Domain</p>
      ) : (
        <p className="text-red-500 font-bold">❌ Not a Trusted Domain</p>
      )}
      <p className="text-gray-400 text-xs">
        Status is determined based on the domain's presence in the safe list.
      </p>
    </div>
    {details.fullURL.length < 30 && (
      <div>
        <h3 className="text-blue-400 font-medium mb-1">⚠️ Shortened Link Alert:</h3>
        <p className="text-yellow-400">
          This URL appears to be very short. It might be a shortened or masked link.
        </p>
      </div>
    )}

    {/* Expiration Token Detector */}
    {details.query.includes("exp") || details.query.includes("token") ? (
      <div>
        <h3 className="text-blue-400 font-medium mb-1">⏳ Link Expiration Detected:</h3>
        <p className="text-orange-400">
          This link might expire or be valid for a limited time.
        </p>
      </div>
    ) : null}

    {/* Timestamp */}
    <div>
      <h3 className="text-blue-400 font-medium mb-1">🕒 Last Checked:</h3>
      <p className="text-gray-300">{details.checkedAt}</p>
    </div>

    {/* Security Tip */}
    <div className="border-t border-zinc-700 pt-3">
      <h3 className="text-blue-400 font-medium mb-1">🔐 Quick Security Tip:</h3>
      <p className="text-gray-400 text-sm">
        Always hover over links before clicking. Be cautious of unexpected redirects or login prompts.
      </p>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default LinkVerifier;
