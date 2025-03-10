import { Link, useLocation } from "react-router-dom";
import CartIcon from "../components/CartIcon.jsx";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  const location = useLocation(); // 🔥 Henter aktiv path

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? styles.active : ""}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? styles.active : ""}
          >
            Contact
          </Link>
        </li>
        <CartIcon />
      </ul>
    </nav>
  );
}

export default Navbar;
