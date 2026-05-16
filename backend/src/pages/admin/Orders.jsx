import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const statusClassFor = (status) => {
  if (status === "completed") return "status-completed";
  if (status === "preparing") return "status-preparing";
  return "status-pending";
};

const nextStatusFor = (status) => {
  if (status === "pending") return "preparing";
  if (status === "preparing") return "completed";
  return "completed";
};

const actionLabelFor = (status) => {
  if (status === "pending") return "Start Preparing";
  if (status === "preparing") return "Mark as Ready";
  return "Completed";
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading((current) => current && orders.length === 0);
      const response = await fetch(`${API_BASE}/api/admin/orders`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to load orders");
      }

      setOrders(Array.isArray(payload.data) ? payload.data : Array.isArray(payload) ? payload : []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const intervalId = window.setInterval(loadOrders, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const normalizedOrders = useMemo(
    () =>
      orders.map((order) => {
        const status = order.status || "pending";
        const booking = order.Booking;
        const user = booking?.User || order.User;
        const seat = booking?.Seat;
        const total = order.total_cost ?? order.total ?? order.prices ?? 0;
        const items = Array.isArray(order.items) && order.items.length
          ? order.items.map((item) => `${item.quantity}x ${item.name}`)
          : String(order.order_name || "Coffee order")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean);

        return {
          id: order.id,
          displayId: `ORD-${String(order.id).padStart(3, "0")}`,
          status,
          statusClass: statusClassFor(status),
          customer: user?.name || "Walk-in customer",
          seat: seat?.name_of_room || seat?.id || "Coffee counter",
          time: order.order_date
            ? new Date(order.order_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          items,
          total: `$${Number(total).toFixed(2)}`,
          completed: status === "completed",
          actionLabel: actionLabelFor(status),
        };
      }),
    [orders]
  );

  const activeOrders = normalizedOrders.filter((order) => !order.completed);
  const completedOrders = normalizedOrders.filter((order) => order.completed);

  const filteredOrders = normalizedOrders.filter((order) => {
    const matchesTab = activeTab === "active" ? !order.completed : order.completed;
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      order.displayId.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query) ||
      order.items.some((item) => item.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  });

  const handleOrderAction = async (order) => {
    const nextStatus = nextStatusFor(order.status);

    try {
      const response = await fetch(`${API_BASE}/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to update order");
      }

      setOrders((current) =>
        current.map((item) =>
          item.id === order.id ? { ...item, status: nextStatus } : item
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

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
            <div className="stat-card"><span>Total Today:</span><strong>{normalizedOrders.length}</strong></div>
          </div>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="alert alert-info">Loading orders...</div> : null}

        <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4 mb-4">
          <div className="tabs-card d-inline-flex p-1">
            {[
              { key: "active", label: `Active (${activeOrders.length})` },
              { key: "completed", label: `Completed (${completedOrders.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="row g-4">
          {filteredOrders.map((order) => (
            <div className="col-12 col-xl-6" key={order.id}>
              <div className="order-card h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-3 flex-wrap mb-2">
                      <h2 className="order-id mb-0">{order.displayId}</h2>
                      <span className={`order-status ${order.statusClass}`}>{order.status}</span>
                    </div>
                    <div className="text-muted small">{order.customer} • Seat {order.seat} • {order.time}</div>
                  </div>
                  <div className="fw-bold">{order.total}</div>
                </div>

                <div className="mb-4">
                  {order.items.map((item) => (
                    <div key={item} className="d-flex justify-content-between py-2 border-bottom">
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {!order.completed && (
                  <button
                    type="button"
                    className={`btn w-100 ${order.status === "pending" ? "btn-preparing" : "btn-ready"}`}
                    onClick={() => handleOrderAction(order)}
                  >
                    {order.actionLabel}
                  </button>
                )}
              </div>
            </div>
          ))}

          {!loading && filteredOrders.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-light border">No orders found.</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
