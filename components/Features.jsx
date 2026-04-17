const features = [
  {
    id: "booking",
    title: "Smart Booking",
    desc: "Reserve your favorite spot in seconds.",
    icon: "fa-mobile-screen",
    color: "primary",
  },
  {
    id: "coffee",
    title: "Online Coffee",
    desc: "Order coffee directly to your desk.",
    icon: "fa-mug-hot",
    color: "warning",
  },
  {
    id: "subs",
    title: "Flexible Subs",
    desc: "Daily, weekly or monthly plans.",
    icon: "fa-calendar-check",
    color: "purple",
  },
  {
    id: "loyalty",
    title: "Loyalty Rewards",
    desc: "Earn points and redeem perks.",
    icon: "fa-crown",
    color: "danger",
  },
];

export default function Features() {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-5">
          <h6 className="text-info fw-bold">PREMIUM AMENITIES</h6>
          <h2 className="fw-bold">Everything you need to excel</h2>
          <p className="text-muted">
            Built for productivity and comfort.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {features.map((f) => (
            <div key={f.id} className="col-12 col-sm-6 col-lg-3">

              <div className="card h-100 border-0 shadow-sm p-3 rounded-4 hover-shadow">

                <div className={`text-${f.color} fs-3 mb-3`}>
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>

                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* small hover fix */}
      <style>{`
        .hover-shadow:hover{
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
          transition: 0.3s;
        }
      `}</style>
    </section>
  );
}