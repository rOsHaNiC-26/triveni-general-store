'use client';

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-8">Store Settings</h1>
      
      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Store Name</label>
          <input type="text" defaultValue="TRIVENI GENERAL STORE" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Owner Name</label>
          <input type="text" defaultValue="Ramniwas Beni Chaurasiya" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Store Status</label>
          <div className="flex items-center space-x-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-200 w-max">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-bold">Accepting Orders</span>
          </div>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition shadow-sm mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}
