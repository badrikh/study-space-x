import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link } from "react-router-dom";
import { ArrowUpRight, Coffee, CreditCard, LayoutGrid, Users } from "lucide-react";

const API = "http://localhost:3000/api/admin";

const quickActions = [
  { label: "View Pending Orders", to: "/admin/orders", tone: "cream" },
  { label: "Manage Subscriptions", to: "/admin/subscriptions", tone: "mint" },
  { label: "View AI Analytics", to: "/admin/analytics", tone: "lavender" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalOrders: 0,
    totalMenuItems: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetch(`${API}/statistics`)
      .then(res => res.json())
      .then(data => { if (data.success) setStats(data.data); })
      .catch(err => console.error(err));
  }, []);

  const statCards = [
    { title: "Active Students", value: stats.totalUsers, note: "Total registered users", tone: "blue", icon: Users },
    { title: "Pending Orders", value: stats.totalOrders, note: "Total orders", tone: "amber", icon: Coffee },
    { title: "Active Subscriptions", value: stats.totalBookings, note: "Total bookings", tone: "green", icon: CreditCard },
    { title: "Today's Revenue", value: `$${stats.totalRevenue}`, note: "Total revenue", tone: "violet", icon: ArrowUpRight },
  ];

  const percent = stats.totalBookings > 0 ? Math.round((stats.totalBookings / (stats.totalBookings + 10)) * 100) : 0;

  return (
    <div className="admin-dashboard-page">
      <AdminNavbar />
      <main className="dashboard-content container-fluid px-4 px-xl-5 py-4 py-lg-5">
        <section className="dashboard-hero-copy">
          <h2 className="dashboard-title">Welcome back! Here's what's happening today.</h2>
          <p className="dashboard-subtitle mb-0">Monitor seats, coffee activity, and subscriptions from one clean admin view.</p>
        </section>

        <section className="dashboard-stat-grid">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="dashboard-stat-card" key={card.title}>
                <div className={`dashboard-stat-icon ${card.tone}`}><Icon size={24} /></div>
                <div className="dashboard-stat-value">{card.value}</div>
                <h3 className="dashboard-stat-title">{card.title}</h3>
                <p className="dashboard-stat-note mb-0">{card.note}</p>
              </article>
            );
          })}
        </section>

        <section className="dashboard-lower-grid">
          <article className="dashboard-summary-card">
            <div className="dashboard-section-heading">
              <div className="dashboard-section-icon"><LayoutGrid size={18} /></div>
              <div><h3 className="mb-1">Quick Actions</h3></div>
            </div>
            <div className="dashboard-quick-actions">
              {quickActions.map((action) => (
                <Link key={action.label} to={action.to} className={`dashboard-quick-action ${action.tone}`}>{action.label}</Link>
              ))}
            </div>
          </article>

          <article className="dashboard-occupancy-card">
            <h3>Seat Occupancy</h3>
            <div className="occupancy-ring">
              <div className="occupancy-ring-inner">{percent}%</div>
            </div>
            <p className="occupancy-copy">{stats.totalBookings} bookings total</p>
            <div className="dashboard-progress">
              <div className="dashboard-progress-bar" style={{ width: `${percent}%` }} />
            </div>
            <span className="occupancy-footnote">Steady flow with room for walk-ins</span>
          </article>
        </section>
      </main>
    </div>
  );
}
