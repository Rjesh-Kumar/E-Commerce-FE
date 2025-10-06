import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAddresses, addAddress, deleteAddress, updateAddress as apiUpdateAddress } from "../utils/api";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all addresses
  const loadAddresses = async () => {
    setLoading(true);
    try {
      const addr = await fetchAddresses();
      setAddresses(addr);
    } catch (err) {
      console.error("Failed to load addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new address
  const addNewAddress = async (address) => {
    setLoading(true);
    try {
      const newAddr = await addAddress(address);
      setAddresses((prev) => [...prev, newAddr]);
      return newAddr;
    } catch (err) {
      console.error("Failed to add address:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update existing address
 const updateAddress = async (id, updatedData) => {
  try {
    const updatedAddr = await apiUpdateAddress(id, updatedData); // api.js ka function
    setAddresses((prev) =>
      prev.map((a) => (a._id === id ? updatedAddr : a))
    );
    return updatedAddr;
  } catch (err) {
    console.error("Failed to update address:", err);
  }
};

  // Remove address
  const removeAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addNewAddress,
        updateAddress,
        removeAddress,
        loading,
        refreshAddresses: loadAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => useContext(AddressContext);
