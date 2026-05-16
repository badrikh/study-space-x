import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const emptyForm = {
  name: "",
  price: "",
  itemNumber: "",
  description: "",
  category: "Food",
  imageUrl: "",
  isAvailable: true,
};

const formatPrice = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/admin/menu`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to load menu");
      }

      setItems(payload.data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) =>
      [item.name, item.category, item.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [items, search]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      price: item.price ?? "",
      itemNumber: item.itemNumber ?? "",
      description: item.description || "",
      category: item.category || "Food",
      imageUrl: item.imageUrl || "",
      isAvailable: item.isAvailable !== false,
    });
  };

  const saveItem = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const body = {
        ...form,
        price: Number(form.price),
        itemNumber: form.itemNumber === "" ? null : Number(form.itemNumber),
      };

      const response = await fetch(
        editingId ? `${API_BASE}/api/admin/menu/${editingId}` : `${API_BASE}/api/admin/menu`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to save menu item");
      }

      setMessage(editingId ? "Menu item updated." : "Menu item created.");
      resetForm();
      await loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleAvailability = async (item) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, isAvailable: !item.isAvailable }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to update item");
      }

      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, isAvailable: !item.isAvailable } : entry
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteItem = async (item) => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/menu/${item.id}`, {
        method: "DELETE",
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to delete item");
      }

      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage("Menu item deleted.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="subscription-page">
      <AdminNavbar />

      <main className="page-content container-fluid py-4 py-lg-5">
        <section className="hero-copy">
          <h2 className="page-title mb-2">Menu Management</h2>
          <p className="page-subtitle mb-0">Control the Coffee Shop menu shown to students</p>
        </section>

        {error ? <div className="alert alert-danger mt-4">{error}</div> : null}
        {message ? <div className="alert alert-success mt-4">{message}</div> : null}

        <section className="table-card mt-4">
          <form className="p-4" onSubmit={saveItem}>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label className="form-label">Name</label>
                <input className="form-control" value={form.name} onChange={(event) => updateField("name", event.target.value)} required />
              </div>
              <div className="col-6 col-md-2">
                <label className="form-label">Price</label>
                <input className="form-control" type="number" step="0.01" min="0" value={form.price} onChange={(event) => updateField("price", event.target.value)} required />
              </div>
              <div className="col-6 col-md-2">
                <label className="form-label">Number</label>
                <input className="form-control" type="number" min="0" value={form.itemNumber} onChange={(event) => updateField("itemNumber", event.target.value)} />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label">Category</label>
                <input className="form-control" value={form.category} onChange={(event) => updateField("category", event.target.value)} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Description</label>
                <input className="form-control" value={form.description} onChange={(event) => updateField("description", event.target.value)} />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Image URL</label>
                <input className="form-control" value={form.imageUrl} onChange={(event) => updateField("imageUrl", event.target.value)} />
              </div>
              <div className="col-12 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <label className="d-flex align-items-center gap-2 mb-0">
                  <input type="checkbox" checked={form.isAvailable} onChange={(event) => updateField("isAvailable", event.target.checked)} />
                  Available in Coffee Shop
                </label>
                <div className="d-flex gap-2">
                  {editingId ? <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>Cancel</button> : null}
                  <button type="submit" className="btn btn-ready" disabled={saving}>
                    {saving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>

        <section className="toolbar-section d-flex flex-column flex-xl-row align-items-xl-center justify-content-between gap-3 gap-xl-4 mt-4">
          <div className="tabs-shell subscription-tabs">
            <button type="button" className="tab-btn subscription-tab active-tab active">
              Items ({items.length})
            </button>
            <button type="button" className="tab-btn subscription-tab expired-tab">
              Hidden ({items.filter((item) => !item.isAvailable).length})
            </button>
          </div>

          <div className="search-shell">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search menu..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </section>

        <section className="table-card mt-4">
          <div className="table-responsive">
            <table className="table align-middle subscription-table mb-0">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>PRICE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5">Loading menu...</td></tr>
                ) : filteredItems.length ? (
                  filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="student-name">{item.name}</div>
                        <div className="student-email">{item.description}</div>
                      </td>
                      <td><span className="plan-tag plan-tag-green">{item.category || "Food"}</span></td>
                      <td>
                        <span className="status-badge">
                          <span className="status-check">✓</span>
                          {item.isAvailable ? "Visible" : "Hidden"}
                        </span>
                      </td>
                      <td>{formatPrice(item.price)}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => startEdit(item)}>Edit</button>
                          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => toggleAvailability(item)}>
                            {item.isAvailable ? "Hide" : "Show"}
                          </button>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No menu items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
