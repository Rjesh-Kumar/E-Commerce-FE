import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCart, addToCart, removeFromCart } from "../utils/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const cartData = await fetchCart(); // should return { cart: [...] }
      setCart(cartData || []);
    } catch (err) {
      console.error("Failed to load cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (productId, quantity = 1, size = null) => {
    setLoading(true);
    try {
      const updatedCart = await addToCart(productId, quantity, size);
      setCart(updatedCart || []);
    } catch (err) {
      console.error("Failed to add item:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (productId) => {
    setLoading(true);
    try {
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart || []);
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        loading,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
