'use client';

export default function ReportsPage() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">View detailed store performance</p>
        </div>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-xl transition shadow-sm">
          Download CSV
        </button>
      </div>

      <div className="text-center text-gray-500 py-12">
        Comprehensive reports will generate here.
      </div>
    </div>
  );
}
