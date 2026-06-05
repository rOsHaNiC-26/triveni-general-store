'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const API_URL = 'http://localhost:5000/api';

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/products`)
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden shadow-sm mb-12 bg-gradient-to-r from-green-500 to-teal-600 text-white"
        >
          <div className="px-8 py-16 md:py-24 relative z-10 flex flex-col items-start w-full md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Groceries delivered in 10 minutes</h1>
            <p className="text-lg md:text-xl text-green-50 font-medium mb-8">Fresh fruits, vegetables, daily dairy, and more.</p>
            <Link href="/products" className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg inline-block">
              Shop Now
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full hidden md:block opacity-20">
             {/* Decorative pattern could go here */}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {/* Categories Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {categories.map((category) => (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    key={category.id} 
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-3 group-hover:shadow-md transition-all group-hover:border-green-200">
                      <img 
                        src={category.imageUrl} 
                        alt={category.name} 
                        className="max-h-full object-contain"
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=Cat"; }}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 mt-2 text-center leading-tight group-hover:text-green-600">{category.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-6">Trending Near You</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.slice(0, 24).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
