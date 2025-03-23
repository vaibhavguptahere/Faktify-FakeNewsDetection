// export default StockTrading;
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const StockTrading = () => {
  // Using a valid MongoDB ObjectId format
  const DEMO_USER_ID = "67993b627ffaaa3842466728";  // This should be replaced with actual user ID after login

  const [dashboardData, setDashboardData] = useState({
    stocks: [],
    accountBalance: 0,
    recentActivities: [],
    userInfo: {}
  });

  const [tradeData, setTradeData] = useState({
    symbol: '',
    quantity: '',
    price: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const stockOptions = [
    { symbol: 'AAPL', price: 50000000, name: 'Apple Inc.' },
    { symbol: 'GOOGL', price: 2750.25, name: 'Alphabet Inc.' },
    { symbol: 'MSFT', price: 350.75, name: 'Microsoft Corp.' },
    { symbol: 'AMZN', price: 3400.50, name: 'Amazon.com Inc.' }
  ];

  const safeFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Server error occurred');
      }

      return await response.json();
    } catch (err) {
      console.error('API Error:', err);
      setError(err?.message || 'An error occurred while processing your request');
      return null;
    }
  };

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await safeFetch(`http://localhost:8000/api/dashboard/${DEMO_USER_ID}`);
      if (data) {
        setDashboardData({
          stocks: data?.stocks || [],
          accountBalance: data?.accountBalance || 0,
          recentActivities: data?.recentActivities || [],
          userInfo: data?.userInfo || {}
        });
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStockSelect = (symbol) => {
    const selectedStock = stockOptions.find(stock => stock.symbol === symbol);
    if (selectedStock) {
      setTradeData(prev => ({
        ...prev,
        symbol: selectedStock.symbol,
        price: selectedStock.price
      }));
      setError(''); // Clear any previous errors
    }
  };

  const handleTrade = async (action) => {
    if (!tradeData.symbol || !tradeData.quantity) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        userId: DEMO_USER_ID,
        symbol: tradeData.symbol,
        quantity: Number(tradeData.quantity),
        price: Number(tradeData.price)
      };

      const data = await safeFetch(
        `http://localhost:8000/api/${action.toLowerCase()}`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      );

      if (data) {
        await fetchDashboard();
        setTradeData({ symbol: '', quantity: '', price: '' });
      }
    } catch (err) {
      console.error('Trade error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !dashboardData.stocks.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Account Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">Account Balance</h2>
        </div>
        <p className="text-3xl font-bold">
          ₹{dashboardData?.accountBalance?.toFixed(2) || '0.00'}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trading Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trade Stocks</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Stock</label>
              <select
                className="w-full p-2 border rounded"
                value={tradeData.symbol}
                onChange={(e) => handleStockSelect(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select a stock</option>
                {stockOptions.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name} ({stock.symbol}) - ₹{stock.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full p-2 border rounded"
                value={tradeData.quantity}
                onChange={(e) => setTradeData(prev => ({ ...prev, quantity: e.target.value }))}
                disabled={isLoading}
              />
            </div>

            {tradeData.symbol && tradeData.quantity && (
              <div className="text-sm text-gray-600">
                Total Value: ₹{(Number(tradeData.quantity) * Number(tradeData.price)).toFixed(2)}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTrade('BUY')}
                disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Buy'}
              </button>

              <button
                onClick={() => handleTrade('SELL')}
                disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Sell'}
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Holdings</h2>
          <div className="overflow-x-auto">
            {dashboardData?.stocks?.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-right p-2">Quantity</th>
                    <th className="text-right p-2">Avg Price</th>
                    <th className="text-right p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.stocks.map((stock) => (
                    <tr key={stock.symbol} className="border-b">
                      <td className="p-2">{stock.symbol}</td>
                      <td className="text-right p-2">{stock.quantity}</td>
                      <td className="text-right p-2">${stock?.buyPrice?.toFixed(2) || '0.00'}</td>
                      <td className="text-right p-2">
                      ₹{((stock?.buyPrice || 0) * (stock?.quantity || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-4">No stocks in portfolio</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {dashboardData?.recentActivities?.length > 0 ? (
            dashboardData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start border-b last:border-0 pb-4">
                {activity?.type === 'BUY' ? (
                  <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
                )}
                <div>
                  <p className="font-medium">{activity?.description}</p>
                  <p className="text-sm text-gray-500">
                    Balance change: ₹{activity?.balanceChange?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTrading;