import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // admin
  const [adminSecret, setAdminSecret] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const ADMIN_KEY = "12345";

  const inputStyle = {
    background: "#0D1526",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
  };

  // ================= LOGIN =================
  const handleLogin = async () => {
    try {
      setError("");

      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");

    } catch (err) {
      setError("Login failed");
    }
  };

  // ================= SIGNUP =================
  const handleSignup = async () => {
    try {
      setError("");

      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }

      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Signup failed");
      }

      //  لوج إن تلقائي بعد الـ Signup
      const loginRes = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));

      navigate("/");

    } catch (err) {
      setError("Signup failed");
    }
  };

  // ================= ADMIN LOGIN =================
  const handleAdminLogin = () => {
    if (adminSecret !== ADMIN_KEY) {
      return setError("Wrong Admin Secret");
    }
    localStorage.setItem("user", JSON.stringify({ name: "Admin", role: "admin" }));
    navigate("/");
  };

  const handleSubmit = () => {
    if (tab === "login") handleLogin();
    else handleSignup();
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 position-relative overflow-hidden"
      style={{ background: "#0B1120", fontFamily: "sans-serif" }}
    >
      {/* Glow Effects */}
      <div className="position-absolute rounded-circle"
        style={{ top: -160, left: -80, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none" }}
      />
      <div className="position-absolute rounded-circle"
        style={{ bottom: -160, right: -80, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none" }}
      />

      {/* Logo */}
      <div className="d-flex align-items-center gap-3 mb-4" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center justify-content-center rounded-3 fw-black"
          style={{ width: 40, height: 40, background: "#22d3ee", color: "#0B1120",
            fontSize: 18, boxShadow: "0 0 20px rgba(34,211,238,0.3)" }}
        >
          S
        </div>
        <span className="fw-black text-white fs-4">Space.</span>
      </div>

      {/* Card */}
      <div className="w-100 p-4 p-md-5 rounded-4 shadow"
        style={{ maxWidth: 460, background: "rgba(19,27,47,0.95)",
          border: "1px solid rgba(255,255,255,0.1)", zIndex: 10 }}
      >

        {/* Admin Login Mode */}
        {showAdminLogin ? (
          <>
            <h5 className="text-white fw-bold mb-1">🔐 Admin Access</h5>
            <p className="text-secondary small mb-3">Enter the secret key provided by the store</p>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <input
              placeholder="Admin Secret Key"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              className="form-control mb-3 py-3"
              style={{ ...inputStyle, border: "1px solid rgba(239,68,68,0.5)" }}
            />

            <button onClick={handleAdminLogin}
              className="btn w-100 py-3 rounded-pill fw-bold mb-3"
              style={{ background: "#22d3ee", color: "#0B1120" }}
            >
              Enter Admin Panel
            </button>

            <button
              onClick={() => { setShowAdminLogin(false); setError(""); }}
              className="btn w-100 py-2 rounded-pill small text-secondary"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              ← Back to Login
            </button>
          </>

        ) : (
          <>
            {/* Tab Switch */}
            <div className="d-flex rounded-pill p-1 mb-4"
              style={{ background: "#0B1120", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {["login", "signup"].map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className="flex-fill py-2 border-0 rounded-pill fw-bold small"
                  style={{ background: tab === t ? "#22d3ee" : "transparent",
                    color: tab === t ? "#0B1120" : "#9ca3af" }}
                >
                  {t === "login" ? "Login" : "Sign Up"}
                </button>
              ))}
            </div>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {/* LOGIN */}
            {tab === "login" && (
              <>
                <h5 className="text-white fw-bold mb-3">Welcome back 👋</h5>
                <input placeholder="Email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3 py-3" style={inputStyle}
                />
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-3 py-3" style={inputStyle}
                />
                <button onClick={handleSubmit}
                  className="btn w-100 py-3 rounded-pill fw-bold mb-3"
                  style={{ background: "#22d3ee", color: "#0B1120" }}
                >
                  Login
                </button>

               
                <button
                  onClick={() => { setShowAdminLogin(true); setError(""); }}
                  className="btn w-100 py-2 rounded-pill small"
                  style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af" }}
                >
                  🔐 Admin? Click here
                </button>
              </>
            )}

            {/* SIGNUP */}
            {tab === "signup" && (
              <>
                <h5 className="text-white fw-bold mb-3">Create account ✨</h5>
                <input placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-2 py-3" style={inputStyle}
                />
                <input placeholder="Email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-2 py-3" style={inputStyle}
                />
                <input placeholder="Phone" value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="form-control mb-2 py-3" style={inputStyle}
                />
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-2 py-3" style={inputStyle}
                />
                <input type="password" placeholder="Confirm Password" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control mb-3 py-3" style={inputStyle}
                />
                <button onClick={handleSubmit}
                  className="btn w-100 py-3 rounded-pill fw-bold"
                  style={{ background: "#22d3ee", color: "#0B1120" }}
                >
                  Create Account
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}