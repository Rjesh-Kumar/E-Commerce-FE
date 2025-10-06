import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAddresses } from "../contexts/AddressContext";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../utils/api";

const CheckoutPage = () => {
  const location = useLocation();
  const buyNowProduct = location.state?.product; // for Buy Now
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const { cart, addItem, removeItem } = useCart();
  const { addresses, addNewAddress, updateAddress, removeAddress } = useAddresses();

  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Add new address
  const handleAddAddress = async () => {
    const added = await addNewAddress(newAddress);
    setSelectedAddress(added);
    setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Please select an address");

    const productsToOrder = buyNowProduct
      ? [{ productId: buyNowProduct._id, quantity, size: buyNowProduct.size || null }]
      : cart.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          size: item.size || null,
        }));

    const totalAmount = productsToOrder.reduce(
      (sum, item) => {
        const product = buyNowProduct ? buyNowProduct : cart.find(c => c.productId._id === item.productId).productId;
        return sum + product.price * item.quantity;
      },
      0
    );

    try {
      await createOrder("user123", {
        products: productsToOrder,
        totalAmount,
        addressId: selectedAddress._id,
      });

      // Clear cart items if it’s a cart order
      if (!buyNowProduct) {
        for (let item of cart) {
          await removeItem(item.productId._id);
        }
      }

      alert("Order Placed Successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Cart quantity handlers
  const handleIncrease = (productId) => addItem(productId, 1);
  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) addItem(productId, -1);
    else removeItem(productId);
  };

  return (
    <div className="container my-4">
      <h4 className="mb-4 text-center fw-bold">Checkout</h4>
      <div className="row">
        {/* Left Column: Buy Now / Cart */}
        <div className="col-lg-6 col-12 mb-4">
          {buyNowProduct && (
            <div className="card mb-3">
              <img
                src={buyNowProduct.image}
                alt={buyNowProduct.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{buyNowProduct.name}</h5>
                {buyNowProduct.size && <p className="text-muted mb-1">Size: {buyNowProduct.size}</p>}
                <p className="card-text">
                  Price: ${buyNowProduct.price} x {quantity} = ${buyNowProduct.price * quantity}
                </p>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <label className="mb-0">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="form-control w-25"
                  />
                </div>
                <button className="btn btn-danger w-100" onClick={() => navigate(-1)}>
                  Cancel Order
                </button>
              </div>
            </div>
          )}

          {!buyNowProduct && cart.length > 0 && (
            <div className="card p-3">
              <h5 className="fw-bold mb-3">Your Cart</h5>
              {cart.map(item => (
                <div key={item.productId._id} className="mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.productId.image}
                      alt={item.productId.name}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div className="flex-grow-1 ms-3">
                      <h6 className="fw-bold">{item.productId.name}</h6>
                      {item.size && <p className="text-muted mb-1">Size: {item.size}</p>}

                      <div className="d-flex align-items-center gap-2 mt-2">
                        <button
                          className="btn btn-outline-secondary rounded-circle p-0"
                          style={{ width: "25px", height: "25px" }}
                          onClick={() => handleDecrease(item.productId._id, item.quantity)}
                        >
                          -
                        </button>
                        <span
                          className="fw-bold d-flex align-items-center justify-content-center btn btn-outline-secondary"
                          style={{ width: "30px", height: "25px", pointerEvents: "none" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-outline-secondary rounded-circle p-0"
                          style={{ width: "25px", height: "25px" }}
                          onClick={() => handleIncrease(item.productId._id)}
                        >
                          +
                        </button>
                        <span className="ms-auto fw-bold">
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <button className="btn btn-danger btn-sm mt-2 w-100" onClick={() => removeItem(item.productId._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total Amount:</span>
                <span>${cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Address Form */}
        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <h6 className="fw-bold">{editingAddress ? "Update Address" : "Add New Address"}</h6>
            {["street","city","state","zip","country"].map(field => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control mb-2"
                value={newAddress[field]}
                onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
              />
            ))}
            <div className="d-flex gap-2">
              <button
                className="btn btn-success flex-grow-1"
                onClick={async () => {
                  if (editingAddress) {
                    await updateAddress(editingAddress._id, newAddress);
                  } else {
                    await handleAddAddress();
                  }
                  setEditingAddress(null);
                  setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
                }}
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </button>
              {editingAddress && (
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingAddress(null);
                    setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Address List */}
          {addresses.map(addr => (
            <div
              key={addr._id}
              className={`form-check mb-2 p-2 rounded border`}
              style={{ cursor: "pointer", backgroundColor: selectedAddress?._id === addr._id ? "#f0f8ff" : "" }}
              onClick={() => setSelectedAddress(selectedAddress?._id === addr._id ? null : addr)}
            >
              <input type="radio" name="address" checked={selectedAddress?._id === addr._id} readOnly />
              <label className="form-check-label ms-2">
                {addr.street}, {addr.city}, {addr.state} - {addr.zip}, {addr.country}
              </label>
              <button
                className="btn btn-sm btn-primary ms-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingAddress(addr);
                  setNewAddress({ ...addr });
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Are you sure?")) {
                    await removeAddress(addr._id);
                    if (selectedAddress?._id === addr._id) setSelectedAddress(null);
                  }
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            className="btn btn-primary mt-3 w-100"
            onClick={handlePlaceOrder}
            disabled={!selectedAddress}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
