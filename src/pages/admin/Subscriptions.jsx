import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const API = "http://localhost:3000/api/admin";

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API}/reservations`)
      .then(res => res.json())
      .then(data => { if (data.success) setSubscriptions(data.data); })
      .catch(err => console.error(err));
  }, []);

  const activeSubscriptions = subscriptions.filter(s => s.status === 'confirmed');
  const expiredSubscriptions = subscriptions.filter(s => s.status === 'cancelled');
  const totalRevenue = subscriptions.reduce((sum, s) => sum + (s.Payment?.amount || 0), 0);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesTab = activeTab === 'active' ? sub.status === 'confirmed' : sub.status === 'cancelled';
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = query === "" || sub.User?.name?.toLowerCase().includes(query) || sub.User?.email?.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  const stats = [
    { title: "Active Subscriptions", value: activeSubscriptions.length, valueClass: "text-dark" },
    { title: "Expiring Soon", value: 0, valueClass: "text-warning" },
    { title: "Expired", value: expiredSubscriptions.length, valueClass: "text-danger" },
    { title: "Total Revenue", value: `$${totalRevenue}`, valueClass: "text-success" },
  ];

  return (
    <div className="subscription-page">
      <AdminNavbar />
      <main className="page-content container-fluid py-4 py-lg-5">
        <section className="hero-copy">
          <h2 className="page-title mb-2">Subscription Management</h2>
          <p className="page-subtitle mb-0">Track and manage all student subscriptions</p>
        </section>

        <section className="row g-4 mt-1">
          {stats.map(stat => (
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
              { key: 'active', label: `Active (${activeSubscriptions.length})` },
              { key: 'expired', label: `Expired (${expiredSubscriptions.length})` }
            ].map(tab => (
              <button key={tab.key} type="button"
                className={`tab-btn subscription-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="search-shell">
            <span className="search-icon">⌕</span>
            <input type="text" className="search-input" placeholder="Search subscriptions..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
                {filteredSubscriptions.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="student-name">{item.User?.name || 'Unknown'}</div>
                      <div className="student-email">{item.User?.email || '-'}</div>
                    </td>
                    <td>{new Date(item.booking_date).toLocaleDateString()}</td>
                    <td>{item.Seat?.name_of_room || '-'}</td>
                    <td>
                      <span className="status-badge">
                        <span className="status-check">✓</span>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.Payment ? `$${item.Payment.amount}` : 'N/A'}</td>
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
