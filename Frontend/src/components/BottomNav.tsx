'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function BottomNav() {
  const pathname = usePathname();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Search', path: '/products', icon: Search },
    { name: 'Cart', path: '/cart', icon: ShoppingCart, count: cartCount },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
            }`}
          >
            <div className="relative">
              <item.icon className={`h-6 w-6 ${isActive ? 'fill-green-100/50' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              {item.count !== undefined && item.count > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1 border border-white">
                  {item.count}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${isActive ? 'font-bold' : ''}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
