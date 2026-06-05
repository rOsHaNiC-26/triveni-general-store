export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex flex-col items-start">
            <span className="text-2xl font-black text-white tracking-tight leading-none">TRIVENI</span>
            <span className="text-xs font-semibold text-green-500 tracking-wider">GENERAL STORE</span>
          </div>
          <p className="text-sm italic text-gray-400">"Har Zarurat, Turant Ghar Tak"</p>
          <p className="text-sm mt-4">Owned by: <strong className="text-white">Ramniwas Beni Chaurasiya</strong></p>
        </div>
        
        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400 transition">Grocery</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Fruits & Veggies</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Snacks & Cold Drinks</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Puja Samagri</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-green-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400 transition">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Download App</h3>
          <p className="text-sm mb-4">Get the best experience on our mobile app.</p>
          <div className="flex space-x-2">
            <div className="bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Triveni General Store. All rights reserved.
      </div>
    </footer>
  );
}
