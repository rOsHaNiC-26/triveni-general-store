'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Your Cart</h1>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty!</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link href="/products" className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-green-700 transition">
            Start Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
