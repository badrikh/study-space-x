
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; import Login from "./pages/Login"; import Booking from "./pages/Booking"; import CoffeeShop from "./pages/CoffeeShop"; import UserSubscriptions from "./pages/UserSubscriptions"; import Loyalty from "./pages/Loyalty"; import AdminDashboard from "./pages/admin/Dashboard"; import AdminOrders from "./pages/admin/Orders"; import AdminMenu from "./pages/admin/Menu"; import AdminSubscriptions from "./pages/admin/Subscriptions"; import AdminAnalytics from "./pages/admin/Analytics";
export default function App(){ return (<BrowserRouter><Routes>
<Route path="/" element={<Home/>} /><Route path="/login" element={<Login/>} /><Route path="/booking" element={<Booking/>} /><Route path="/coffee" element={<CoffeeShop/>} /><Route path="/subs" element={<UserSubscriptions/>} /><Route path="/loyalty" element={<Loyalty/>} />
<Route path="/admin" element={<AdminDashboard/>} /><Route path="/admin/orders" element={<AdminOrders/>} /><Route path="/admin/menu" element={<AdminMenu/>} /><Route path="/admin/subscriptions" element={<AdminSubscriptions/>} /><Route path="/admin/analytics" element={<AdminAnalytics/>} />
<Route path="*" element={<Navigate to="/" replace/>} /></Routes></BrowserRouter>)}
