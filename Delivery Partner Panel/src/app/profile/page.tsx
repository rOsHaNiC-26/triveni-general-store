'use client';

import { Settings, Shield, HelpCircle, ChevronRight, LogOut, Star } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="bg-white px-6 pt-12 pb-8 shadow-sm border-b border-gray-100 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="h-24 w-24 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=suresh" alt="Suresh" className="h-full w-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white flex items-center shadow-sm">
            4.9 <Star className="h-3 w-3 ml-1 fill-white" />
          </div>
        </div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Suresh Kumar</h1>
        <p className="text-sm text-gray-500 font-medium">DP-101 • Hero Splendor (DL 10 AA 1111)</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Banner */}
        <div className="bg-gray-900 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-2xl"></div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Available Balance</p>
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-black text-white">₹3,450</h2>
            <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md">
              Withdraw
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {[
            { icon: Shield, label: 'Vehicle Documents' },
            { icon: Settings, label: 'App Settings' },
            { icon: HelpCircle, label: 'Help & Support' },
          ].map((item, idx) => (
            <button key={item.label} className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition ${idx !== 2 ? 'border-b border-gray-100' : ''}`}>
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <span className="font-bold text-sm text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full bg-red-50 text-red-600 font-bold p-4 rounded-2xl flex justify-center items-center hover:bg-red-100 transition border border-red-100 shadow-sm">
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
}
