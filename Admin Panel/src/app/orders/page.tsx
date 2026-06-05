'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Truck } from 'lucide-react';

export default function OrdersPage() {
  const [orders] = useState([
    { id: 'ORD-54321', customer: 'Rahul Sharma', items: 5, total: 1250, status: 'Pending', date: 'Just now' },
    { id: 'ORD-54320', customer: 'Priya Patel', items: 2, total: 450, status: 'Processing', date: '10 mins ago' },
    { id: 'ORD-54319', customer: 'Amit Kumar', items: 12, total: 3400, status: 'Out for Delivery', date: '35 mins ago' },
    { id: 'ORD-54318', customer: 'Sneha Gupta', items: 1, total: 120, status: 'Delivered', date: '2 hours ago' },
    { id: 'ORD-54317', customer: 'Vikram Singh', items: 4, total: 890, status: 'Cancelled', date: 'Yesterday' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage customer orders and delivery assignments.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 dark:border-gray-700">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Customer</th>
                <th className="px-6 py-4 font-bold">Items</th>
                <th className="px-6 py-4 font-bold">Total Amount</th>
                <th className="px-6 py-4 font-bold">Time</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{order.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.customer}</td>
                  <td className="px-6 py-4">{order.items} Items</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{order.total}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                      order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' :
                      order.status === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' :
                      order.status === 'Out for Delivery' ? 'bg-orange-50 border-orange-200 text-orange-700 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-400' :
                      order.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' :
                      'bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button title="View Details" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition dark:hover:bg-gray-700">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button title="Assign Rider" className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition dark:hover:bg-gray-700">
                        <Truck className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
