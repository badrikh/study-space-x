import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-nav py-3">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold text-white" href="#">SoftSkin</a>

        {/* Toggle Button for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-4">
            <li className="nav-item"><a className="nav-link text-white" href="#">Learn</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Explore</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Contact</a></li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {/* Cart Icon */}
            <li className="nav-item d-flex align-items-center">
              <div className="position-relative d-inline-block me-2" style={{ fontSize: '17px', color: 'white' }}>
                <i className="bi bi-cart4"></i>
                <span className="position-absolute start-50" 
                      style={{ top: '-5px', transform: 'translateX(-40%)', fontSize: '0.6rem', color: 'white' }}>
                  0
                </span>
              </div>
              <a className="nav-link text-white p-0" href="#">Cart</a>
            </li>

            {/* Language & User */}
            <ul className="navbar-nav d-flex align-items-center ms-lg-3">
              <li className="nav-item d-flex align-items-center me-3">
                <div className="d-inline-block" style={{ fontSize: '17px', color: 'white' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="m8 0 .412.01A7.97 7.97 0 0 1 13.29 2a8.04 8.04 0 0 1 2.548 4.382 8 8 0 1 1-15.674 0 8 8 0 0 1 1.361-3.078A8 8 0 0 1 2.711 2 7.96 7.96 0 0 1 8 0m0 1a7 7 0 0 0-5.958 3.324C2.497 6.192 6.669 7.827 6.5 8c-.5.5-1.034.884-1 1.5.07 1.248 2.259.774 2.5 2 .202 1.032-1.051 3 0 3 1.5-.5 3.798-3.186 4-5 .138-1.242-2-2-3.5-2.5-.828-.276-1.055.648-1.5.5S4.5 5.5 5.5 5s1 0 1.5.5c1 .5.5-1 1-1.5.838-.838 3.16-1.394 3.605-2.001A6.97 6.97 0 0 0 8 1"/>
                  </svg>
                </div>
                <a className="nav-link text-white p-0 ms-1" href="#">EN</a>
              </li>

              <li className="nav-item d-flex align-items-center">
                <a className="nav-link text-white p-0 me-1" href="#">Logged in as Sameer</a>
                <div className="d-inline-block" style={{ fontSize: '15px', color: 'white' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659"/>
                  </svg>
                </div>
              </li>
            </ul>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;