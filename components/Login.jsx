import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("user");
  const [tab, setTab] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    backgroundColor: "#0D1526",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    borderRadius: "10px",

    // text color
    WebkitTextFillColor: "#fff",
    caretColor: "#22d3ee",

    // remove chrome autofill white background
    transition: "background-color 9999s ease-in-out 0s",
  };

  // LOGIN
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      alert(`✅ Welcome! Logged in as ${data.role}`);
    } catch (err) {
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          phoneNumber: phone,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Signup failed");
      }

      alert("✅ Account created successfully!");

      setTab("login");
    } catch (err) {
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-center px-3 position-relative overflow-hidden"
      style={{
        background: "#0B1120",
        fontFamily: "sans-serif",
      }}
    >
      {/* Glow */}
      <div
        className="position-absolute rounded-circle"
        style={{
          top: -160,
          left: -80,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
        }}
      />

      <div
        className="position-absolute rounded-circle"
        style={{
          bottom: -160,
          right: -80,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 fw-bold"
          style={{
            width: 50,
            height: 50,
            background: "#22d3ee",
            color: "#0B1120",
            fontSize: 24,
            boxShadow: "0 0 20px rgba(34,211,238,0.3)",
          }}
        >
          S
        </div>

        <span className="text-white fs-1 fw-light">
          Space<span className="fw-bold">.</span>
        </span>
      </div>

      {/* Card */}
      <div
        className="w-100 p-4 p-md-5 rounded-4 shadow"
        style={{
          maxWidth: 520,
          background: "rgba(19,27,47,0.95)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Tabs */}
        <div
          className="d-flex rounded-pill p-1 mb-4"
          style={{
            background: "#08101f",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {["login", "signup"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="flex-fill border-0 rounded-pill py-2 fw-bold"
              style={{
                background: tab === t ? "#22d3ee" : "transparent",
                color: tab === t ? "#0B1120" : "#9ca3af",
                transition: "0.2s",
              }}
            >
              {t === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Role */}
        <div
          className="d-flex rounded-pill p-1 mb-4"
          style={{
            background: "#08101f",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { key: "user", label: "👤 User" },
            { key: "admin", label: "🔐 Admin" },
          ].map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRole(r.key)}
              className="flex-fill border-0 rounded-pill py-2"
              style={{
                background: role === r.key ? "#1E293B" : "transparent",
                color: role === r.key ? "#fff" : "#9ca3af",
                transition: "0.2s",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* LOGIN */}
        {tab === "login" && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-white fw-bold mb-2">
                Welcome back 👋
              </h2>

              <p className="text-secondary mb-0">
                Enter your details to access your account.
              </p>
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control py-3 mb-3"
              style={inputStyle}
            />

            {/* Password */}
            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control py-3"
                style={{
                  ...inputStyle,
                  paddingRight: "55px",
                }}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#9ca3af",
                  userSelect: "none",
                }}
              >
                👁️
              </span>
            </div>

            {error && (
              <p
                className="text-center mb-3"
                style={{
                  color: "#ef4444",
                  fontSize: 14,
                }}
              >
                ❌ {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="btn w-100 py-2 rounded-pill fw-bold mb-3"
              style={{
                background: "#22d3ee",
                color: "#0B1120",
                fontSize: 16,
                boxShadow: "0 0 30px rgba(34,211,238,0.35)",
              }}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-secondary">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signup")}
                className="border-0 bg-transparent fw-bold"
                style={{
                  color: "#22d3ee",
                }}
              >
                Sign Up
              </button>
            </p>
          </>
        )}

        {/* SIGNUP */}
        {tab === "signup" && (
          <>
            <div className="text-center mb-4">
              <h2 className="text-white fw-bold mb-2">
                Create account ✨
              </h2>

              <p className="text-secondary mb-0">
                Join Space and start your journey.
              </p>
            </div>

            {/* Names */}
            <div className="row g-3 mb-3">
              <div className="col-6">
                <input
                  placeholder="First Name"
                  autoComplete="off"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control py-3"
                  style={inputStyle}
                />
              </div>

              <div className="col-6">
                <input
                  placeholder="Last Name"
                  autoComplete="off"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control py-3"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
            <input
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control py-3 mb-3"
              style={inputStyle}
            />

            {/* Phone */}
            <input
              placeholder="Phone"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control py-3 mb-3"
              style={inputStyle}
            />

            {/* Password */}
            <div className="position-relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control py-3"
                style={{
                  ...inputStyle,
                  paddingRight: "55px",
                }}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#9ca3af",
                  userSelect: "none",
                }}
              >
                👁️
              </span>
            </div>

            {/* Confirm Password */}
            <div className="position-relative mb-3">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control py-3"
                style={{
                  ...inputStyle,
                  paddingRight: "55px",
                }}
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                style={{
                  position: "absolute",
                  right: "18px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#9ca3af",
                  userSelect: "none",
                }}
              >
                👁️
              </span>
            </div>

            {error && (
              <p
                className="text-center mb-3"
                style={{
                  color: "#ef4444",
                  fontSize: 14,
                }}
              >
                ❌ {error}
              </p>
            )}

            {/* Create Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleSignup}
              className="btn w-100 py-2 rounded-pill fw-bold mb-3"
              style={{
                background: "#22d3ee",
                color: "#0B1120",
                fontSize: 16,
                boxShadow: "0 0 30px rgba(34,211,238,0.35)",
              }}
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <p className="text-center text-secondary">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("login")}
                className="border-0 bg-transparent fw-bold"
                style={{
                  color: "#22d3ee",
                }}
              >
                Login
              </button>
            </p>
          </>
        )}

        {/* Footer */}
        <p
          className="text-center mt-4 mb-0"
          style={{
            color: "#324a7a",
            fontSize: 13,
          }}
        >
          {tab === "login" ? "Logging in" : "Signing up"} as{" "}
          <span
            style={{
              color: "#22d3ee",
              fontWeight: "bold",
            }}
          >
            {role === "admin" ? "Administrator" : "User"}
          </span>
        </p>
      </div>
    </div>
  );
}