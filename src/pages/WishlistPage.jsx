import React from "react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import Loader from "../components/Loader";

const WishlistPage = () => {
  const { wishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (!wishlist) return <Loader />;

  return (
    <div className="container-fluid my-4">
      <h4 className="fw-bold text-center mb-4">My Wishlist</h4>

      {wishlist.length === 0 ? (
        <p className="text-center">No items in wishlist.</p>
      ) : (
        // ✅ Restored your desktop spacing, but now responsive
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4 mx-0 mx-md-5">
          {wishlist.map((p) => (
            <div key={p._id} className="col">
              <div
                className="card position-relative text-center border-0 shadow-sm h-100"
                style={{ minHeight: "350px" }}
              >
                {/* ❤️ Wishlist Remove Button */}
                <button
                  className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                  style={{ zIndex: 2 }}
                  onClick={() => removeItem(p._id)}
                >
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>

                {/* 🖼️ Product Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top img-fluid"
                  style={{ height: "240px", objectFit: "cover" }}
                />

                {/* 📦 Card Body */}
                <div className="card-body d-flex flex-column align-items-center p-0">
                  <h6 className="card-title mt-2 text-truncate" style={{ maxWidth: "200px" }}>
                    {p.name}
                  </h6>
                  <p className="fw-bold">${p.price}</p>
                  <button
                    className="btn btn-primary w-100 mt-auto rounded-0"
                    onClick={() => addItem(p._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
