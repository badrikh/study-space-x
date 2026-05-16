
export default function Hero() {
  return (
    <header className="position-relative overflow-hidden text-white" style={{ paddingTop: "140px", paddingBottom: "160px", backgroundColor: "#020617" }}>
      
      {/* Background gradient */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "radial-gradient(ellipse at top right, #1e3a8a, #020617, #020617)",
        }}
      ></div>

      {/* Glow effects */}
      <div className="position-absolute" style={{ top: "0", left: "25%", width: "24rem", height: "24rem", background: "rgba(37, 99, 235, 0.3)", borderRadius: "50%", filter: "blur(100px)" }}></div>

      <div className="position-absolute" style={{ top: "10rem", right: "25%", width: "24rem", height: "24rem", background: "rgba(34, 211, 238, 0.2)", borderRadius: "50%", filter: "blur(100px)" }}></div>

      <div className="position-absolute" style={{ bottom: "-5rem", left: "50%", width: "24rem", height: "24rem", background: "rgba(99, 102, 241, 0.2)", borderRadius: "50%", filter: "blur(100px)" }}></div>

      {/* Content */}
      <div className="container position-relative">
        <div className="row align-items-center g-5">

          {/* Left side */}
          <div className="col-lg-7">

            {/* Badge */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4"
              style={{
                backgroundColor: "rgba(34, 211, 238, 0.1)",
                border: "1px solid rgba(34, 211, 238, 0.2)",
                color: "#67e8f9",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase"
              }}
            >
              <span className="position-relative d-inline-flex" style={{ width: 8, height: 8 }}>
                <span
                  className="position-absolute rounded-circle bg-info opacity-75"
                  style={{ width: "100%", height: "100%", animation: "ping 1s infinite" }}
                ></span>
                <span className="rounded-circle bg-info w-100 h-100 d-block"></span>
              </span>

              The Future of Deep Work
            </div>

            {/* Title */}
            <h1 className="fw-bold display-3 text-white lh-sm mb-4">
              Smart Study <br />
              <span
                style={{
                  background: "linear-gradient(to right, #22d3ee, #60a5fa, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Space
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-secondary fs-5 mb-5" style={{ maxWidth: "520px", lineHeight: 1.7 }}>
              Reserve your seat, order premium coffee, and immerse yourself in a productive environment designed for absolute focus.
            </p>

            {/* Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3">

              <button className="btn px-4 py-3 fw-bold"
                style={{
                  backgroundColor: "#22d3ee",
                  color: "#0f172a",
                  borderRadius: "50px",
                  transition: "0.3s"
                }}
              >
                Book a Seat <i className="fa-solid fa-arrow-right ms-2"></i>
              </button>

              <button className="btn px-4 py-3 fw-bold text-white"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  transition: "0.3s"
                }}
              >
                <i className="fa-solid fa-mug-hot text-info me-2"></i>
                Order Coffee
              </button>

            </div>

          </div>

          {/* Right side (image) */}
          <div className="col-lg-5 d-none d-lg-block position-relative">

            <div
              className="position-relative overflow-hidden shadow-lg"
              style={{
                borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.1)",
                transform: "rotate(3deg)",
                transition: "0.7s"
              }}
            >

              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern Study Space"
                className="w-100"
                style={{ height: "600px", objectFit: "cover", opacity: 0.9 }}
              />

              {/* overlay */}
              <div className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: "linear-gradient(to top, #020617, rgba(2,6,23,0.2), transparent)"
                }}
              ></div>

              {/* bottom card */}
              <div className="position-absolute bottom-0 start-0 end-0 p-4">
                <div
                  className="d-flex align-items-center gap-3 p-3 rounded-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)"
                  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center text-info"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundColor: "rgba(34,211,238,0.2)"
                    }}
                  >
                    <i className="fa-solid fa-wifi"></i>
                  </div>

                  <div>
                    <p className="fw-bold mb-0 text-white">Gigabit Fiber</p>
                    <p className="text-secondary small mb-0">Ultra-fast, secure connection</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Ping animation */}
      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.75; }
          75% { transform: scale(2); opacity: 0; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

    </header>
  );
}