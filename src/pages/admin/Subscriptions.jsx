import AdminNavbar from "../../components/AdminNavbar";

const stats = [
  { title: "Active Subscriptions", value: "3", valueClass: "text-dark" },
  { title: "Expiring Soon", value: "2", valueClass: "text-warning" },
  { title: "Expired", value: "2", valueClass: "text-danger" },
  { title: "Total Revenue", value: "$245", valueClass: "text-success" },
];

const tabs = [
  { label: "Active (3)", tone: "active-tab", active: true },
  { label: "Expired (2)", tone: "expired-tab", active: false },
];

const subscriptions = [
  {
    name: "Ahmed Ali",
    email: "ahmed.ali@email.com",
    plan: "10-Day Study Pass",
    planClass: "plan-tag-purple",
    periodStart: "3/1/2026",
    periodEnd: "3/15/2026",
    remaining: "9 days",
    status: "Active",
    price: "$45",
  },
  {
    name: "Omar Hassan",
    email: "omar.hassan@email.com",
    plan: "Hourly Package - 20 Hours",
    planClass: "plan-tag-green",
    periodStart: "2/25/2026",
    periodEnd: "3/27/2026",
    remaining: "12 hours",
    status: "Active",
    price: "$30",
  },
  {
    name: "Layla Hassan",
    email: "layla.h@email.com",
    plan: "Hourly Package - 20 Hours",
    planClass: "plan-tag-green",
    periodStart: "3/1/2026",
    periodEnd: "3/31/2026",
    remaining: "18 hours",
    status: "Active",
    price: "$30",
  },
];

export default function AdminSubscriptions() {
  return (
    <div className="subscription-page">
      <AdminNavbar />

      <main className="page-content container-fluid py-4 py-lg-5">
        <section className="hero-copy">
          <h2 className="page-title mb-2">Subscription Management</h2>
          <p className="page-subtitle mb-0">
            Track and manage all student subscriptions
          </p>
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
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.label}
                className={`tab-btn subscription-tab ${tab.tone} ${
                  tab.active ? "active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="search-shell">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search subscriptions..."
            />
          </div>
        </section>

        <section className="table-card mt-4">
          <div className="table-responsive">
            <table className="table align-middle subscription-table mb-0">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>PLAN</th>
                  <th>PERIOD</th>
                  <th>REMAINING</th>
                  <th>STATUS</th>
                  <th>PRICE</th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map((item) => (
                  <tr key={item.email}>
                    <td>
                      <div className="student-name">{item.name}</div>
                      <div className="student-email">{item.email}</div>
                    </td>
                    <td>
                      <span className={`plan-tag ${item.planClass}`}>{item.plan}</span>
                    </td>
                    <td>
                      <div>{item.periodStart}</div>
                      <div className="period-end">to {item.periodEnd}</div>
                    </td>
                    <td>{item.remaining}</td>
                    <td>
                      <span className="status-badge">
                        <span className="status-check">✓</span>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
