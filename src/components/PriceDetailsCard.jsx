import React from "react";
import { useCart } from "../contexts/CartContext";

const PriceDetailsCard = ({ onCheckout, isDisabled }) => {
  const { cart } = useCart(); // get cart from context

  // Total price before discount
  const price = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  // Total discount based on item discount field
  const discount = cart.reduce((acc, item) => {
    // Assume item.productId.discount is in percentage like "10%" or number like 20
    if (!item.productId.discount) return acc;

    if (typeof item.productId.discount === "string" && item.productId.discount.includes("%")) {
      const percent = parseFloat(item.productId.discount);
      return acc + (item.productId.price * percent / 100) * item.quantity;
    } else {
      return acc + item.productId.discount * item.quantity;
    }
  }, 0);

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery charges: dynamic example
  let deliveryCharges = 0;
  if (itemCount > 0 && itemCount < 2) deliveryCharges = 40;
  else if (itemCount >= 2 && itemCount <= 3) deliveryCharges = 20;
  else if (itemCount > 3) deliveryCharges = 0;

  const total = price - discount + deliveryCharges;

  return (
    <div className="card p-3 border-0" style={{ width: "300px" }}>
      <h6 className="fw-bold">PRICE DETAILS</h6>
      <hr />
      <p className="d-flex justify-content-between">
          <span>Price ({itemCount} {itemCount > 1 ? "items" : "item"})</span>
          <span>${price}</span>
      </p>
      <p className="d-flex justify-content-between">
        <span>Discount</span> -${discount}</p>
        {cart.length > 0 && (
      <p className="d-flex justify-content-between">
        <span>Delivery Charges</span>
        {deliveryCharges === 0 ? (
          <span className="text-success">Free</span>
        ) : (
          `$${deliveryCharges}`
        )}
      </p>
      )}
      <hr />
      <p className="d-flex justify-content-between">
        <span className="fw-bold">TOTAL AMOUNT:</span> <span className="fw-bold">${total}
          </span> 
      </p>
      <hr />
      <p className="text-success fw-bold">
        You will save ${discount} on this order
      </p>
      <button
        className="btn btn-primary w-100"
        onClick={onCheckout}
        disabled={isDisabled || cart.length === 0}
      >
        Place Order
      </button>
    </div>
  );
};

export default PriceDetailsCard;
