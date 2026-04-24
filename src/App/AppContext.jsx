import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(0);
  const [loading, setLoading] = useState(false);

  // 🔥 CENTRAL CART SYNC FUNCTION
  const syncCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems.length);
  };

  // App load pe sync
  useEffect(() => {
    syncCart();
  }, []);

  // 🟢 ADD ITEM
  const addToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(item);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    syncCart();
  };

  // 🔴 REMOVE ITEM
  const removeFromCart = (id) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    syncCart();
  };

  // 🧹 CLEAR CART (checkout ke liye)
  const clearCart = () => {
    localStorage.removeItem("cart");
    syncCart();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        cart,
        setCart,
        syncCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);