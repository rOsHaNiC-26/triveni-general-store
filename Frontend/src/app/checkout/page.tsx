'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import { useState } from 'react';

export default function CheckoutPage() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <div className="p-4 border-2 border-green-500 rounded-xl bg-green-50">
            <p className="font-bold">Home</p>
            <p className="text-sm text-gray-600">123 Green Street, Tech Park, Bangalore 560001</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2"><span>Subtotal</span><span>₹250</span></div>
          <div className="flex justify-between mb-4 text-green-600"><span>Delivery Fee</span><span>FREE</span></div>
          <div className="flex justify-between font-black text-xl border-t pt-4"><span>Total To Pay</span><span>₹250</span></div>
          
          <button 
            onClick={() => setShowCheckout(true)}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition"
          >
            Proceed to Payment
          </button>
        </div>
      </main>
      <Footer />
      {showCheckout && (
        <CheckoutModal 
          isOpen={showCheckout} 
          onClose={() => setShowCheckout(false)} 
          orderId={999} 
          amount={250} 
        />
      )}
    </div>
  );
}
