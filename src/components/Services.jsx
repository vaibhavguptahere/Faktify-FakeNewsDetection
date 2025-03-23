// export default Portfolio;

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart as PieChartIcon,
  Clock,
  List,
  Calendar,
  Bell,
  Settings,
  Download,
  AlertTriangle,
  Target,
  Zap,
  Banknote,
} from "lucide-react";

const Portfolio = () => {
  const [timeFrame, setTimeFrame] = useState("1D");
  const [showAlerts, setShowAlerts] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("value");
  const [riskLevel, setRiskLevel] = useState("medium");
  const [dashboardData, setDashboardData] = useState({
    stocks: [],
    accountBalance: 0,
    recentActivities: [],
    userInfo: { name: "", email: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://virtual-ventures-2.onrender.com/api/portfolio/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Get performance data based on timeframe
  const getPerformanceData = () => {
    if (!dashboardData?.historicalPerformance) return [];

    switch (timeFrame) {
      case "1D":
        return dashboardData.historicalPerformance.daily.marketPerformance;
      case "1W":
        return dashboardData.historicalPerformance.weekly.marketPerformance;
      case "1M":
        return dashboardData.historicalPerformance.monthly.marketPerformance;
      case "1Y":
        return dashboardData.historicalPerformance.yearly.marketPerformance;
      default:
        return dashboardData.historicalPerformance.daily.marketPerformance;
    }
  };

  const allocationData = dashboardData?.portfolioDetails?.stocks?.map(
    (stock) => ({
      name: `${stock.symbol} (${stock.quantity})`,
      value: stock.quantity * stock.currentPrice,
    })
  );

  const COLORS = [
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F59E0B",
    "#7C3AED",
    "#2563EB",
    "#059669",
    "#DC2626",
    "#D97706",
    "#4F46E5",
    "#0891B2",
    "#BE185D",
    "#9333EA",
    "#CA8A04",
    "#0E7490",
    "#B91C1C",
    "#1D4ED8",
    "#047857",
    "#7E22CE",
  ];

  const TimeFrameButton = ({ frame, active }) => (
    <button
      className={`px-4 py-2 text-sm rounded ${
        active
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
      }`}
      onClick={() => setTimeFrame(frame)}
    >
      {frame}
    </button>
  );

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base text-gray-400">{title}</h3>
        <Icon className={`text-${color}`} size={20} />
      </div>
      <p
        className={`text-2xl font-bold ${
          trend && (trend > 0 ? "text-green-500" : "text-red-500")
        }`}
      >
        {typeof value === "number"
          ? title.includes("Change")
            ? `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
            : `💵${value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`
          : value}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-4 sm:p-6 py-28 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {dashboardData.userInfo.name}'s Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Market is Open • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Wallet */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-green-400 text-2xl sm:text-6xl font-bold mb-2">
            💵{" "}
            {dashboardData.accountSummary.accountBalance.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </h1>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <StatCard
            title="Portfolio Value"
            value={dashboardData.accountSummary.totalPortfolioValue}
            icon={Banknote}
            color="green-500"
          />
          <StatCard
            title="24h Change"
            value={dashboardData.accountSummary.dailyChangePercentage}
            icon={
              dashboardData.accountSummary.dailyChange >= 0
                ? TrendingUp
                : TrendingDown
            }
            trend={dashboardData.accountSummary.dailyChange}
            color="blue-500"
          />
          <StatCard
            title="30d Change"
            value={
              dashboardData.historicalPerformance.monthly.marketPerformance.reduce(
                (acc, curr) => acc + curr.change,
                0
              ) /
              dashboardData.historicalPerformance.monthly.marketPerformance
                .length
            }
            icon={Activity}
            color="purple-500"
          />
          <StatCard
            title="YTD Return"
            value={
              dashboardData.historicalPerformance.yearly.marketPerformance.reduce(
                (acc, curr) => acc + curr.change,
                0
              ) /
              dashboardData.historicalPerformance.yearly.marketPerformance
                .length
            }
            icon={Calendar}
            color="yellow-500"
          />
        </div>

        {/* Portfolio Performance Chart */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold">
              Portfolio Performance
            </h2>
            <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
              <TimeFrameButton frame="1D" active={timeFrame === "1D"} />
              <TimeFrameButton frame="1W" active={timeFrame === "1W"} />
              <TimeFrameButton frame="1M" active={timeFrame === "1M"} />
              <TimeFrameButton frame="1Y" active={timeFrame === "1Y"} />
            </div>
          </div>
          <div className="h-60 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getPerformanceData()}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="symbol" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", border: "none" }}
                  labelStyle={{ color: "#9CA3AF" }}
                />
                <Area
                  type="monotone"
                  dataKey="change"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings and Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Current Holdings */}
          <div className="lg:col-span-2 bg-gray-900 p-4 sm:p-6 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Current Holdings</h2>
              <List size={20} className="text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-800">
                    <th className="text-left py-3">Symbol</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Avg Price</th>
                    <th className="text-right">Current</th>
                    <th className="text-right">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.portfolioDetails.stocks.map((stock) => (
                    <tr key={stock.symbol} className="border-b border-gray-800">
                      <td className="py-3 font-medium">{stock.symbol}</td>
                      <td className="text-right">{stock.quantity}</td>
                      <td className="text-right">
                      💵{stock.buyPrice.toFixed(2)}
                      </td>
                      <td className="text-right">
                      💵{stock.currentPrice.toFixed(2)}
                      </td>
                      <td
                        className={`text-right ${
                          stock.unrealizedGainPercentage >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stock.unrealizedGainPercentage.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/*  Allocation */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Portfolio Allocation
            </h2>
            <div className="h-72 mt-14">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `💵${value.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: "#f9f9f9",
                      border: "1px solid #e0e0e0",
                      borderRadius: "32px",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Recent Activities</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded space-y-2 sm:space-y-0"
              >
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      activity.type === "BUY"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {activity.type}
                  </span>
                  <span className="ml-3 font-medium">
                    {activity.stock.symbol}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-400">
                    {activity.stock.quantity} shares @ 💵{activity.stock.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis and Trading Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Risk Analysis */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <AlertTriangle size={20} className="mr-2 text-yellow-500" />
              Risk Analysis
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400 text-sm">Volatility</div>
                <div className="text-lg font-bold">
                  {dashboardData?.riskAnalysis?.volatility?.toFixed(2)}%
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400 text-sm">
                  Diversification Score
                </div>
                <div className="text-lg font-bold">
                  {dashboardData?.riskAnalysis?.diversificationScore?.toFixed(
                    2
                  )}
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400 text-sm">Portfolio Beta</div>
                <div className="text-lg font-bold">
                  {dashboardData?.riskAnalysis?.portfolioBeta?.toFixed(2)}
                </div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400 text-sm">Sharpe Ratio</div>
                <div className="text-lg font-bold">
                  {dashboardData?.riskAnalysis?.sharpeRatio?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Trading Insights */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Zap size={20} className="mr-2 text-yellow-500" />
              Trading Insights
            </h2>
            <div className="space-y-3">
              {dashboardData.tradingInsights.map((insight, index) => (
                <div key={index} className="bg-gray-800 p-3 rounded">
                  <p className="font-medium">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Target size={20} className="mr-2 text-purple-500" />
              Trading Performance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {Object.entries({
                "Daily Trades":
                  dashboardData.historicalPerformance.daily.totalTrades,
                "Weekly Trades":
                  dashboardData.historicalPerformance.weekly.totalTrades,
                "Profitable Trades":
                  dashboardData.historicalPerformance.monthly.profitableTrades,
                "Monthly Volume": `💵${dashboardData.historicalPerformance.monthly.totalVolume.toFixed(
                  2
                )}`,
                "Best Performer": `${
                  dashboardData?.portfolioDetails?.bestPerformer?.symbol
                } (${dashboardData?.portfolioDetails?.bestPerformer?.unrealizedGainPercentage?.toFixed(
                  2
                )}%)`,
              }).map(([key, value]) => (
                <div key={key} className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400 text-xs sm:text-sm">{key}</div>
                  <div className="text-base sm:text-lg font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
