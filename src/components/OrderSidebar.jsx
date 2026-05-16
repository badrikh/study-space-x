import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderSidebar({ items, onUpdateQty, setCartItems }) {
  let total = 0;
  const navigate = useNavigate();

  items.forEach((item) => {
    total = total + item.price * item.quantity;
  });

  const handlePlaceOrder = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));

      const response = await axios.post( "http://localhost:3000/orders/",
        {
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Order placed successfully");
        localStorage.removeItem("cartItems");
         navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="card shadow-sm order-sidebar">
      <div className="card-body">
        <h5 className="card-title fw-semibold d-flex align-items-center gap-2 mb-3">
          <ShoppingCart size={20} />
          Your Order
        </h5>

        {items.length === 0 && (
          <div className="text-center py-4 text-muted">
            <div style={{ fontSize: "2rem" }} className="mb-2">
              Cart
            </div>
            <p className="mb-0">Your cart is empty</p>
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="mb-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center small mb-2"
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center border rounded">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="qty-btn"
                      >
                        -
                      </button>

                      <span className="px-2">{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <span>{item.name}</span>
                  </div>

                  <span className="fw-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              className="btn btn-shop w-100 mt-3"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}