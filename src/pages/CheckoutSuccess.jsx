import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import styles from "../styles/CheckoutSuccess.module.css"; // ✅ Importerer CSS Module

const CheckoutSuccess = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart(); // ✅ Tøm handlekurven KUN én gang når siden lastes

    const timer = setTimeout(() => {
      navigate("/"); // ✅ Redirect til forsiden etter 5 sekunder
    }, 5000);

    return () => clearTimeout(timer); // ✅ Rydd opp timer hvis komponenten avmonteres
  }, []); // 🔥 Tom dependency array = Kjører kun én gang ved første render

  return (
    <div className={styles.successContainer}>
      <h1 className={styles.title}>🎉 Order Successful! 🎉</h1>
      <p className={styles.message}>Your order has been placed successfully.</p>
      <p className={styles.redirectMessage}>
        Order is finalized, redirecting to store...
      </p>

      <Link to="/">
        <button className={styles.backToStoreButton}>Back to Store</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
