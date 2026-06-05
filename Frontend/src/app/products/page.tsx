'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const dummyProducts = [
    { id: 1, name: "Fresh Milk", price: 65, discountPrice: 60, imageUrl: "https://via.placeholder.com/150", stock: 10, category: { name: "Dairy" } },
    { id: 2, name: "Whole Wheat Bread", price: 40, discountPrice: 35, imageUrl: "https://via.placeholder.com/150", stock: 5, category: { name: "Bakery" } },
    { id: 3, name: "Farm Eggs (12 pcs)", price: 85, discountPrice: 80, imageUrl: "https://via.placeholder.com/150", stock: 20, category: { name: "Dairy" } },
    { id: 4, name: "Apples (1kg)", price: 120, discountPrice: 110, imageUrl: "https://via.placeholder.com/150", stock: 8, category: { name: "Fruits" } },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-8">All Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {dummyProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
