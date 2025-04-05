import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { useEffect } from "react";

const LocationMarker = ({ onLocationSelect }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const place = res.data.address.city || res.data.address.town || res.data.address.village || res.data.display_name;
        onLocationSelect(place, [lat, lng]);
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
      }
    },
  });
  return null;
};

const Services = () => {
  useEffect(() => {
    document.title = "Services | Faktify";
  }, []);

  const [location, setLocation] = useState("");
  const [news, setNews] = useState([]);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default: India
  const [markerPos, setMarkerPos] = useState(null);

  const API_KEY = "9a7d6b2eadc841a4aaa0629ae6a9c00e"; // Replace with your key

  const fetchNews = async (place) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${place}&apiKey=${API_KEY}`
      );
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = () => {
    if (location.trim()) {
      fetchNews(location);
    }
  };

  const handleMapClick = (place, coords) => {
    setLocation(place);
    setMapCenter(coords);
    setMarkerPos(coords);
    fetchNews(place);
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h2 className="mt-20 text-4xl font-bold mb-8 text-center">🗺️ Localized News</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
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

      {/* Map Section */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-700 mb-8">
        <MapContainer
          center={mapCenter}
          zoom={4}
          className="h-96 w-full"
          scrollWheelZoom={true}
        >
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
      <div className="mt-10">
        <h3 className="text-3xl font-semibold mb-6">📰 News in {location || "your region"}</h3>
        <ul>
          {news.length === 0 ? (
            <p className="text-gray-400">No news found. Try another location.</p>
          ) : (
            news.map((article, index) => (
              <li key={index} className="mb-8 border-b border-gray-700 pb-4">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-lg font-semibold"
                >
                  {article.title}
                </a>
                <p className="text-gray-400 text-sm mt-2">{article.description}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Services;
