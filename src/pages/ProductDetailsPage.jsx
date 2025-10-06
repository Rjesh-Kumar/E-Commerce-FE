import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../utils/api";
import Loader from "../components/Loader";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // ← Add this line
  const [selectedSize, setSelectedSize] = useState("M"); // default M
  const { addItem } = useCart();
  const { wishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();

  const inWishlist = wishlist.find(p => p._id === productId);

  const handleBuyNow = () => {
  navigate("/checkout", { state: { product } }); // pass the whole product
};
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [productId]);

  if (loading) return <Loader />;
  if (!product) return <p>Product not found</p>;

  // Inside ProductDetails component, above the return
const relatedProducts = [
  {
    _id: "1",
    name: "Cap",
    price: 100,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FwfGVufDB8fDB8fHww",
  },
  {
    _id: "2",
    name: "Fridge",
    price: 120,
    image: "https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJpZGdlfGVufDB8fDB8fHww",
  },
  {
    _id: "3",
    name: "Ladies Bag",
    price: 90,
    image: "https://images.unsplash.com/photo-1681747685985-a401c271156c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFkaWVzJTIwYmFnfGVufDB8fDB8fHww",
  },
  {
    _id: "4",
    name: "Ear Rings",
    price: 150,
    image: "https://media.istockphoto.com/id/1133525210/photo/pair-of-fancy-golden-designer-earrings-closeup-macro-image-on-red-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=kwPIugAvakfa5mOH2408ByLwZuHY3-98d9zNIjTughk=",
  },
];


  return (
    <div className="container mt-4">
      <div className="row">
          {/*Image column*/}
           <div className="col-12 col-md-4">
              <div className="card border-0 shadow-sm">
                {/* Image container relative to position the icon */}
                <div className="position-relative">
                  <img
                    src={product.image}
                    className="img-fluid w-100"
                    style={{ objectFit: "cover", height: "400px" }}
                    alt={product.name}
                  />
                {/* Wishlist icon on top-right corner */}
                  <button
                    className="btn btn-light position-absolute top-0 end-0 m-2"
                    style={{ borderRadius: "50%", zIndex: 2 }}
                    onClick={() => {
                      if (inWishlist) removeWishlist(product._id);
                      else addWishlist(product._id);
                    }}>
                    <i className={inWishlist ? "bi bi-heart-fill text-danger" : "bi bi-heart"}></i>
                  </button>
                </div>
                <div className="card-body p-0 mt-3">
                  <button  className="btn btn-primary w-100 rounded-0" onClick={handleBuyNow}>Buy Now</button>
                  <br />
                  <button className="btn btn-secondary w-100 mt-3 rounded-0 mb-2"  onClick={() => addItem(product._id)}>Add to Cart</button>
                </div>
              </div>
            </div>

         {/*Info column */}
        <div className="col-12 col-md-8">
          <h3>{product.name}</h3>
          <div className="d-flex align-items-center">
            <span className="me-2">{product.rating}</span>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        product.rating >= i + 1
                          ? "bi-star-fill"
                          : product.rating >= i + 0.5
                          ? "bi-star-half"
                          : "bi-star"
                      }`}
                      style={{ color: "gold", fontSize: "1.0rem" }}
                    ></i>
                  ))}
          </div>

          <p className="fw-bold fs-4 mt-3">${product.price}&nbsp; <span className="fs-5 text-secondary" style={{textDecoration:"line-through"}}>${product.originalPrice}</span></p>
          <p className="fw-bold fs-6 text-secondary" style={{marginTop:"-14px"}}>{product.discount}</p>
          <div className="d-flex align-items-center">
              <p className="fw-bold me-2 mb-0">Quantity:</p>

              <button
                className="btn btn-outline-secondary rounded-circle me-2 p-0"
                style={{ width: "2rem", height: "2rem", padding: "0" }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <i className="bi bi-dash"></i>
              </button>

              <span className="btn btn-outline-secondary rounded-0" style={{ width: "40px", height: "26px", padding: "0" }}>{quantity}</span>

              <button
                className="btn btn-outline-secondary rounded-circle ms-2"
                style={{ width: "2rem", height: "2rem", padding: "0" }}
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </button>
           </div>
           {/* Size */}
            <div className="mt-4">
                <p className="fw-bold mb-2">Size:</p>
                <div className="d-flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`btn btn-outline-secondary ${
                          selectedSize === size ? "text-primary bg-light" : "text-secondary bg-light"
                        }px-3 py-1`}
                        onClick={() => setSelectedSize(size)}
                        style={{ padding: "0.25rem 0.75rem" }}
                      >
                        <b>{size}</b>
                      </button>
                    ))}
                  </div>
             </div>
             <hr />
              <div className="d-flex gap-5 ms-3">
                  {/* Return Policy */}
                  <div className="d-flex flex-column align-items-center">
                      <div
                        className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-2"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <i className="bi bi-arrow-repeat fw-bold fs-4 text-dark"></i>
                      </div>
                      <p className="mb-0 text-center fw-bold" style={{ fontSize: "0.8rem" }}>
                        7 days <br /> Returnable
                      </p>
                  </div>


                  {/* Pay on Delivery */}
                  <div className="d-flex flex-column align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-2"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-credit-card-2-back fw-bold fs-4 text-dark"></i>
                  </div>
                  <p className="mb-0 text-center fw-bold" style={{ fontSize: "0.8rem" }}>Pay on <br />Delivery</p>
                  </div>

                  {/* Free Delivery */}
                  <div className="d-flex flex-column align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-2"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-truck fw-bold fs-4"></i>
                  </div>
                   <p className="mb-0 text-center fw-bold" style={{ fontSize: "0.8rem" }}>Free <br />Delivery</p>
                  </div>
                    {/* Secure Payment */}
                    <div className="d-flex flex-column align-items-center">
                    <div
                        className="d-flex align-items-center justify-content-center bg-light rounded-circle mb-2"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <i className="bi bi-shield-lock fw-bold fs-4"></i>
                      </div>
                       <p className="mb-0 text-center fw-bold" style={{ fontSize: "0.8rem" }}>Secure <br />Payment</p>
                    </div>
              </div>

             <hr />
            <p className="fw-bold">Description:</p>
            <ul className="mb-2" >
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
        </div>
      </div>
      <hr />
      <div>
        <h5 className="fw-bold">More Items you may like in apparel</h5>
      </div>
      <div className="row g-5 g-md-3 mb-5 mt-2" style={{marginBottom:"150px"}}>
  {relatedProducts.map((product) => (
    <div key={product._id} className="col-md-3">
      <div className="card position-relative border-0" style={{height: "350px"}}>
        <button
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
          style={{ zIndex: 2 }}
          onClick={() => console.log("Wishlist clicked", product._id)}
        >
          <i className="bi bi-heart"></i>
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: "350px", objectFit: "cover", width:"100%" }}
        />

        <div className="card-body d-flex flex-column align-items-center  justify-content-between p-0">
          <h6 className="card-title mt-2">{product.name}</h6>
          <p className="card-text fw-bold fs-5">${product.price}</p>
          <button className="btn btn-primary w-100 mt-auto rounded-0">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


    </div>
  );
};

export default ProductDetails;
