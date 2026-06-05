'use client';

import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  amount: number;
}

export default function CheckoutModal({ isOpen, onClose, orderId, amount }: CheckoutModalProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const token = localStorage.getItem('token');
      const orderRes = await axios.post(
        'http://localhost:5000/api/payments/create-order',
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { razorpayOrderId } = orderRes.data;

      // 2. Configure Razorpay Window
      const options = {
        key: 'rzp_test_YourTestKeyId', // Use env var in production
        amount: amount * 100,
        currency: 'INR',
        name: 'Triveni General Store',
        description: `Payment for Order #${orderId}`,
        image: 'https://via.placeholder.com/150?text=Logo',
        order_id: razorpayOrderId,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment Signature on Backend
            await axios.post(
              'http://localhost:5000/api/payments/verify',
              {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Payment Successful!');
            onClose();
          } catch (err) {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: 'Customer Name', // Get from state
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#16a34a', // tailwind green-600
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Could not initiate payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-2">Complete Payment</h2>
            <p className="text-gray-500 mb-6">You are paying for Order #{orderId}</p>
            
            <div className="flex justify-between items-center py-4 border-y border-gray-100 mb-6">
              <span className="font-medium text-gray-700">Total Amount</span>
              <span className="text-2xl font-black text-green-600">₹{amount}</span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-md flex items-center justify-center"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
