// export default StockDetail;
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Clock,
  DollarSign,
  Volume,
} from "lucide-react";

const BASE_URL = "https://virtual-ventures-2.onrender.com/api";

const TIME_RANGES = [
  { label: "1D", value: "1d" },
  { label: "5D", value: "5d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-2 sm:p-3 md:p-4 rounded-lg shadow-lg max-w-[90vw] sm:max-w-xs">
        <p className="text-gray-300 mb-1 text-sm sm:text-base">{label}</p>
        <p className="text-emerald-400 font-mono text-sm sm:text-base md:text-lg">
          ₹{payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  // State Management
  const [stockData, setStockData] = useState(null);
  const [userStocks, setUserStocks] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [tradeType, setTradeType] = useState("buy");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [orderBook, setOrderBook] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("1mo");
  const [chartLoading, setChartLoading] = useState(true);

  // Input validation for quantity
  const handleQuantityChange = (e) => {
    const value = e.target.value;

    // Allow empty string (for backspace) or only numbers
    if (value === "" || /^\d+$/.test(value)) {
      // Remove leading zeros
      const cleanValue = value.replace(/^0+/, "") || "0";
      setQuantity(parseInt(cleanValue));
    }
  };

  // Auth check
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return false;
    }
    return { token, userId };
  }, [navigate]);

  // Dashboard fetch
  const fetchDashboard = useCallback(
    async (token, userId) => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/login");
            return null;
          }
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        return null;
      }
    },
    [navigate]
  );

  const ownedStock = userStocks.reduce(
    (total, stock) =>
      stock.symbol === symbol && !stock.isSold ? total + stock.quantity : total,
    0
  );
  const ownedStockWorth = ownedStock * (stockData?.price ?? 0);

  // Historical data fetch
  const fetchHistoricalData = useCallback(async () => {
    try {
      setChartLoading(true);
      const response = await fetch(
        `${BASE_URL}/stocks/historical/${symbol}?range=${selectedTimeRange}`
      );
      const data = await response.json();

      const processedData = data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        close: item.close,
        volume: item.volume,
        high: item.high,
        low: item.low,
      }));

      setHistoricalData(processedData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    } finally {
      setChartLoading(false);
    }
  }, [symbol, selectedTimeRange]);

  // Order book fetch
  const fetchOrderBook = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/stocks/orderbook/${symbol}`);
      const data = await response.json();
      setOrderBook(data);
    } catch (error) {
      console.error("Error fetching order book:", error);
    }
  }, [symbol]);

  // Main data fetch
  const fetchData = useCallback(async () => {
    const auth = checkAuth();
    if (!auth) return;

    try {
      const stockResponse = await fetch(`${BASE_URL}/stocks?symbols=${symbol}`);
      const stockResult = await stockResponse.json();
      setStockData(stockResult?.[0] ?? null);

      const dashboardData = await fetchDashboard(auth.token, auth.userId);
      if (dashboardData) {
        setUserBalance(dashboardData.accountBalance ?? 0);
        setUserStocks(dashboardData.stocks ?? []);
      }

      await Promise.all([fetchHistoricalData(), fetchOrderBook()]);

      setLoading(false);
    } catch (err) {
      setError(err?.message ?? "An error occurred");
      setLoading(false);
    }
  }, [symbol, checkAuth, fetchDashboard, fetchHistoricalData, fetchOrderBook]);

  // Handle trade
  const handleTrade = async () => {
    const auth = checkAuth();
    if (!auth) return;

    try {
      setOrderStatus(null);
      const { token, userId } = auth;

      if (tradeType === "sell") {
        const userStock = userStocks.find(
          (stock) => stock.symbol === symbol && !stock.isSold
        );
        if (!userStock || userStock.quantity < quantity) {
          throw new Error("Insufficient stock quantity");
        }
      } else if (tradeType === "buy") {
        const totalCost = (stockData?.price ?? 0) * quantity;
        if (totalCost > userBalance) {
          throw new Error("Insufficient balance");
        }
      }

      const response = await fetch(`${BASE_URL}/${tradeType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          symbol,
          quantity,
          price: stockData?.price ?? 0,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message ?? "Trade failed");
      }

      // Immediately fetch updated data after successful trade
      const dashboardData = await fetchDashboard(token, userId);
      if (dashboardData) {
        setUserBalance(dashboardData.accountBalance ?? 0);
        setUserStocks(dashboardData.stocks ?? []);
      }

      setOrderStatus({
        type: "success",
        message: `Successfully ${
          tradeType === "buy" ? "bought" : "sold"
        } ${quantity} shares of ${symbol}`,
      });

      // Reset quantity after successful trade
      setQuantity(0);
    } catch (err) {
      setOrderStatus({
        type: "error",
        message: err?.message ?? "Trade failed",
      });
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    fetchHistoricalData();
  }, [selectedTimeRange, fetchHistoricalData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg">
          Error loading stock data: {error}
        </div>
      </div>
    );
  }

  const totalCost = (stockData?.price ?? 0) * quantity;
  const isPositiveChange = (stockData?.change ?? 0) >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 sm:p-6 py-28  md:py-28">
      <div className="w-full mx-auto px-2 sm:px-4">
        {/* Stock Header */}
        <div className="mb-4 sm:mb-8 bg-gray-800/20 backdrop-blur p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-700/50">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {symbol}
              </h1>
              <p className="text-gray-400 text-base sm:text-lg mt-1">
                {stockData?.name ?? "Loading..."}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                ₹{stockData?.price?.toFixed(2) ?? "0.00"}
              </div>
              <div
                className={`flex text-base sm:text-lg items-center sm:justify-end mt-1 ${
                  isPositiveChange ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isPositiveChange ? (
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                ) : (
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                )}
                <span className="font-mono">
                  {Math.abs(stockData?.change ?? 0).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Charts Section */}
          <div className="col-span-1 lg:col-span-3 bg-gray-800/20 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
              <h2 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Price History
              </h2>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {TIME_RANGES.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedTimeRange(range.value)}
                    className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      selectedTimeRange === range.value
                        ? "bg-blue-600/90 text-white shadow-lg shadow-blue-500/20"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Charts */}
            {chartLoading ? (
              <div className="h-64 sm:h-96 flex items-center justify-center">
                <div className="text-gray-400">Loading chart...</div>
              </div>
            ) : (
              <>
                {/* Price Chart */}
                <div className="h-64 sm:h-96 mb-4 sm:mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalData}>
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" domain={["auto", "auto"]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="close"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Volume Chart */}
                <div className="h-32 sm:h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip />
                      <Bar
                        dataKey="volume"
                        fill="#60A5FA"
                        isAnimationActive={false}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          {/* Trading Section */}
          <div className="col-span-1 bg-gray-800/20 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Place Order
            </h2>

            {orderStatus && (
              <div
                className={`p-3 sm:p-4 mb-4 rounded-lg sm:rounded-xl backdrop-blur text-sm sm:text-base ${
                  orderStatus.type === "success"
                    ? "bg-emerald-900/20 border border-emerald-800/50 text-emerald-400"
                    : "bg-rose-900/20 border border-rose-800/50 text-rose-400"
                }`}
              >
                {orderStatus.message}
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setTradeType("buy")}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all ${
                    tradeType === "buy"
                      ? "bg-emerald-600/90 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType("sell")}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all ${
                    tradeType === "sell"
                      ? "bg-rose-600/90 text-white shadow-lg shadow-rose-500/20"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Sell
                </button>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">
                  Total {tradeType === "buy" ? "Cost" : "Proceeds"}
                </label>
                <div className="flex space-x-2">
                <div className="text-xl">💵</div>
                  <div className="text-xl sm:text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {totalCost.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 bg-gray-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Owned Quantity:</span>
                  <span className="font-mono text-white">{ownedStock}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Current Worth:</span>
                  <span className="font-mono text-white">
                    ₹{ownedStockWorth.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Available Balance:</span>
                  <span className="font-mono text-white">
                    💵{userBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleTrade}
                disabled={
                  loading ||
                  quantity === 0 ||
                  (tradeType === "buy" && totalCost > userBalance) ||
                  (tradeType === "sell" && quantity > ownedStock)
                }
                className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all ${
                  tradeType === "buy"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-rose-600 hover:bg-rose-700"
                } text-white shadow-lg ${
                  tradeType === "buy"
                    ? "shadow-emerald-500/20"
                    : "shadow-rose-500/20"
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
              >
                {tradeType === "buy" ? "Buy" : "Sell"} {symbol}
              </button>
            </div>
          </div>
        </div>

        {/* Market Info and Order Book */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Market Info */}
          <div className="bg-gray-800/20 backdrop-blur rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold mb-6 text-white">Market Info</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Volume</span>
                <span className="font-mono text-white">
                  {(stockData?.volume ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Market Cap</span>
                <span className="font-mono text-white">
                ₹{((stockData?.marketCap ?? 0) / 1e9).toFixed(2)}B
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Exchange</span>
                <span className="font-mono text-white">
                  {stockData?.exchange ?? "NSI"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Day High</span>
                <span className="font-mono text-white">
                ₹{stockData?.dayHigh?.toFixed(2) ?? "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Day Low</span>
                <span className="font-mono text-white">
                ₹{stockData?.dayLow?.toFixed(2) ?? "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Open</span>
                <span className="font-mono text-white">
                ₹{stockData?.open?.toFixed(2) ?? "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Previous Close</span>
                <span className="font-mono text-white">
                ₹{stockData?.previousClose?.toFixed(2) ?? "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-gray-800/20 backdrop-blur rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-xl font-bold mb-6 text-white">Order Book</h2>
            {orderBook ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Bid Side */}
                  <div>
                    <h3 className="text-white mb-3">Bid</h3>
                    <div className="space-y-3 sm:space-y-4 bg-gray-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Price</span>
                        <span className="font-mono text-emerald-400">
                        ₹{orderBook.bid.price?.toFixed(2) ?? "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Size</span>
                        <span className="font-mono text-white">
                          {orderBook.bid.size ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ask Side */}
                  <div>
                    <h3 className="text-white mb-3">Ask</h3>
                    <div className="space-y-3 sm:space-y-4 bg-gray-800/30 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Price</span>
                        <span className="font-mono text-rose-400">
                        ₹{orderBook.ask.price?.toFixed(2) ?? "0.00"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Size</span>
                        <span className="font-mono text-white">
                          {orderBook.ask.size ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Trade Info */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Last Price</span>
                      <span className="font-mono text-white">
                      ₹{orderBook.lastPrice?.toFixed(2) ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Last Size</span>
                      <span className="font-mono text-white">
                        {orderBook.lastSize?.toLocaleString() ?? "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-36 text-gray-400">
                Loading order book data...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
