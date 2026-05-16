import { useState, useEffect } from "react";
import { CheckCircle, Search } from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";

const API = "http://localhost:3000/api/admin";

const money = (value) =>
  `$${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const isActiveStatus = (status = "") =>
  ["active", "confirmed", "pending", "paid"].includes(status.toLowerCase());

const isExpiredStatus = (status = "") =>
  ["cancelled", "canceled", "expired", "completed"].includes(status.toLowerCase());

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const response = await fetch(`${API}/reservations`);
        if (!response.ok) {
          throw new Error("Could not load reservations");
        }

        const data = await response.json();
        const rows = Array.isArray(data) ? data : data.data;
        setSubscriptions(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error(err);
        setError("Subscriptions could not be loaded. Make sure the backend is running on port 3000.");
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const activeSubscriptions = subscriptions.filter((item) => isActiveStatus(item.status));
  const expiredSubscriptions = subscriptions.filter((item) => isExpiredStatus(item.status));
  const totalRevenue = subscriptions.reduce(
    (sum, item) => sum + Number(item.Payment?.amount || item.payment?.amount || item.amount || 0),
    0
  );

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const status = sub.status || "";
    const matchesTab =
      activeTab === "active" ? isActiveStatus(status) : isExpiredStatus(status);
    const query = searchTerm.trim().toLowerCase();
    const name = sub.User?.name || sub.user?.name || sub.name || "";
    const email = sub.User?.email || sub.user?.email || sub.email || "";
    const matchesSearch =
      query === "" ||
      name.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      String(sub.id || "").toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  const stats = [
    { title: "Active Subscriptions", value: activeSubscriptions.length, valueClass: "text-dark" },
    { title: "Pending Review", value: subscriptions.filter((item) => item.status === "pending").length, valueClass: "text-warning" },
    { title: "Expired", value: expiredSubscriptions.length, valueClass: "text-danger" },
    { title: "Total Revenue", value: money(totalRevenue), valueClass: "text-success" },
  ];

  return (
    <div className="subscription-page">
      <AdminNavbar />
      <main className="page-content container-fluid py-4 py-lg-5">
        <section className="hero-copy">
          <h2 className="page-title mb-2">Subscription Management</h2>
          <p className="page-subtitle mb-0">Track and manage all student subscriptions</p>
        </section>

        {error && <div className="alert alert-warning mt-4 mb-0">{error}</div>}

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
            {[
              { key: "active", label: `Active (${activeSubscriptions.length})` },
              { key: "expired", label: `Expired (${expiredSubscriptions.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`tab-btn subscription-tab ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="search-shell">
            <Search className="search-icon" size={18} aria-hidden="true" />
            <input
              type="text"
              className="search-input"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </section>

        <section className="table-card mt-4">
          <div className="table-responsive">
            <table className="table align-middle subscription-table mb-0">
              <thead>
                <tr>
                  <th>STUDENT</th>
                  <th>BOOKING DATE</th>
                  <th>SEAT</th>
                  <th>STATUS</th>
                  <th>PAYMENT</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      Loading subscriptions...
                    </td>
                  </tr>
                )}
                {!loading && filteredSubscriptions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No subscriptions found
                    </td>
                  </tr>
                )}
                {!loading &&
                  filteredSubscriptions.map((item) => {
                    const student = item.User || item.user || {};
                    const payment = item.Payment || item.payment;
                    const bookingDate = item.date || item.booking_date || item.createdAt;

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="student-name">{student.name || item.name || "Unknown"}</div>
                          <div className="student-email">{student.email || item.email || "-"}</div>
                        </td>
                        <td>{bookingDate ? new Date(bookingDate).toLocaleDateString() : "-"}</td>
                        <td>{item.Seat?.seatNumber || item.Seat?.number || item.seatId || item.seat_id || "-"}</td>
                        <td>
                          <span className="status-badge">
                            <CheckCircle className="status-check" size={15} aria-hidden="true" />
                            {item.status || "pending"}
                          </span>
                        </td>
                        <td>{payment ? money(payment.amount) : "N/A"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
