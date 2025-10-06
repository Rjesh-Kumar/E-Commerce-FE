import React, { useState } from "react";
import { useAddresses } from "../contexts/AddressContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { addresses, addNewAddress, updateAddress, removeAddress, loading } = useAddresses();
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  if (loading) return <Loader />;

  const handleAddOrUpdate = async () => {
    if (editingAddress) {
      await updateAddress(editingAddress._id, newAddress);
      setEditingAddress(null);
    } else {
      await addNewAddress(newAddress);
    }
    setNewAddress({ street: "", city: "", state: "", zip: "", country: "" });
  };

  return (
    <div className="container mt-4">
     <div className="d-flex justify-content-between align-items-start mb-3">
  {/* User Info */}
  <div>
    <h3 className="fw-bold mb-2">User Profile</h3>
    <p className="mb-1"><strong>Name:</strong> John Doe</p>
    <p className="mb-1"><strong>Email:</strong> john@example.com</p>
    <p className="mb-0"><strong>Phone:</strong> +1-7245896402</p>
  </div>

  {/* Orders Button */}
  <div>
    <Link to="/orders" className="btn btn-success">
      My Orders
    </Link>
  </div>
</div>

      <hr />

      <h4 className="fw-bold">Addresses</h4>
      {addresses.length === 0 && <p>No addresses added.</p>}
      {addresses.map((addr) => (
  <div key={addr._id} className="mb-2 border p-2 rounded d-flex justify-content-between align-items-center">
    <span>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</span>
    <div>
      <button
        className="btn btn-sm btn-primary me-2"
        onClick={() => {
          setEditingAddress(addr);
          setNewAddress({ ...addr });
        }}
      >
        Edit
      </button>
      <button
        className="btn btn-sm btn-danger"
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete this address?")) {
            await removeAddress(addr._id);
            if (selectedAddress?._id === addr._id) setSelectedAddress(null);
          }
        }}
      >
        Delete
      </button>
    </div>
  </div>
))}


      <hr />
      <h5 className="fw-bold">{editingAddress ? "Update Address" : "Add New Address"}</h5>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Street"
          className="form-control mb-2"
          value={newAddress.street}
          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="form-control mb-2"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          className="form-control mb-2"
          value={newAddress.state}
          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
        />
        <input
          type="text"
          placeholder="ZIP"
          className="form-control mb-2"
          value={newAddress.zip}
          onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          className="form-control mb-2"
          value={newAddress.country}
          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
        />
        <button className="btn btn-success me-2" onClick={handleAddOrUpdate}>
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
  );
};

export default ProfilePage;
