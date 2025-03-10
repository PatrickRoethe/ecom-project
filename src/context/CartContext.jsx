import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [notification, setNotification] = useState(null);

  // 🔥 Lagrer cart i localStorage, men **kun når cart faktisk endres!**
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]); // 🎯 Kjører kun når cart oppdateres!

  // 🛒 Legg til i handlekurven
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setNotification(`✅ ${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  // ❌ Fjern fra handlekurv
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 🧹 **Tøm handlekurven (bare når checkout er fullført)**
  const clearCart = () => {
    setCart([]); // ✅ Tømmer cart
    localStorage.removeItem("cart"); // ✅ Fjerner cart fra localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        setCart,
        clearCart,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
