import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";
import PriceDetailsCard from "../components/PriceDetailsCard";

const CartPage = () => {
  const { cart, addItem, removeItem } = useCart();
  const { addItem: addToWishlist, wishlist, removeItem: removeFromWishlist } = useWishlist();
  const [selectedSizes, setSelectedSizes] = useState({});
  const navigate = useNavigate();

  const handleIncrease = (productId) => addItem(productId, 1);
  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) addItem(productId, -1);
    else removeItem(productId);
  };
  const handleRemove = (productId) => removeItem(productId);

  const handleMoveToWishlist = async (item) => {
    const alreadyInWishlist = wishlist.some(p => p._id === item.productId._id);
    if (alreadyInWishlist) removeFromWishlist(item.productId._id);
    else await addToWishlist(item.productId._id);
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    addItem(productId, 0, size); // 0 quantity = just update size
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container-fluid my-4 bg-light min-vh-100">
      <h5 className="text-center fw-bold py-3">My Cart ({cart.length})</h5>
      <div className="row justify-content-center px-2 px-md-5 gy-4">
        <div className="col-12 col-md-8">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.productId._id} className="card mb-3 border-0 shadow-sm w-100">
                <div className="row g-0">
                  <div className="col-12 col-md-5">
                    <img src={item.productId.image} alt={item.productId.name} className="img-fluid rounded-start w-100 h-100 object-fit-cover" style={{maxheight:"320px"}}/>
                  </div>
                  <div className="col-12 col-md-7">
                    <div className="card-body">
                      <h5>{item.productId.name}</h5>
                      <p className="fw-bold fs-4">${item.productId.price}&nbsp;<span className="fs-5 text-secondary" style={{textDecoration:"line-through"}}>${item.productId.originalPrice}</span></p>
                      <p className="fw-bold text-secondary" style={{marginTop:"-15px"}}>{item.productId.discount}</p>
                      {/* Size Selection */}
                      {item.productId.sizes?.length > 0 && (
                        <div className="mb-2">
                          <p className="fw-bold mb-3">Size:</p>
                          <div className="d-flex flex-wrap gap-2">
                          {item.productId.sizes.map(size => (
                            <button
                              key={size}
                              className={`btn btn-outline-secondary me-2 ${selectedSizes[item.productId._id] === size || item.size === size ? "btn-primary text-white" : ""}`}
                              onClick={() => handleSizeSelect(item.productId._id, size)}
                              style={{marginTop:"-15px"}}
                            >
                              {size}
                            </button>
                          ))}
                          </div>
                        </div>
                      )}
                      <div className="d-flex align-items-center gap-2 mt-2">
                        <p className="fw-bold mt-2">Quantity:</p>
                          <button
                            className="btn btn-outline-secondary rounded-circle p-0 d-flex justify-content-center align-items-center"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => handleDecrease(item.productId._id, item.quantity)}
                          >
                            -
                          </button>
                          <span className="fw-bold d-flex justify-content-center align-items-center" style={{ width: "20px", height: "20px" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-secondary rounded-circle p-0 d-flex justify-content-center align-items-center"
                            style={{ width: "20px", height: "20px" }}
                            onClick={() => handleIncrease(item.productId._id)}
                          >
                            +
                          </button>
                      </div>

                     
                      <button onClick={() => handleRemove(item.productId._id)} className="btn btn-danger w-100 mt-3">Remove</button>
                      <button
                        className={`btn mt-2 w-100 ${wishlist.some(p => p._id === item.productId._id) ? "btn-danger" : "btn-warning"}`}
                        onClick={() => handleMoveToWishlist(item)}
                      >
                        {wishlist.some(p => p._id === item.productId._id) ? "Remove from Wishlist" : "Move to Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-12 col-md-4">
          <PriceDetailsCard total={totalPrice} onCheckout={() => navigate("/checkout")} isDisabled={cart.length === 0} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
