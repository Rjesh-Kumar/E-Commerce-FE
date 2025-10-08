

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useFilters } from "../contexts/FilterContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery, setCategoryFilters } = useFilters();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const handleSearch = (e) => {
    e.preventDefault();
    const lowerQuery = query.trim().toLowerCase();
    setSearchQuery(lowerQuery);
    if (lowerQuery !== "") setCategoryFilters([]); // clear categories
    navigate(`/products${lowerQuery !== "" ? `?search=${lowerQuery}` : ""}`);
  };

  // Sync input with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setQuery(searchParam);
      setSearchQuery(searchParam.toLowerCase());
    }
  }, [location.search, setSearchQuery]);

  // Clear searchQuery if input is cleared
  useEffect(() => {
    if (query.trim() === "") {
      setSearchQuery("");
      if (location.pathname === "/products") {
        navigate("/products", { replace: true });
      }
    }
  }, [query, setSearchQuery, navigate, location.pathname]);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light py-3">
      <div className="container">
        <h4
          className="fw-bold text-secondary mb-0"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          My Shopping Site
        </h4>

        {/* Hamburger Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

         {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}  

        <form className="d-flex mx-auto my-2 my-md-0" style={{ width: "300px" }} onSubmit={handleSearch}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control border-start-0"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </form>
        
         {/* Right Side Items */}
        <div className="d-flex align-items-center ms-auto">
          {/* <Link className="btn btn-secondary me-3" to="/login">Login</Link> */}
          <Link to="/wishlist" className="ms-3 text-decoration-none position-relative">
            <i className="bi bi-heart text-secondary fs-5"></i>
            {wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: "0.65rem", padding: "0.25em 0.35em" }}>
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="ms-4 text-decoration-none d-flex align-items-center">
            <div className="position-relative">
              <i className="bi bi-cart text-secondary fs-5"></i>
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: "0.65rem", padding: "0.25em 0.35em" }}>
                  {cart.length}
                </span>
              )}
            </div>
            <span className="ms-2 text-secondary fw-bold">Cart</span>
          </Link>
          <Link to="/profile">
            <div className="rounded-circle d-flex justify-content-center align-items-center ms-3" style={{ width: "25px", height: "25px", backgroundColor: "#024e06ff", color: "white", fontSize: "1.2rem" }}>
              <i className="bi bi-person"></i>
            </div>
          </Link>
        </div>
        </div>
      </div>
    </nav>
  );
}



