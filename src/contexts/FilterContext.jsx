import React, { createContext, useContext, useState, useCallback } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [categoryFilters, setCategoryFiltersState] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortPrice, setSortPrice] = useState("");
  const [priceFilter, setPriceFilter] = useState(500);
  const [searchQuery, setSearchQueryState] = useState("");

  const setCategoryFilters = useCallback((cats) => {
    if (!Array.isArray(cats)) return;
    setCategoryFiltersState(cats.map((c) => c.toLowerCase()));
  }, []);

  const toggleCategory = useCallback((category) => {
    const lower = category.toLowerCase();
    setCategoryFiltersState((prev) =>
      prev.includes(lower) ? prev.filter((c) => c !== lower) : [...prev, lower]
    );
  }, []);

  const setSearchQuery = useCallback((query) => {
    setSearchQueryState(query.toLowerCase());
  }, []);

  const clearFilters = useCallback(() => {
    setCategoryFiltersState([]);
    setRatingFilter(0);
    setSortPrice("");
    setPriceFilter(500);
    setSearchQueryState("");
  }, []);

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        ratingFilter,
        sortPrice,
        priceFilter,
        searchQuery,
        toggleCategory,
        setCategoryFilters,
        setRatingFilter,
        setSortPrice,
        setPriceFilter,
        setSearchQuery,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
