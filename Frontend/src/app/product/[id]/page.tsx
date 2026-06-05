'use client';

import { use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-8 flex items-center justify-center">
            <img src="https://via.placeholder.com/400" alt="Product" className="max-w-full h-auto object-contain mix-blend-multiply" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-sm font-bold text-green-600 mb-2 uppercase tracking-wide">Dairy & Bakery</span>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Sample Product {resolvedParams.id}</h1>
            <p className="text-gray-500 mb-8 text-lg">This is a premium quality product sourced directly from the best farms. Freshness guaranteed!</p>
            
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-black text-gray-900">₹120</span>
              <span className="text-lg text-gray-400 line-through">₹150</span>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl transition shadow-lg shadow-green-200">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
