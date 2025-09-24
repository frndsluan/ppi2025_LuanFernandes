import styles from "./MyHeader.module.css";
import { ShoppingBasket, User, PackagePlus, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoLink}>
          <h1>TJA Megastore</h1>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.navButtons}>
          <Link to="/login" className={styles.navButton}>
            <LogIn size={24} />
            <span>Login</span>
          </Link>
          
          <Link to="/register" className={styles.navButton}>
            <User size={24} />
            <span>Register</span>
          </Link>
          
          <Link to="/manage-products" className={styles.navButton}>
            <PackagePlus size={24} />
            <span>Products</span>
          </Link>
        </div>

        <Link to="/cart" className={styles.cartLink}>
          <div className={styles.cartInfo}>
            <div className={styles.cartIcon}>
              <ShoppingBasket size={32} />
              {cart.length > 0 && (
                <span className={styles.cartCount}>
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
            <p className={styles.cartTotal}>
              Total: ${" "}
              {cart
                .reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}