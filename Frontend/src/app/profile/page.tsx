'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-8">My Profile</h1>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex items-center space-x-6 mb-8">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black text-2xl">
            R
          </div>
          <div>
            <h2 className="text-2xl font-bold">Ramesh Kumar</h2>
            <p className="text-gray-500">+91 9876543210</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
          No recent orders found.
        </div>
      </main>
      <Footer />
    </div>
  );
}
