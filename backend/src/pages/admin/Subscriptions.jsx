import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const formatPrice = (value) => `$${Number(value || 0).toFixed(0)}`;

export default function AdminSubscriptions() {
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/subscriptions`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "Failed to load subscriptions");
        }

        if (!cancelled) {
          setPlans(payload.data || []);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPlans();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return plans;

    return plans.filter((plan) =>
      [plan.name, plan.description, plan.discountText]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [plans, search]);

  const activePlans = plans.filter((plan) => plan.isActive);
  const inactivePlans = plans.filter((plan) => !plan.isActive);
  const totalRevenue = activePlans.reduce((sum, plan) => sum + Number(plan.price || 0), 0);

  const stats = [
    { title: "Active Plans", value: activePlans.length, valueClass: "text-dark" },
    { title: "Inactive Plans", value: inactivePlans.length, valueClass: "text-danger" },
    { title: "Best Value Plans", value: plans.filter((plan) => plan.isBestValue).length, valueClass: "text-warning" },
    { title: "Plans Value", value: formatPrice(totalRevenue), valueClass: "text-success" },
  ];

  return (
    <div className="subscription-page">
      <AdminNavbar />

      <main className="page-content container-fluid py-4 py-lg-5">
        <section className="hero-copy">
          <h2 className="page-title mb-2">Subscription Management</h2>
          <p className="page-subtitle mb-0">Track and manage study membership plans</p>
        </section>

        <section className="row g-4 mt-1">
          {stats.map((stat) => (
            <div className="col-12 col-md-6 col-xl-3" key={stat.title}>
              <div className="sub-stat-card">
                <div className="sub-stat-title">{stat.title}</div>
                <div className={`sub-stat-value ${stat.valueClass}`}>{stat.value}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="toolbar-section d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 gap-xl-4 mt-4">
          <div className="tabs-shell subscription-tabs">
            <button type="button" className="tab-btn subscription-tab active-tab active">
              Active ({activePlans.length})
            </button>
            <button type="button" className="tab-btn subscription-tab expired-tab">
              Inactive ({inactivePlans.length})
            </button>
          </div>

          <div className="search-shell">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search subscriptions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </section>

        {error ? <div className="alert alert-danger mt-4">{error}</div> : null}

        <section className="table-card mt-4">
          <div className="table-responsive">
            <table className="table align-middle subscription-table mb-0">
              <thead>
                <tr>
                  <th>PLAN</th>
                  <th>DURATION</th>
                  <th>FEATURES</th>
                  <th>STATUS</th>
                  <th>PRICE</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">Loading subscriptions...</td>
                  </tr>
                ) : filteredPlans.length ? (
                  filteredPlans.map((plan) => (
                    <tr key={plan.id}>
                      <td>
                        <div className="student-name">{plan.name}</div>
                        <div className="student-email">{plan.description}</div>
                      </td>
                      <td>
                        <span className={`plan-tag ${plan.isBestValue ? "plan-tag-purple" : "plan-tag-green"}`}>
                          {plan.durationDays} days
                        </span>
                      </td>
                      <td>{Array.isArray(plan.features) ? plan.features.length : 0} included</td>
                      <td>
                        <span className="status-badge">
                          <span className="status-check">✓</span>
                          {plan.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        {formatPrice(plan.price)}
                        {plan.oldPrice ? <div className="period-end">was {formatPrice(plan.oldPrice)}</div> : null}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No subscription plans found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
