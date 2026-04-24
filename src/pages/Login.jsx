import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("user");
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");

  const ADMIN_KEY = "12345";

  const handleSubmit = () => {
    if (role === "admin" && adminSecret !== ADMIN_KEY) {
      alert("❌ Wrong Admin Secret!");
      return;
    }
    alert("✅ Success!");
  };

  const inputStyle = {
    background: "#0D1526",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: 10,
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 position-relative overflow-hidden"
      style={{ background: "#0B1120", fontFamily: "sans-serif" }}
    >
      {/* Glow Effects */}
      <div
        className="position-absolute rounded-circle"
        style={{
          top: -160, left: -80,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="position-absolute rounded-circle"
        style={{
          bottom: -160, right: -80,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Logo */}
      <div className="d-flex align-items-center gap-3 mb-4" style={{ zIndex: 10 }}>
        <div
          className="d-flex align-items-center justify-content-center rounded-3 fw-black"
          style={{
            width: 40, height: 40,
            background: "#22d3ee",
            color: "#0B1120",
            fontSize: 18,
            boxShadow: "0 0 20px rgba(34,211,238,0.3)",
          }}
        >
          S
        </div>
        <span className="fw-black text-white fs-4">Space.</span>
      </div>

      {/* Card */}
      <div
        className="w-100 p-4 p-md-5 rounded-4 shadow"
        style={{
          maxWidth: 460,
          background: "rgba(19,27,47,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          zIndex: 10,
        }}
      >
        {/* Tab Switch */}
        <div
          className="d-flex rounded-pill p-1 mb-4"
          style={{ background: "#0B1120", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {["login", "signup"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-fill py-2 border-0 rounded-pill fw-bold small"
              style={{
                background: tab === t ? "#22d3ee" : "transparent",
                color: tab === t ? "#0B1120" : "#9ca3af",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Role Switch */}
        <div
          className="d-flex rounded-pill p-1 mb-4"
          style={{ background: "#0d1526", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {[
            { key: "user", label: "👤 User" },
            { key: "admin", label: "🔐 Admin" },
          ].map((r) => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className="flex-fill py-2 border-0 rounded-pill small"
              style={{
                background: role === r.key ? "#1E293B" : "transparent",
                color: role === r.key ? "#fff" : "#9ca3af",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* LOGIN FORM */}
        {tab === "login" && (
          <>
            <div className="text-center mb-4">
              <h5 className="text-white fw-bold mb-1">Welcome back 👋</h5>
              <p className="text-secondary small mb-0">Enter your details to access your account.</p>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3 py-3"
              style={inputStyle}
            />

            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-control py-3 pe-5"
                style={inputStyle}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary"
                style={{ cursor: "pointer" }}
              >
                👁️
              </button>
            </div>

            {role === "admin" && (
              <input
                type="password"
                placeholder="Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="form-control mb-3 py-3"
                style={{ ...inputStyle, background: "rgba(127,29,29,0.2)", borderColor: "#ef4444" }}
              />
            )}

            <button
              onClick={handleSubmit}
              className="btn w-100 py-3 rounded-pill fw-bold mb-3"
              style={{
                background: "#22d3ee",
                color: "#0B1120",
                boxShadow: "0 4px 20px rgba(34,211,238,0.3)",
              }}
            >
              Login
            </button>

            <p className="text-center text-secondary small mb-0">
              Don't have an account?{" "}
              <button
                onClick={() => setTab("signup")}
                className="border-0 bg-transparent fw-semibold p-0"
                style={{ color: "#22d3ee", cursor: "pointer" }}
              >
                Sign Up
              </button>
            </p>
          </>
        )}

        {/* SIGNUP FORM */}
        {tab === "signup" && (
          <>
            <div className="text-center mb-4">
              <h5 className="text-white fw-bold mb-1">Create account ✨</h5>
              <p className="text-secondary small mb-0">Join Space and start your journey.</p>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <input
                  placeholder="First Name"
                  className="form-control py-3"
                  style={inputStyle}
                />
              </div>
              <div className="col-6">
                <input
                  placeholder="Last Name"
                  className="form-control py-3"
                  style={inputStyle}
                />
              </div>
            </div>

            <input
              placeholder="Email"
              className="form-control mb-3 py-3"
              style={inputStyle}
            />
            <input
              placeholder="Phone"
              className="form-control mb-3 py-3"
              style={inputStyle}
            />

            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-control py-3 pe-5"
                style={inputStyle}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary"
                style={{ cursor: "pointer" }}
              >
                👁️
              </button>
            </div>

            <div className="position-relative mb-3">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="form-control py-3 pe-5"
                style={inputStyle}
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="border-0 bg-transparent position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary"
                style={{ cursor: "pointer" }}
              >
                👁️
              </button>
            </div>

            {role === "admin" && (
              <input
                type="password"
                placeholder="Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="form-control mb-3 py-3"
                style={{ ...inputStyle, background: "rgba(127,29,29,0.2)", borderColor: "#ef4444" }}
              />
            )}

            <button
              onClick={handleSubmit}
              className="btn w-100 py-3 rounded-pill fw-bold mb-3"
              style={{
                background: "#22d3ee",
                color: "#0B1120",
                boxShadow: "0 4px 20px rgba(34,211,238,0.3)",
              }}
            >
              Create Account
            </button>

            <p className="text-center text-secondary small mb-0">
              Already have an account?{" "}
              <button
                onClick={() => setTab("login")}
                className="border-0 bg-transparent fw-semibold p-0"
                style={{ color: "#22d3ee", cursor: "pointer" }}
              >
                Login
              </button>
            </p>
          </>
        )}

        {/* Role badge */}
        <p className="text-center mt-3 mb-0" style={{ fontSize: 12, color: "#324a7a" }}>
          {tab === "login" ? "Logging in" : "Signing up"} as{" "}
          <span className="fw-semibold" style={{ color: "#22d3ee" }}>
            {role === "admin" ? "Administrator" : "User"}
          </span>
        </p>
      </div>
    </div>
  );
}