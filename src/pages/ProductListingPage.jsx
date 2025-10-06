import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useFilters } from "../contexts/FilterContext";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";

const ProductListingPage = () => {
  const { products, loading } = useProducts();
  const { categoryFilters, setCategoryFilters, ratingFilter, sortPrice, priceFilter, searchQuery, setSearchQuery } = useFilters();
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const search = params.get("search");

    if (search && search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      setCategoryFilters([]);
      setCategoryName("");
      setSearchQuery(lowerSearch);
    } else if (category) {
      const lowerCat = category.toLowerCase();
      setCategoryFilters([lowerCat]);
      setCategoryName(category);
      setSearchQuery("");
    }
    // ❌ Removed else block (no reset)
  }, [location.search, setCategoryFilters, setSearchQuery]);

  if (loading) return <Loader />;

  let filtered = [...products];

  // Category filter
  if (categoryFilters.length > 0) {
    filtered = filtered.filter((p) =>
      categoryFilters.includes(p.category.name.toLowerCase())
    );
  }

  // Search filter
  // NEW - Option 3
if (searchQuery && searchQuery.trim() !== "") {
  const words = searchQuery.toLowerCase().split(/\s+/); // split search into words
  filtered = filtered.filter((p) => {
    const categoryMatch = p.category.name.toLowerCase() === searchQuery.toLowerCase();
    const nameWords = p.name.toLowerCase().split(/\s+/);
    // check if all search words exist in product name
    const allWordsMatch = words.every((w) => nameWords.includes(w));
    return categoryMatch || allWordsMatch;
  });
}



  if (ratingFilter > 0) filtered = filtered.filter((p) => p.rating >= ratingFilter);
  if (priceFilter) filtered = filtered.filter((p) => p.price <= priceFilter);
  if (sortPrice === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
  else if (sortPrice === "highToLow") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="container-fluid mt-4">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-12 col-md-3 mb-3 mb-md-0"><FilterSidebar /></div>
        <div className="col-12 col-md-9 p-4 bg-light d-flex flex-column">
          <div className="d-flex mb-3 align-items-center">
            <h5 className="fw-bold">{categoryName ? `${categoryName} Products` : "All Products"}</h5>
            {categoryName && (
              <button
                className="btn btn-link ms-3"
                onClick={() => {
                  navigate("/products");
                  setCategoryFilters([]);
                  setCategoryName("");
                }}
              >
                All Products
              </button>
            )}
            &nbsp;<span>(show {filtered.length} products)</span>
          </div>
          <div className="row g-4">
            {filtered.map((product) => (
              <div className="col-12 col-sm-6" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;