import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Layers3,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Book Seat", to: "/booking" },
  { label: "Coffee Shop", to: "/coffee" },
  { label: "Subscriptions", to: "/subs" },
  { label: "Loyalty", to: "/loyalty" },

  // للأدمن فقط
  {
    label: "Dashboard",
    to: "/admin",
    admin: true,
  },
];

export default function Navbar({
  absolute = true,
  variant = "dark",
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false);
  const [user, setUser] =
    useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isLight =
    variant === "light";

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );

    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`${
        absolute
          ? "position-absolute"
          : "position-sticky"
      } top-0 start-0 w-100 z-3 px-3 px-sm-4 py-4`}
    >
      <div className="container-xl">
        <div
          className={`custom-navbar-shell custom-navbar-${variant}
          d-flex align-items-center justify-content-between gap-3
          rounded-pill px-3 px-lg-4 py-2 shadow-lg`}
        >
          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 text-decoration-none m-0"
          >
            <span className="custom-navbar-logo d-inline-flex align-items-center justify-content-center rounded-3 text-white shadow">
              <Layers3
                size={14}
                strokeWidth={2.2}
              />
            </span>

            <span
              className={`fw-bold fs-5 ${
                isLight
                  ? "custom-navbar-brand-light"
                  : "text-white"
              }`}
            >
              Space
              <span className="custom-navbar-accent">
                .
              </span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            <ul className="navbar-nav flex-row gap-2">
              {navItems
                .filter(
                  (item) =>
                    !item.admin ||
                    user?.role ===
                      "admin"
                )
                .map((item) => (
                  <li
                    className="nav-item"
                    key={
                      item.label
                    }
                  >
                    <Link
                      to={item.to}
                      className={`custom-navbar-link nav-link fw-medium small rounded-pill px-3 py-2
                      ${
                        location.pathname ===
                        item.to
                          ? "is-active"
                          : ""
                      }
                      ${
                        isLight
                          ? "light-link"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Right Section */}
          <div
            className="d-none d-sm-flex align-items-center justify-content-end"
            style={{
              minWidth: "220px",
            }}
          >
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-white fw-semibold small">
                  👋{" "}
                  {
                    user.name
                  }
                </span>

                <button
                  onClick={
                    handleLogout
                  }
                  className="btn custom-navbar-login custom-logout-navbar rounded-pill fw-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn custom-navbar-login rounded-pill fw-semibold px-4"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className={`btn custom-navbar-toggle border-0
            d-inline-flex d-lg-none align-items-center
            justify-content-center rounded-circle p-0
            ${
              isLight
                ? "custom-navbar-toggle-light text-dark"
                : "text-white"
            }`}
            onClick={() =>
              setMobileOpen(
                (p) => !p
              )
            }
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className={`custom-navbar-mobile
            ${
              isLight
                ? "custom-navbar-mobile-light"
                : "custom-navbar-mobile-dark"
            }
            mt-3 rounded-4 p-3 p-sm-4 d-lg-none`}
          >
            <div className="d-flex flex-column gap-2">
              {navItems
                .filter(
                  (item) =>
                    !item.admin ||
                    user?.role ===
                      "admin"
                )
                .map((item) => (
                  <Link
                    key={
                      item.label
                    }
                    to={item.to}
                    className={`custom-navbar-link nav-link fw-medium rounded-3 px-3 py-2
                    ${
                      location.pathname ===
                      item.to
                        ? "is-active"
                        : ""
                    }
                    ${
                      isLight
                        ? "light-link"
                        : ""
                    }`}
                    onClick={() =>
                      setMobileOpen(
                        false
                      )
                    }
                  >
                    {
                      item.label
                    }
                  </Link>
                ))}
            </div>

            <div className="d-flex flex-column gap-2 mt-3">
              {user ? (
                <>
                  <div className="text-center text-white fw-semibold">
                    👋{" "}
                    {
                      user.name
                    }
                  </div>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(
                        false
                      );
                    }}
                    className="btn custom-navbar-login rounded-pill fw-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn custom-navbar-login rounded-pill fw-semibold"
                  onClick={() =>
                    setMobileOpen(
                      false
                    )
                  }
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}