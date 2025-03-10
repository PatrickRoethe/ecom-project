import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Importerer useNavigate
import { CartContext } from "../context/CartContext";
import styles from "../styles/ProductDetail.module.css"; // ✅ Importerer CSS-moduler

function ProductDetail() {
  let { id } = useParams();
  const navigate = useNavigate(); // ✅ Bruker navigate til "Back to Store"
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log(`Fetching product with ID: ${id}`);

    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Product data received:", data);
        setProduct(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setNotification(`✅ ${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  if (loading) return <p className={styles.loading}>Loading product...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!product) return <p className={styles.error}>No product found.</p>;

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.productContainer}>
        <img
          src={product.image?.url || "https://via.placeholder.com/200"}
          alt={product.image?.alt || product.title}
          className={styles.productImage}
        />

        <div className={styles.productInfo}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>
            <strong>Price:</strong> ${product.discountedPrice}
          </p>
          {product.price > product.discountedPrice && (
            <p className={styles.discountedPrice}>
              Discounted from ${product.price}
            </p>
          )}

          <p className={styles.rating}>
            <strong>Rating:</strong> {product.rating} / 5 ⭐
          </p>

          {/* 🔥 Knappene er nå under hverandre med styling */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className={styles.backToStoreButton}
              onClick={() => navigate("/")}
            >
              Back to Store
            </button>
          </div>

          {notification && (
            <p className={styles.notification}>{notification}</p>
          )}
        </div>
      </div>

      {product.reviews?.length > 0 ? (
        <div className={styles.reviews}>
          <h3>Customer Reviews:</h3>
          <ul>
            {product.reviews.map((review) => (
              <li key={review.id} className={styles.reviewItem}>
                <strong>{review.username}</strong> ({review.rating}/5 ⭐)
                <p>{review.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={styles.noReviews}>No reviews yet.</p>
      )}
    </div>
  );
}

export default ProductDetail;
