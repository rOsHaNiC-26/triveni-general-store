'use client';

import { Bell, Search, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [isDarkMode, setIsDarkMode] = useState(false); // In a real app, bind to Context/Redux

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30 transition-colors dark:bg-gray-900 dark:border-gray-800">
      
      <div className="flex items-center flex-1">
        <button 
          onClick={onMenuClick}
          className="mr-4 p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden dark:hover:bg-gray-800"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <input 
            type="text" 
            placeholder="Search orders, products, customers..." 
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition dark:hover:bg-gray-800"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="relative p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-gray-900"></span>
        </button>
      </div>

    </header>
  );
}
