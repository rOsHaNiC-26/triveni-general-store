'use client';

export default function OffersPage() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Offers & Banners</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage promotional banners on the app</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition shadow-sm">
          + Add Banner
        </button>
      </div>

      <div className="text-center text-gray-500 py-12">
        Live banners will appear here.
      </div>
    </div>
  );
}
