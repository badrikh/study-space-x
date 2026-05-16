import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const fallbackPlan = {
  title: "Premium Study Pass",
  description: "For serious focus & comfort",
  price: "$45",
  features: [
    "10 days of access",
    "Unlimited daily hours",
    "Premium seat selection",
  ],
};

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.plan || fallbackPlan;
  const [isPaid, setIsPaid] = useState(false);

  const buttonLabel = useMemo(
    () => `Subscribe ${selectedPlan.price}`,
    [selectedPlan.price]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPaid(true);
  };

  return (
    <>
      <UserNavbar absolute />

      <main className="payment-page">
        <Link to="/subs" className="payment-back">
          <i className="bi bi-arrow-left" />
          Back to plans
        </Link>

        <section className="checkout-panel">
          <div className="selected-plan">
            <div>
              <span>Selected plan</span>
              <strong className="d-block">{selectedPlan.title}</strong>
              <small>{selectedPlan.description}</small>
            </div>

            <strong>{selectedPlan.price}</strong>
          </div>

          <div className="payment-divider">
            <span />
            <p>Pay securely</p>
            <span />
          </div>

          {isPaid ? (
            <div className="text-center py-4">
              <div className="display-5 text-success mb-3">
                <i className="bi bi-check-circle-fill" />
              </div>
              <h1 className="h4 fw-bold">Subscription confirmed</h1>
              <p className="text-secondary mb-4">
                Your {selectedPlan.title} is ready to use.
              </p>
              <button
                type="button"
                className="subscribe-btn border-0 w-100"
                onClick={() => navigate("/subs")}
              >
                Done
              </button>
            </div>
          ) : (
            <form className="stripe-form" onSubmit={handleSubmit}>
              <label>
                Email
                <input type="email" placeholder="student@example.com" required />
              </label>

              <label>
                Card information
                <div className="card-field-group">
                  <div className="card-number-wrap">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 1234 1234 1234"
                      required
                    />
                    <div className="card-icons" aria-hidden="true">
                      <span>VISA</span>
                      <span className="mastercard" />
                      <span className="amex">AMEX</span>
                      <span className="discover">DISC</span>
                    </div>
                  </div>

                  <div className="card-subfields">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM / YY"
                      required
                    />
                    <div className="cvc-wrap">
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="CVC"
                        required
                      />
                      <i className="bi bi-credit-card-2-back" />
                    </div>
                  </div>
                </div>
              </label>

              <label>
                Cardholder name
                <input type="text" placeholder="Full name" required />
              </label>

              <label>
                Billing address
                <div className="region-field-group">
                  <select defaultValue="Palestine">
                    <option>Palestine</option>
                    <option>Jordan</option>
                    <option>United States</option>
                  </select>
                  <input type="text" placeholder="Address" required />
                </div>
              </label>

              <button type="submit" className="subscribe-btn border-0">
                {buttonLabel}
              </button>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
