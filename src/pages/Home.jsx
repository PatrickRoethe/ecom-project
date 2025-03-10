import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css"; // ✅ Korrekt import

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/online-shop")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
        setDiscountedProducts(
          data.data.filter((p) => p.price > p.discountedPrice)
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ Bytt produkt i hero-banner hvert 8. sekund (med smooth fade)
  useEffect(() => {
    if (discountedProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentProductIndex((prevIndex) =>
          prevIndex === discountedProducts.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [discountedProducts]);

  useEffect(() => {
    const updateProductsPerPage = () => {
      if (window.innerWidth < 600) {
        setProductsPerPage(4);
      } else if (window.innerWidth < 1116) {
        setProductsPerPage(6);
      } else {
        setProductsPerPage(8);
      }
    };
    updateProductsPerPage();
    window.addEventListener("resize", updateProductsPerPage);
    return () => window.removeEventListener("resize", updateProductsPerPage);
  }, []);

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className={styles.container}>
      {/* 🔥 Hero Banner */}
      {discountedProducts.length > 0 && (
        <div className={styles.heroBanner}>
          {discountedProducts.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.heroFade} ${
                index === currentProductIndex ? styles.active : ""
              }`}
            >
              <img
                src={product.image?.url || "https://via.placeholder.com/300"}
                alt={product.image?.alt || "Discounted product"}
                className={styles.heroImage}
              />

              <div className={styles.heroContent}>
                <h2>{product.title}</h2>
                <p className={styles.priceContainer}>
                  <span className={styles.nowPrice}>
                    Now: ${product.discountedPrice}
                  </span>
                  <span className={styles.wasPrice}>Was: ${product.price}</span>
                </p>
                <Link to={`/product/${product.id}`}>
                  <button className={styles.heroButton}>View Product</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className={styles.title}>Welcome to the Store</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearchChange}
        className={styles.search}
      />

      <div
        className={
          currentProducts.length === 1
            ? styles.singleProduct
            : styles.productGrid
        }
      >
        {currentProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h3>{product.title}</h3>

            <img
              src={product.image?.url || "https://via.placeholder.com/150"}
              alt={product.image?.alt || "Product image"}
              className={styles.productImage}
            />

            <p className={styles.priceContainer}>
              <span className={styles.nowPrice}>
                ${product.discountedPrice}
              </span>
              {product.price > product.discountedPrice && (
                <span className={styles.wasPrice}>Was: ${product.price}</span>
              )}
            </p>
            <Link to={`/product/${product.id}`}>
              <button className={styles.viewButton}>View Product</button>
            </Link>
          </div>
        ))}
      </div>

      {/* ✅ Paginering */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(filteredProducts.length / productsPerPage)
                ? prev + 1
                : prev
            )
          }
          disabled={
            currentPage >= Math.ceil(filteredProducts.length / productsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
