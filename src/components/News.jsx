import React, { useState ,useRef} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useEffect } from "react";

const LocationMarker = ({ onLocationSelect }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const place =
          res.data.address.city ||
          res.data.address.town ||
          res.data.address.village ||
          res.data.display_name;
        onLocationSelect(place, [lat, lng]);
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
      }
    },
  });
  return null;
};

const News = () => {
    useEffect(() => {
      document.title = "News | Faktify";
    }, []);
  const [location, setLocation] = useState("");
  const [news, setNews] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // India
  const [markerPos, setMarkerPos] = useState(null);
  const [category, setCategory] = useState("general");
  const newsRef = useRef(null);

  const API_KEY = "9a7d6b2eadc841a4aaa0629ae6a9c00e";


  const scrollToNews = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  

  const fetchNews = async (place, selectedCategory = category) => {
    try {
      const query = selectedCategory === "general" ? place : `${selectedCategory} ${place}`;
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = () => {
    if (location.trim()) {
      fetchNews(location, category);
      scrollToNews();
    }
  };

  const handleMapClick = (place, coords) => {
    setLocation(place);
    setMapCenter(coords);
    setMarkerPos(coords);
    fetchNews(place, category);
    scrollToNews();
  };

  return (
    <div className="p-8 text-white min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="mt-28 text-4xl font-bold mb-8 text-center">🗺 Localized News</h2>

      {/* Location Search Bar */}
      <div className="flex justify-center mb-8 ">
        <input
          type="text"
          placeholder="Enter a location (e.g., Mumbai, New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 rounded-lg w-80 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <MapContainer center={mapCenter} zoom={4} className="h-96 w-full" scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker onLocationSelect={handleMapClick} />
          {markerPos && (
            <Marker position={markerPos}>
              <Popup>
                News for <strong>{location}</strong>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* News List */}
{/* News List */}
<div className="mt-16 px-4" ref={newsRef}>
  <h3 className="text-4xl font-bold text-white mb-10 text-center">
    📰 Top News in <span className="text-blue-500">{location || "your region"}</span>
  </h3>

  {/* Category Filter Buttons */}
  <div className="flex flex-wrap justify-center gap-3 mb-12">
    {["general", "business", "entertainment", "health", "science", "sports", "technology"].map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setCategory(cat);
          if (location.trim()) fetchNews(location, cat);
        }}
        className={`px-5 py-2 text-sm rounded-full transition-all duration-300 font-medium tracking-wide shadow-sm ${
          category === cat
            ? "bg-blue-600 text-white"
            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
        }`}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    ))}
  </div>

  {/* News Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {news.length === 0 ? (
      <p className="text-center text-gray-400 col-span-full">No news found. Try another location.</p>
    ) : (
      news.map((article, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md backdrop-blur-md flex flex-col md:flex-row gap-5 hover:scale-[1.02] transition-transform"
        >
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt="news thumbnail"
              className="w-full md:w-48 h-40 object-cover rounded-lg border border-white/10"
            />
          )}
          <div className="flex flex-col justify-between">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-400 hover:underline"
            >
              {article.title}
            </a>
            <p className="text-gray-300 text-sm mt-2">{article.description}</p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default News;
