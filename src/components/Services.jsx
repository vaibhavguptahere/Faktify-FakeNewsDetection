import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const Services_API_KEY = "9a7d6b2eadc841a4aaa0629ae6a9c00e"; // Replace with your API key

const Services = () => {
    useEffect(() => {
      document.title = "Services | Faktify";
    }, []);
  const [Services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("latest Services");
  const [filter, setFilter] = useState("general");
  const [country, setCountry] = useState("us");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [visibleCount, setVisibleCount] = useState(3);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://Servicesapi.org/v2/top-headlines?q=${searchTerm}&category=${filter}&country=${country}&sortBy=${sortBy}&language=en&apiKey=${Services_API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch Services");

      const result = await response.json();
      setServices(result.articles || []);
      setError(null);
      setTrendingTopics(result.articles.map((article) => article.title));
    } catch (err) {
      setError("Failed to load Services. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchServices();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, filter, country, sortBy]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      setSuggestions(
        trendingTopics.filter((topic) =>
          topic.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Trending Services
        </h1>

        {/* Search Bar with Auto-Suggestions */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Services..."
            className="w-full bg-gray-900/50 text-white px-4 py-3 pl-10 rounded-xl border border-gray-800"
          />
          <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
            >
              <X size={20} />
            </button>
          )}

          {suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-gray-800 border border-gray-700 rounded-lg mt-2 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    fetchServices();
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            {["general", "business", "entertainment", "health", "sports", "technology"].map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            {[
              { code: "us", name: "United States" },
              { code: "gb", name: "United Kingdom" },
              { code: "in", name: "India" },
              { code: "ca", name: "Canada" },
              { code: "au", name: "Australia" },
            ].map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            <option value="publishedAt">Newest</option>
            <option value="popularity">Most Popular</option>
            <option value="relevancy">Most Relevant</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-950/20 text-rose-400 p-6 rounded-xl border border-rose-900/50">
            {error}
          </div>
        )}

        {/* Services Results */}
        {loading ? (
          <p className="text-gray-400">Loading Services...</p>
        ) : Services.length === 0 ? (
          <p className="text-gray-400">No Services found.</p>
        ) : (
          <>
            {Services.slice(0, visibleCount).map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 p-6 space-y-2"
              >
                <div className="flex items-center gap-4">
                  {item.source.name && (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}`}
                      alt={item.source.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                </div>

                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                <p className="text-gray-400">{item.description || "No description available"}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  Read More →
                </a>
              </div>
            ))}

            {visibleCount < Services.length && (
              <button
                onClick={loadMore}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-500 transition"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;