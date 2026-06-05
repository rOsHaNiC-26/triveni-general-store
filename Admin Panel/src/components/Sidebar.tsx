'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingCart, 
  Users, 
  Truck, 
  Ticket, 
  Tag, 
  BarChart, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Products', icon: Package, path: '/products' },
  { name: 'Categories', icon: Layers, path: '/categories' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Delivery Partners', icon: Truck, path: '/delivery-partners' },
  { name: 'Coupons', icon: Ticket, path: '/coupons' },
  { name: 'Offers', icon: Tag, path: '/offers' },
  { name: 'Reports', icon: BarChart, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();

  return (
    <aside className={`w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 flex flex-col border-r border-gray-800 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-6 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-green-500 tracking-tight leading-none">TRIVENI</h1>
          <p className="text-xs font-semibold text-gray-400 tracking-wider mt-1">ADMIN PANEL</p>
        </div>
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-2">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">Admin User</span>
            <span className="text-xs text-green-500">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
