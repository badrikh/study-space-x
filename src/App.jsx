import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import CoffeeShop from "./pages/CoffeeShop";
import UserSubscriptions from "./pages/UserSubscriptions";
import Payment from "./pages/Payment";
import Loyalty from "./pages/Loyalty";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminAnalytics from "./pages/admin/Analytics";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/coffee" element={<CoffeeShop />} />
        <Route path="/subs" element={<UserSubscriptions />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/loyalty" element={<Loyalty />} />

        {/* Admin Routes*/}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/subscriptions" element={<AdminRoute><AdminSubscriptions /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}