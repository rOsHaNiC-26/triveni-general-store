'use client';

import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { useSignalR } from '../hooks/useSignalR';

interface LiveTrackingProps {
  orderId: string;
}

export default function LiveTracking({ orderId }: LiveTrackingProps) {
  // In a real app, token would be fetched from Redux or Context
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const { connectionState, riderLocation, orderStatus, notifications } = useSignalR({
    orderId,
    token
  });

  const timelineSteps = ['Pending', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = timelineSteps.indexOf(orderStatus) !== -1 ? timelineSteps.indexOf(orderStatus) : 2;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-2xl mx-auto w-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Order Tracking</h2>
          <p className="text-sm font-medium text-gray-500">Order #{orderId}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          connectionState === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
        }`}>
          {connectionState === 'Connected' ? 'Live' : connectionState}
        </div>
      </div>

      {/* Timeline */}
      <div className="p-8">
        <div className="relative">
          <div className="absolute top-5 left-4 right-4 h-1 bg-gray-200 rounded-full z-0"></div>
          <div 
            className="absolute top-5 left-4 h-1 bg-green-500 rounded-full z-0 transition-all duration-500"
            style={{ width: `${(currentStepIndex / (timelineSteps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex justify-between">
            {timelineSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isActive = index === currentStepIndex;
              return (
                <div key={step} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm transition-colors ${
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </motion.div>
                  <span className={`text-xs mt-3 font-bold text-center w-20 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Map Area */}
      {orderStatus === 'Out for Delivery' && (
        <div className="relative h-64 bg-blue-50 border-t border-gray-100 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")'
          }}></div>
          
          {riderLocation ? (
            <motion.div 
              animate={{ x: riderLocation.lng * 1000 % 100, y: riderLocation.lat * 1000 % 100 }}
              transition={{ type: 'spring', stiffness: 50 }}
              className="absolute z-10"
            >
              <div className="bg-white p-2 rounded-full shadow-xl border-2 border-green-500">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
            </motion.div>
          ) : (
            <div className="z-10 flex flex-col items-center">
              <MapPin className="h-8 w-8 text-green-500 animate-bounce mb-2" />
              <p className="font-bold text-gray-700">Connecting to Rider's GPS...</p>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-gray-50 p-4 max-h-32 overflow-y-auto border-t border-gray-100">
          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Live Updates</p>
          <div className="space-y-2">
            {notifications.map((note, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-700 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                {note}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
