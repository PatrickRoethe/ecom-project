import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Importer CartContext

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

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

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image.url} alt={item.image.alt} width="50" />
              {item.title} - ${item.discountedPrice.toFixed(2)} x{" "}
              {item.quantity}
              {/* Viser kun "-" knappen hvis quantity er større enn 1 */}
              {item.quantity > 1 && (
                <button onClick={() => decreaseQuantity(item.id)}>➖</button>
              )}
              <button
                onClick={() => setCart(cart.filter((p) => p.id !== item.id))}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      {cart.length > 0 && (
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      )}
    </div>
  );
};

export default Cart;
