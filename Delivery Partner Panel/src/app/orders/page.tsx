'use client';

import { motion } from 'framer-motion';
import { Package, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function OrdersPage() {
  const pastOrders = [
    { id: 'ORD-54318', time: 'Today, 2:30 PM', payout: 45, distance: '2.5 km', status: 'Delivered' },
    { id: 'ORD-54315', time: 'Today, 1:15 PM', payout: 60, distance: '4.1 km', status: 'Delivered' },
    { id: 'ORD-54310', time: 'Today, 11:45 AM', payout: 35, distance: '1.2 km', status: 'Delivered' },
    { id: 'ORD-54290', time: 'Yesterday, 8:30 PM', payout: 80, distance: '5.5 km', status: 'Delivered' },
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Order History</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Review your completed deliveries</p>
      </div>

      <div className="p-6 space-y-4">
        {pastOrders.map((order, idx) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs font-bold text-gray-400">{order.id}</p>
                <div className="flex items-center text-sm font-medium text-gray-900 mt-1">
                  <Clock className="h-3 w-3 text-gray-400 mr-1" /> {order.time}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">₹{order.payout}</p>
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                  PAID
                </span>
              </div>
            </div>

            <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-sm">
              <div className="flex items-center text-gray-500 font-medium">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {order.distance} total
              </div>
              <div className="flex items-center text-green-600 font-bold">
                <CheckCircle className="h-4 w-4 mr-1" />
                {order.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
