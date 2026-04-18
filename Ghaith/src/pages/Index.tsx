import { useState } from "react";
import MenuCard from "@/components/MenuCard";
import OrderSidebar, { type OrderItem } from "@/components/OrderSidebar";

import latteImg from "@/assets/latte.jpg";
import espressoImg from "@/assets/espresso.jpg";
import cappuccinoImg from "@/assets/cappuccino.jpg";
import hotTeaImg from "@/assets/hot-tea.jpg";
import matchaLatteImg from "@/assets/matcha-latte.jpg";
import croissantImg from "@/assets/croissant.jpg";
import icedCoffeeImg from "@/assets/iced-coffee.jpg";
import americanoImg from "@/assets/americano.jpg";
import mochaImg from "@/assets/mocha.jpg";
import flatWhiteImg from "@/assets/flat-white.jpg";
import caramelMacchiatoImg from "@/assets/caramel-macchiato.jpg";
import coldBrewImg from "@/assets/cold-brew.jpg";
import affogatoImg from "@/assets/affogato.jpg";
import chaiLatteImg from "@/assets/chai-latte.jpg";
import hotChocolateImg from "@/assets/hot-chocolate.jpg";
import muffinImg from "@/assets/muffin.jpg";
import brownieImg from "@/assets/brownie.jpg";
import cinnamonRollImg from "@/assets/cinnamon-roll.jpg";
import icedMatchaImg from "@/assets/iced-matcha.jpg";
import bananaBreadImg from "@/assets/banana-bread.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import avocadoToastImg from "@/assets/avocado-toast.jpg";
import smoothieImg from "@/assets/smoothie.jpg";
import cookieImg from "@/assets/cookie.jpg";
import chocolateMilkshakeImg from "@/assets/chocolate-milkshake.jpg";
import vanillaMilkshakeImg from "@/assets/vanilla-milkshake.jpg";
import strawberryMilkshakeImg from "@/assets/strawberry-milkshake.jpg";
import oreoMilkshakeImg from "@/assets/oreo-milkshake.jpg";
import caramelMilkshakeImg from "@/assets/caramel-milkshake.jpg";

const menuItems = [
  { name: "Latte", price: 4.50, description: "Smooth espresso with steamed milk", image: latteImg, category: "Coffee" },
  { name: "Espresso", price: 3.00, description: "Strong and bold coffee shot", image: espressoImg, category: "Coffee" },
  { name: "Cappuccino", price: 4.00, description: "Espresso with foamy milk", image: cappuccinoImg, category: "Coffee" },
  { name: "Americano", price: 3.50, description: "Espresso diluted with hot water", image: americanoImg, category: "Coffee" },
  { name: "Mocha", price: 5.00, description: "Espresso with chocolate & cream", image: mochaImg, category: "Coffee" },
  { name: "Flat White", price: 4.50, description: "Double espresso with velvety microfoam", image: flatWhiteImg, category: "Coffee" },
  { name: "Affogato", price: 5.50, description: "Vanilla gelato drowned in espresso", image: affogatoImg, category: "Coffee" },
  { name: "Double Espresso", price: 4.00, description: "Two shots of rich espresso", image: espressoImg, category: "Coffee" },

  { name: "Hot Tea", price: 2.50, description: "Classic black or herbal tea", image: hotTeaImg, category: "Tea" },
  { name: "Matcha Latte", price: 5.00, description: "Premium green tea latte", image: matchaLatteImg, category: "Tea" },
  { name: "Chai Latte", price: 4.50, description: "Spiced tea with steamed milk", image: chaiLatteImg, category: "Tea" },
  { name: "Green Tea", price: 2.50, description: "Light and refreshing Japanese green tea", image: hotTeaImg, category: "Tea" },
  { name: "Earl Grey", price: 3.00, description: "Aromatic bergamot-infused black tea", image: hotTeaImg, category: "Tea" },
  { name: "Jasmine Tea", price: 3.00, description: "Fragrant jasmine-scented green tea", image: hotTeaImg, category: "Tea" },

  { name: "Hot Chocolate", price: 4.00, description: "Rich cocoa with marshmallows", image: hotChocolateImg, category: "Hot Drinks" },
  { name: "Caramel Macchiato", price: 5.50, description: "Vanilla, milk, espresso & caramel", image: caramelMacchiatoImg, category: "Hot Drinks" },
  { name: "Spiced Chai", price: 4.50, description: "Warm spiced milk with cinnamon", image: chaiLatteImg, category: "Hot Drinks" },
  { name: "Turmeric Latte", price: 5.00, description: "Golden milk with turmeric & honey", image: matchaLatteImg, category: "Hot Drinks" },
  { name: "Warm Apple Cider", price: 4.00, description: "Spiced apple cider served warm", image: hotChocolateImg, category: "Hot Drinks" },

  { name: "Iced Coffee", price: 3.50, description: "Chilled brewed coffee over ice", image: icedCoffeeImg, category: "Cold Drinks" },
  { name: "Cold Brew", price: 4.00, description: "Slow-steeped for smooth, bold flavor", image: coldBrewImg, category: "Cold Drinks" },
  { name: "Iced Latte", price: 5.00, description: "Espresso and cold milk over ice", image: icedCoffeeImg, category: "Cold Drinks" },
  { name: "Iced Matcha", price: 5.50, description: "Chilled matcha with oat milk", image: icedMatchaImg, category: "Cold Drinks" },
  { name: "Berry Smoothie", price: 5.50, description: "Mixed berries blended with yogurt", image: smoothieImg, category: "Cold Drinks" },
  { name: "Mango Smoothie", price: 5.50, description: "Tropical mango blended with coconut", image: smoothieImg, category: "Cold Drinks" },
  { name: "Iced Americano", price: 3.50, description: "Espresso with cold water over ice", image: coldBrewImg, category: "Cold Drinks" },

  { name: "Chocolate Milkshake", price: 6.00, description: "Rich chocolate blended with ice cream", image: chocolateMilkshakeImg, category: "Milkshakes" },
  { name: "Vanilla Milkshake", price: 5.50, description: "Classic creamy vanilla shake", image: vanillaMilkshakeImg, category: "Milkshakes" },
  { name: "Strawberry Milkshake", price: 6.00, description: "Fresh strawberry blended shake", image: strawberryMilkshakeImg, category: "Milkshakes" },
  { name: "Oreo Milkshake", price: 6.50, description: "Cookies & cream indulgence", image: oreoMilkshakeImg, category: "Milkshakes" },
  { name: "Caramel Milkshake", price: 6.50, description: "Salted caramel with whipped cream", image: caramelMilkshakeImg, category: "Milkshakes" },

  { name: "Croissant", price: 3.50, description: "Buttery and flaky pastry", image: croissantImg, category: "Food" },
  { name: "Blueberry Muffin", price: 3.00, description: "Fresh-baked with real blueberries", image: muffinImg, category: "Food" },
  { name: "Chocolate Brownie", price: 3.50, description: "Fudgy dark chocolate brownie", image: brownieImg, category: "Food" },
  { name: "Cinnamon Roll", price: 4.00, description: "Warm roll with cream cheese icing", image: cinnamonRollImg, category: "Food" },
  { name: "Banana Bread", price: 3.50, description: "Moist banana bread with walnuts", image: bananaBreadImg, category: "Food" },
  { name: "Turkey Sandwich", price: 7.50, description: "Turkey, cheese, lettuce & tomato", image: sandwichImg, category: "Food" },
  { name: "Avocado Toast", price: 6.50, description: "Smashed avocado on sourdough", image: avocadoToastImg, category: "Food" },
  { name: "Chocolate Chip Cookie", price: 2.50, description: "Classic soft-baked cookie", image: cookieImg, category: "Food" },
  { name: "Almond Croissant", price: 4.00, description: "Croissant filled with almond cream", image: croissantImg, category: "Food" },
  { name: "Ham & Cheese Sandwich", price: 7.00, description: "Smoked ham with Swiss cheese", image: sandwichImg, category: "Food" },
  { name: "Double Choc Muffin", price: 3.50, description: "Rich chocolate muffin with chips", image: brownieImg, category: "Food" },
  { name: "Oatmeal Cookie", price: 2.50, description: "Hearty oat cookie with raisins", image: cookieImg, category: "Food" },
];

const categories = ["All Items", "Coffee", "Tea", "Hot Drinks", "Cold Drinks", "Milkshakes", "Food"];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const filtered = activeCategory === "All Items" ? menuItems : menuItems.filter((i) => i.category === activeCategory);

  const addToOrder = (name: string, price: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) return prev.map((i) => (i.name === name ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { name, price, quantity: 1 }];
    });
  };

  const updateQty = (name: string, delta: number) => {
    setOrderItems((prev) =>
      prev.map((i) => (i.name === name ? { ...i, quantity: i.quantity + delta } : i)).filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (name: string) => {
    setOrderItems((prev) => prev.filter((i) => i.name !== name));
  };

  return (
    <div className="min-vh-100 bg-light">
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Coffee Shop</h1>
          <p className="text-muted">Order directly from your seat</p>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn btn-sm rounded-pill px-3 ${
                activeCategory === cat ? "btn-shop" : "btn-shop-outline"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row g-4">
          <div className={orderItems.length > 0 ? "col-lg-8" : "col-12"}>
            <div className="row g-3">
              {filtered.map((item) => (
                <div key={item.name} className={orderItems.length > 0 ? "col-sm-6" : "col-sm-6 col-md-4"}>
                  <MenuCard
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    onAdd={() => addToOrder(item.name, item.price)}
                  />
                </div>
              ))}
            </div>
          </div>
          {orderItems.length > 0 && (
            <div className="col-lg-4">
              <OrderSidebar items={orderItems} onRemove={removeItem} onUpdateQty={updateQty} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
