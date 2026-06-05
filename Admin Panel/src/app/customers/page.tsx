'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Phone, Mail, MapPin } from 'lucide-react';

export default function CustomersPage() {
  const [customers] = useState([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '+91 9876543210', orders: 24, totalSpent: 12500, status: 'Active', joined: 'Jan 2024' },
    { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '+91 9876543211', orders: 5, totalSpent: 2100, status: 'Active', joined: 'Mar 2024' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '+91 9876543212', orders: 1, totalSpent: 450, status: 'Inactive', joined: 'Apr 2024' },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@example.com', phone: '+91 9876543213', orders: 15, totalSpent: 8900, status: 'Active', joined: 'Feb 2024' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your user base and view their order history.</p>
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
              placeholder="Search by name, email, or phone..." 
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
                <th className="px-6 py-4 font-bold">Customer Details</th>
                <th className="px-6 py-4 font-bold">Contact Info</th>
                <th className="px-6 py-4 font-bold">Orders</th>
                <th className="px-6 py-4 font-bold">Total Spent</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer">
                  <td className="px-6 py-4 flex items-center">
                    <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-3 dark:bg-green-900/30 dark:text-green-400">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{customer.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Joined {customer.joined}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center text-xs">
                      <Mail className="h-3 w-3 mr-2" /> {customer.email}
                    </div>
                    <div className="flex items-center text-xs">
                      <Phone className="h-3 w-3 mr-2" /> {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{customer.orders} Orders</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{customer.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {customer.status}
                    </span>
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
