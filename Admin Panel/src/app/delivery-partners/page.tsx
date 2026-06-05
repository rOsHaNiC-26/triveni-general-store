'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CheckCircle, XCircle } from 'lucide-react';

export default function DeliveryPartnersPage() {
  const [partners] = useState([
    { id: 'DP-101', name: 'Suresh Kumar', phone: '+91 9876543220', vehicle: 'Bike (DL 10 AA 1111)', status: 'Online', currentOrders: 2, totalDelivered: 450 },
    { id: 'DP-102', name: 'Ramesh Singh', phone: '+91 9876543221', vehicle: 'Scooty (DL 11 BB 2222)', status: 'Offline', currentOrders: 0, totalDelivered: 120 },
    { id: 'DP-103', name: 'Arif Khan', phone: '+91 9876543222', vehicle: 'Bike (UP 16 CC 3333)', status: 'Busy', currentOrders: 3, totalDelivered: 890 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Delivery Partners</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your fleet and track delivery riders in real-time.</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow-md">
          Onboard Partner
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-4 border-b border-gray-100 flex gap-4 dark:border-gray-700">
          <div className="relative w-full max-w-sm">
            <input 
              type="text" 
              placeholder="Search rider by name, ID or vehicle..." 
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-bold">Rider Info</th>
                <th className="px-6 py-4 font-bold">Vehicle Details</th>
                <th className="px-6 py-4 font-bold">Performance</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 dark:text-white">{partner.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ID: {partner.id} | {partner.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-medium dark:text-gray-300">{partner.vehicle}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900 dark:text-white font-medium">{partner.totalDelivered} Total Deliveries</p>
                    <p className="text-xs text-blue-500">{partner.currentOrders} active orders</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full flex w-max items-center ${
                      partner.status === 'Online' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      partner.status === 'Busy' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {partner.status === 'Online' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {partner.status === 'Offline' && <XCircle className="h-3 w-3 mr-1" />}
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button title="Track Live Location" className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition dark:hover:bg-gray-700">
                      <MapPin className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
