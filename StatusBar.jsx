export default function StatusBar() {
  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 -mt-20 sm:-mt-24 z-30">
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">

        <div className="flex items-center gap-5 w-full md:w-auto group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
            <i className="fa-solid fa-door-open text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Current Status</p>
            <p className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Open Now
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

        <div className="flex items-center gap-5 w-full md:w-auto group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
            <i className="fa-solid fa-chair text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Available Seats</p>
            <p className="text-xl font-bold text-slate-900">
              12 <span className="text-slate-400 text-base font-medium mx-1">/</span>
              <span className="text-slate-500 text-lg">30</span>
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>

        <div className="flex items-center gap-5 w-full md:w-auto group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
            <i className="fa-solid fa-volume-xmark text-xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium mb-1">Quiet Hours</p>
            <p className="text-xl font-bold text-slate-900">10 AM - 2 PM</p>
          </div>
        </div>

      </div>
    </div>
  );
}