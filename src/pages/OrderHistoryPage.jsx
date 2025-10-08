import React, { useEffect, useState } from "react";
import { getOrders } from "../utils/api";
import { useToast } from "../contexts/ToastContext";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders("user123"); // Replace with dynamic userId if available
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      showToast("Failed to fetch orders.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-4">No orders placed yet.</p>;

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      setOrders(orders.filter((order) => order._id !== orderId));
      showToast("Order deleted successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete order.", "error");
    }
  };

  return (
    <div className="container my-4">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order._id} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <strong>Order ID:</strong> {order._id} | <strong>Status:</strong> {order.status} |{" "}
              <strong>Total:</strong> ${order.totalAmount}
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteOrder(order._id)}
            >
              Cancel Order
            </button>
          </div>
          <div className="card-body">
            <h5>Delivery Address:</h5>
            {order.addressId && (
              <p>
                {order.addressId.street}, {order.addressId.city}, {order.addressId.state} -{" "}
                {order.addressId.zip}, {order.addressId.country}
              </p>
            )}

            <h5>Products:</h5>
            {order.products.map((item) => (
              <div key={item.productId._id} className="d-flex justify-content-between mb-2">
                <span>
                  {item.productId.name} (x{item.quantity}){" "}
                  {item.size ? `| Size: ${item.size}` : ""}
                </span>
                <span>${item.productId.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;
