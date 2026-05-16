import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const API = "http://localhost:3000/api/admin";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API}/orders`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const mapped = data.data.map(order => ({
            id: `ORD-${String(order.id).padStart(3, '0')}`,
            realId: order.id,
            status: order.status || 'pending',
            statusClass: `status-${order.status || 'pending'}`,
            customer: order.Booking?.User?.name || 'Unknown',
            seat: order.Booking?.seat_id || '-',
            time: new Date(order.order_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: [{ name: order.order_name || 'Order', price: `$${order.total_cost}` }],
            total: `$${order.total_cost}`,
            actionLabel: order.status === 'pending' ? 'Start Preparing' : order.status === 'preparing' ? 'Mark as Ready' : 'Completed',
            actionClass: order.status === 'pending' ? 'btn-preparing' : order.status === 'preparing' ? 'btn-ready' : 'btn-completed',
            completed: order.status === 'completed'
          }));
          setOrders(mapped);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleOrderAction = (orderId, realId) => {
    const order = orders.find(o => o.id === orderId);
    const newStatus = order.status === 'pending' ? 'preparing' : 'completed';

    fetch(`${API}/orders/${realId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrders(current => current.map(o => {
            if (o.id !== orderId) return o;
            if (o.status === 'pending') return { ...o, status: 'preparing', statusClass: 'status-preparing', actionLabel: 'Mark as Ready', actionClass: 'btn-ready' };
            return { ...o, status: 'completed', statusClass: 'status-completed', actionLabel: 'Completed', actionClass: 'btn-completed', completed: true };
          }));
        }
      })
      .catch(err => console.error(err));
  };

  const activeOrders = orders.filter(o => !o.completed);
  const completedOrders = orders.filter(o => o.completed);
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "active" ? !order.completed : order.completed;
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch = query === "" || order.id.toLowerCase().includes(query) || order.customer.toLowerCase().includes(query) || order.status.toLowerCase().includes(query);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="orders-page">
      <AdminNavbar />
      <div className="container-fluid orders-content px-4 px-md-5 py-4 py-md-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-4 mb-4">
          <div>
            <h1 className="orders-title mb-2">Coffee Shop Orders</h1>
            <p className="orders-subtitle mb-0">Manage and track all coffee shop orders in real-time</p>
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <div className="stat-card"><span>Active Orders:</span><strong>{activeOrders.length}</strong></div>
            <div className="stat-card"><span>Total Today:</span><strong>{orders.length}</strong></div>
          </div>
        </div>

        <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4 mb-4">
          <div className="tabs-card d-inline-flex p-1">
            {[{ key: "active", label: `Active (${activeOrders.length})` }, { key: "completed", label: `Completed (${completedOrders.length})` }].map(tab => (
              <button key={tab.key} type="button" className={`tab-btn ${activeTab === tab.key ? "active" : ""}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input type="text" placeholder="Search orders..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>

        <div className="row g-4">
          {filteredOrders.map(order => (
            <div className="col-12 col-xl-6" key={order.id}>
              <div className="order-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                      <h2 className="order-id mb-0">{order.id}</h2>
                      <span className={`order-status ${order.statusClass}`}>{order.status}</span>
                    </div>
                    <div className="text-muted small">{order.customer} • Seat {order.seat} • {order.time}</div>
                  </div>
                  <div className="fw-bold">{order.total}</div>
                </div>
                <div className="mb-4">
                  {order.items.map(item => (
                    <div key={item.name} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                {!order.completed && (
                  <button type="button" className={`btn w-100 ${order.actionClass}`} onClick={() => handleOrderAction(order.id, order.realId)}>
                    {order.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
