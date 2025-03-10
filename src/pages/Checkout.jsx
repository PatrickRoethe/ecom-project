import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Bruker navigate for å sikre riktig navigasjon
import { CartContext } from "../context/CartContext";
import styles from "../styles/Cart.module.css"; // ✅ Importerer CSS Module

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Bruker navigate-funksjonen

  // Beregner totalpris
  const total = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  // Reduserer antall av et produkt
  const decreaseQuantity = (id) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Fjerner produktet hvis quantity blir 0
    );
  };

  // Fjerner produkt helt fra handlekurven
  const removeItem = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Checkout</h1>

      {cart.length === 0 ? (
        <>
          <p className={styles.emptyCart}>Your cart is empty.</p>
        </>
      ) : (
        <ul className={styles.cartList}>
          {cart.map((item) => (
            <li key={item.id} className={styles.cartItem}>
              <img
                src={item.image.url}
                alt={item.image.alt}
                className={styles.cartImage}
              />
              <div className={styles.cartInfo}>
                <p className={styles.productTitle}>{item.title}</p>
                <p className={styles.productPrice}>
                  ${item.discountedPrice.toFixed(2)} x {item.quantity}
                </p>
              </div>

              {/* ✅ Hvis quantity er over 1, vis kun "-" knappen */}
              {item.quantity > 1 ? (
                <button
                  className={styles.decreaseButton}
                  onClick={() => decreaseQuantity(item.id)}
                >
                  ➖
                </button>
              ) : (
                /* ✅ Hvis quantity er 1, vis kun "❌" */
                <button
                  className={styles.removeButton}
                  onClick={() => removeItem(item.id)}
                >
                  ❌
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <>
          <h3 className={styles.total}>Total: ${total.toFixed(2)}</h3>
          <button
            className={styles.checkoutButton}
            onClick={() => navigate("/checkout-success")}
          >
            Purchase
          </button>
        </>
      )}

      {/* ✅ Kun én "Back to Store"-knapp, uansett om handlekurven er tom eller ikke */}
      <button
        className={styles.backToStoreButton}
        onClick={() => navigate("/")}
      >
        Back to Store
      </button>
    </div>
  );
};

export default Cart;
