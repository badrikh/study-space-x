import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatusBar from "./components/StatusBar";
import Features from "./components/Features";
import Login from "./components/Login";

function Home() {
  return (
    <>
      <Hero />
      <StatusBar />
      <Features />
    </>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <main className="min-vh-100 bg-light">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}