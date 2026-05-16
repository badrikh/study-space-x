import UserNavbar from "../components/UserNavbar";
import MenuCard from "../components/MenuCard";
import OrderSidebar from "../components/OrderSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CoffeeShop() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState( 
    JSON.parse(localStorage.getItem("cartItems")) || []);

  useEffect(() => {
    getCategories();
    getmenuItems();
  }, []);

  const getCategories = async () => {
    const response = await axios.get(`http://localhost:3000/categories`);
    setCategories(response.data);
  };

  const getmenuItems = async () => {
    const response = await axios.get(`http://localhost:3000/menus/`);
    setMenuItems(response.data);
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ]);
    }
  };
  

  const updateQty=(id,chang)=>{
    const updatedcareItems=cartItems.map((item)=>{
      if(item.id===id){
        return{
           ...item,
            quantity:item.quantity + chang,
        }
      }

      return item;
    }).filter((item)=>item.quantity>0);
  setCartItems(updatedcareItems);
  }
  const filteredItems =selectedCategory === null? menuItems : 
  menuItems.filter((item) => item.categoryId === selectedCategory);

    useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);
 

  return (
    <div className="index-page min-vh-100">
      <UserNavbar absolute />

      <main className="index-page-content px-3 px-md-4 pb-5">
        <section className="coffee-shell">
          {/* Heading */}
          <div className="coffee-heading text-center mb-4">
            <h1 className="display-5 fw-bold mb-2">Coffee Shop</h1>
            <p className="text-muted mb-0">
              Order your favorite drinks and snacks directly from your study seat.
            </p>
          </div>
{/* Category Filters */}
<div className="coffee-filters d-flex flex-wrap gap-2 mb-4">
  <button
    onClick={() => setSelectedCategory(null)}
    type="button"
    className={`btn category-filter rounded-pill px-4 ${
      selectedCategory === null ? "btn-shop" : "btn-outline-secondary"
    }`}
  >
    All
  </button>

  {categories.map((category) => {
    return (
      <button
        key={category.id}
        type="button"
        onClick={() => setSelectedCategory(category.id)}
        className={`btn category-filter rounded-pill px-4 ${
          selectedCategory === category.id ? "btn-shop" : "btn-outline-secondary"
        }`}
      >
        {category.name}
      </button>
    );
  })}
</div>

          {/* Layout */}
          <div className="coffee-layout">
            {/* Menu Grid */}
            <div className="coffee-menu">
              <div className="row g-4">
                {filteredItems.map((item) => (
                  <div key={item.name} className="col-12 col-md-6 col-xl-4">
                    <MenuCard
                      {...item}
                      onAdd={() => addToCart(item)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Order Sidebar */}
            <aside className="coffee-order-panel">
            <OrderSidebar items={cartItems} onUpdateQty={updateQty} />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}