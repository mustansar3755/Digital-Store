import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(0);
  const [loading, setLoading] = useState(false);

  // 1. Jab App load ho, tab localStorage se purana count nikalna
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart.length);
  }, []);

  // 2. Sahi handleCart function jo count ko sync rakhe
  const handleCart = (newCount) => {
    // Agar hum directly newCount bhej rahe hain (recommended)
    if (typeof newCount === "number") {
      setCart(newCount);
    } else {
      // Agar purana tareeka use karna hai toh localStorage se length nikalen
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart.length);
    }
  };
  return (
    <AppContext.Provider
      value={{ user, setUser, loading, setLoading, cart, setCart, handleCart }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAuth = () => useContext(AppContext);
