import React, { useState } from "react";
import { useAddresses } from "../contexts/AddressContext";
import Loader from "../components/Loader";

const AddressPage = () => {
  const { addresses, addNewAddress, removeAddress, loading } = useAddresses();
  const [form, setForm] = useState({ street: "", city: "", state: "", zip: "", country: "" });

  if (loading) return <Loader />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdd = (e) => {
    e.preventDefault();
    addNewAddress(form);
    setForm({ street: "", city: "", state: "", zip: "", country: "" });
  };

  return (
    <div className="container mt-4">
      <h3>Manage Addresses</h3>

      <form onSubmit={handleAdd} className="mb-4">
        {["street","city","state","zip","country"].map(field => (
          <input
            key={field}
            className="form-control mb-2"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
          />
        ))}
        <button className="btn btn-primary">Add Address</button>
      </form>

      {addresses.length === 0 ? <p>No addresses added.</p> :
        addresses.map(addr => (
          <div key={addr._id} className="card p-2 mb-2 d-flex justify-content-between flex-row">
            <p>{addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</p>
            <button className="btn btn-outline-danger" onClick={() => removeAddress(addr._id)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default AddressPage;
