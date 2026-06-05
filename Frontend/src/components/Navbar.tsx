'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Location */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex flex-col items-start">
              <span className="text-2xl font-black text-green-600 tracking-tight leading-none">TRIVENI</span>
              <span className="text-xs font-semibold text-gray-500 tracking-wider">GENERAL STORE</span>
            </Link>

            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Deliver to <strong className="text-black">Your Location</strong></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl px-8 hidden md:block">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search 'milk', 'bread', 'puja samagri'..." 
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:bg-white"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-green-500" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/profile" className="text-gray-700 hover:text-green-600 transition flex items-center font-medium">
              <User className="h-6 w-6" />
            </Link>
            
            <Link href="/cart" className="relative p-2 text-white bg-green-600 hover:bg-green-700 rounded-xl transition flex items-center space-x-2 px-3 sm:px-4 shadow-sm hover:shadow-md">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-bold hidden sm:block">My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search 'milk', 'bread'..." 
              className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:bg-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-focus-within:text-green-500" />
          </div>
        </div>
      </div>
    </nav>
  );
}
