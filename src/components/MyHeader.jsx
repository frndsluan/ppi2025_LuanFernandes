import styles from "./MyHeader.module.css";
import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <h1>TJA Megastore</h1>
      </Link>
      <Link to="/cart" className={styles.link}>
        <div className={styles.cartInfo}>
          <div className={styles.cartIconContainer}>
            <ShoppingBasket size={32} />
            <span className={styles.quantityIndicator}>
              {cart.reduce((total, product) => total + product.quantity, 0)}
            </span>
          </div>
          <p>
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
  );
}
