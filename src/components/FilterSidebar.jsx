import React from "react";
import { useFilters } from "../contexts/FilterContext";
import { useProducts } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

const FilterSidebar = () => {
  const { categories } = useProducts();
  const { categoryFilters, toggleCategory, ratingFilter, setRatingFilter, sortPrice, setSortPrice, priceFilter, setPriceFilter, clearFilters } = useFilters();

  return (
    <div className=" card p-3">
      <div className="d-flex justify-content-between">
        <h5 className="fw-bold">Filters</h5>
        <Link style={{ textDecoration: "underline", color: "black" }} onClick={clearFilters}>
          Clear Filters
        </Link>
      </div>

      {/* Price Filter */}
      <div className="mb-3">
        <h6 className="fw-bold mt-4">Price</h6>
        <div className="d-flex justify-content-between">
          {[100, 200, 300, 400, 500].map((p) => <p key={p}>{p}</p>)}
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="50"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {/* Category Filter */}
      <div className="mb-3">
        <h6 className="fw-bold">Category</h6>
        {categories.map((cat) => (
          <div key={cat._id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={categoryFilters.includes(cat.name.toLowerCase())}
              onChange={() => toggleCategory(cat.name)}
              id={cat._id}
            />
            <label className="form-check-label" htmlFor={cat._id}>{cat.name}</label>
          </div>
        ))}
      </div>

      {/* Rating Filter */}
      <div className="mb-3">
        <h6 className="fw-bold mt-4">Rating</h6>
        {[1, 2, 3, 4].map((r) => (
          <div className="form-check" key={r}>
            <input
              className="form-check-input"
              type="radio"
              name="ratingFilter"
              value={r}
              checked={ratingFilter === r}
              onChange={() => setRatingFilter(r)}
              id={`rating-${r}`}
            />
            <label className="form-check-label" htmlFor={`rating-${r}`}>{r} Stars & above</label>
          </div>
        ))}
      </div>

      {/* Sort Filter */}
      <div className="mb-3">
        <h6 className="fw-bold">Sort By</h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortPrice"
            checked={sortPrice === "lowToHigh"}
            onChange={() => setSortPrice("lowToHigh")}
            id="lowToHigh"
          />
          <label className="form-check-label" htmlFor="lowToHigh">Price - Low to High</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sortPrice"
            checked={sortPrice === "highToLow"}
            onChange={() => setSortPrice("highToLow")}
            id="highToLow"
          />
          <label className="form-check-label" htmlFor="highToLow">Price - High to Low</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;