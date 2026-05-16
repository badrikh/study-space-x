import { useEffect, useMemo, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import MenuCard from "../components/MenuCard";
import OrderSidebar from "../components/OrderSidebar";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const assetImages = {
  latte: new URL("../assets/coffee/latte.jpg", import.meta.url).href,
  espresso: new URL("../assets/coffee/espresso.jpg", import.meta.url).href,
  cappuccino: new URL("../assets/coffee/cappuccino.jpg", import.meta.url).href,
  americano: new URL("../assets/coffee/americano.jpg", import.meta.url).href,
  mocha: new URL("../assets/coffee/mocha.jpg", import.meta.url).href,
  "flat white": new URL("../assets/coffee/flat-white.jpg", import.meta.url).href,
  affogato: new URL("../assets/coffee/affogato.jpg", import.meta.url).href,
  tea: new URL("../assets/coffee/hot-tea.jpg", import.meta.url).href,
  matcha: new URL("../assets/coffee/matcha-latte.jpg", import.meta.url).href,
  "iced coffee": new URL("../assets/coffee/iced-coffee.jpg", import.meta.url).href,
  "cold brew": new URL("../assets/coffee/cold-brew.jpg", import.meta.url).href,
  croissant: new URL("../assets/coffee/croissant.jpg", import.meta.url).href,
  muffin: new URL("../assets/coffee/muffin.jpg", import.meta.url).href,
  brownie: new URL("../assets/coffee/brownie.jpg", import.meta.url).href,
  sandwich: new URL("../assets/coffee/sandwich.jpg", import.meta.url).href,
  toast: new URL("../assets/coffee/avocado-toast.jpg", import.meta.url).href,
  smoothie: new URL("../assets/coffee/smoothie.jpg", import.meta.url).href,
  juice: new URL("../assets/coffee/smoothie.jpg", import.meta.url).href,
  cookie: new URL("../assets/coffee/cookie.jpg", import.meta.url).href,
  food: new URL("../assets/coffee/sandwich.jpg", import.meta.url).href,
  coffee: new URL("../assets/coffee/latte.jpg", import.meta.url).href,
};

const fallbackMenuItems = [
  { name: "Latte", price: 4.5, description: "Smooth espresso with steamed milk", category: "Coffee" },
  { name: "Espresso", price: 3, description: "Strong and bold coffee shot", category: "Coffee" },
  { name: "Cappuccino", price: 4, description: "Espresso with foamy milk", category: "Coffee" },
  { name: "Hot Tea", price: 2.5, description: "A calming cup of tea", category: "Tea" },
  { name: "Iced Coffee", price: 4.25, description: "Chilled coffee over ice", category: "Cold" },
  { name: "Croissant", price: 3.5, description: "Buttery flaky pastry", category: "Bakery" },
  { name: "Sandwich", price: 6.5, description: "Freshly made savory sandwich", category: "Food" },
  { name: "Cookie", price: 2.25, description: "Fresh baked cookie", category: "Bakery" },
];

const imageForItem = (item) => {
  if (item.imageUrl) return item.imageUrl;
  if (item.image) return item.image;

  const name = item.name?.toLowerCase() || "";
  const match = Object.entries(assetImages).find(([key]) => name.includes(key));

  return match?.[1] || assetImages[item.category?.toLowerCase()] || assetImages.food;
};

const normalizeItem = (item) => ({
  ...item,
  price: Number(item.price || 0),
  category: item.category || "Food",
  image: imageForItem(item),
});

export default function CoffeeShop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderItems, setOrderItems] = useState([]);
  const [menuItems, setMenuItems] = useState(fallbackMenuItems.map(normalizeItem));
  const [error, setError] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const response = await fetch(`${API_BASE}/menus`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "Failed to load menu");
        }

        if (!cancelled && Array.isArray(payload) && payload.length) {
          setMenuItems(payload.map(normalizeItem));
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      }
    }

    loadMenu();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(menuItems.map((item) => item.category))],
    [menuItems]
  );

  const visibleItems = useMemo(
    () =>
      selectedCategory === "All"
        ? menuItems
        : menuItems.filter((item) => item.category === selectedCategory),
    [menuItems, selectedCategory]
  );

  const hasOrder = orderItems.length > 0;

  const handleAdd = (product) =>
    setOrderItems((current) => {
      const existing = current.find((item) => item.name === product.name);

      if (existing) {
        return current.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });

  const handleUpdateQty = (name, delta) =>
    setOrderItems((current) =>
      current
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const handlePlaceOrder = async () => {
    if (!orderItems.length) return;

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderName = orderItems
      .map((item) => `${item.quantity}x ${item.name}`)
      .join(", ");

    try {
      setPlacingOrder(true);
      setOrderMessage("");

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: orderItems.map((item) => ({
            menuId: item.id || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          order_name: orderName,
          prices: total,
          total_cost: total,
          order_date: new Date().toISOString(),
          menu_id: orderItems[0]?.id || null,
          status: "pending",
        }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Failed to place order");
      }

      setOrderItems([]);
      setOrderMessage("Order sent to admin.");
    } catch (err) {
      setOrderMessage(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="index-page min-vh-100">
      <UserNavbar absolute />
      <main className="index-page-content px-3 px-md-4 pb-5">
        <section className="coffee-shell">
          <div className="coffee-heading text-center mb-4">
            <h1 className="display-5 fw-bold mb-2">Coffee Shop</h1>
            <p className="text-muted mb-0">Order your favorite drinks and snacks directly from your study seat.</p>
          </div>

          {error ? <div className="alert alert-warning">{error}. Showing saved menu items.</div> : null}
          {orderMessage ? <div className="alert alert-info">{orderMessage}</div> : null}

          <div className="coffee-filters d-flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`btn category-filter rounded-pill px-4 ${
                  selectedCategory === category ? "btn-shop" : "btn-outline-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="coffee-layout">
            <div className="coffee-menu">
              <div className="row g-4">
                {visibleItems.map((item) => (
                  <div key={item.id || item.name} className="col-12 col-md-6 col-xl-4">
                    <MenuCard {...item} onAdd={() => handleAdd(item)} />
                  </div>
                ))}
              </div>
            </div>

            {hasOrder && (
              <aside className="coffee-order-panel">
                <OrderSidebar
                  items={orderItems}
                  onUpdateQty={handleUpdateQty}
                  onPlaceOrder={handlePlaceOrder}
                  placingOrder={placingOrder}
                />
              </aside>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
