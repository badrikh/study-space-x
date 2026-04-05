import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-layer-group text-sm"></i>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Space<span className="text-cyan-400">.</span>
          </span>
        </a>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="text-white">Home</a>
          <a href="#" className="hover:text-white transition-colors">Book Seat</a>
          <a href="#" className="hover:text-white transition-colors">Coffee Shop</a>
          <a href="#" className="hover:text-white transition-colors">Subscriptions</a>
          <a href="#" className="hover:text-white transition-colors">Loyalty</a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Login Button */}
          <Link to="/login">
            <button className="hidden sm:flex items-center gap-2 bg-[#00E5FF] hover:bg-[#00cce6] text-black px-5 py-2.5 rounded-full text-sm font-semibold transition-all">
              Login
            </button>
          </Link>

          {/* Admin Button */}
          <button className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-5 py-2.5 rounded-full text-sm font-medium transition-all">
            <i className="fa-solid fa-shield-halved text-cyan-400"></i>
            Admin Panel
          </button>

        </div>

      </div>
    </nav>
  );
}