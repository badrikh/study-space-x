import { ShoppingCart } from "lucide-react";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderSidebarProps {
  items: OrderItem[];
  onRemove: (name: string) => void;
  onUpdateQty: (name: string, delta: number) => void;
}

const OrderSidebar = ({ items, onRemove, onUpdateQty }: OrderSidebarProps) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="card shadow-sm order-sidebar">
      <div className="card-body">
        <h5 className="card-title fw-semibold d-flex align-items-center gap-2 mb-3">
          <ShoppingCart size={20} /> Your Order
        </h5>
        {items.length === 0 ? (
          <div className="text-center py-4 text-muted">
            <div style={{ fontSize: '2rem' }} className="mb-2">🛒</div>
            <p className="mb-0">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              {items.map((item) => (
                <div key={item.name} className="d-flex justify-content-between align-items-center small mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-flex align-items-center border rounded">
                      <button onClick={() => onUpdateQty(item.name, -1)} className="qty-btn">−</button>
                      <span className="px-1">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.name, 1)} className="qty-btn">+</button>
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <span className="fw-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-shop w-100 mt-3">Place Order</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderSidebar;
