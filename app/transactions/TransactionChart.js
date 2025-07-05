'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TransactionChart({ transactions }) {
  const chartData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    // Group transactions by month and calculate total expenses
    const monthlyData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthName,
          expenses: 0,
          income: 0
        };
      }
      
      if (transaction.type === 'expense') {
        acc[monthKey].expenses += transaction.amount;
      } else {
        acc[monthKey].income += transaction.amount;
      }
      
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(monthlyData)
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA - dateB;
      })
      .slice(-6); // Show last 6 months
  }, [transactions]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-xl p-3 sm:p-4 border border-gray-700 rounded-lg sm:rounded-xl shadow-2xl">
          <p className="font-semibold text-white mb-2 text-sm sm:text-base">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-gray-300 text-xs sm:text-sm">{entry.name}:</span>
              <span className="text-white font-semibold text-xs sm:text-sm">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-800/50 rounded-full mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">No data to display</h3>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto px-4">
          Add some transactions to see your monthly overview with beautiful visualizations.
        </p>
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-72 lg:h-80 ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            stroke="#9CA3AF"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="expenses" 
            fill="#ef4444" 
            radius={[4, 4, 0, 0]}
            name="Expenses"
          />
          <Bar 
            dataKey="income" 
            fill="#22c55e" 
            radius={[4, 4, 0, 0]}
            name="Income"
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 sm:space-x-8 mt-2 sm:mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-300 font-medium">Expenses</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs sm:text-sm text-gray-300 font-medium">Income</span>
        </div>
      </div>
    </div>
  );
} 