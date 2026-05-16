const features = [
  {
    id: "booking",
    title: "Smart Booking",
    desc: "Reserve your favorite spot in seconds. View real-time availability and choose the perfect desk for your needs.",
    icon: "fa-mobile-screen",
    color: "blue",
  },
  {
    id: "coffee",
    title: "Online Coffee",
    desc: "Order artisanal coffee and snacks directly to your desk without breaking your focus or losing your seat.",
    icon: "fa-mug-hot",
    color: "amber",
  },
  {
    id: "subs",
    title: "Flexible Subs",
    desc: "Choose from daily passes, weekly dedicated desks, or monthly unlimited access to fit your schedule.",
    icon: "fa-calendar-check",
    color: "purple",
  },
  {
    id: "loyalty",
    title: "Loyalty Rewards",
    desc: "Earn points for every booking and coffee order. Redeem them for free hours, drinks, or exclusive perks.",
    icon: "fa-crown",
    color: "rose",
  },
];

export default function Features() {
  return (
    <section className="home-features-section">
      <div className="container">
        <div className="row g-4 home-features-grid">
          {features.map((f) => (
            <div key={f.id} className="col-12 col-sm-6 col-lg-3">
              <div className={`home-feature-card home-feature-${f.color}`}>
                <div className="home-feature-shape"></div>
                <div className="home-feature-icon">
                  <i className={`fa-solid ${f.icon}`}></i>
                </div>
                <h5>{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
