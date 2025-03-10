import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  let { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // ✅ Legger til notification state

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

    // ✅ Setter notification som forsvinner etter 2 sekunder
    setNotification(`✅ ${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <h1>{product.title}</h1>

      <img
        src={product.image?.url || "https://via.placeholder.com/200"}
        alt={product.image?.alt || product.title}
        width="200"
      />

      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.discountedPrice}
      </p>
      {product.price > product.discountedPrice && (
        <p style={{ color: "red" }}>Discounted from ${product.price}</p>
      )}

      {/* 🔥 Viser rating hvis tilgjengelig */}
      <p>
        <strong>Rating:</strong> {product.rating} / 5 ⭐
      </p>

      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* ✅ Viser notification om produktet er lagt til */}
      {notification && (
        <p style={{ color: "green", fontWeight: "bold" }}>{notification}</p>
      )}

      {/* 🔥 Viser reviews hvis det finnes */}
      {product.reviews?.length > 0 ? (
        <div>
          <h3>Customer Reviews:</h3>
          <ul>
            {product.reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.username}</strong> ({review.rating}/5 ⭐)
                <p>{review.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}

export default ProductDetail;
