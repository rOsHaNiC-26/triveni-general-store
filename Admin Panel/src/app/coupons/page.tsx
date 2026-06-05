'use client';

export default function CouponsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Coupons</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage discount coupons and promo codes</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition shadow-sm">
          + Create Coupon
        </button>
      </div>

      <div className="text-center text-gray-500 py-12">
        Active coupons will appear here.
      </div>
    </div>
  );
}
