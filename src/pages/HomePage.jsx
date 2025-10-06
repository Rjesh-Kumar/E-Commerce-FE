import { Link } from "react-router-dom";
import { useFilters } from "../contexts/FilterContext";

export default function Home() {
  const { setCategoryFilters, setSearchQuery } = useFilters();
  const categories = [
    { id: 1, name: "Men", img: "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.webp?a=1&b=1&s=612x612&w=0&k=20&c=e0bOeR004rMmcAvXUYAIiJZJ01pgAFX7ThFqfzyvMac=" },
    { id: 2, name: "Women", img: "https://plus.unsplash.com/premium_photo-1671198905435-20f8d166efb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBmYXNoaW9ufGVufDB8fDB8fHww" },
    { id: 3, name: "Kids", img: "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2lkc3xlbnwwfHwwfHx8MA%3D%3D" },
    { id: 4, name: "Electronics", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Home", img: "https://plus.unsplash.com/premium_photo-1667912925305-629794bdb691?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFubmVyfGVufDB8fDB8fHww" },
  ];

  const newArrivals = [
    {
      id: 1,
      title: "Winter Collection",
      description:
        "Check out our best winter collection to stay warm in style this season.",
      badge: "NEW ARRIVALS",
      image:
        "https://images.unsplash.com/photo-1613322800337-581785ea9f33?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Autumn Collection",
      description: "Stylish jackets and coats to keep you cozy this autumn.",
      badge: "NEW ARRIVALS",
      image:
        "https://media.istockphoto.com/id/1412625760/photo/young-woman-with-stylish-backpack-on-autumn-day-space-for-text.webp?a=1&b=1&s=612x612&w=0&k=20&c=ocCT6yJtNQTOVOER5l_YwgCaTiCkGLwwCkxwkc6q-cs=",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-center text-white py-3 my-3 d-flex flex-wrap justify-content-center gap-3" style={{ marginLeft: "-70px", marginRight: "-70px" }}>
        {categories.map((cat) => (
          <div className="col-6 col-sm-4 col-md-2 mb-4 d-flex justify-content-center" key={cat.id}>
            <Link
              to={`/products?category=${cat.name.toLowerCase()}`}
              className="card text-center text-decoration-none position-relative w-100"
              style={{ width: "200px", height: "90px", overflow: "hidden" }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="card-img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                className="position-absolute top-50 start-50 translate-middle text-white fw-bold"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}
              >
                {cat.name}
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/products" onClick={() => {
    setCategoryFilters([]);
    setSearchQuery("");
  }} style={{ textDecoration: "none" }}>
        <div
          className="text-center text-white py-5 my-5 d-flex align-items-center justify-content-center"
          style={{
            height: "400px",
            maxHeight: "50vh", // tablet/mobile
            background:
              "url('https://images.unsplash.com/photo-1503264116251-35a269479413?w=1200') no-repeat center center",
            backgroundSize: "cover",
          }}
        >
          <h1
            className="fw-bold"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}
          >
            Welcome to Our Store
          </h1>
        </div>
      </Link>

      <div className="container my-5">
        <div className="row g-5">
          {newArrivals.map((product) => (
            <div className="col-md-6" key={product.id}>
              <div
                className="card flex-row"
                style={{
                  background: "grey",
                  height: "220px",
                  margin: "-10px",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                  style={{ width: "40%", objectFit: "cover", height: "100%" }}
                />
                <div className="card-body d-flex flex-column justify-content-center" style={{ minHeight: "100%" }}>
                  <span className="fw-bold mb-3">{product.badge}</span>
                  <h5 className="card-title fw-bold">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}