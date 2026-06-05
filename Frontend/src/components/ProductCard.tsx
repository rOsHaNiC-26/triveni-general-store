'use client';

import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, CartItem } from '../store/slices/cartSlice';
import { RootState } from '../store/store';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    discountPrice: number;
    imageUrl: string;
    stock: number;
    category?: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAdd = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      imageUrl: product.imageUrl,
      quantity: 1,
    }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all"
    >
      <Link href={`/product/${product.id}`} className="block relative">
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
            {discountPercentage}% OFF
          </div>
        )}
        <div className="h-40 w-full bg-gray-50 flex items-center justify-center p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=Product"; }}
          />
        </div>
      </Link>
      
      <div className="p-4 flex flex-col h-full">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{product.category?.name || 'Item'}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-2 h-10 hover:text-green-600 transition">{product.name}</h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900">₹{product.discountPrice > 0 ? product.discountPrice : product.price}</span>
            {product.discountPrice > 0 && (
              <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
            )}
          </div>

          <div className="flex-shrink-0">
            {quantityInCart === 0 ? (
              <button 
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className="bg-white text-green-600 border border-green-600 font-bold px-4 py-1.5 rounded-lg hover:bg-green-50 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock <= 0 ? 'OUT' : 'ADD'}
              </button>
            ) : (
              <div className="flex items-center bg-green-600 text-white rounded-lg overflow-hidden shadow-md">
                <button onClick={handleRemove} className="p-1.5 hover:bg-green-700 transition">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-2 font-bold text-sm min-w-[24px] text-center">{quantityInCart}</span>
                <button onClick={handleAdd} className="p-1.5 hover:bg-green-700 transition">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
