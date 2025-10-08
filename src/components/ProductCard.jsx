import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useToast } from "../contexts/ToastContext"; // ✅ Import useToast

const ProductCard = ({ product }) => {
  const { cart, addItem } = useCart();
  const { wishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlist();
  const { showToast } = useToast(); // ✅ Access toast function
  const navigate = useNavigate();

  const inCart = cart.some((p) => p.productId._id === product._id);
  const inWishlist = wishlist.some((p) => p._id === product._id);

  const handleCartClick = () => {
    if (inCart) {
      navigate("/cart");
    } else {
      addItem(product._id);
      showToast(`${product.name} added to cart! 🛒`, "success"); // ✅ Toast here
    }
  };

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
      showToast(`${product.name} removed from wishlist ❤️`, "warning"); // ✅ Toast here
    } else {
      addToWishlist(product._id);
      showToast(`${product.name} added to wishlist 💖`, "success"); // ✅ Toast here
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card" style={{ minHeight: "200px" }}>
          <div className="row g-0">
            {/* Image on the left */}
            <div className="col-12 col-md-6">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  className="img-fluid"
                  alt={product.image}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </Link>
            </div>

            {/* Info on the right */}
            <div className="col-12 col-md-6 bg-light">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text fw-bold fs-4">
                    ${product.price}{" "}
                    <span
                      className="fs-5 text-secondary"
                      style={{ textDecoration: "line-through" }}
                    >
                      ${product.originalPrice}
                    </span>
                  </p>
                  <p className="card-text fw-bold text-secondary">{product.discount}</p>
                </div>

                <div className="justify-content-between mt-3">
                  <button
                    className="btn w-100"
                    onClick={handleCartClick}
                    style={{
                      backgroundColor: inCart ? "#d1df13ea" : "#0cbd06c4",
                    }}
                  >
                    {inCart ? "Go to Cart" : "Add to Cart"}
                  </button>

                  <button
                    className="btn mt-2 w-100"
                    onClick={handleWishlistClick}
                    style={{
                      backgroundColor: inWishlist ? "#c52253ef" : "#33b5ccff",
                      color: "black",
                    }}
                  >
                    {inWishlist ? "Remove Wishlist" : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
