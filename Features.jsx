const features = [
  { id: "booking", title: "Smart Booking", desc: "Reserve your favorite spot in seconds. View real-time availability and choose the perfect desk for your needs.", icon: "fa-mobile-screen", bg: "blue" },
  { id: "coffee",  title: "Online Coffee",  desc: "Order artisanal coffee and snacks directly to your desk without breaking your focus or losing your seat.", icon: "fa-mug-hot", bg: "amber" },
  { id: "subs",   title: "Flexible Subs",  desc: "Choose from daily passes, weekly dedicated desks, or monthly unlimited access to fit your schedule.", icon: "fa-calendar-check", bg: "purple" },
  { id: "loyalty",title: "Loyalty Rewards",desc: "Earn points for every booking and coffee order. Redeem them for free hours, drinks, or exclusive perks.", icon: "fa-crown", bg: "rose" },
];

const colors = {
  blue:   { bg: "bg-blue-100",   text: "text-blue-600",   hover: "group-hover:bg-blue-600",   corner: "bg-blue-50" },
  amber:  { bg: "bg-amber-100",  text: "text-amber-600",  hover: "group-hover:bg-amber-500",  corner: "bg-amber-50" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "group-hover:bg-purple-600", corner: "bg-purple-50" },
  rose:   { bg: "bg-rose-100",   text: "text-rose-600",   hover: "group-hover:bg-rose-500",   corner: "bg-rose-50" },
};

export default function Features() {
  return (
    <section className="pt-32 pb-24 sm:pt-40 sm:pb-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-cyan-600 tracking-widest uppercase mb-3">Premium Amenities</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything you need to excel</h3>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            Designed for students, freelancers, and remote workers who demand a premium, distraction-free environment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f) => {
            const c = colors[f.bg];
            return (
              <div key={f.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${c.corner} rounded-bl-full -z-10 transition-transform group-hover:scale-110`}></div>
                <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center text-2xl mb-8 ${c.hover} group-hover:text-white transition-colors duration-300`}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h4>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}