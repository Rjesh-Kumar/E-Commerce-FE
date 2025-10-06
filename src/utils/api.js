const BASE_URL = "https://e-commerce-be-wheat.vercel.app/api"; // Change if your backend is hosted elsewhere
const userId = "user123"; // Replace with actual logged-in user ID

// --- Products ---
export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.data.products;
};

export const fetchProductById = async (productId) => {
  const res = await fetch(`${BASE_URL}/products/${productId}`);
  const data = await res.json();
  return data.data.product;
};

// --- Categories ---
export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await res.json();
  return data.data.categories;
};

// --- Cart ---
export const fetchCart = async () => {
  const res = await fetch(`${BASE_URL}/cart/${userId}`);
  const data = await res.json();
  return data.data.cart?.products || [];
};

export const addToCart = async (productId, quantity = 1, size = null) => {
  const res = await fetch(`${BASE_URL}/cart/${userId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity, size }),
  });
  const data = await res.json();
  return data.data.cart?.products || [];
};

export const removeFromCart = async (productId) => {
  const res = await fetch(`${BASE_URL}/cart/${userId}/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return data.data.cart?.products || [];
};

// --- Wishlist ---
export const fetchWishlist = async () => {
  const res = await fetch(`${BASE_URL}/wishlist/${userId}`);
  const data = await res.json();
  return data.data.wishlist?.products || [];
};

export const addToWishlist = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist/${userId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return data.data.wishlist?.products || [];
};

export const removeFromWishlist = async (productId) => {
  const res = await fetch(`${BASE_URL}/wishlist/${userId}/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  const data = await res.json();
  return data.data.wishlist?.products || [];
};

// --- Address ---
export const fetchAddresses = async () => {
  const res = await fetch(`${BASE_URL}/address/${userId}`);
  const data = await res.json();
  return data.data.addresses || [];
};

export const addAddress = async (address) => {
  const res = await fetch(`${BASE_URL}/address/${userId}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address),
  });
  const data = await res.json();
  return data.data.address;
};

export const updateAddress = async (addressId, updatedData) => {
  const res = await fetch(`${BASE_URL}/address/${addressId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  const data = await res.json();
  return data.data.address;
};


export const deleteAddress = async (addressId) => {
  const res = await fetch(`${BASE_URL}/address/${addressId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data.message;
};

// --- Orders ---
export const fetchOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/${userId}`);
  const data = await res.json();
  return data.data.orders || [];
};

export const createOrder = async (userIdParam, orderData) => {
  const res = await fetch(`${BASE_URL}/orders/${userIdParam}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  return data.data.order;
};

export const getOrders = async (userId) => {
  const res = await fetch(`${BASE_URL}/orders/${userId}`);
  const data = await res.json();
  return data.data.orders;
};
;
