'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  // Mock Data for charts
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        fill: true,
        label: 'Monthly Revenue (₹)',
        data: [120000, 190000, 150000, 220000, 280000, 310000, 390000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: ['Aashirvaad Atta', 'Fresh Onion', 'Milk', 'Bread', 'Amul Butter'],
    datasets: [
      {
        label: 'Units Sold',
        data: [120, 300, 450, 200, 180],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Revenue', value: '₹3,90,000', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100', trend: '+14% from last month' },
          { title: 'Total Orders', value: '1,450', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+5% from last month' },
          { title: 'Total Customers', value: '890', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+12% from last month' },
          { title: 'Active Products', value: '450', icon: Package, color: 'text-orange-600', bg: 'bg-orange-100', trend: '2 low stock alerts' },
        ].map((widget, idx) => (
          <motion.div 
            key={widget.title}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{widget.title}</p>
                <h3 className="text-2xl font-black text-gray-900 mt-2 dark:text-white">{widget.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${widget.bg} dark:bg-opacity-20`}>
                <widget.icon className={`h-6 w-6 ${widget.color}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 font-medium dark:text-gray-400">{widget.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm col-span-2 dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 dark:text-white">Revenue Overview</h3>
          <div className="h-72">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div 
          variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 dark:text-white">Top Selling Products</h3>
          <div className="h-72">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Low Stock Alerts */}
      <motion.div 
        variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-6 border-b border-gray-100 flex items-center dark:border-gray-700">
          <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Low Stock Alerts</h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {[
            { name: 'Amul Taaza Milk 500ml', stock: 5, status: 'Critical' },
            { name: 'Fortune Sunflower Oil 1L', stock: 12, status: 'Low' },
          ].map((item) => (
            <div key={item.name} className="p-4 flex justify-between items-center hover:bg-gray-50 transition dark:hover:bg-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-100 rounded-lg dark:bg-gray-600"></div>
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Stock left: {item.stock}</p>
                </div>
              </div>
              <button className="text-sm font-bold text-green-600 hover:text-green-700">Restock</button>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
