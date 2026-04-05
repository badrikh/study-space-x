import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("user");
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");

  const ADMIN_KEY = "12345"; // حدد كلمة السر للأدمن

  const handleSubmit = () => {
    if (role === "admin" && adminSecret !== ADMIN_KEY) {
      alert("❌ Wrong Admin Secret!");
      return;
    }
    alert("✅ Success!");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">

      {/* Glow Effects */}
      <div className="absolute -top-40 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(0,229,255,0.12)_0%,transparent_70%)] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] rounded-full pointer-events-none"></div>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-7 z-10">
        <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center font-black text-[#0B1120] shadow-lg shadow-cyan-400/30">
          S
        </div>
        <span className="text-xl md:text-2xl font-extrabold text-white">Space.</span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-[#131B2F]/95 border border-white/10 rounded-2xl p-5 md:p-8 shadow-2xl z-10">

        {/* Tabs */}
        <div className="flex bg-[#0B1120] rounded-full p-1 mb-6 border border-white/10">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition ${
              tab === "login" ? "bg-cyan-400 text-[#0B1120] shadow-md" : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded-full text-sm font-bold transition ${
              tab === "signup" ? "bg-cyan-400 text-[#0B1120] shadow-md" : "text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Role */}
        <div className="flex bg-[#0d1526] rounded-full p-1 mb-6 border border-white/10">
          <button
            onClick={() => setRole("user")}
            className={`flex-1 py-2 text-sm rounded-full ${
              role === "user" ? "bg-[#1E293B] text-white" : "text-gray-400"
            }`}
          >
            👤 User
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-sm rounded-full ${
              role === "admin" ? "bg-[#1E293B] text-white" : "text-gray-400"
            }`}
          >
            🔐 Admin
          </button>
        </div>

        {/* LOGIN */}
        {tab === "login" && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-white text-lg font-bold mb-1">Welcome back 👋</h1>
              <p className="text-gray-400 text-sm">Enter your details to access your account.</p>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 rounded-lg bg-[#0D1526] border border-white/10 text-white"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-lg bg-[#0D1526] border border-white/10 text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👁️
              </button>
            </div>

            {/* Admin Secret */}
            {role === "admin" && (
              <input
                type="password"
                placeholder="Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg bg-red-900/20 border border-red-500 text-white"
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-cyan-400 text-[#0B1120] py-3 rounded-full font-bold shadow-lg shadow-cyan-400/30"
            >
              Login
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              Don’t have an account?{" "}
              <button
                onClick={() => setTab("signup")}
                className="text-cyan-400 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </>
        )}

        {/* SIGNUP */}
        {tab === "signup" && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-white text-lg font-bold mb-1">Create account ✨</h1>
              <p className="text-gray-400 text-sm">Join Space and start your journey.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <input
                placeholder="First Name"
                className="w-full p-3 rounded-lg bg-[#0D1526] border border-white/10 text-white"
              />
              <input
                placeholder="Last Name"
                className="w-full p-3 rounded-lg bg-[#0D1526] border border-white/10 text-white"
              />
            </div>

            <input
              placeholder="Email"
              className="w-full mb-4 p-3 rounded-lg bg-[#0D1526] border border-white/10 text-white"
            />

            <input
              placeholder="Phone"
              className="w-full mb-4 p-3 rounded-lg bg-[#0D1526] border border-white/10 text-white"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-lg bg-[#0D1526] border border-white/10 text-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👁️
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 pr-10 rounded-lg bg-[#0D1526] border border-white/10 text-white"
              />
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                👁️
              </button>
            </div>

            {/* Admin Secret */}
            {role === "admin" && (
              <input
                type="password"
                placeholder="Admin Secret Key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="w-full mb-4 p-3 rounded-lg bg-red-900/20 border border-red-500 text-white"
              />
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-cyan-400 text-[#0B1120] py-3 rounded-full font-bold shadow-lg shadow-cyan-400/30"
            >
              Create Account
            </button>

            <p className="text-center text-gray-500 mt-4 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setTab("login")}
                className="text-cyan-400 font-semibold"
              >
                Login
              </button>
            </p>
          </>
        )}

        {/* Role badge */}
        <div className="text-center mt-4 text-xs text-gray-500">
          {tab === "login" ? "Logging in" : "Signing up"} as{" "}
          <span className="text-cyan-400 font-semibold">
            {role === "admin" ? "Administrator" : "User"}
          </span>
        </div>
      </div>
    </div>
  );
}