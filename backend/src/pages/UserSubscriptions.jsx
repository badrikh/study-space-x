import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const iconClasses = ["first-icon", "featured-icon", "third-icon"];
const cardClasses = ["light-card", "featured-card", "light-card"];
const icons = ["bi bi-cup-hot-fill", "bi bi-book-half", "bi bi-clock-fill"];

const fallbackPlans = [
  {
    name: "Daily Focus Pass",
    description: "Ideal for casual visits and quick studying",
    price: 24,
    features: ["5 days of access", "Up to 6 hours per day", "High-speed Wi-Fi"],
    isBestValue: false,
  },
  {
    name: "Premium Study Pass",
    description: "For serious focus and comfort",
    price: 45,
    oldPrice: 60,
    features: ["10 days of access", "Unlimited daily hours", "Premium seat selection"],
    isBestValue: true,
    discountText: "Save 25%",
  },
  {
    name: "Flexible Hours Pack",
    description: "For students with changing schedules",
    price: 30,
    features: ["20 hours of access", "Valid for 30 days", "Full flexibility"],
    isBestValue: false,
  },
];

const includedPlans = [
  {
    title: "Flexible Cancellation",
    description: "Cancel or modify your plan anytime with no penalties.",
    iconWrapper: "icon-blue",
    icon: "bi bi-check-lg",
  },
  {
    title: "Premium Amenities",
    description: "High-speed Wi-Fi, charging stations, and comfortable seating.",
    iconWrapper: "icon-purple",
    icon: "bi bi-wifi",
  },
  {
    title: "Mobile Access",
    description: "Manage your subscription easily from anywhere.",
    iconWrapper: "icon-green",
    icon: "bi bi-phone",
  },
];

export default function UserSubscriptions() {
  const [plans, setPlans] = useState(fallbackPlans);

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        const response = await fetch(`${API_BASE}/api/subscriptions`);
        const payload = await response.json();

        if (response.ok && !cancelled && payload.data?.length) {
          setPlans(payload.data);
        }
      } catch {
        // Keep the fallback pricing cards if the API is not reachable.
      }
    }

    loadPlans();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <UserNavbar absolute />
      <section className="pricing-section">
        <div className="section-header">
          <p className="mini-title">CHOOSE YOUR PERFECT PLAN</p>
          <h1>Study Cafe Memberships</h1>
          <p className="subtitle">Comfort, focus, and coffee all in one membership.</p>
        </div>

        <div className="banner">
          <div className="banner-text">
            <strong>Student Discount Available!</strong>
            <p>Save up to 20% on subscriptions</p>
          </div>
          <div className="banner-badge">
            <i className="bi bi-tag-fill"></i>
            <span>Limited Offer</span>
          </div>
        </div>

        <div className="pricing-container">
          {plans.map((plan, index) => {
            const isFeatured = plan.isBestValue || index === 1;
            const cardClass = isFeatured ? "featured-card" : cardClasses[index] || "light-card";

            return (
              <div key={plan.id || plan.name} className={`sub-card ${cardClass}`}>
                {isFeatured ? <div className="sub-badge">Best Value</div> : null}
                <div className={`top-icon ${iconClasses[index] || "first-icon"}`}>
                  <i className={icons[index] || "bi bi-book-half"}></i>
                </div>
                <h2>{plan.name}</h2>
                <p className="desc">{plan.description}</p>
                <div className="price-box">
                  {plan.oldPrice ? <span className="old-price">${plan.oldPrice}</span> : null}
                  <div className="price-row">
                    <span className="price">${plan.price}</span>
                    {plan.discountText ? <span className="save-pill">{plan.discountText}</span> : null}
                  </div>
                </div>
                <ul className="feature-list">
                  {(Array.isArray(plan.features) ? plan.features : []).map((feature) => (
                    <li key={feature}>
                      <i className="bi bi-check-circle-fill"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`choose-btn ${cardClass === "featured-card" ? "featured-btn" : ""}`}>
                  Choose Plan
                </button>
                <span className="plan-note">{plan.durationDays ? `${plan.durationDays} days` : "Cancel anytime"}</span>
              </div>
            );
          })}
        </div>

        <section className="included-section">
          <div className="section-header mt-5">
            <p className="mini-title">EVERY PLAN INCLUDES</p>
            <h2>Everything You Need To Stay Productive</h2>
          </div>
          <div className="included-grid">
            {includedPlans.map((item) => (
              <div key={item.title} className="included-item">
                <div className={`included-icon ${item.iconWrapper}`}>
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-5">
          <Link to="/admin/subscriptions" className="btn btn-primary rounded-pill px-4 py-2">
            Go to Admin Subscriptions
          </Link>
        </div>
      </section>
    </>
  );
}
