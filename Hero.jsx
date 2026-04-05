export default function Hero() {
  return (
    <header className="relative pt-40 pb-48 lg:pt-56 lg:pb-64 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-950 to-slate-950"></div>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full filter blur-[100px]"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[100px]"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[100px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            The Future of Deep Work
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
            Smart Study <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Space</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
            Reserve your seat, order premium coffee, and immerse yourself in a productive environment designed for absolute focus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <button className="group relative px-8 py-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-lg transition-all duration-300 hover:bg-cyan-400 hover:-translate-y-1 overflow-hidden">
              <span className="relative flex items-center justify-center gap-2">
                Book a Seat <i className="fa-solid fa-arrow-right text-sm"></i>
              </span>
            </button>

            <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3">
              <i className="fa-solid fa-mug-hot text-cyan-400"></i> Order Coffee
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block z-10">
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10"></div>
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern Study Space"
              className="w-full h-[600px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <i className="fa-solid fa-wifi"></i>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Gigabit Fiber</p>
                  <p className="text-slate-300 text-xs mt-0.5">Ultra-fast, secure connection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}