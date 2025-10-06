import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchWishlist, addToWishlist, removeFromWishlist } from "../utils/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWishlist = async () => {
    setLoading(true);
    const wishlistData = await fetchWishlist();
    setWishlist(wishlistData);
    setLoading(false);
  };

  const addItem = async (productId) => {
    setLoading(true);
    const updatedWishlist = await addToWishlist(productId);
    setWishlist(updatedWishlist);
    setLoading(false);
  };

  const removeItem = async (productId) => {
    setLoading(true);
    const updatedWishlist = await removeFromWishlist(productId);
    setWishlist(updatedWishlist);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addItem, removeItem, loading, refreshWishlist: loadWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
