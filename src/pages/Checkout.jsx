import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useContext(CartContext); // Hent handlekurv fra context
  const navigate = useNavigate();

  // 🔥 Beregn totalpris basert på quantity
  const total = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  return (
    <div>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li
              key={item.id}
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img src={item.image.url} alt={item.image.alt} width="50" />
              {item.title} - ${item.discountedPrice.toFixed(2)} x{" "}
              {item.quantity}
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${total.toFixed(2)}</h3>

      {cart.length > 0 && (
        <button onClick={() => navigate("/checkout-success")}>
          Complete Order
        </button>
      )}
    </div>
  );
};

export default Checkout;
