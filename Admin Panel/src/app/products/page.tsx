'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, MoreVertical } from 'lucide-react';

export default function ProductsPage() {
  const [products] = useState([
    { id: 1, name: 'Aashirvaad Shudh Chakki Atta', category: 'Grocery', price: 250, stock: 120, status: 'Active' },
    { id: 2, name: 'Fresh Onion (Pyaz)', category: 'Vegetables', price: 40, stock: 450, status: 'Active' },
    { id: 3, name: 'Amul Taaza Toned Milk', category: 'Dairy', price: 30, stock: 5, status: 'Low Stock' },
    { id: 4, name: 'Fortune Sunlite Refined Sunflower Oil', category: 'Grocery', price: 180, stock: 50, status: 'Active' },
    { id: 5, name: 'Maggi 2-Minute Noodles', category: 'Snacks', price: 14, stock: 0, status: 'Out of Stock' },
  ]);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your store's inventory and product details.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
            Bulk Upload
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center hover:bg-green-700 transition shadow-md">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
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
              placeholder="Search products by name or SKU..." 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-bold">Product Name</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Stock</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg mr-3 dark:bg-gray-600"></div>
                    {product.name}
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">₹{product.price}</td>
                  <td className="px-6 py-4">{product.stock} Units</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition dark:hover:bg-gray-700">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition dark:hover:bg-gray-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between dark:border-gray-700">
          <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1 to 5 of 450 products</span>
          <div className="flex space-x-1">
            <button className="px-3 py-1 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">Prev</button>
            <button className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">1</button>
            <button className="px-3 py-1 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">2</button>
            <button className="px-3 py-1 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
