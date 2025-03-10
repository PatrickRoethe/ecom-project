import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon.jsx";
import styles from "../styles/Navbar.module.css"; // Import CSS module

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <CartIcon /> {/* Handlekurv-ikon */}
      </ul>
    </nav>
  );
}

export default Navbar;
