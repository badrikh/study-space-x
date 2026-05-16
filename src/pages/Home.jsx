import UserNavbar from "../components/UserNavbar";
import Hero from "../components/Hero";
import StatusBar from "../components/StatusBar";
import Features from "../components/Features";

function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="container home-footer-grid">
        <div>
          <a href="/" className="home-footer-brand">
            <span className="home-footer-brand-icon">
              <i className="fa-solid fa-layer-group"></i>
            </span>
            <span>
              Space <span className="home-footer-brand-dot">.</span>
            </span>
          </a>
          <p className="home-footer-copy">
            A premium study space designed for deep work, focus, and productivity.
          </p>
          <div className="home-footer-socials">
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div>
          <h3>Services</h3>
          <ul>
            <li><a href="/booking">Book a Seat</a></li>
            <li><a href="/coffee">Order Coffee</a></li>
            <li><a href="/subs">Subscriptions</a></li>
            <li><a href="/loyalty">Loyalty Rewards</a></li>
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3>Stay Updated</h3>
          <p className="home-footer-copy">
            Get the latest news and offers directly to your inbox.
          </p>
          <form className="home-footer-form">
            <input type="email" placeholder="Email" aria-label="Email address" />
            <button type="button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container home-footer-bottom">
        <p>© 2025 Space. All rights reserved.</p>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="home-page">
      <UserNavbar absolute />
      <Hero />
      <StatusBar />
      <Features />
      <HomeFooter />
    </main>
  );
}
