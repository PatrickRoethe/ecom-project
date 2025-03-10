import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Henter handlekurven

function CartIcon() {
  const { cart } = useContext(CartContext);

  // 🔥 Teller TOTALT antall varer, ikke bare unike
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <li>
      <Link to="/cart" className="cart-icon">
        🛒 {cartCount > 0 && <span>({cartCount})</span>}
      </Link>
    </li>
  );
}

export default CartIcon;
