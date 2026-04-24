export default function StatusBar() {
  const items = [
    {
      icon: "fa-door-open",
      label: "Current Status",
      bg: "#ecfdf5",
      color: "#10b981",
      hoverBg: "#d1fae5",
      value: (
        <span className="d-flex align-items-center gap-2">
          <span className="position-relative d-flex" style={{ width: 12, height: 12 }}>
            <span
              className="position-absolute d-inline-flex rounded-circle"
              style={{
                width: "100%", height: "100%",
                background: "#34d399", opacity: 0.75,
                animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="position-relative d-inline-flex rounded-circle"
              style={{ width: 12, height: 12, background: "#10b981" }}
            />
          </span>
          Open Now
        </span>
      ),
    },
    {
      icon: "fa-chair",
      label: "Available Seats",
      bg: "#eff6ff",
      color: "#3b82f6",
      hoverBg: "#dbeafe",
      value: (
        <span>
          12 <span className="text-secondary fw-normal fs-6 mx-1">/</span>
          <span className="text-secondary fs-5">30</span>
        </span>
      ),
    },
    {
      icon: "fa-volume-xmark",
      label: "Quiet Hours",
      bg: "#eef2ff",
      color: "#6366f1",
      hoverBg: "#e0e7ff",
      value: "10 AM - 2 PM",
    },
  ];

  return (
    <div
      className="position-relative mx-auto px-3 px-sm-4"
      style={{ maxWidth: 1100, marginTop: -80, zIndex: 30 }}
    >
      <div className="bg-white rounded-4 shadow p-4 p-sm-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
        {items.map((item, i) => (
          <div key={i} className="d-flex w-100 w-md-auto align-items-center gap-3 flex-grow-1">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
              style={{
                width: 56, height: 56,
                background: item.bg,
                color: item.color,
                fontSize: 20,
                transition: "all 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = item.hoverBg;
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = item.bg;
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <i className={`fa-solid ${item.icon}`}></i>
            </div>
            <div>
              <p className="text-secondary small fw-medium mb-1">{item.label}</p>
              <p className="fs-5 fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                {item.value}
              </p>
            </div>

            {/* Divider — only between items, hidden on mobile */}
            {i < items.length - 1 && (
              <div
                className="d-none d-md-block ms-auto"
                style={{
                  width: 1, height: 64,
                  background: "linear-gradient(to bottom, transparent, #e2e8f0, transparent)",
                  marginLeft: "auto",
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}