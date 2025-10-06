import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "../utils/api";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const prods = await fetchProducts();
    setProducts(prods);
    setLoading(false);
  };

  const loadCategories = async () => {
    const cats = await fetchCategories();
    setCategories(cats);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, categories, loading, refreshProducts: loadProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
