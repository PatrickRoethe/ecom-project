import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart(); // ✅ Kjører KUN én gang når siden lastes inn
  }, []); // 🎯 Tom array = KUN første gang komponenten lastes!

  return (
    <div>
      <h1>Order Successful!</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/">
        <button>Back to Store</button>
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
