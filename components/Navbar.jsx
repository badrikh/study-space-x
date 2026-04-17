import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg position-absolute top-0 start-0 w-100 z-3 px-3 px-sm-4 py-4"
    >
      <div
        className="container-xl d-flex justify-content-between align-items-center rounded-pill px-4 py-2 shadow"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Logo */}
        <a href="#" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white shadow"
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #22d3ee, #2563eb)",
            }}
          >
            <i className="fa-solid fa-layer-group" style={{ fontSize: 13 }}></i>
          </div>
          <span className="fw-bold text-white fs-5">
            Space<span style={{ color: "#22d3ee" }}>.</span>
          </span>
        </a>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navMenu">
          <ul className="navbar-nav gap-3 d-none d-lg-flex">
            {["Home", "Book Seat", "Coffee Shop", "Subscriptions", "Loyalty"].map((link, i) => (
              <li className="nav-item" key={i}>
                <a
                  href="#"
                  className={`nav-link fw-medium small ${i === 0 ? "text-white" : "text-secondary"}`}
                  style={{ transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.classList.add("text-white")}
                  onMouseLeave={e => i !== 0 && e.target.classList.remove("text-white")}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/login">
            <button
              className="btn btn-sm rounded-pill fw-semibold d-none d-sm-flex align-items-center gap-2 px-4"
              style={{ background: "#00E5FF", color: "#000", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#00cce6")}
              onMouseLeave={e => (e.currentTarget.style.background = "#00E5FF")}
            >
              Login
            </button>
          </Link>

          <button
            className="btn btn-sm rounded-pill fw-medium d-none d-sm-flex align-items-center gap-2 px-4 text-white"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          >
            <i className="fa-solid fa-shield-halved" style={{ color: "#22d3ee" }}></i>
            Admin Panel
          </button>
        </div>
      </div>
    </nav>
  );
}