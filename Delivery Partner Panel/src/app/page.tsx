'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Navigation, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/components/BottomNav';

export default function DeliveryHome() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)] pb-6">
      {/* Header Panel */}
      <div className={cn(
        "rounded-b-3xl px-6 pt-12 pb-8 shadow-sm transition-colors duration-500",
        isOnline ? "bg-green-600" : "bg-gray-800"
      )}>
        <div className="flex justify-between items-center text-white">
          <div>
            <p className="text-sm opacity-80 font-medium">Welcome back,</p>
            <h1 className="text-2xl font-black tracking-tight">Suresh Kumar</h1>
          </div>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            className={cn(
              "p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
              isOnline ? "bg-white text-green-600" : "bg-white/10 text-white border border-white/20"
            )}
          >
            <Power className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 text-center w-full max-w-xs border border-white/10 shadow-inner">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
            <h2 className="text-xl font-black text-white tracking-widest">
              {isOnline ? "ONLINE" : "OFFLINE"}
            </h2>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Today's Earnings</p>
            <h3 className="text-2xl font-black text-gray-900">₹850</h3>
          </div>
          <div className="text-center border-l border-gray-100">
            <p className="text-xs text-gray-500 font-bold uppercase mb-1">Orders Done</p>
            <h3 className="text-2xl font-black text-gray-900">14</h3>
          </div>
        </div>
      </div>

      {/* Current Task */}
      {isOnline ? (
        <div className="px-6 mt-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Active Order</h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border-l-4 border-l-green-500 p-5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-bl-xl border-b border-l border-green-100">
              ₹65 payout
            </div>
            
            <p className="text-xs font-bold text-gray-400 mb-2">ORD-54319</p>
            
            <div className="flex items-start space-x-3 mb-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-blue-500 flex-shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <div>
                <p className="text-xs font-bold text-gray-500">PICKUP</p>
                <p className="text-sm font-medium text-gray-900 leading-tight">Triveni General Store, Sector 62</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 mb-6">
              <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <div>
                <p className="text-xs font-bold text-gray-500">DROP</p>
                <p className="text-sm font-medium text-gray-900 leading-tight">Flat 402, Block B, Green Valley Apts</p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-gray-200 transition">
                <CheckCircle className="h-4 w-4 mr-2" />
                Delivered
              </button>
              <button className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-gray-800 transition shadow-md">
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="px-6 mt-16 flex flex-col items-center justify-center text-center opacity-60">
          <Clock className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="font-bold text-gray-500">You are Offline</h3>
          <p className="text-sm text-gray-400 max-w-[200px] mt-2">Go online to start receiving delivery requests in your area.</p>
        </div>
      )}
    </div>
  );
}
